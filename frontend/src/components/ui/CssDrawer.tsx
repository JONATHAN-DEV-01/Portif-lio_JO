import type React from 'react'
import './CssDrawer.css'

const AWESOME_HUES = [15, 35, 45, 90, 180, 260, 320]

export function CssDrawer() {
  const awesomeLetters = "Awesome".split('')

  return (
    <div className="chest-scene" aria-label="CSS is Awesome — interactive 3D drawer">
      <div className="chest-wrapper">
        <div className="chest">
          {/* Cabinet body panels */}
          <div className="chest__panel chest__panel--back" />
          <div className="chest__panel chest__panel--top" />
          <div className="chest__panel chest__panel--bottom" />
          <div className="chest__panel chest__panel--right" />
          <div className="chest__panel chest__panel--left" />
          <div className="chest__panel chest__panel--front">
            <div className="chest__panel chest__panel--front-frame" />
          </div>

          {/* Drawer 1 — "CSS" */}
          <div className="chest__drawer" data-position="1">
            <details>
              <summary aria-label="Abrir gaveta 1" />
            </details>
            <div className="drawer__structure">
              <div className="drawer__panel drawer__panel--front" />
              <div className="drawer__panel drawer__panel--back">
                <span>CSS</span>
              </div>
              <div className="drawer__panel drawer__panel--bottom" />
              <div className="drawer__panel drawer__panel--left" />
              <div className="drawer__panel drawer__panel--right" />
            </div>
          </div>

          {/* Drawer 2 — "is" */}
          <div className="chest__drawer" data-position="2">
            <details>
              <summary aria-label="Abrir gaveta 2" />
            </details>
            <div className="drawer__structure">
              <div className="drawer__panel drawer__panel--front" />
              <div className="drawer__panel drawer__panel--back">
                <span>is</span>
              </div>
              <div className="drawer__panel drawer__panel--bottom" />
              <div className="drawer__panel drawer__panel--left" />
              <div className="drawer__panel drawer__panel--right" />
            </div>
          </div>

          {/* Drawer 3 — "Awesome" (rainbow wave) */}
          <div className="chest__drawer" data-position="3">
            <details>
              <summary aria-label="Abrir gaveta 3" />
            </details>
            <div className="drawer__structure">
              <div className="drawer__panel drawer__panel--front" />
              <div className="drawer__panel drawer__panel--back">
                {awesomeLetters.map((letter, i) => (
                  <span
                    key={i}
                    className="css-letter"
                    style={
                      { '--hue': AWESOME_HUES[i], '--delay': i } as React.CSSProperties
                    }
                  >
                    {letter}
                  </span>
                ))}
              </div>
              <div className="drawer__panel drawer__panel--bottom" />
              <div className="drawer__panel drawer__panel--left" />
              <div className="drawer__panel drawer__panel--right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
