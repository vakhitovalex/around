class FormValidator  {
  constructor (settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _showInputError (inputElement, validationMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = validationMessage;
    errorElement.classList.add(this._settings.errorClass);
    inputElement.classList.add(this._settings.inputErrorClass);
  }

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._settings.errorClass);
    inputElement.classList.remove(this._settings.errorClass);
  }

  _checkInputValidity (inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  _isInvalid (inputs) {
    return inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _makeSubmitButtonDisabled (button) {
    button.classList.add(this._settings.inactiveButtonClass);
    button.setAttribute('disabled', true);
  }

  _toggleButtonState (inputs, button) {
    if (this._isInvalid(inputs)) {
      this._makeSubmitButtonDisabled(button, this._settings.inactiveButtonClass);
    } else {
      button.classList.remove(this._settings.inactiveButtonClass);
      button.removeAttribute('disabled', true);
    }
  }

  enableValidation () {
    this._formElement.addEventListener('submit', ((evt) => {
      evt.preventDefault();
      // this._toggleButtonState(inputs, button);
    }));

      const inputs = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
      const button = this._formElement.querySelector(this._settings.submitButtonSelector);

      inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          //check input validity
          this._checkInputValidity (inputElement);
          //togle button state
          this._toggleButtonState(inputs, button, this._settings.inactiveButtonClass);
          });
      });
    }
}

export default FormValidator;
