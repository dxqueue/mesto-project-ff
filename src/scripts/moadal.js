function openModal(element) {
  element.classList.add('popup_is-opened');
  element.classList.remove('popup_is-animated');
  document.addEventListener('keydown', function(event) {
    if(event.key === 'Escape') {
      element.classList.remove('popup_is-opened');
      element.classList.add('popup_is-animated');
    };
  });
  element.addEventListener('click', function(event) {
    if(event.target === event.currentTarget) {
      element.classList.remove('popup_is-opened');
      element.classList.add('popup_is-animated');
    };
  });
  element.querySelector('.popup__close').addEventListener('click', function(){
    element.classList.remove('popup_is-opened');
    element.classList.add('popup_is-animated');
  });
};

function closeModal(element) {
  element.classList.remove('popup_is-opened');
  element.classList.add('popup_is-animated');
  document.removeEventListener('keydown', function(event) {
    if(event.key === 'Escape') {
      element.classList.remove('popup_is-opened');
      element.classList.add('popup_is-animated');
    };
  });
  element.removeEventListener('click', function(event) {
    if(event.target === event.currentTarget) {
      element.classList.remove('popup_is-opened');
      element.classList.add('popup_is-animated');
    };
  });
  element.querySelector('.popup__close').removeEventListener('click', function(){
    element.classList.remove('popup_is-opened');
    element.classList.add('popup_is-animated');
  });
};

export {openModal, closeModal};