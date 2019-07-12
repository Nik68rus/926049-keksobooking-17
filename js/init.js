'use strict';
(function (load) {
  var cityMap = document.querySelector('.map');
  var pinList = cityMap.querySelector('.map__pins');
  var isPageActive = false;
  var pins = [];

  // опишем неактивное состояние окна

  var adForm = document.querySelector('.ad-form');
  var fieldsetList = document.querySelectorAll('.ad-form fieldset');
  var filterForm = document.querySelector('.map__filters');

  var successHandler = function (data) {
    pins = data;
  };

  var errorHandler = function () {
    var errorMessage = document.querySelector('#error').content.querySelector('.error');
    var tryAgainButton = errorMessage.querySelector('.error__button');

    document.body.appendChild(errorMessage);
    tryAgainButton.addEventListener('click', window.backend.load(successHandler, errorHandler));

    var closeError = function () {
      document.body.removeChild(errorMessage);
      document.removeEventListener('keydown', onPopupEscPress);
      tryAgainButton.removeEventListener('click', window.backend.load(successHandler, errorHandler));
    };

    var onPopupEscPress = function (evt) {
      window.util.isEscEvent(evt, closeError);
    };

    document.addEventListener('keydown', onPopupEscPress);
  };

  load(successHandler, errorHandler);

  var disactivatePage = function () {
    if (!cityMap.classList.contains('map--faded')) {
      cityMap.classList.add('map--faded');
    }
    if (!adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.remove('ad-form--disabled');
    }
    fieldsetList.forEach(function (item) {
      item.disabled = true;
    });
    adForm.disabled = true;
    filterForm.disabled = true;
    isPageActive = false;
  };

  disactivatePage();

  // опишем функцию активации окна

  var activatePage = function () {
    cityMap.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    fieldsetList.forEach(function (item) {
      item.disabled = false;
    });
    adForm.disabled = false;
    filterForm.disabled = false;
    isPageActive = true;
    renderPins(pins);
  };

  var renderPins = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (item, i) {
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
      showCard(pins[parseInt(element.dataset.index, 10)]);
    }
  };

  // отрисовка карточки

  var showCard = function (data) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var card = window.advert.createCard(data, cardTemplate);
    var currentCard = cityMap.querySelector('.map__card');
    if (currentCard) {
      cityMap.removeChild(currentCard);
    }
    cityMap.insertBefore(card, cityMap.querySelector('.map__filters-container'));
    currentCard = cityMap.querySelector('.map__card');
    var popupClose = currentCard.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      closePopup();
    });

    var closePopup = function () {
      cityMap.removeChild(currentCard);
      document.removeEventListener('keydown', onPopupEscPress);
    };

    var onPopupEscPress = function (evt) {
      window.util.isEscEvent(evt, closePopup);
    };

    document.addEventListener('keydown', onPopupEscPress);
  };

  window.init = {
    activate: activatePage,
    pins: pins,
    successHandler: successHandler,
    errorHandler: errorHandler,
    isPageActive: isPageActive,
  };
})(window.backend.load);
