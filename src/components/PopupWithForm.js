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
    this._popupElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  open (name, job) {
    if (this._popupElement.classList.contains('modal_type_edit-profile')) {
      this._popupElement.querySelector('.form__input_type_profile-name').value = name;
      this._popupElement.querySelector('.form__input_type_profile-description').value = job;
    }
    super.open();
  }

  close() {
    super.close();
    this._popupElement.querySelector('.form').reset();
  }
}

export default PopupWithForm;
