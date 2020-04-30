class Popup {
  constructor() {
    // Зачем столь сложное объявление всего в цикле, когда у вас 3 параметра всего передается??? || В аргумент конструктора передается кнопка открытия попапа(какого попапаа именно указано в html атрибуте). Таким образом код находит форму за отркытие которой отвечает данная кнопка. Далее просто находим необходимые для добавления обработчкиков элементы формы и автоматически навешиваем их.
    // Не понимаю зачем тут цикл все равно, но раз так приняли, то пусть
    for (let i = 0; i < arguments.length; i++) {
      this.openButton = arguments[i];
      this.formName = this.openButton.getAttribute('formClass');  //У кнопки проверяем добавленный атрибут formClass, со значением класса формы, которую он должен отрыть
      this.form = document.querySelector(`.${this.formName}`); //Находим форму
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

  //export default Popup;