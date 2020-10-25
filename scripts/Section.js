export default class Section {
  constructor ({items, renderer}, sectionSelector) {
    this._elements = items;
    this._renderer = renderer;
    this._container = document.querySelector(sectionSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  renderElements () {
    this._elements.forEach((item) => {
      this._renderer(item);
    });
  }
}
