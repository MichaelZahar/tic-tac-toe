export default class Controller {
  constructor(selector) {
    this.element = document.querySelector(selector);
  }

  show() {
    this.element.style.display = 'block';
  }

  hide() {
    this.element.style.display = 'none';
  }

  open() {
    this.show();
    this.render();
  }

  render() {
  }
}
