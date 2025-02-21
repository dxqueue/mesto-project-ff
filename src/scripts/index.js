import '../pages/index.css';
import {createCard, deleteCard, likeCard} from './card.js';
import {openModal, closeModal} from './modal.js';
import {initialCards} from './cards.js';

const content = document.querySelector('.content');
const placesContainer = content.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupOpenImage = document.querySelector('.popup_type_image');
const popupAddCard = document.querySelector('.popup_type_new-card');

const popupImage = popupOpenImage.querySelector('.popup__image');
const popupCaption = popupOpenImage.querySelector('.popup__caption');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddCardButton = document.querySelector('.profile__add-button');

const profileEditForm = document.forms['edit-profile'];
const nameInput = profileEditForm.querySelector('.popup__input_type_name');
const jobInput = profileEditForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileAddCardForm = document.forms['new-place'];
const cardNameInput = profileAddCardForm.querySelector('.popup__input_type_card-name');
const linkInput = profileAddCardForm.querySelector('.popup__input_type_url');

function openCard(element) {
  popupImage.src = element.link;
  popupImage.alt = `Фотография места: ${element.name}`;
  popupCaption.textContent = element.name;

  openModal(popupOpenImage);
};

function handleNewCardFormSubmit(event){
  event.preventDefault();
  const newCardElement = {
    name: cardNameInput.value,
    link: linkInput.value
  };
  const newCard = createCard(newCardElement, deleteCard, likeCard, openCard);
  placesContainer.prepend(newCard);
  closeModal(popupAddCard);
  profileAddCardForm.reset();
};

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEditProfile);
};

initialCards.forEach(function(cardData) {
  placesContainer.append(createCard(cardData, deleteCard, likeCard, openCard));
});

popups.forEach(function(popup) {
  const closeBtn = popup.querySelector('.popup__close');
  closeBtn.addEventListener('click', function(event) {
    closeModal(popup);
  });
});

profileEditButton.addEventListener('click', function(event) {
  openModal(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

profileAddCardButton.addEventListener('click', function(event) {
  openModal(popupAddCard);
});

profileEditForm.addEventListener('submit', handleProfileFormSubmit);
profileAddCardForm.addEventListener('submit', handleNewCardFormSubmit);



