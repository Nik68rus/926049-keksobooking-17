'use strict';
(function () {
  var cityMap = document.querySelector('.map');
  var similarListElement = cityMap.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');


  // опишем неактивное состояние окна

  var adForm = document.querySelector('.ad-form');
  var fieldsetList = document.querySelectorAll('.ad-form fieldset');
  var filterForm = document.querySelector('.map__filters');

  var disactivatePage = function () {
    if (!cityMap.classList.contains('map--faded')) {
      cityMap.classList.add('map--faded');
    }
    if (!adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.remove('ad-form--disabled');
    }
    for (var i = 0; i < fieldsetList.length; i++) {
      fieldsetList[i].disabled = true;
    }
    adForm.disabled = true;
    filterForm.disabled = true;
  };

  disactivatePage();

  // опишем функцию активации окна

  var activatePage = function () {
    cityMap.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < fieldsetList.length; i++) {
      fieldsetList[i].disabled = false;
    }
    adForm.disabled = false;
    filterForm.disabled = false;
    window.backend.load(successHandler, errorHandler);
    return similarListElement.querySelectorAll('.map__pin');
  };

  var pins = [];

  var successHandler = function (adverts) {
    var fragment = window.advert.createPin(adverts);
    similarListElement.appendChild(fragment);
    pins = similarListElement.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        pins[i].addEventListener('click', window.map.onPinClick);
      }
    }
  };

  var errorHandler = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    document.body.appendChild(errorTemplate);
    var tryAgainButton = errorTemplate.querySelector('.error__button');
    tryAgainButton.addEventListener('click', function (){
      window.backend.load(successHandler, errorHandler);
    });

    var closeError = function () {
      document.body.removeChild(errorTemplate);
      document.removeEventListener('keydown', onPopupEscPress);
    };

    var onPopupEscPress = function (evt) {
      window.util.isEscEvent(evt, closeError);
    };

    document.addEventListener('keydown', onPopupEscPress);
  };



  window.init = {
    activate: activatePage,
    map: cityMap,
    form: adForm,
    similarList: similarListElement,
    mainPin: mainPin,
    pins: pins,
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
