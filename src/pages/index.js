import "./index.css";
import {
  settings,
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

const initialElements = new Section(
  {}, cardListSelector);

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
      .then(() => {
        renderForm(false, editProfileModal);
        profileEdit.close();
      })
      .catch((err) => {
        console.log(err);
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
      .then(() => {
        renderForm(false, editProfilePictureModal);
        profilePictureEdit.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
profilePictureEdit.setEventListeners();

profilePictureEditButton.addEventListener("click", () => {
  profilePictureEdit.open();
});

function newCardHandler(cardData, currentUserId) {
  const card = new Card(
    {
      data: cardData,
      currentUserId: currentUserId,
      handleCardClick: (name, link) => {
        photoModal.open(name, link);
      },
      handleDeleteClick: (cardData) => {
        const deleteCardModal = new PopupWithSubmit({
          popupSelector: ".modal_type_delete-place",
          handleDeleteSubmit: () => {
            api.deleteCard(cardData._id)
              .then(() => {
                card.removeCard();
                deleteCardModal.close();
              })
              .catch((err) => console.log(err));
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
          })
          .catch((err) => console.log(err));
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
}

api.getUserInfo().then((res) => {
  currentUser.setUserInfo(res.name, res.about, res.avatar);
  const currentUserId = res._id;
  api.getInitialCards()
    .then((res) => {
      // console.log(res);
      const initialElements = new Section(
        {
          items: res,
          renderer: (cardData) => {
            newCardHandler(cardData, currentUserId);
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
              newCardHandler(res, res.owner._id);
            })
            .then(() => {
              renderForm(false, newPlaceModal);
              addNewCard.close();
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
      addNewCard.setEventListeners();

      addNewPlaceButton.addEventListener("click", () => {
        addNewCard.open();
      });
    })
    .catch((err) => console.log(err));
})
  .catch((err) => console.log(err));

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
