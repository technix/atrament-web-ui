export default function adjustElementSize(element) {
  const observer = new ResizeObserver(entries => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;
      const currentMinW = parseFloat(getComputedStyle(element).minWidth);
      const currentMinH = parseFloat(getComputedStyle(element).minHeight);
      if (width > currentMinW) element.style.minWidth = `${width}px`;
      if (height > currentMinH) element.style.minHeight = `${height}px`;
    }
  });
  observer.observe(element);
  return observer;
}
