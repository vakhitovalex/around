import "./index.css";
import {
  settings,
  initialCards,
  editProfileModal,
  newPlaceModal,
  editProfilePictureModal,
  cardListSelector,
  profileSubmitForm,
  profilePictureSubmitForm,
  addNewPlaceSubmitForm,
  profileEditButton,
  profilePictureEditButton,
  addNewPlaceButton,
  userProfileNameForm,
  userProfileAboutForm,
} from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-6",
  headers: {
    authorization: "8335dbe9-1da8-4147-9f68-11c7f6c06af4",
    "Content-Type": "application/json",
  },
});

function renderForm(isLoading, modal) {
  if (isLoading) {
    modal.querySelector(".form__submit").textContent = "Saving...";
  } else {
    modal.querySelector(".form__submit").textContent = "Save";
  }
}

const currentUser = new UserInfo();
api.getUserInfo().then((res) => {
  currentUser.setUserInfo(res.name, res.about, res.avatar);
});

const profileEdit = new PopupWithForm({
  popupSelector: ".modal_type_edit-profile",
  handleFormSubmit: (formInputs) => {
    renderForm(true, editProfileModal);
    api
      .updateUserInfo({
        name: formInputs.profileName,
        about: formInputs.profileAbout,
      })
      .then((res) => {
        currentUser.setUserInfo(res.name, res.about, res.avatar);
      })
      .finally(() => {
        renderForm(false, editProfileModal);
        profileEdit.close();
      });
  },
});

profileEdit.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const userValues = currentUser.getUserInfo();
  profileEdit.open();
  userProfileNameForm.value = userValues.name;
  userProfileAboutForm.value = userValues.job;
});

const profilePictureEdit = new PopupWithForm({
  popupSelector: ".modal_type_edit-profile-picture",
  handleFormSubmit: (formInputs) => {
    renderForm(true, editProfilePictureModal);
    api
      .updateUserPicture(formInputs.pictureLink)
      .then((res) => {
        currentUser.setProfilePicture(res.avatar);
        profilePictureEdit.close();
      })
      .catch((err) => {
        console.log(err);
        profilePictureEdit.close();
      })
      .finally(() => {
        renderForm(false, editProfilePictureModal);
        profilePictureEdit.close();
      });
  },
});
profilePictureEdit.setEventListeners();

profilePictureEditButton.addEventListener("click", () => {
  profilePictureEdit.open();
});

api.getUserInfo().then((res) => {
  const currentUserId = res._id;
  api.getInitialCards().then((res) => {
    console.log(res);
    // console.log(currentUserId + " !!!")
    const initialElements = new Section(
      {
        items: res,
        renderer: (cardData) => {
          const card = new Card(
            {
              data: cardData,
              currentUserId: currentUserId,
              handleCardClick: (name, link) => {
                photoModal.open(name, link);
              },
              handleDeleteClick: (cardData) => {
                // console.log("clicked bin of this card - " + cardId);
                const deleteCardModal = new PopupWithSubmit({
                  popupSelector: ".modal_type_delete-place",
                  handleDeleteSubmit: () => {
                    api.deleteCard(cardData._id).then(() => {
                      card.removeCard();
                      deleteCardModal.close();
                    });
                    // console.log(cardData._id + " was deleted");
                  },
                });
                deleteCardModal.setEventListeners();
                deleteCardModal.open();
              },
              handleLikeClick: (cardData) => {
                // console.log(cardData.isLiked);
                api
                  .changeLikeStatus(cardData._id, cardData.isLiked)
                  .then((likesData) => {
                    // console.log(likesData)
                    card.setLikesNumber(
                      likesData.likes.length,
                      cardData.isLiked
                    );
                    card.like();
                  });
              },
            },
            ".element-template"
          );
          const cardElement = card.getCard(
            cardData.owner._id,
            currentUserId,
            cardData.likes
          );
          initialElements.addItem(cardElement);
        },
      },
      cardListSelector
    );
    initialElements.renderElements();

    const addNewCard = new PopupWithForm({
      popupSelector: ".modal_type_add-place",
      handleFormSubmit: (formInputs) => {
        renderForm(true, newPlaceModal);
        api
          .addNewCard({
            name: formInputs.placeTitle,
            link: formInputs.placeLink,
          })
          .then((res) => {
            const card = new Card(
              {
                data: res,
                currentUserId: currentUserId,
                handleCardClick: (name, link) => {
                  photoModal.open(name, link);
                },
                handleDeleteClick: (cardData) => {
                  const deleteCardModal = new PopupWithSubmit({
                    popupSelector: ".modal_type_delete-place",
                    handleDeleteSubmit: () => {
                      api.deleteCard(cardData._id).then(() => {
                        card.removeCard();
                        deleteCardModal.close();
                      });
                      // console.log(cardData._id + " was deleted");
                    },
                  });
                  deleteCardModal.setEventListeners();
                  deleteCardModal.open();
                },
                handleLikeClick: (cardData) => {
                  api
                    .changeLikeStatus(cardData._id, cardData.isLiked)
                    .then((likesData) => {
                      card.setLikesNumber(
                        likesData.likes.length,
                        cardData.isLiked
                      );
                      card.like();
                    });
                },
              },
              ".element-template"
            );
            const cardElement = card.getCard(
              res.owner._id,
              currentUserId,
              res.likes
            );
            initialElements.addItem(cardElement);
          })
          .finally(() => {
            renderForm(false, newPlaceModal);
            addNewCard.close();
          });
      },
    });
    addNewCard.setEventListeners();

    addNewPlaceButton.addEventListener("click", () => {
      addNewCard.open();
    });
  });
});

const photoModal = new PopupWithImage(".modal_type_image");
photoModal.setEventListeners();

const editProfileModalValidator = new FormValidator(
  settings,
  profileSubmitForm
);
const newPlaceModalValidator = new FormValidator(
  settings,
  addNewPlaceSubmitForm
);

const editProfilePictureModalValidator = new FormValidator(
  settings,
  profilePictureSubmitForm
);

editProfilePictureModalValidator.enableValidation();
editProfileModalValidator.enableValidation();
newPlaceModalValidator.enableValidation();
