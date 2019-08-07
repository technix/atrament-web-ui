export function animateRef(ref, className, delayed) {
  return new Promise((resolve) => {
    ref.addEventListener('animationend', function animationEnd() {
      ref.removeEventListener('animationend', animationEnd);
      resolve();
    });
    // remove all existing animation classes
    [].slice.apply(ref.classList)
      .filter(i => i.startsWith('animation-'))
      .forEach(c => ref.classList.remove(c));
    // reset offset
    void ref.offsetWidth;
    // add animation class
    if (delayed) {
      setTimeout(() => ref.classList.add(className), 0);
    } else {
      ref.classList.add(className);
    }
  });
}
