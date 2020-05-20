class Popup {
  constructor() {
    for (let i = 0; i < arguments.length; i++) {
      this.openButton = arguments[i];
      this.formName = this.openButton.getAttribute('formClass');  
      this.form = document.querySelector(`.${this.formName}`); 
      this.formSetButton = this.form.querySelector('.popup__button');
      this.closeButton = this.form.querySelector('.popup__close');
      this.inputs = this.form.querySelectorAll('.popup__input');
      this.setPopupInputsListener(this.inputs, this.form);
      this.setPopupButtonListener(this.formSetButton, this.form);
      this.closeButton.addEventListener('click', this.close.bind(null, this.form));
      this.openButton.addEventListener('click', this.open.bind(null, this.form));
    }
  }

  open(form) {
    form.classList.toggle('popup_is-opened');
  }

  close(form) {
    form.classList.toggle('popup_is-opened');
  }

  loadingSet(button) {
    this.earlyText = button.textContent;
    button.textContent = 'Загрузка...';
  }
  loadingEnd(data) {
    data.button.textContent = this.earlyText;
    this.close(data.form);
  }
};

