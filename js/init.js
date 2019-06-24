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
    similarListElement.appendChild(window.advert.createPin(window.data.adverts));
    return similarListElement.querySelectorAll('.map__pin');
  };

  window.init = {
    activate: activatePage,
    map: cityMap,
    form: adForm,
    similarList: similarListElement,
    mainPin: mainPin
  };

})();
