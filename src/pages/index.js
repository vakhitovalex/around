import "./index.css";
import {
  settings,
  initialCards,
  cardListSelector,
  profileSubmitForm,
  addNewPlaceSubmitForm,
  profileEditButton,
  addNewPlaceButton,
  userProfileNameForm,
  userProfileAboutForm,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js"
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


const currentUser = new UserInfo();
api.getUserInfo()
.then(res => {
  currentUser.setUserInfo(res.name,res.about);
  const currentUserId = res._id;
  console.log("my id is - " + currentUserId);
});



const profileEdit = new PopupWithForm({
  popupSelector: ".modal_type_edit-profile",
  handleFormSubmit: (formInputs) => {
    api.updateUserInfo({name: formInputs.profileName, about: formInputs.profileAbout})
    .then((res) => {
    currentUser.setUserInfo(res.name,res.about);
    })
    profileEdit.close();
  },
});

profileEdit.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const userValues = currentUser.getUserInfo();
  profileEdit.open();
  userProfileNameForm.value = userValues.name;
  userProfileAboutForm.value = userValues.job;
});



api.getUserInfo()
.then(res => {
  const currentUserId = res._id;
  api.getInitialCards()
    .then((res) => {
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
                    console.log(cardData._id + " was deleted");
                  }
                });
                deleteCardModal.setEventListeners();
                deleteCardModal.open();

              },
              handleLikeClick: (cardData) => {

                // console.log(cardData.isLiked);
                api.changeLikeStatus(cardData._id, cardData.isLiked)
                .then(likesData => {
                  console.log(likesData)
                  card.setLikesNumber(likesData.likes.length, cardData.isLiked);
                  card.like();
                }
                  );

              }
            },
            ".element-template"
          );
          const cardElement = card.getCard(cardData.owner._id, currentUserId, cardData.likes);
          initialElements.addItem(cardElement);
        },
      },
      cardListSelector
    );
    initialElements.renderElements();

    const addNewCard = new PopupWithForm({
      popupSelector: ".modal_type_add-place",
      handleFormSubmit: (formInputs) => {
        api.addNewCard({ name: formInputs.placeTitle, link: formInputs.placeLink })
        .then((res) => {
          const card = new Card(
            {
              data: res,
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
                    console.log(cardData._id + " was deleted");
                  }
                });
                deleteCardModal.setEventListeners();
                deleteCardModal.open();
              },
            },
            ".element-template"
          );
          const cardElement = card.getCard(res.owner._id, currentUserId);
          initialElements.addItem(cardElement);
          addNewCard.close();
        });
      }
    });
    addNewCard.setEventListeners();

    addNewPlaceButton.addEventListener("click", () => {
      addNewCard.open();
    });
  });
});







  //   const card = new Card(
  //     {
  //       data: { name: formInputs.placeTitle, link: formInputs.placeLink },
  //       handleCardClick: (name, link) => {
  //         photoModal.open(name, link);
  //       },
  //     },
  //     ".element-template"
  //   );
  //   const cardElement = card.getCard();
  //   initialElements.addItem(cardElement);
  //   // createCard({name: formInputs.placeTitle, link: formInputs.placeLink});
  //   addNewCard.close();





const photoModal = new PopupWithImage(".modal_type_image");
photoModal.setEventListeners();


// function createCard (cardData) {
//   const card = new Card ({
//       data: cardData,
//       handleCardClick: (name, link) => {
//         photoModal.open(name, link);
//       }
//     }, '.element-template');
//     const cardElement = card.getCard();
//     initialElements.addItem(cardElement);
// }

const editProfileModalValidator = new FormValidator(
  settings,
  profileSubmitForm
);
const newPlaceModalValidator = new FormValidator(
  settings,
  addNewPlaceSubmitForm
);

editProfileModalValidator.enableValidation();
newPlaceModalValidator.enableValidation();


// function isOwner (cardOwnerId, currentUserId) {
//   api.getUserInfo()
//   .then(res => {
//     const currentUserId = res._id;
//     console.log('my id is: '+ currentUserId);
//     return currentUserId;
//   });
//   api.getInitialCards()
//   .then((res) => {
//     res.forEach((cardItem) => {
//       const cardOwnerId = cardItem.owner._id;
//       console.log('userid of this card is ' + cardOwnerId);
//       if (cardOwnerId == currentUserId) {
//         console.log('equal');
//       }
//     });
//   });


// }
