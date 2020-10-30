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
    link: './images/yosemite.jpg'
  },
  {
    name: 'Lake Tahoe',
    link: './images/tahoe.jpg',
  },
  {
    name: 'Sequoia National Park',
    link: './images/sequoia.jpg'
  },
  {
    name: 'Antilope Canyon',
    link: './images/antilope.jpg'
  },
  {
    name: 'Niagara Falls',
    link: './images/niagara.jpg'
  },
  {
    name: 'Monument Valley',
    link: './images/monument.jpg'
  }
];

export const cardListSelector = '.elements';

const editProfileModal = document.querySelector('.modal_type_edit-profile');
const newPlaceModal = document.querySelector('.modal_type_add-place');

export const profileSubmitForm = editProfileModal.querySelector('.form');
export const addNewPlaceSubmitForm = newPlaceModal.querySelector('.form');

export const profileEditButton = document.querySelector('.profile__edit');
export const addNewPlaceButton = document.querySelector('.profile__add');
