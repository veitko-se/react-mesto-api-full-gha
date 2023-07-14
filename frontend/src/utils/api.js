/** Класс для работы с API сервера */
class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  /** приватный метод - получение токена */
  _getToken() {
    return localStorage.getItem('token');
  }

  /** приватный метод - проверка ответа сервера */
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  /** приватный метод - универсальный запрос с проверкой ответа */
  _request(endpoint, options) {
    return fetch(this._baseUrl + endpoint, options)
      .then(this._checkResponse)
  }

  /** загрузить данные о пользователе с сервера */
  loadUserInfo() {
    const token = this._getToken();
    return this._request(`/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  /** обновить информацию о пользователе */
  updateUserInfo({name, about}) {
    const token = this._getToken();
    return this._request(`/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name, about
      })
    })
  }

  /** обновить аватар */
  updateUserAvatar({avatar}) {
    const token = this._getToken();
    return this._request(`/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar
      })
    })
  }

  /** загрузить карточки с сервера */
  loadInitialCards() {
    const token = this._getToken();
    return this._request(`/cards`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  /** отправить карточку на сервер */
  pushCard({ name, link }) {
    const token = this._getToken();
    return this._request(`/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name, link
      })
    })
  }

  /** удалить карточку на сервере */
  deleteCard(cardId) {
    const token = this._getToken();
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  }

  /** поставить/удалить лайк на сервере */
  changeLikeCardStatus(cardId, isLike) {
    const token = this._getToken();
    const currMethod = (isLike ? 'PUT' : 'DELETE');
    return this._request(`/cards/${cardId}/likes`, {
      method: currMethod,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  }
}

/** экземляр класса Api*/
const api = new Api('https://api.veitko-se.students.nomoredomains.xyz');

export default api;
