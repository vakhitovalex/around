// import FormValidator from './FormValidator.js';
import Card from './Card.js';
// import {imageModal, toggleModal} from './utils.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

const cardListSelector = '.elements';


const settings  = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__error",
  errorClass: "form__error_active"
};
// //modals
// const editProfileModal = document.querySelector('.modal_type_edit-profile');
// const newPlaceModal = document.querySelector('.modal_type_add-place');
// const submitNewPlace = newPlaceModal.querySelector(".form__submit");

// const profileSubmitForm = editProfileModal.querySelector('.form');
// const addNewPlaceSubmitForm = newPlaceModal.querySelector('.form');

// const editProfileModalValidator = new FormValidator(settings, profileSubmitForm);
// const newPlaceModalValidator = new FormValidator(settings, addNewPlaceSubmitForm);

// editProfileModalValidator.enableValidation();
// newPlaceModalValidator.enableValidation();

// //open modal buttons
const profileEditButton = document.querySelector('.profile__edit');
// const addNewPlaceButton = document.querySelector('.profile__add');
// //close Buttons
// const closeEditProfileModal = editProfileModal.querySelector('.modal__close-button');
// const closeNewPlaceModal = newPlaceModal.querySelector('.modal__close-button');
// const closeImageModal = imageModal.querySelector('.modal__close-button');
// //profile
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
// //profile form inputs

// const profileNameForm = document.querySelector('.form__input_type_profile-name');
// const profileAboutForm = document.querySelector('.form__input_type_profile-description');
// //add new place form inputs

// const addNewPlaceTitleForm = newPlaceModal.querySelector('.form__input_type_place-title');
// const addNewPlaceImageForm = newPlaceModal.querySelector('.form__input_type_place-link');

// //template variables
// const element = document.querySelector('.element-template').content.querySelector('.element');
// const elements = document.querySelector('.elements');

const initialCards = [
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


// function addCard (item) {
//   const card = new Card (item, ".element-template");
//   const cardElement = card.getCard();
//   elements.append(cardElement);
// }

// initialCards.forEach((item) => {
//   addCard(item);
// });


const editProfileModal = new PopupWithForm ({
  popupSelector: '.modal_type_edit-profile',
  handleFormSubmit: (formData) => {
    const user = new UserInfo(formData);
    user.setUserInfo(formData);
  }
});

editProfileModal.setEventListeners();
profileEditButton.addEventListener('click', () => {
  editProfileModal.open();
});

// const addNewCardForm = new PopupWithForm ('.modal_type_add-place');
// addNewCardForm.setEventListeners();

const photoModal = new PopupWithImage ('.modal_type_image');
photoModal.setEventListeners();

const initialElements = new Section (
  {
  items: initialCards,
  renderer: (item) => {
    const card = new Card ({
      data: item,
      handleCardClick: (name, link) => {
        photoModal.open(name, link);
      }
    }, '.element-template');
    const cardElement = card.getCard();
    initialElements.addItem(cardElement);
  }
}, cardListSelector);
initialElements.renderElements();


//constructor ({data, handleCardClick}, cardSelector) {

//submit profile edit form


//sprint 8 not needed

// function profileFormSubmit (e) {
//   e.preventDefault ();
//   profileName.textContent = profileNameForm.value;
//   profileAbout.textContent = profileAboutForm.value;
//   toggleModal(editProfileModal);
// }

// //actions with profile edit modal
// profileEditButton.addEventListener('click', () => {
//   toggleModal(editProfileModal);
//   profileNameForm.value = profileName.textContent;
//   profileAboutForm.value = profileAbout.textContent;
// });

// profileSubmitForm.addEventListener('submit', profileFormSubmit);
// closeEditProfileModal.addEventListener('click', () => {
//   profileSubmitForm.reset();
//   toggleModal(editProfileModal);
// });

// //open add new place modal
// addNewPlaceButton.addEventListener('click', () => {
//   toggleModal(newPlaceModal);
// });

// //submit new place in modal
// addNewPlaceSubmitForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   addCard({name: addNewPlaceTitleForm.value, link:addNewPlaceImageForm.value});
//   addNewPlaceSubmitForm.reset();
//   toggleModal(newPlaceModal);
// });

// //close Add new place modal
// closeNewPlaceModal.addEventListener('click', () => {
//   addNewPlaceSubmitForm.reset();
//   toggleModal(newPlaceModal);
// });

// //close Image modal
// closeImageModal.addEventListener('click', () => {
//   toggleModal(imageModal);
// });

