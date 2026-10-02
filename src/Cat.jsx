import { useState } from 'react'

// Sandy: a burnt orange British Shorthair with copper eyes
const COAT = '#c4561a'
const COAT_DARK = '#9c3f10'
const COAT_LIGHT = '#e08442'
const PAD = '#f0a868'

export default function Cat({ caption }) {
  const [meow, setMeow] = useState(false)

  const handleClick = () => {
    setMeow(true)
    setTimeout(() => setMeow(false), 1800)
  }

  return (
    <figure className="cat-wrap">
      {meow && <span className="cat-bubble">Mrrp! 🧡</span>}
      <span className="cat-heart" aria-hidden="true">♥</span>
      <button className="cat-button" onClick={handleClick} aria-label="Klappa Sandy">
        <svg className="cat" viewBox="0 0 200 210" role="img" aria-hidden="true">
          <defs>
            <radialGradient id="iris" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="#f0a03a" />
              <stop offset="60%" stopColor="#d2721f" />
              <stop offset="100%" stopColor="#8a4515" />
            </radialGradient>
          </defs>

          <path
            className="cat-tail"
            d="M148 182 Q192 188 186 150 Q182 128 168 128"
            fill="none"
            stroke={COAT}
            strokeWidth="15"
            strokeLinecap="round"
          />

          <g className="cat-body">
            <ellipse cx="100" cy="160" rx="58" ry="42" fill={COAT} />
            <ellipse cx="100" cy="152" rx="27" ry="24" fill={COAT_LIGHT} />
            <ellipse cx="82" cy="197" rx="15" ry="9" fill={COAT_LIGHT} />
            <ellipse cx="118" cy="197" rx="15" ry="9" fill={COAT_LIGHT} />
          </g>

          <g className="cat-head">
            <g className="cat-ear-left">
              <path d="M56 66 Q48 30 70 36 Q82 42 86 54 Z" fill={COAT} />
              <path d="M62 60 Q58 40 70 43 Q78 47 80 55 Z" fill={PAD} />
            </g>
            <g className="cat-ear-right">
              <path d="M144 66 Q152 30 130 36 Q118 42 114 54 Z" fill={COAT} />
              <path d="M138 60 Q142 40 130 43 Q122 47 120 55 Z" fill={PAD} />
            </g>

            <ellipse cx="100" cy="88" rx="54" ry="45" fill={COAT} />

            <g stroke={COAT_DARK} strokeWidth="3" strokeLinecap="round">
              <line x1="100" y1="50" x2="100" y2="63" />
              <line x1="91" y1="52" x2="93" y2="63" />
              <line x1="109" y1="52" x2="107" y2="63" />
            </g>

            <g className="cat-eyes">
              <ellipse cx="78" cy="88" rx="12" ry="13" fill="url(#iris)" />
              <ellipse cx="122" cy="88" rx="12" ry="13" fill="url(#iris)" />
              <ellipse className="cat-pupil" cx="78" cy="89" rx="4" ry="9" fill="#2a170c" />
              <ellipse className="cat-pupil" cx="122" cy="89" rx="4" ry="9" fill="#2a170c" />
              <circle cx="82" cy="83" r="3" fill="#fff" />
              <circle cx="126" cy="83" r="3" fill="#fff" />
            </g>

            <ellipse cx="91" cy="113" rx="10" ry="8" fill={COAT_LIGHT} />
            <ellipse cx="109" cy="113" rx="10" ry="8" fill={COAT_LIGHT} />
            <path
              d="M94 104 L106 104 L100 111 Z"
              fill="#a85a45"
              stroke="#a85a45"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M100 111 Q100 118 93 118 M100 111 Q100 118 107 118"
              fill="none"
              stroke={COAT_DARK}
              strokeWidth="2"
              strokeLinecap="round"
            />

            <g stroke="#fff5ea" strokeWidth="1.5" strokeLinecap="round" opacity="0.9">
              <line x1="84" y1="111" x2="48" y2="104" />
              <line x1="84" y1="115" x2="46" y2="117" />
              <line x1="116" y1="111" x2="152" y2="104" />
              <line x1="116" y1="115" x2="154" y2="117" />
            </g>
          </g>
        </svg>
      </button>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
