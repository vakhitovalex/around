let modalEditButton = document.querySelector('.profile__edit');
let modal = document.querySelector('.modal');
let closeModal = document.querySelector('.modal__close-button');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let form = document.querySelector('.form');
let formName = document.querySelector('.form__name');
let formAbout = document.querySelector('.form__about');

function controlEditModal (e) {
  formName.value = profileName.textContent;
  formAbout.value = profileAbout.textContent;
  modal.classList.toggle('modal_open');
}

function closingModal (e) {
  e.preventDefault ();
  formName.value = profileName.textContent;
  formAbout.value = profileAbout.textContent;
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
