import './index.css';
import {settings, initialCards, cardListSelector, profileSubmitForm, addNewPlaceSubmitForm, profileEditButton, addNewPlaceButton} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
const currentUser = new UserInfo();
const profileEdit = new PopupWithForm ({
  popupSelector: '.modal_type_edit-profile',
  handleFormSubmit: (formInputs) => {
    currentUser.setUserInfo(formInputs.profileName, formInputs.profileAbout);
    profileEdit.close();
  }
});

profileEdit.setEventListeners();

profileEditButton.addEventListener('click', () => {
  const userValues = currentUser.getUserInfo();
  profileEdit.open(userValues.name, userValues.job);
});

const addNewCard = new PopupWithForm ({
  popupSelector: '.modal_type_add-place',
  handleFormSubmit: (formInputs) => {
    const card = new Card ({
      data: {name: formInputs.placeTitle, link: formInputs.placeLink},
      handleCardClick: (name, link) => {
        photoModal.open(name, link);
      }
    }, '.element-template');
    const cardElement = card.getCard();
    initialElements.addItem(cardElement);
    addNewCard.close();
  }
});

addNewCard.setEventListeners();

addNewPlaceButton.addEventListener('click', () => {
  addNewCard.open();
});

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


const editProfileModalValidator = new FormValidator(settings, profileSubmitForm);
const newPlaceModalValidator = new FormValidator(settings, addNewPlaceSubmitForm);

editProfileModalValidator.enableValidation();
newPlaceModalValidator.enableValidation();
