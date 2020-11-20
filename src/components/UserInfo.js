class UserInfo {
  constructor() {
    this._nameValue = document.querySelector('.profile__name');
    this._jobValue = document.querySelector('.profile__about');
    this._profilePicture = document.querySelector('.profile__picture');
  }

  getUserInfo() {
    return { name: this._nameValue.textContent, job: this._jobValue.textContent };
  }

  setUserInfo(name, job, avatar) {
    this._nameValue.textContent = name;
    this._jobValue.textContent = job;
    this._profilePicture.src = avatar;
  }

  getUserPicture () {
    return { avatar : this._profilePicture };
  }

  setProfilePicture (avatar) {
    this._profilePicture.src = avatar;
  }

}

export default UserInfo;
