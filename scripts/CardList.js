
class CardList {

  constructor(data) {
    ({api:this.api, postfix:this.postfix, cardContainer: this.cardContainer, createCard: this.createCard}=data);
    // Реализации метода в классе быть не должно!!! 
    // Надо исправить +
    // Нельзя связывать получение карт с загрузкой данных юзера, это 2 разных процесса, не надо их смешивать
    this.addCard = this.addCard.bind(this);
  }

  render(data) {
    this.userId = data.user._id;
    this.cardArray = data.cards;
    this.cardArray.forEach(function (value) {
      value.userId = data.user._id;
        const card = this.createCard(value);
        this.cardContainer.appendChild(card);
    }, this);

  }

  addCard(data) {
    const id = this.userId;
    this.name = data.name;
    this.link = data.link;
    this.value = { name: this.name, link: this.link, postfix: this.postfix, method: "POST" };
   return this.api.editData(this.value)
      .then((value) => {
        let card = this.createCard(value);
        card = this.cardContainer.appendChild(card);
        return card;
      })
  }
};
