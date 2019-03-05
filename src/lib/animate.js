export function animateRef(ref, className) {
  ref.classList.remove(className);
  void ref.offsetWidth;
  ref.classList.add(className);
}
