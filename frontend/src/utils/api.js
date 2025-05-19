class API {
  constructor({ makeRequest, headers }) {
    this._makeRequest = makeRequest;
    this._headers = headers;
  }

  getUser(token) {
    const endpoint = 'users/me';

    const requestOptions = {
      method: "GET",
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${token}`
      },
    }

    return this._makeRequest(endpoint, requestOptions)
  }

  updateProfileInfo(userObject, token) {
    const endpoint = 'users/me';
    
    const requestOptions = {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: userObject.name,
        about: userObject.about,
      })
    }

    return this._makeRequest(endpoint, requestOptions)
  }

  updateProfilePicture(avatar, token) {
    const endpoint = `users/me/avatar`;

    const requestOptions = {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({ avatar }),
    }

    return this._makeRequest(endpoint, requestOptions)
  }

  getCards(token) {
    const endpoint = 'cards';

    const requestOptions = {
      method: "GET",
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${token}`
      }
    }

    return this._makeRequest(endpoint, requestOptions)
  }

  addCard(name, link, token) {
    const endpoint = 'cards';

    const requestOptions = {
      method: "POST",
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }

    return this._makeRequest(endpoint, requestOptions)
  }

  deleteCard(cardId, token) {
    const endpoint = `cards/${cardId}`;

    const requestOptions = {
      method: "DELETE",
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${token}`
      },
    }

    return this._makeRequest(endpoint, requestOptions)
  }

  addCardLike(cardId, token) {
    const endpoint = `cards/${cardId}/likes`;

    const requestOptions = {
      method: "PUT",
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${token}`
      }
    }

    return this._makeRequest(endpoint, requestOptions)
  }

  removeCardLike(cardId, token) {
    const endpoint = `cards/${cardId}/likes`;
    
    const requestOptions = {
      method: "DELETE",
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${token}`
      }
    }

    return this._makeRequest(endpoint, requestOptions)
  }
}

export const api = new API({
  makeRequest: async (endpoint, requestOptions)=> {
    try {
      const res = await fetch(`https://web-project-api-full-u9bq.onrender.com/${endpoint}`, requestOptions);

      if (res.ok) {
        return res.json();
      }

      const errorData = await res.json();
      return Promise.reject(errorData.message || `Erro na requisição. ${res.status}`);

    } catch (error) {
      return Promise.reject(error);
    }
  },
  headers: {
    "Content-Type": "application/json",
  },
});