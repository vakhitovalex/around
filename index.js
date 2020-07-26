let modalEditButton = document.querySelector('.profile__edit');
let modal = document.querySelector('.modal');
let closeModal = document.querySelector('.modal__close-button');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let form = document.querySelector('.form');
// let formName = document.querySelector('.form__name');
// let formAbout = document.querySelector('.form__about');


function initialModalLoading () {
  let formName = document.querySelector('.form__name');
  let formAbout = document.querySelector('.form__about');
  formName.value = profileName.textContent;
  formAbout.value = profileAbout.textContent;
}

function controlEditModal () {
  initialModalLoading ();
  modal.classList.toggle('modal_open');
}

function closeEditModal (e) {
  e.preventDefault ();
  let formName = document.querySelector('.form__name');
  let formAbout = document.querySelector('.form__about');
  formName.value = profileName.textContent;
  console.log (formName.value);
  formAbout.value = profileAbout.textContent;
  modal.classList.toggle('modal_open');
}


function formSubmit (e) {
  e.preventDefault ();
  let formName = document.querySelector('.form__name');
  let formAbout = document.querySelector('.form__about');
  formName = formName.value;
  formAbout = formAbout.value;
  profileName.textContent = formName;
  profileAbout.textContent = formAbout;
  modal.classList.toggle('modal_open');
}



modalEditButton.addEventListener('click', controlEditModal);
closeModal.addEventListener('click', closeEditModal);
form.addEventListener('submit', formSubmit);
