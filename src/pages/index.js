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
  console.log('profile', res);
  // api.updateUserInfo(res.name, res.about)
  // .then(res => console.log(res));
  currentUser.setUserInfo(res.name,res.about);
});


const profileEdit = new PopupWithForm({
  popupSelector: ".modal_type_edit-profile",
  handleFormSubmit: (formInputs) => {
    api.updateUserInfo({name: formInputs.profileName, about: formInputs.profileAbout})
    .then(res => {
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


api.getInitialCards()
.then((res) => {
  console.log(res)
  const initialElements = new Section(
    {
      items: res,
      renderer: (cardData) => {
        const card = new Card(
          {
            data: cardData,
            handleCardClick: (name, link) => {
              photoModal.open(name, link);
            },
            handleDeleteClick: (cardId) => {
              api.deleteCard(cardId);
            }
          },
          ".element-template"
        );
        const cardElement = card.getCard();
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
      .then(res => {
        const card = new Card(
        {
          data: ({ name: formInputs.placeTitle, link: formInputs.placeLink }),
          handleCardClick: (name, link) => {
            photoModal.open(name, link);
          },
        },
        ".element-template"
      );
      const cardElement = card.getCard();
      initialElements.addItem(cardElement);
      // createCard({name: formInputs.placeTitle, link: formInputs.placeLink});
      addNewCard.close();
      });
    }
  });
  addNewCard.setEventListeners();

  addNewPlaceButton.addEventListener("click", () => {
    addNewCard.open();
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
