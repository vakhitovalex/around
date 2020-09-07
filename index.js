// Modals
const editProfileModal = document.querySelector('.modal_type_edit-profile');
const newPlaceModal = document.querySelector('.modal_type_add-place');
// Open Modals buttons
const profileEditButton = document.querySelector('.profile__edit');
const addPlaceModal = document.querySelector('.profile__add');
//Close Buttons
const closeEditProfileModal = editProfileModal.querySelector('.modal__close-button');
const closeNewPlaceModal = newPlaceModal.querySelector('.modal__close-button')
// profile
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
//form inputs
const form = document.querySelector('.form');
const formName = document.querySelector('.form__input_type_profile-name');
const formAbout = document.querySelector('.form__input_type_profile-description');

addPlaceModal.addEventListener('click', ()=> {
  newPlaceModal.classList.toggle('modal_open');
})

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
  const elementTitle = elementContent.querySelector('.element__name');
  const elementLike = elementContent.querySelector('.element__like');
  const elementDelete  = elementContent.querySelector('.element__delete');
  
  elementTitle.textContent = data.name;
  elementImage.style.backgroundImage = `url(${data.link})`;
  elements.prepend(elementContent);
});

function toggleModal (modal) {
  modal.classList.toggle('modal_open');
}

function openEditModal () {
  formName.value = profileName.textContent;
  formAbout.value = profileAbout.textContent;
  toggleModal(editProfileModal);
}


function formSubmit (e) {
  e.preventDefault ();
  profileName.textContent = formName.value;
  profileAbout.textContent = formAbout.value;
  editProfileModal.classList.toggle('modal_open');
}


profileEditButton.addEventListener('click', openEditModal);
//close Edit Profile Window
closeEditProfileModal.addEventListener('click', () =>  {
  toggleModal(editProfileModal);

form.addEventListener('submit', formSubmit);
