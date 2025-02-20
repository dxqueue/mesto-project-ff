function createCard(cardData, deleteCard, likeCard, openCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  likeButton.addEventListener('click', function(event) {
    likeCard(likeButton);
  });
  cardElement.querySelector('.card__image').addEventListener('click', function(){
    openCard(cardData);
  });

  return cardElement;
};

function likeCard(event) {
  event.classList.toggle('card__like-button_is-active');
};


function deleteCard(event) {
  const card = event.target.closest('.places__item');

  card.remove();
};

export {createCard, deleteCard, likeCard};