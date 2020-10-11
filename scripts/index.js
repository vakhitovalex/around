import FormValidator from './FormValidator.js';
import Card from './Card.js';

const settings  = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__error",
  errorClass: "form__error_active"
};
//modals
const editProfileModal = document.querySelector('.modal_type_edit-profile');
const newPlaceModal = document.querySelector('.modal_type_add-place');
const imageModal = document.querySelector('.modal_type_image');

const profileSubmitForm = editProfileModal.querySelector('.form');
const addNewPlaceSubmitForm = newPlaceModal.querySelector('.form');

const editProfileModalValidator = new FormValidator(settings, profileSubmitForm);
const newPlaceModalValidator = new FormValidator(settings, addNewPlaceSubmitForm);

editProfileModalValidator.enableValidation();
newPlaceModalValidator.enableValidation();

//modals
// const editProfileModal = document.querySelector('.modal_type_edit-profile');
// const newPlaceModal = document.querySelector('.modal_type_add-place');

//open modal buttons
const profileEditButton = document.querySelector('.profile__edit');
const addNewPlaceButton = document.querySelector('.profile__add');
//close Buttons
const closeEditProfileModal = editProfileModal.querySelector('.modal__close-button');
const closeNewPlaceModal = newPlaceModal.querySelector('.modal__close-button');
const closeImageModal = imageModal.querySelector('.modal__close-button');
//profile
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
//profile form inputs

const profileNameForm = document.querySelector('.form__input_type_profile-name');
const profileAboutForm = document.querySelector('.form__input_type_profile-description');
//add new place form inputs

const addNewPlaceTitleForm = newPlaceModal.querySelector('.form__input_type_place-title');
const addNewPlaceImageForm = newPlaceModal.querySelector('.form__input_type_place-link');
const submitNewPlace = newPlaceModal.querySelector(".form__submit");
//template variables
const element = document.querySelector('.element-template').content.querySelector('.element');
// const elementLike = elementContent.querySelector('.element__like');
const elements = document.querySelector('.elements');

//show place modal variables
const imgFigure = imageModal.querySelector('.modal__img');
const captionFigure = imageModal.querySelector('.modal__imgname');

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

const addCard = (data) => {
  const card = new Card (data, ".element-template");
  const cardElement = card.getCard();
  elements.append(cardElement);
}

initialCards.forEach((item) => {
  addCard(item);
});

//click outside of modal window handler
function closeByClick (evt) {
  if (evt.target.classList.contains('modal_open')) {
    const modal = document.querySelector('.modal_open');
    toggleModal(modal);
  }
}
//escape button handler
function closeByEsc (evt) {
  if (evt.key === 'Escape') {
    const modal = document.querySelector('.modal_open');
    toggleModal(modal);
  }
}

function toggleModal (modal) {
  if (!modal.classList.contains('modal_open')) {
      document.addEventListener('keydown', closeByEsc);
      modal.addEventListener('click', closeByClick);
    }
    else {
      document.removeEventListener('keydown', closeByEsc);
      modal.removeEventListener('click', closeByClick);
    }
  modal.classList.toggle('modal_open');
}

//submit profile edit form
function profileFormSubmit (e) {
  e.preventDefault ();
  profileName.textContent = profileNameForm.value;
  profileAbout.textContent = profileAboutForm.value;
  toggleModal(editProfileModal);
}

//actions with profile edit modal
profileEditButton.addEventListener('click', () => {
  toggleModal(editProfileModal);
  profileNameForm.value = profileName.textContent;
  profileAboutForm.value = profileAbout.textContent;
});

profileSubmitForm.addEventListener('submit', profileFormSubmit);
closeEditProfileModal.addEventListener('click', () => {
  profileSubmitForm.reset();
  toggleModal(editProfileModal);
});

//open add new place modal
addNewPlaceButton.addEventListener('click', () => {
  toggleModal(newPlaceModal);
});

const makeSubmitButtonDisabled = (button, inactiveButtonClass) => {
  button.classList.add(inactiveButtonClass);
  button.setAttribute('disabled', true);
};

//submit new place in modal
addNewPlaceSubmitForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addCard({name: addNewPlaceTitleForm.value, link:addNewPlaceImageForm.value});
  addNewPlaceSubmitForm.reset();
  toggleModal(newPlaceModal);
  makeSubmitButtonDisabled(submitNewPlace, 'form__submit_inactive');
});

//close Add new place modal
closeNewPlaceModal.addEventListener('click', () => {
  addNewPlaceSubmitForm.reset();
  toggleModal(newPlaceModal);
  makeSubmitButtonDisabled(submitNewPlace, 'form__submit_inactive');
});

//close Image modal
closeImageModal.addEventListener('click', () => {
  toggleModal(imageModal);
});

// function createCard (data) {
//   const elementContent = element.cloneNode(true);
//   const elementImage = elementContent.querySelector('.element__image');
//   const elementLike = elementContent.querySelector('.element__like');
//   const elementTitle = elementContent.querySelector('.element__name');
//   const elementDelete = elementContent.querySelector('.element__delete');

//   elementImage.addEventListener('click', () => {
//     imgFigure.src = `${data.link}`;
//     captionFigure.alt = `${data.name}`;
//     captionFigure.textContent = `${data.name}`;
//     toggleModal(imageModal);
//   });

//   elementLike.addEventListener('click', (e) => {
//     e.target.classList.toggle('element__like_active');
//   });
//   elementDelete.addEventListener('click', () => {
//     elementContent.remove();
//   });

//   elementTitle.textContent = data.name;
//   elementImage.style.backgroundImage = `url(${data.link})`;
//   return elementContent;
// }
