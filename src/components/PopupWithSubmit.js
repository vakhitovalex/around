import Popup from './Popup.js';

class PopupWithSubmit extends Popup {
  constructor ({popupSelector, handleDeleteSubmit}) {
    super(popupSelector);
    this._handleDeleteSubmit = handleDeleteSubmit;
    // cardId = this._cardId;
  }

  setEventListeners() {
    this._popupElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleDeleteSubmit();
    })
    super.setEventListeners();
  }

  open () {
    super.open();
  }

  close() {
    super.close();
  }
}

export default PopupWithSubmit;
