function createCard(cardData, deleteCard, likeCard, openCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = `Фотография места: ${cardData.name}`;
  cardTitle.textContent = cardData.name;
  cardDeleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });
  cardLikeButton.addEventListener('click', () => {
    likeCard(cardLikeButton);
  });
  cardImage.addEventListener('click', () => {
    openCard(cardData);
  });

  return cardElement;
};

function likeCard(event) {
  event.classList.toggle('card__like-button_is-active');
};

function deleteCard(card) {
  card.remove();
};

export {createCard, deleteCard, likeCard};