import '../pages/index.css';
import {createCard, handleLikeToggle} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {getUser, getCards, updateUserProfile, updateAvatarProfile, addCards, deleteCards} from './api.js';
import {showLoading, hideLoading} from './utils.js';

const placesList = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupDeleteCard = document.querySelector('.popup_type_delete-card');
const popupOpenImage = document.querySelector('.popup_type_image');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupAvatarUpdate = document.querySelector('.popup_type_update-avatar');
const popupImage = popupOpenImage.querySelector('.popup__image');
const popupCaption = popupOpenImage.querySelector('.popup__caption');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddCardButton = document.querySelector('.profile__add-button');

const confirmDeleteButton = popupDeleteCard.querySelector('.popup__button');
const popupConfirmButton = document.querySelector('.popup__button');

const profileEditForm = document.forms['edit-profile'];
const nameInput = profileEditForm.querySelector('.popup__input_type_name');
const jobInput = profileEditForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const profileAddCardForm = document.forms['new-place'];
const updateAvatarForm = document.forms['update-avatar'];
const avatarInput = updateAvatarForm.querySelector('.popup__input_type_url');

let userId;
// Концигурация валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
//Получаем данные пользователя и карточки с сервера
Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    profileImage.style.backgroundImage = `url(${user.avatar})`;
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    userId = user['_id'];

    cards.forEach((card) => {
      placesList.append(createCard(card, openDeletePopup, openCard, handleLikeToggle, userId));
    });
  })
  .catch((err) => {
    console.log(`Ошибка при загрузке данных: ${err}`);
  });
//Функция открытия карточки
function openCard(element) {
  popupImage.src = element.link;
  popupImage.alt = `Фотография места: ${element.name}`;
  popupCaption.textContent = element.name;

  openModal(popupOpenImage);
}
//Цикл проверки всех попапов
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  popup.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(popup);
  });
});
//Добавление новой карточки
function handleNewCardFormSubmit(event) {
  event.preventDefault();
  showLoading(popupConfirmButton);

  const newCardData = {
    name: profileAddCardForm['place-name'].value,
    link: profileAddCardForm['link'].value,
  };

  addCards(newCardData.name, newCardData.link)
    .then((data) => {
      placesList.prepend(createCard(data, openDeletePopup, openCard, handleLikeToggle, userId));
      closeModal(popupAddCard);
      profileAddCardForm.reset();
      clearValidation(profileAddCardForm, validationConfig);
    })
    .catch((err) => {
      console.log(`Ошибка при добавлении карточки: ${err}`);
    })
    .finally(() => {
      hideLoading(popupConfirmButton);
    });
};
// Изменение описания и имени
function handleProfileFormSubmit(event) {
  event.preventDefault();
  showLoading(popupConfirmButton);

  updateUserProfile(nameInput.value, jobInput.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(popupEditProfile);
    })
    .catch((err) => {
      console.log(`Ошибка при изменени имени и описания: ${err}`);
    })
    .finally(() => {
      hideLoading(popupConfirmButton);
    });
};
// Открытие попапа на удаление карточки
function openDeletePopup(cardId) {
  popupDeleteCard.id = cardId;
  openModal(popupDeleteCard);
};
// Удаление карточки
function handleConfirmDelete(event) {
  event.preventDefault();

  deleteCards(popupDeleteCard.id)
    .then(() => {
      document.querySelector(`[id='${popupDeleteCard.id}']`).remove();
      closeModal(popupDeleteCard);
    })
    .catch((err) => {
      console.log(`Ошибка при удалении карточки: ${err}`);
    });
};
// Изменение аватара
function handleAvatarFormSubmit(event) {
  event.preventDefault();
  showLoading(popupConfirmButton);

  updateAvatarProfile(avatarInput.value)
    .then((data) => {
      profileImage.style.backgroundImage = `url('${data.avatar}')`;
      closeModal(popupAvatarUpdate);
      updateAvatarForm.reset();
      clearValidation(updateAvatarForm, validationConfig)
    })
    .catch((err) => {
      console.log(`Ошибка загрузки аватара: ${err}`);
    })
    .finally(() => {
      hideLoading(popupConfirmButton);
    });
};
// Вызов функции удаления карточки
confirmDeleteButton.addEventListener('click', handleConfirmDelete);
// Вызов функции изменения аватара
profileImage.addEventListener('click', () => {
  openModal(popupAvatarUpdate);
});
updateAvatarForm.addEventListener('submit', handleAvatarFormSubmit);
// Вызов функции изменения имени и описания
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEditProfile);
  clearValidation(profileEditForm, validationConfig);
});
profileEditForm.addEventListener('submit', handleProfileFormSubmit);
// Вызов функции добавления карточки
profileAddCardButton.addEventListener('click', () => {
  openModal(popupAddCard);
});
profileAddCardForm.addEventListener('submit', handleNewCardFormSubmit);
// Проверка валидации формы
enableValidation(validationConfig);



