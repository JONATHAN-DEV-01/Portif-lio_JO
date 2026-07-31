import './CssDrawer.css'

export function CssDrawer() {
  const awesomeText = "Awesome".split('');

  return (
    <div className="chest-wrapper" title="CSS is Awesome">
      <div className="chest">
        <div className="chest__panel chest__panel--back"></div>
        <div className="chest__panel chest__panel--top"></div>
        <div className="chest__panel chest__panel--bottom"></div>
        <div className="chest__panel chest__panel--right"></div>
        <div className="chest__panel chest__panel--front">
          <div className="chest__panel chest__panel--front-frame"></div>
        </div>
        <div className="chest__panel chest__panel--left"></div>
        
        {/* Drawer 1 */}
        <div className="chest__drawer drawer" data-position="1">
          <details>
            <summary></summary>
          </details>
          <div className="drawer__structure">
            <div className="drawer__panel drawer__panel--back">
              <span>CSS</span>
            </div>
            <div className="drawer__panel drawer__panel--bottom"></div>
            <div className="drawer__panel drawer__panel--right"></div>
            <div className="drawer__panel drawer__panel--left"></div>
            <div className="drawer__panel drawer__panel--front"></div>
          </div>
        </div>

        {/* Drawer 2 */}
        <div className="chest__drawer drawer" data-position="2">
          <details>
            <summary></summary>
          </details>
          <div className="drawer__structure">
            <div className="drawer__panel drawer__panel--back">
              <span>is</span>
            </div>
            <div className="drawer__panel drawer__panel--bottom"></div>
            <div className="drawer__panel drawer__panel--right"></div>
            <div className="drawer__panel drawer__panel--left"></div>
            <div className="drawer__panel drawer__panel--front"></div>
          </div>
        </div>

        {/* Drawer 3 */}
        <div className="chest__drawer drawer" data-position="3">
          <details>
            <summary></summary>
          </details>
          <div className="drawer__structure">
            <div className="drawer__panel drawer__panel--back">
              {awesomeText.map((letter, i) => (
                <span key={i} className="letter">{letter}</span>
              ))}
            </div>
            <div className="drawer__panel drawer__panel--bottom"></div>
            <div className="drawer__panel drawer__panel--right"></div>
            <div className="drawer__panel drawer__panel--left"></div>
            <div className="drawer__panel drawer__panel--front"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
