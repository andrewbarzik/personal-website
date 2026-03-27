(function () {
  // ── Cursor element ──────────────────────────────────────────────────────────
  // Container: 22×22px, center at (11,11)
  // Circle:    6×6px hollow, positioned at top:8 left:8 → edges at y=8,y=14,x=8,x=14
  // Arms:      8px each, running from container edge to circle edge (no overlap)

  const cursor = document.createElement('div');
  cursor.style.cssText = [
    'position:fixed',
    'pointer-events:none',
    'z-index:99999',
    'width:22px',
    'height:22px',
    'left:0',
    'top:0',
    'will-change:transform',
    'transform:translate(-999px,-999px)',
  ].join(';');

  // Hollow circle — border only, transparent fill
  const ring = document.createElement('div');
  ring.style.cssText = [
    'position:absolute',
    'width:6px',
    'height:6px',
    'border:1px solid #1d1d1f',
    'border-radius:50%',
    'background:transparent',
    'top:8px',
    'left:8px',
  ].join(';');
  cursor.appendChild(ring);

  // Arms — each starts at container edge and ends at circle edge
  const arms = [
    // top: y=0 → y=8
    'position:absolute;left:50%;top:0;width:1px;height:8px;background:#1d1d1f;transform:translateX(-50%)',
    // bottom: y=14 → y=22
    'position:absolute;left:50%;bottom:0;width:1px;height:8px;background:#1d1d1f;transform:translateX(-50%)',
    // left: x=0 → x=8
    'position:absolute;top:50%;left:0;height:1px;width:8px;background:#1d1d1f;transform:translateY(-50%)',
    // right: x=14 → x=22
    'position:absolute;top:50%;right:0;height:1px;width:8px;background:#1d1d1f;transform:translateY(-50%)',
  ];

  arms.forEach(css => {
    const arm = document.createElement('div');
    arm.style.cssText = css;
    cursor.appendChild(arm);
  });

  document.body.appendChild(cursor);

  // Hide the native cursor
  const style = document.createElement('style');
  style.textContent = '* { cursor: none !important; }';
  document.head.appendChild(style);

  // ── Mouse tracking ──────────────────────────────────────────────────────────
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 11}px, ${e.clientY - 11}px)`;
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-999px,-999px)';
  });
})();
