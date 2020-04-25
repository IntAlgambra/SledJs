export default class SliderStack {
  constructor(totalSlides, perView) {
    this.totalSlides = totalSlides;
    this.perView = perView;
    if (this.totalSlides <= this.perView) {
      throw new Error('not enough slides');
    }
    this.current = [this.totalSlides - 1];
    for (let i = 0; i <= this.perView; i++) {
      this.current.push(i);
    }
  }

  getNext() {
    const next = this.current.slice(1);
    if (next[next.length - 1] === this.totalSlides - 1) {
      next.push(0);
    } else {
      next.push(next[next.length - 1] + 1);
    }
    return next;
  }

  next() {
    this.current = this.getNext();
  }

  getPrev() {
    const prev = this.current.slice(0, this.current.length - 1);
    if (prev[0] === 0) {
      prev.unshift(this.totalSlides - 1);
    } else {
      prev.unshift(prev[0] - 1);
    }
    return prev;
  }

  prev() {
    this.current = this.getPrev();
  }

  getCurrent() {
    return this.current;
  }
}
