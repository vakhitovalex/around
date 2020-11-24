export const settings  = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__error",
  errorClass: "form__error_active"
};

export const cardListSelector = '.elements';

export const editProfileModal = document.querySelector('.modal_type_edit-profile');
export const newPlaceModal = document.querySelector('.modal_type_add-place');
export const editProfilePictureModal = document.querySelector('.modal_type_edit-profile-picture');

export const profileSubmitForm = editProfileModal.querySelector('.form');
export const profilePictureSubmitForm = editProfilePictureModal.querySelector('.form');
export const addNewPlaceSubmitForm = newPlaceModal.querySelector('.form');

export const profileEditButton = document.querySelector('.profile__edit');
export const profilePictureEditButton = document.querySelector('.profile__picture-edit');
export const addNewPlaceButton = document.querySelector('.profile__add');

export const userProfileNameForm = editProfileModal.querySelector('.form__input_type_profile-name');
export const userProfileAboutForm = editProfileModal.querySelector('.form__input_type_profile-description');

