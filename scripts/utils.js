//show place modal variables
const imageModal = document.querySelector('.modal_type_image');
const imgFigure = imageModal.querySelector('.modal__img');
const captionFigure = imageModal.querySelector('.modal__imgname');


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

export {imageModal, imgFigure, captionFigure, toggleModal, closeByClick, closeByEsc};
