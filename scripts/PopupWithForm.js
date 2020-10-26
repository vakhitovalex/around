import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor ({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }


  setEventListeners() {
    // this._popupElement.addEventListener('click', (e) => {
    //   if (e.target.classList.contains('modal_open')) {
    //     this.close();
    //   }
    // });
    // this._popupElement.querySelector('.modal__close-button').addEventListener('click', () => {
    //   this._popupElement.close();
    // });


    this._popupElement.querySelector('.form__submit').addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._popupElement.reset();
    });
    super.setEventListeners();
  }
}

export default PopupWithForm;
