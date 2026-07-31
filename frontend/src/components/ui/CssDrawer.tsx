import type React from 'react'
import './CssDrawer.css'

// Hue values for each letter in "JAVASCRIPT"
const JS_HUES = [45, 50, 55, 60, 65, 55, 50, 45, 40, 35]

export function CssDrawer() {
  const jsLetters = 'JAVASCRIPT'.split('')

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

          {/* ── Drawer 1 — "PYTHON" ── */}
          <div className="chest__drawer" data-position="1">
            <details>
              <summary aria-label="Abrir gaveta PYTHON" />
            </details>
            <div className="drawer__structure">
              <div className="drawer__panel drawer__panel--front" />
              <div className="drawer__panel drawer__panel--back"><span className="drawer__label">PYTHON</span></div>
              <div className="drawer__panel drawer__panel--bottom" />
              <div className="drawer__panel drawer__panel--left" />
              <div className="drawer__panel drawer__panel--right" />
            </div>
          </div>

          {/* ── Drawer 2 — "REACT" ── */}
          <div className="chest__drawer" data-position="2">
            <details>
              <summary aria-label="Abrir gaveta REACT" />
            </details>
            <div className="drawer__structure">
              <div className="drawer__panel drawer__panel--front" />
              <div className="drawer__panel drawer__panel--back"><span className="drawer__label">REACT</span></div>
              <div className="drawer__panel drawer__panel--bottom" />
              <div className="drawer__panel drawer__panel--left" />
              <div className="drawer__panel drawer__panel--right" />
            </div>
          </div>

          {/* ── Drawer 3 — "JAVASCRIPT" (rainbow wave) ── */}
          <div className="chest__drawer" data-position="3">
            <details>
              <summary aria-label="Abrir gaveta JAVASCRIPT" />
            </details>
            <div className="drawer__structure">
              <div className="drawer__panel drawer__panel--front" />
              <div className="drawer__panel drawer__panel--back">
                <span className="drawer__label">
                  {jsLetters.map((letter, i) => (
                    <span
                      key={i}
                      className="css-letter"
                      style={
                        { '--hue': JS_HUES[i % JS_HUES.length], '--delay': i } as React.CSSProperties
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
