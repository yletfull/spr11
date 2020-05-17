import Api from "../scripts/Api.js"
import Avatar from "../scripts/Avatar.js"
import Card from "../scripts/Card.js"
import CardList from "../scripts/CardList.js"
import CardPopup from "../scripts/CardPopup.js"
import FormValidator from "../scripts/FormValidator.js"
import Popup from "../scripts/Popup.js"
import Token from "../scripts/Token.js"
import UserInfo from "../scripts/UserInfo.js"


  const rootSection = document.querySelector('.places-list')
  const zoomSection = document.querySelector('.zoom-section');
  const cardContainer = document.querySelector('.places-list');
  const loading = document.querySelector("#fountainG");

  let credentials = {
    origin: 'https://praktikum.tk',
    path: 'cohort9',
    token : '8efc6ee1-5d62-4d80-bf95-67649358dfce'
  };
  const api = new Api(credentials);

  const formValidator = new FormValidator();

  const setPopupButtonListener = function (button, form) {
    if (form.classList.contains('popup_add')) { button.addEventListener('click', function (event) { popupCard.addCard(event, this) }) };
    if (form.classList.contains('popup_edit')) { button.addEventListener('click', function (event) { userInfo.setUserInfo(event, this) }) };
    if (form.classList.contains('popup_avatar')) { button.addEventListener('click', function (event) { avatar.setAvatar(event, this) }) };
  }
  const setPopupInputsListener = function (inputs, form) {
    this.inputs = Array.from(inputs);
    for (let input of this.inputs) {
      if (form.classList.contains('popup_add')) {
        input.addEventListener('input', function (event) { formValidator.setListeners(event, form) })
      };
      if (form.classList.contains('popup_edit')) {
        input.addEventListener('input', function (event) { formValidator.setListeners(event, form) })
      };
      if (form.classList.contains('popup_avatar')) {
        input.addEventListener('input', function (event) { formValidator.setListeners(event, form) })
      };
      if (form.classList.contains('popup_token')) {
        input.addEventListener('input', function (event) { formValidator.setListeners(event, form) })
      };
    }
  }

  Popup.prototype.setPopupButtonListener = setPopupButtonListener;
  Popup.prototype.setPopupInputsListener = setPopupInputsListener;
  const popupOpenClose =
    new Popup(
      document.querySelector('.user-info__button_add'),
      document.querySelector('.user-info__button_edit'),
      document.querySelector('.user-info__photo'),
      document.querySelector('.user-info__token'),
    );

  const userInfo = new UserInfo({
    postfix: 'users/me',
    method: 'PATCH',
    api,
    popupOpenClose,
    formEdit: document.querySelector('.popup_edit'),
    nameInp: document.querySelectorAll('.popup__input_type_name')[1],
    aboutInp: document.querySelector('.popup__input_type_about'),
    name: document.querySelector('.user-info__name'),
    about: document.querySelector('.user-info__job'),
    buttonSetInfo: document.getElementById('formEditButton'),
  });

  const removeCard = (...args) => api.editData(...args);
  const createCard = (cardInf) => new Card({
    api,
    userInfoData: api.getUserInfo.bind(api),
    rootSection,
    // removeCard используется до своего определения
    // Надо исправить
    removeCard,
    callback: createCard,
    postfix: 'cards',
    deleteCard: api.deleteCard.bind(api),
  })
    .createCard(cardInf);


  const cardList = new CardList({
    api,
    createCard,
    cardContainer,
    postfix: 'cards',
  });

  CardPopup.prototype.popupOpenClose = popupOpenClose;
  // CONST!!!!! +
  const popupCard = new CardPopup({
    cardList,
    popupOpenClose,
    form: document.querySelector('.popup__form'),
    popup: document.querySelector('.popup_add'),
  });

  // CONST!!!!!!!!!!!!!!!!!!!!!! +
  const avatar = new Avatar({
    api,
    popupOpenClose,
    postfix: 'users/me/avatar',
    method: 'PATCH',
    photo: document.querySelector('.user-info__photo'),
    formAvatar: document.querySelector('.popup_avatar'),
    linkPhoto: document.querySelector('.popup__input_avatar'),
  })

  const openImagePopup = function (data) {
    const zoomSection = document.querySelector('.zoom-section');
    const zoomImg = document.querySelector('.zoom-section__image');
    zoomSection.classList.remove('zoom-section__close');
    zoomImg.setAttribute('src', data.link); zoomImg.setAttribute('alt', data.name);
  };
  Card.prototype.openImagePopup = openImagePopup;

  const closeImagePopup = function () {
    const zoomSection = document.querySelector('.zoom-section');
    zoomSection.classList.add('zoom-section__close');
  };




  const serverData = () => {
    const pr1 = api.getUserInfo()
      .then((userInfo) => { return userInfo })
      .catch((err) => console.log(err));

    const pr2 = api.getCards()
      .then((cards) => { return cards })
      .catch((err) => console.log(err));

    Promise.all([pr1, pr2]).then((data) => {
      this.value = { cards: {}, userInfo: {} }
      // Можно лучше -- используйте деструктуризацию массива
      // по индексам не стоит обращаться
      this.value.cards = data[1];
      this.value.userInfo = data[0];

      loading.style = "display:none";
      userInfo.updateUserInfo(this.value.userInfo);
      avatar.updateAvatar(this.value.userInfo);
      cardList.render({ cards: this.value.cards, user: this.value.userInfo })
    })
      .catch((err) => console.log(err));
  }

  // serverData();
  document.querySelector('#formTokenButton').addEventListener('click', function(event){
  event.preventDefault();  
  new Token({
    serverData: serverData, 
    enterToken: document.querySelector('.popup__input_token').value,
    serverData : serverData,
    popupOpenClose,
    popup :   document.querySelector('.popup_token'),
    popupError : document.querySelector('.popup__error_type_token'),
    credentials,
  }).check();//g
    
});
  zoomSection.querySelector('.zoom-section__close-button').addEventListener('click', closeImagePopup);





