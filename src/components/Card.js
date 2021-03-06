class Card {
  constructor ({data, currentUserId, handleCardClick, handleDeleteClick, handleLikeClick}, cardSelector) {
  this._name = data.name;
  this._link = data.link;
  this._ownerId = data.owner._id;
  this._id = data._id;
  this._currentUserId = currentUserId;
  this._likes = data.likes;

  this._handleCardClick = handleCardClick;
  this._handleLikeClick = handleLikeClick;
  this._handleDeleteClick = handleDeleteClick;
  this._cardSelector = cardSelector;
  this.isLiked = !this.isLiked;
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
    e.target.classList.toggle('element__like-figure_active');
  }

  like() {
    this.isLiked = !this.isLiked;
  }

  removeCard () {
    this._elementContent.remove();
    this._elementContent = '';
  }

  // _checkCardOwner () {
  //   if (this._cardId == currentUser)
  // }

  // id () {
  //   return this._id();
  // }

  _setEventListeners () {
    this._elementContents.elementLike.addEventListener('click', () => this._handleLikeClick(this));
    this._elementContents.elementDelete.addEventListener('click', () => this._handleDeleteClick(this));
    this._elementContents.elementImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }


  getCard (ownerId, currentUserId, likes) {
      this._elementContent = this._getTemplate();
      const elementImage = this._elementContent.querySelector('.element__image');
      const elementLike = this._elementContent.querySelector('.element__like-figure');
      const elementLikeCount = this._elementContent.querySelector('.element__like-count');
      elementLikeCount.innerHTML = likes.length;
      const elementTitle = this._elementContent.querySelector('.element__name');
      const elementDelete = this._elementContent.querySelector('.element__delete');
      if (this._currentUserId !== this._ownerId) {
        elementDelete.remove();
      }
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

    setLikesNumber (likesNumber, isLiked) {
      const elementLikeCount = this._elementContent.querySelector('.element__like-count');
      elementLikeCount.innerHTML = likesNumber;
      // console.log(likeOwner);
      const elementLike = this._elementContent.querySelector('.element__like-figure');
      if (isLiked) {
        elementLike.classList.add('element__like-figure_active');
      }
      else {
        elementLike.classList.remove('element__like-figure_active');
      }

    }
  }


  export default Card;
