
import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._popupName = this._popupElement.querySelector('.modal__imgname');
    this._popupImage = this._popupElement.querySelector('.modal__img');
  }

  open (name, link) {
    super.open();
    this._popupName.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name;
  }
}

export default PopupWithImage;
