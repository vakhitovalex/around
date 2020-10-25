import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
  }

  open (name, link) {
    this._popupElement.querySelector('.modal__imgname').textContent = name;
    this._popupElement.querySelector('.modal__img').src = link;
    super.open();
  }
}

export default PopupWithImage;
