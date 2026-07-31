import type React from 'react'
import './CssDrawer.css'

// Hue values for each letter in "RESTful"
const RESTFUL_HUES = [15, 45, 90, 150, 200, 260, 320]

export function CssDrawer() {
  const restfulLetters = 'RESTful'.split('')

  return (
    <div className="chest-scene" aria-label="CSS is Awesome — interactive 3D drawer">
      <div className="chest-wrapper">
        <div className="chest">

          {/* ── Cabinet body panels ── */}
          <div className="chest__panel chest__panel--back" />
          <div className="chest__panel chest__panel--top" />
          <div className="chest__panel chest__panel--bottom" />
          <div className="chest__panel chest__panel--right" />
          <div className="chest__panel chest__panel--left" />
          <div className="chest__panel chest__panel--front">
            <div className="chest__panel chest__panel--front-frame" />
          </div>

          {/* ── Drawer 1 — "CSS" ── */}
          <div className="chest__drawer" data-position="1">
            <details>
              <summary aria-label="Abrir gaveta CSS" />
            </details>
            <div className="drawer__structure">
              <div className="drawer__panel drawer__panel--front" />
              <div className="drawer__panel drawer__panel--back"><span className="drawer__label">CSS</span></div>
              <div className="drawer__panel drawer__panel--bottom" />
              <div className="drawer__panel drawer__panel--left" />
              <div className="drawer__panel drawer__panel--right" />
            </div>
          </div>

          {/* ── Drawer 2 — "is" ── */}
          <div className="chest__drawer" data-position="2">
            <details>
              <summary aria-label="Abrir gaveta is" />
            </details>
            <div className="drawer__structure">
              <div className="drawer__panel drawer__panel--front" />
              <div className="drawer__panel drawer__panel--back"><span className="drawer__label">is</span></div>
              <div className="drawer__panel drawer__panel--bottom" />
              <div className="drawer__panel drawer__panel--left" />
              <div className="drawer__panel drawer__panel--right" />
            </div>
          </div>

          {/* ── Drawer 3 — "RESTful" (rainbow wave) ── */}
          <div className="chest__drawer" data-position="3">
            <details>
              <summary aria-label="Abrir gaveta API RESTful" />
            </details>
            <div className="drawer__structure">
              <div className="drawer__panel drawer__panel--front" />
              <div className="drawer__panel drawer__panel--back">
                <span className="drawer__label">
                  {restfulLetters.map((letter, i) => (
                    <span
                      key={i}
                      className="css-letter"
                      style={
                        { '--hue': RESTFUL_HUES[i % RESTFUL_HUES.length], '--delay': i } as React.CSSProperties
                      }
                    >
                      {letter}
                    </span>
                  ))}
                </span>
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
