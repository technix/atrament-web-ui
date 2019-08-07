export function animateRef(ref, className) {
  return new Promise((resolve) => {
    ref.addEventListener('animationend', function animationEnd() {
      ref.removeEventListener('animationend', animationEnd);
      resolve();
    });
    // remove all existing animation classes
    [].slice.apply(ref.classList)
      .filter(i => i.startsWith('animation-'))
      .forEach(c => ref.classList.remove(c));
    void ref.offsetWidth;
    ref.classList.add(className);
  });
}
