const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-34',
    headers: {
        'Content-Type': 'application/json',
        authorization: '238724a7-993c-4ee0-b614-811fc9ac44f1',
    },
};
// Запрос на полчение данных пользователя
const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers,
    })
    .then((res) => {
        if (!res.ok) {
            return Promise.reject(`Ошибка HTTP-запроса: ${res.status}`);
        }
        return res.json();
    });
};
// Запрос на получение карточек
const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers,
    })
    .then((res) => {
        if (!res.ok) {
            return Promise.reject(`Ошибка HTTP-запроса: ${res.status}`);
        }
        return res.json();
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
        if (!res.ok) {
            return Promise.reject(`Ошибка HTTP-запроса: ${res.status}`);
        }
        return res.json();
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
        if (!res.ok) {
            return Promise.reject(`Ошибка HTTP-запроса: ${res.status}`);
        }
        return res.json();
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
        if (!res.ok) {
            return Promise.reject(`Ошибка HTTP-запроса: ${res.status}`);
        }
        return res.json();
    });
};
//Удаление карточки
const deleteCards = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then((res) => {
        if (!res.ok) {
            return Promise.reject(`Ошибка HTTP-запроса: ${res.status}`);
        }
        return res.json();
    });
};
//Добавление лайка карточке
const likeCards = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then((res) => {
        if (!res.ok) {
            return Promise.reject(`Ошибка HTTP-запроса: ${res.status}`);
        }
        return res.json();
    });
};
//Снятие лайка с карточки
const dislikeCards = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then((res) => {
        if (!res.ok) {
            return Promise.reject(`Ошибка HTTP-запроса: ${res.status}`);
        }
        return res.json();
    });
};

export {getUser, getCards, updateUserProfile, updateAvatarProfile, addCards, deleteCards, likeCards, dislikeCards};