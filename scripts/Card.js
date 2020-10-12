import {imageModal, imgFigure, captionFigure, toggleModal, closeByClick, closeByEsc} from './utils.js';

class Card {
  constructor (data, cardSelector) {
  this._name = data.name;
  this._link = data.link;
  this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const element = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return element;
  }

  _likeButtonHandler (e) {
    e.target.classList.toggle('element__like_active');
  }

  _deleteButtonHandler () {
    this._elementContent.remove();
    this._elementContent = '';
  }

  _pictureModalHandler () {
    imgFigure.src = this._link;
    captionFigure.alt = this._name;
    captionFigure.textContent = this._name;
    toggleModal(imageModal);
  }

  _setEventListeners () {
    this._elementContents.elementLike.addEventListener('click', this._likeButtonHandler);
    this._elementContents.elementDelete.addEventListener('click', () => {
    this._deleteButtonHandler();
    });
    this._elementContents.elementImage.addEventListener('click', () => {
      this._pictureModalHandler();
    });
  }

  getCard () {
    this._elementContent = this._getTemplate();

    const elementImage = this._elementContent.querySelector('.element__image');
    const elementLike = this._elementContent.querySelector('.element__like');
    const elementTitle = this._elementContent.querySelector('.element__name');
    const elementDelete = this._elementContent.querySelector('.element__delete');

    elementTitle.textContent = this._name;
    elementImage.style.backgroundImage = `url(${this._link})`;

    this._elementContents = {
      elementImage,
      elementLike,
      elementDelete
    };
    this._setEventListeners();
    return this._elementContent;
  }
}

export default Card;
