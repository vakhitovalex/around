const modalEditButton = document.querySelector('.profile__edit');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const form = document.querySelector('.form');
const formName = document.querySelector('.form__name');
const formAbout = document.querySelector('.form__about');

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
]


function controlEditModal () {
  formName.value = profileName.textContent;
  formAbout.value = profileAbout.textContent;
  modal.classList.toggle('modal_open');
}

function closingModal () {
  modal.classList.toggle('modal_open');
}


function formSubmit (e) {
  e.preventDefault ();
  profileName.textContent = formName.value;
  profileAbout.textContent = formAbout.value;
  modal.classList.toggle('modal_open');
}


modalEditButton.addEventListener('click', controlEditModal);
closeModal.addEventListener('click', closingModal);
form.addEventListener('submit', formSubmit);
