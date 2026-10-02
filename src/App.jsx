import { useState } from 'react'
import Cat from './Cat.jsx'
import MeanderBorder from './MeanderBorder.jsx'

// Edit these to personalise the page
const BRIDE = 'Nessrin'
const PARTNER = 'Jonathan'
const WEDDING_DATE = '2027'
const SIGNED = 'Miriam'

const MESSAGE = [
  `Tack så mycket för att ni bjöd in mig att fira ert bröllop.`,
  `${BRIDE}, du har alltid varit min storasyster, min förebild och min bästa vän. Att se dig hitta någon som älskar dig så som ${PARTNER} gör fyller mitt hjärta med glädje.`,
  `Jag är så hedrad att få dela den här dagen med er båda, och jag längtar efter att dansa, skratta och gråta glädjetårar vid er sida. Ge Sandy en kram från mig!`,
]

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  feather: i % 2 === 0,
  left: Math.random() * 100,
  delay: Math.random() * 12,
  duration: 10 + Math.random() * 10,
  size: 10 + Math.random() * 14,
}))

const SPARKLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 4,
  size: 8 + Math.random() * 10,
}))

function Feather() {
  return (
    <svg viewBox="0 0 20 60" width="100%" height="100%">
      <path d="M10 2 C18 12 19 30 12 50 L10 58 L8 50 C1 30 2 12 10 2 Z" fill="#fff" stroke="#e8dcc4" strokeWidth="1" />
      <path d="M10 6 V58" stroke="#dccaa2" strokeWidth="0.8" />
    </svg>
  )
}

function Wing({ side }) {
  return (
    <svg className={`wing wing-${side}`} viewBox="0 0 60 40" aria-hidden="true">
      <g transform={side === 'right' ? 'scale(-1 1) translate(-60 0)' : undefined}>
      <path
        d="M60 22 C48 10 30 3 3 5 C13 9 17 12 19 14 C9 14 5 17 1 20 C11 21 17 22 21 24 C13 26 9 29 7 33 C19 32 29 31 37 31 C46 31 54 27 60 22 Z"
        fill="#fff"
        stroke="#d8bf8a"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d="M58 21 C46 15 32 11 18 10 M56 23 C44 20 30 19 16 19 M54 25 C44 26 32 27 20 28" fill="none" stroke="#e6d4ab" strokeWidth="0.8" />
      </g>
    </svg>
  )
}

export default function App() {
  const [opened, setOpened] = useState(window.location.hash === '#open')

  return (
    <main className="page">
      <div className="petals" aria-hidden="true">
        {PETALS.map((p) => (
          <span
            key={p.id}
            className={p.feather ? 'feather' : 'petal'}
            style={{
              left: `${p.left}%`,
              width: p.feather ? p.size * 0.6 : p.size,
              height: p.feather ? p.size * 1.8 : p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          >
            {p.feather && <Feather />}
          </span>
        ))}
        {SPARKLES.map((s) => (
          <span
            key={s.id}
            className="sparkle"
            style={{ left: `${s.left}%`, top: `${s.top}%`, fontSize: s.size, animationDelay: `${s.delay}s` }}
          >
            ✦
          </span>
        ))}
      </div>
      <div className="rays" aria-hidden="true" />
      <div className="clouds" aria-hidden="true">
        <span /><span /><span /><span /><span />
      </div>

      {!opened ? (
        <div className="envelope-scene">
          <Cat />
          <button className="envelope" onClick={() => setOpened(true)}>
            <span className="seal">♥</span>
            <span className="envelope-label">Till {BRIDE} &amp; {PARTNER}</span>
            <span className="hint">Tryck för att öppna</span>
          </button>
        </div>
      ) : (
        <article className="card">
          <MeanderBorder />
          <div className="card-crown" aria-hidden="true">
            <span className="halo" />
            <Wing side="left" />
            <span className="card-heart">♥</span>
            <Wing side="right" />
          </div>
          <p className="eyebrow">{BRIDE} &amp; {PARTNER} · {WEDDING_DATE}</p>
          <h1>Tack</h1>
          <div className="divider">❦</div>
          {MESSAGE.map((line, i) => (
            <p key={i} className="line" style={{ animationDelay: `${0.4 + i * 0.5}s` }}>
              {line}
            </p>
          ))}
          <p className="signoff" style={{ animationDelay: `${0.4 + MESSAGE.length * 0.5}s` }}>
            Med all min kärlek,
            <span className="signature">{SIGNED}</span>
          </p>
          <Cat caption="Sandy" />
        </article>
      )}
    </main>
  )
}
