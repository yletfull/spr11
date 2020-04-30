class UserInfo {
  constructor(data) {
    ({
      api: this.api,
      formEdit: this.formEdit,
      popupOpenClose: this.popupOpenClose,
      nameInp: this.nameInp,
      aboutInp: this.aboutInp,
      name: this.name,
      about: this.about,
      postfix: this.postfix,
      method: this.method,
    } = data);
    this.nameInp.value = this.name.textContent;
    this.aboutInp.value = this.about.textContent;
  }


  setUserInfo(event, button) {
    event.preventDefault();
    const data = { name: this.nameInp.value, about: this.aboutInp.value, postfix: this.postfix, method: this.method };
    this.popupOpenClose.loadingSet(button);
    this.api.editData(data)
      .then((data) => { this.updateUserInfo(data) })
      // Можно лучше
      // data не используется, можно не передавать
      .then((data) => { this.popupOpenClose.loadingEnd({ button, form: this.formEdit }); })
      .catch((err) => console.log(err))
  }

  updateUserInfo(data) {
    this.nameInp.value = data.name;
    this.aboutInp.value = data.about;
    this.name.textContent = data.name;
    this.about.textContent = data.about;
    this.id = data._id;

  }
};

//export default UserInfo;