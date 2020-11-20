export const settings  = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__error",
  errorClass: "form__error_active"
};


export const initialCards = [
  {
    name: 'Yosemite Valley',
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

export const cardListSelector = '.elements';

const editProfileModal = document.querySelector('.modal_type_edit-profile');
const newPlaceModal = document.querySelector('.modal_type_add-place');
const editProfilePictureModal = document.querySelector('.modal_type_edit-profile-picture');

export const profileSubmitForm = editProfileModal.querySelector('.form');
export const profilePictureSubmitForm = editProfilePictureModal.querySelector('.form');
export const addNewPlaceSubmitForm = newPlaceModal.querySelector('.form');

export const profileEditButton = document.querySelector('.profile__edit');
export const profilePictureEditButton = document.querySelector('.profile__picture-edit');
export const addNewPlaceButton = document.querySelector('.profile__add');

export const userProfileNameForm = editProfileModal.querySelector('.form__input_type_profile-name');
export const userProfileAboutForm = editProfileModal.querySelector('.form__input_type_profile-description');

