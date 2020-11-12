class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  // GET https://around.nomoreparties.co/v1/groupId/cards/
  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => console.log(err));
  }
  // GET https://around.nomoreparties.co/v1/groupId/users/me
  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => console.log(err));
  }

  //PATCH https://around.nomoreparties.co/v1/groupId/users/me
  updateUserInfo({name, about}) {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        about
      })
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => console.log(err));
  }


  // POST https://around.nomoreparties.co/v1/groupId/cards
  addNewCard({name, link}) {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name,
        link
      })
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => console.log(err));
  }
  //DELETE DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
  deleteCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId,  {
      headers: this._headers,
      method: "DELETE",
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => console.log(err));
  }
}




export default Api;

// const api = new Api({
//   baseUrl: "https://around.nomoreparties.co/v1/group-6",
//   headers: {
//     authorization: "8335dbe9-1da8-4147-9f68-11c7f6c06af4",
//     "Content-Type": "application/json"
//   }
// });
