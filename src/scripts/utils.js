//Функция, которая показывает загрузку
function showLoading(button) {
  button.textContent = 'Сохранение...';
};
//Функция, которая прячет показ загрузки
function hideLoading(button) {
  button.textContent = 'Сохранить';
};

export {showLoading, hideLoading};