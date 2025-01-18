const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

initialCards.forEach(function(element) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
    cardElement.remove();
  });
  cardElement.querySelector('.card__description');
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__like-button');

  placesList.append(cardElement);
});