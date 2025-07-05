let currentAnimToken = 0;

async function animateText(el, newText, options = {}) {
  const { deleteDelay = 5, typeDelay = 30 } = options;
  const token = ++currentAnimToken; // unique ID for this run

  // 1) Delete phase
  let oldText = el.innerHTML;
  for (let i = oldText.length; i >= 0; i--) {
    // if a new animation started, abort this one
    if (token !== currentAnimToken) return;
    el.innerHTML = oldText.slice(0, i);
    await new Promise((r) => setTimeout(r, deleteDelay));
  }

  // 2) Type phase
  for (let i = 0; i <= newText.length; i++) {
    if (token !== currentAnimToken) return;
    el.innerHTML = newText.slice(0, i);
    await new Promise((r) => setTimeout(r, typeDelay));
  }
}
