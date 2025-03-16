import {likeCards, dislikeCards} from './api.js';
// Функция создания карточки
function createCard(cardData, openDeletePopup, openCard, likeCard, userId) {
   
 const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = `Фотография места: ${cardData.name}`;
  cardTitle.textContent = cardData.name;
  cardElement.id = cardData['_id'];

  cardImage.addEventListener('click', () => {
    openCard(cardData);
  });

  if (cardData.likes.some((like) => like['_id'] === userId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }  
  cardLikeCounter.textContent = cardData.likes.length;
  cardLikeButton.addEventListener('click', () => {
    likeCard(cardElement.id, cardLikeButton, cardLikeCounter);
  });
  
  if (cardData.owner['_id'] === userId) {
    cardDeleteButton.addEventListener('click', () => {
      openDeletePopup(cardElement.id);
    });
  } else {
    cardDeleteButton.style.display = 'none';
  };

  return cardElement;
};
// Функция переключения лайка
function handleLikeToggle(cardId, likeButton, likeCounter) {
  const likeProm = likeButton.classList.contains('card__like-button_is-active') ? dislikeCards : likeCards;

  likeProm(cardId)
    .then((data) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCounter.textContent = data.likes.length;
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении лайка: ${err}`);
    });
};

export {createCard, handleLikeToggle};