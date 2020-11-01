class UserInfo {
  constructor() {
    this._nameValue = document.querySelector('.profile__name');
    this._jobValue = document.querySelector('.profile__about');
  }

  getUserInfo() {
    return { name: this._nameValue.textContent, job: this._jobValue.textContent };
  }

  setUserInfo(name, job) {
    this._nameValue.textContent = name;
    this._jobValue.textContent = job;
  }
}

export default UserInfo;
