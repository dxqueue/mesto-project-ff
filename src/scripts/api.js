const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-34',
  headers: {
    'Content-Type': 'application/json',
    authorization: '238724a7-993c-4ee0-b614-811fc9ac44f1',
  },
};

function validateResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка HTTP-запроса: ${res.status}`);
  }
  return res.json();
};

// Запрос на полчение данных пользователя
const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
  })
  .then((res) => {
    return validateResponse(res);
  });
};
// Запрос на получение карточек
const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers,
  })
  .then((res) => {
    return validateResponse(res);
  });
};
// Изменение описания профиля
const updateUserProfile = (userName, userJob) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userJob,
    }),
  })
  .then((res) => {
    return validateResponse(res);
  });
};
// Изменение аватара профиля
const updateAvatarProfile = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
  .then((res) => {
    return validateResponse(res);
  });
};
//Добавление карточки
const addCards = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
  }),
  })
  .then((res) => {
    return validateResponse(res);
  });
};
//Удаление карточки
const deleteCards = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then((res) => {
    return validateResponse(res);
  });
};
//Добавление лайка карточке
const likeCards = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then((res) => {
    return validateResponse(res);
  });
};
//Снятие лайка с карточки
const dislikeCards = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then((res) => {
    return validateResponse(res);
  });
};

export {getUser, getCards, updateUserProfile, updateAvatarProfile, addCards, deleteCards, likeCards, dislikeCards};