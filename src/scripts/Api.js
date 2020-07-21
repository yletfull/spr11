export default class Api {
  constructor(options) {
    ({ origin: this.origin, path: this.path, token: this.token } = options);
    this.baseUrl = `${this.origin}/${this.path}`;

    this.getBaseUrl = () => {
      return this.baseUrl;
    }
  }

  parseResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => this.parseResponce(res))
      .catch(err => {
        throw err;
      });
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.token,
      }
    })
      .then(res => this.parseResponce(res))
      .catch(err => {
        throw err;
      });
  }

  editData(arg) {
    return fetch(`${this.baseUrl}/${arg.postfix}`, {
      method: arg.method,
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(arg)
    })
      .then(res => this.parseResponce(res))
      .catch(err => {
        throw err;
      });
  }

  deleteCard(arg) {
    return fetch(`${this.baseUrl}/cards/${arg.id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
      }
    })
      .then(res => this.parseResponce(res))
      .catch(err => {
        throw err;
      });
  }

  likeAddRemove(arg) {
    return fetch(`${this.baseUrl}/cards/like/${arg.id}`, {
      method: arg.method,
      headers: {
        authorization: this.token
      }
    })
      .then(res => this.parseResponce(res))
      .catch(err => {
        throw err;
      });
  }
};

