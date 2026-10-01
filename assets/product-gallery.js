(() => {
  'use strict';
  const dialog = document.getElementById('screen-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const content = dialog.querySelector('.screen-dialog-content');
  let trigger;
  document.querySelectorAll('.screen-preview').forEach(button => {
    button.addEventListener('click', () => {
      trigger = button;
      const screen = button.querySelector('.app-screen').cloneNode(true);
      screen.querySelectorAll('img').forEach(image => {
        image.loading = 'eager';
        if (image.dataset.fullSrc) {
          image.removeAttribute('srcset');
          image.removeAttribute('sizes');
          image.src = image.dataset.fullSrc;
        }
      });
      content.replaceChildren(screen);
      dialog.showModal();
      dialog.scrollTop = 0;
    });
  });
  dialog.querySelector('.screen-dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    content.replaceChildren();
    trigger?.focus({ preventScroll: true });
  });
})();
