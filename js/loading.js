'use strict';
(function (load, renderPins, initFilters) {

  var main = document.querySelector('main');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var tryAgainButton = errorMessageTemplate.querySelector('.error__button');

  var successHandler = function (data) {
    data.forEach(function (item, i) {
      item.id = i;
    });
    renderPins(data);
    initFilters(data);
  };

  var errorHandler = function () {
    main.appendChild(errorMessageTemplate);
    document.addEventListener('keydown', onPopupEscPress);
    tryAgainButton.addEventListener('click', loadData);
  };

  var closeError = function () {
    document.removeEventListener('keydown', onPopupEscPress);
    tryAgainButton.removeEventListener('click', loadData);
    main.removeChild(errorMessageTemplate);
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeError);
  };

  var loadData = function () {
    load(successHandler, errorHandler);
  };

  window.loading = {
    loadData: loadData,
  };

})(window.backend.load, window.advertPin.renderPins, window.filters.initFilters);
