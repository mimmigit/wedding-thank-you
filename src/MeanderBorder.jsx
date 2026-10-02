import { useLayoutEffect, useRef, useState } from 'react'

// Greek key (meander) border that follows the card's arched shape.
// Insets are measured from the card edge, in px.
const OUTER = 12
const INNER = 34
const MID = (OUTER + INNER) / 2
const BAND = 16
const PERIOD = 16

// One key unit on a 10x10 grid; units chain together into a continuous meander
const KEY = 'M0 10 V0 H8 V6 H4 V4 H6 V2 H2 V8 H10'

// The card's border-radius, scaled the way the browser scales oversized radii
function cardRadii(el) {
  const cs = getComputedStyle(el)
  const parse = (v) => {
    const [a, b] = v.split(' ').map(parseFloat)
    return [a, b ?? a]
  }
  const [rx, ry] = parse(cs.borderTopLeftRadius)
  const [, by] = parse(cs.borderBottomLeftRadius)
  const f = Math.min(1, el.offsetWidth / (2 * rx), el.offsetHeight / (ry + by))
  return { rx: rx * f, ry: ry * f }
}

function framePath({ W, H, rx, ry }, d) {
  return `M${d} ${H - d} V${ry} A${rx - d} ${ry - d} 0 0 1 ${rx} ${d} H${W - rx} A${rx - d} ${ry - d} 0 0 1 ${W - d} ${ry} V${H - d} Z`
}

// Points along the arch at inset d, clockwise from bottom-left to bottom-right
function archPoints({ W, rx, ry }, d, yStart) {
  const pts = [[d, yStart]]
  const steps = 120
  for (let i = 0; i <= steps; i++) {
    const t = Math.PI + (i / steps) * (Math.PI / 2)
    pts.push([rx + (rx - d) * Math.cos(t), ry + (ry - d) * Math.sin(t)])
  }
  for (let i = 0; i <= steps; i++) {
    const t = 1.5 * Math.PI + (i / steps) * (Math.PI / 2)
    pts.push([W - rx + (rx - d) * Math.cos(t), ry + (ry - d) * Math.sin(t)])
  }
  pts.push([W - d, yStart])
  return pts
}

// Spread key units evenly along a polyline, each rotated to follow it
function placeTiles(pts) {
  const cum = [0]
  for (let i = 1; i < pts.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]))
  }
  const total = cum[cum.length - 1]
  const n = Math.max(1, Math.round(total / PERIOD))
  const step = total / n

  const at = (s) => {
    s = Math.min(Math.max(s, 0), total)
    let j = 0
    while (j < cum.length - 2 && (cum[j + 1] < s || cum[j + 1] === cum[j])) j++
    const len = cum[j + 1] - cum[j] || 1
    const k = (s - cum[j]) / len
    return [pts[j][0] + (pts[j + 1][0] - pts[j][0]) * k, pts[j][1] + (pts[j + 1][1] - pts[j][1]) * k]
  }

  const tiles = []
  for (let i = 0; i < n; i++) {
    const s = (i + 0.5) * step
    const [x, y] = at(s)
    const [ax, ay] = at(s - 1)
    const [bx, by] = at(s + 1)
    tiles.push({ x, y, deg: (Math.atan2(by - ay, bx - ax) * 180) / Math.PI, step })
  }
  return tiles
}

export default function MeanderBorder() {
  const ref = useRef(null)
  const [size, setSize] = useState(null)

  useLayoutEffect(() => {
    const card = ref.current.parentElement
    const ro = new ResizeObserver(() =>
      setSize({ W: card.clientWidth, H: card.clientHeight, ...cardRadii(card) })
    )
    ro.observe(card)
    return () => ro.disconnect()
  }, [])

  let tiles = []
  if (size) {
    const { W, H } = size
    const arch = archPoints(size, MID, H - MID - BAND / 2)
    const bottom = [
      [W - MID - BAND / 2, H - MID],
      [MID + BAND / 2, H - MID],
    ]
    tiles = [...placeTiles(arch), ...placeTiles(bottom)]
  }

  return (
    <svg ref={ref} className="meander" viewBox={size ? `0 0 ${size.W} ${size.H}` : '0 0 1 1'} aria-hidden="true">
      {size && (
        <>
          <path d={framePath(size, OUTER)} />
          <path d={framePath(size, INNER)} />
          {tiles.map((t, i) => (
            <path
              key={i}
              d={KEY}
              vectorEffect="non-scaling-stroke"
              transform={`translate(${t.x} ${t.y}) rotate(${t.deg}) scale(${t.step / 10} ${BAND / 10}) translate(-5 -5)`}
            />
          ))}
          {[MID, size.W - MID].map((cx) => (
            <g key={cx}>
              <rect x={cx - BAND / 2} y={size.H - MID - BAND / 2} width={BAND} height={BAND} />
              <rect x={cx - BAND / 4} y={size.H - MID - BAND / 4} width={BAND / 2} height={BAND / 2} />
            </g>
          ))}
        </>
      )}
    </svg>
  )
}
