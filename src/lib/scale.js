const scale = {
  ratio: 0,

  enable (el) {
    let elHeight = el.offsetHeight;
    let elWidth = el.offsetWidth;
    this.ratio = Math.min(
      window.innerWidth / elWidth,
      window.innerHeight / elHeight
    );
    el.style.transform = `translate(-50%, -50%) scale(${this.ratio})`;
    // el.style.transformOrigin = 'top left';
  },
 
  disable (el) {
    el.style.transform = 'none';
    el.style.transformOrigin = 'none';
    this.ratio = 0;
  }
};

export default scale;
