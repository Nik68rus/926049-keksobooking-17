'use strict';
(function (load, setDisabled, unsetDisabled) {
  var cityMap = document.querySelector('.map');
  var pinList = cityMap.querySelector('.map__pins');
  var housingType = document.querySelector('#housing-type');

  // опишем неактивное состояние окна

  var adForm = document.querySelector('.ad-form');
  var fieldsetList = document.querySelectorAll('.ad-form fieldset');
  var filterForm = document.querySelector('.map__filters');
  var main = document.querySelector('main');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  var tryAgainButton = errorMessage.querySelector('.error__button');
  var filtersContainer = cityMap.querySelector('.map__filters-container');
  var currentCard = cityMap.querySelector('.map__card');

  var successHandler = function (data) {
    pins = data;
    pins.forEach(function (item, i) {
      item.id = i;
    });
  };

  var closeError = function () {
    document.removeEventListener('keydown', onPopupEscPress);
    tryAgainButton.removeEventListener('click', loadData);
    main.removeChild(errorMessage);
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeError);
  };

  var errorHandler = function () {
    main.appendChild(errorMessage);
    document.addEventListener('keydown', onPopupEscPress);
    tryAgainButton.addEventListener('click', loadData);
  };

  var loadData = function () {
    load(successHandler, errorHandler);
  };

  var disactivatePage = function () {
    if (!cityMap.classList.contains('map--faded')) {
      cityMap.classList.add('map--faded');
    }
    if (!adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.remove('ad-form--disabled');
    }
    fieldsetList.forEach(setDisabled);
    setDisabled(adForm);
    setDisabled(filterForm);
  };

  // опишем функцию активации окна

  var activatePage = function () {
    cityMap.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    fieldsetList.forEach(unsetDisabled);
    unsetDisabled(adForm);
    unsetDisabled(filterForm);
    renderPins(pins);
  };

  var onHousingTypeChange = function () {
    var showedPins = pinList.querySelectorAll('.map__pin:not(.map__pin--main)');
    showedPins.forEach(function (item) {
      pinList.removeChild(item);
    });
    if (housingType.value === 'any') {
      renderPins(pins);
    } else {
      renderPins(pins.filter(function (advert) {
        return advert.offer.type === housingType.value;
      }));
    }
  };

  var renderPins = function (data) {
    var fragment = document.createDocumentFragment();
    data
      .slice(0, 5)
      .forEach(function (item, i) {
        var pin = window.advert.renderPin(item, i);
        fragment.appendChild(pin);
        pin.addEventListener('click', onPinClick);
      });
    pinList.appendChild(fragment);
  };

  var onPinClick = function (evt) {
    var element = evt.target;
    if (!element.classList.contains('map__pin')) {
      element = element.parentElement;
    }
    if (element.classList.contains('map__pin') && !element.classList.contains('map__pin--main')) {
      showCard(pins.filter(function (advert) {
        return advert.id === parseInt(element.dataset.index, 10);
      })[0]);
    }
  };

  // отрисовка карточки

  var closeCard = function () {
    cityMap.removeChild(currentCard);
    document.removeEventListener('keydown', onCardEscPress);
    currentCard = null;
  };

  var onCardEscPress = function (evt) {
    window.util.isEscEvent(evt, closeCard);
  };

  var showCard = function (data) {
    var card = window.advert.createCard(data);
    if (currentCard) {
      cityMap.removeChild(currentCard);
    }
    cityMap.insertBefore(card, filtersContainer);
    currentCard = cityMap.querySelector('.map__card');
    var popupClose = currentCard.querySelector('.popup__close');
    popupClose.addEventListener('click', closeCard);
    document.addEventListener('keydown', onCardEscPress);
  };

  var pins = [];
  loadData();
  disactivatePage();

  housingType.addEventListener('change', onHousingTypeChange);

  window.init = {
    activate: activatePage,
    pins: pins,
    successHandler: successHandler,
    errorHandler: errorHandler,
  };

})(window.backend.load, window.util.setDisabled, window.util.unsetDisabled);
