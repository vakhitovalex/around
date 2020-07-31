const modalEditButton = document.querySelector('.profile__edit');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const form = document.querySelector('.form');
const formName = document.querySelector('.form__name');
const formAbout = document.querySelector('.form__about');

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
