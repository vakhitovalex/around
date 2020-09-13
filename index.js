//modals
const editProfileModal = document.querySelector('.modal_type_edit-profile');
const newPlaceModal = document.querySelector('.modal_type_add-place');
const imageModal = document.querySelector('.modal_type_image');
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
const profileSubmitForm = editProfileModal.querySelector('.form');
const profileNameForm = document.querySelector('.form__input_type_profile-name');
const profileAboutForm = document.querySelector('.form__input_type_profile-description');
//add new place form inputs
const addNewPlaceSubmitForm = newPlaceModal.querySelector('.form');
const addNewPlaceTitleForm = newPlaceModal.querySelector('.form__input_type_place-title');
const addNewPlaceImageForm = newPlaceModal.querySelector('.form__input_type_place-link');

const initialCards = [
  {
    name: 'Yosemite Valley',
    link: './images/yosemite.jpg'
  },
  {
    name: 'Lake Tahoe',
    link: './images/tahoe.jpg'
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

const element = document.querySelector('.element-template').content.querySelector('.element');
const elements = document.querySelector('.elements');

initialCards.forEach(data => {
  const elementContent = element.cloneNode(true);
  const elementImage = elementContent.querySelector('.element__image');
  elementImage.addEventListener('click', () => {
    imageModal.querySelector('.modal__img').src = `${data.link}`;
    imageModal.querySelector('.modal__img').alt = `${data.name}`;
    imageModal.querySelector('.modal__imgname').textContent = `${data.name}`;
    toggleModal(imageModal);
  });
  const elementTitle = elementContent.querySelector('.element__name');
  const elementLike = elementContent.querySelector('.element__like').addEventListener('click', function (e) {
    e.target.classList.toggle('element__like_active');
  });
  elementContent.querySelector('.element__delete').addEventListener('click', function () {
    elementContent.remove();
  });

  elementTitle.textContent = data.name;
  elementImage.style.backgroundImage = `url(${data.link})`;

  elements.prepend(elementContent);
});

function toggleModal (modal) {
  modal.classList.toggle('modal_open');
}
//open profile edit modal
function openProfileEditModal () {
  profileName.value = profileNameForm.textContent;
  profileAbout.value = profileAboutForm.textContent;
  toggleModal(editProfileModal);
}
//submit profile edit form
function profileFormSubmit (e) {
  e.preventDefault ();
  profileName.textContent = profileNameForm.value;
  profileAbout.textContent = profileAboutForm.value;
  toggleModal(editProfileModal);
}

//actions with profile edit modal
profileEditButton.addEventListener('click', openProfileEditModal);
profileSubmitForm.addEventListener('submit', profileFormSubmit);
closeEditProfileModal.addEventListener('click', () => {
  profileNameForm.value = profileName.textContent;
  profileAboutForm.value = profileAbout.textContent;
  toggleModal(editProfileModal);
});

//open add new place modal
addNewPlaceButton.addEventListener('click', () => {
  toggleModal(newPlaceModal);
});

//function for submit add new place form
function newPlaceFormSubmit (e) {
  e.preventDefault ();
  elementName = addNewPlaceTitleForm.value;
  elementLink = addNewPlaceImageForm.value;
  const elementContent = element.cloneNode(true);
  const elementImage = elementContent.querySelector('.element__image');
  elementImage.addEventListener('click', () => {
    imageModal.querySelector('.modal__img').src = elementLink;
    imageModal.querySelector('.modal__img').alt = elementName;
    imageModal.querySelector('.modal__imgname').textContent = elementName;
    toggleModal(imageModal);
  });
  const elementTitle = elementContent.querySelector('.element__name');
  const elementLike = elementContent.querySelector('.element__like').addEventListener('click', (e) => {
    e.target.classList.toggle('element__like_active');
  });
  elementContent.querySelector('.element__delete').addEventListener('click', () => {
    elementContent.remove();
  });
  elementTitle.textContent = elementName;
  elementImage.style.backgroundImage = `url(${elementLink})`;
  initialCards.push({name: elementName, link: elementLink});
  elements.prepend(elementContent);
  addNewPlaceSubmitForm.reset();
  toggleModal(newPlaceModal);
}

//submit new place in modal
addNewPlaceSubmitForm.addEventListener('submit', newPlaceFormSubmit);
//close Add new place modal
closeNewPlaceModal.addEventListener('click', () => {
  //reset form inputs with closure
  addNewPlaceSubmitForm.reset();
  toggleModal(newPlaceModal);
});

//close Image modal
closeImageModal.addEventListener('click', () => {
  toggleModal(imageModal);
});




//like button functionality
//const likeElements = document.querySelector('.element__like');
// function likeClicked (likedElement) {
//   likedElement.classList.toggle('element__like_active');
// }

