function openModal(element) {
  element.classList.add('popup_is-opened');
  element.classList.remove('popup_is-animated');
  document.addEventListener('keydown', handleEscClose);
  element.addEventListener('click', handleOverlayClose);
};

function closeModal(element) {
  element.classList.remove('popup_is-opened');
  element.classList.add('popup_is-animated');
  document.removeEventListener('keydown', handleEscClose);
  element.removeEventListener('click', handleOverlayClose);
};

function handleEscClose(event){
  if(event.key === 'Escape'){
    closeModal(document.querySelector('.popup_is-opened'));
  };
};

function handleOverlayClose(event) {
  if(event.target === event.currentTarget) {
    closeModal(event.target);
  };
};

export {openModal, closeModal};