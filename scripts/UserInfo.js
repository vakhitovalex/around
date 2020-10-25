class UserInfo {
  constructor (data) {
    this._name = data.name;
    this._job = data.job;
  }

  getUserInfo() {
    const user = document.querySelector('profile__info').cloneNode(true);
    return user;
  }

  setUserInfo(formData) {
    this._name.textContent = formData.name;
    this._job.textContnet = formData.job;
  }
}

export default UserInfo;
