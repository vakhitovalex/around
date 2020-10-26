class UserInfo {
  constructor (name, job) {
    this.name = document.querySelector(name).textContent;
    this.job = document.querySelector(job).textContent;
  }

  getUserInfo() {
    userInfo = {name: this.name, job: this.job};
    return userInfo;
  }

  setUserInfo(formData) {
    this.name = formData.name.value;
    this.job = formData.job.value;
  }
}

export default UserInfo;
