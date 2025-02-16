import '../pages/index.css';
import {initialCards} from './cards.js';

const content = document.querySelector('.content');
const placesContainer = content.querySelector('.places__list');

function createCard(cardData, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

  return cardElement;
};

function deleteCard(evt) {
  const card = evt.target.closest('.places__item');

  card.remove();
};

initialCards.forEach(function(cardData) {
  placesContainer.append(createCard(cardData, deleteCard));
});
