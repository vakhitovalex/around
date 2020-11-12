class Card {
  constructor ({data, handleCardClick, handleDeleteClick}, cardSelector) {
  this._name = data.name;
  this._link = data.link;
  this._id = data.id;
  this._handleCardClick = handleCardClick;
  this._handleDeleteClick = handleDeleteClick;
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

  id () {
    return this._id();
  }

  _setEventListeners () {
    this._elementContents.elementLike.addEventListener('click', this._likeButtonHandler);
    this._elementContents.elementDelete.addEventListener('click', () => {
      this._handleDeleteClick(this._id);
      this._deleteButtonHandler();
    });
    this._elementContents.elementImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
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
