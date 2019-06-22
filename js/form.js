'use strict';

(function () {
  var fieldsetList = document.querySelectorAll('.ad-form fieldset');
  var adForm = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var cityMap = document.querySelector('.map');
  var MAIN_PIN_SIZE = 65;
  var MAIN_PIN_TALE = 22;
  var mainPin = document.querySelector('.map__pin--main');

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


  // mainPin.addEventListener('click', activatePage);

  // реализуем заполнение поля с адресом

  var getAddress = function (pin) {
    var posX = pin.offsetLeft;
    var posY = pin.offsetTop;
    return Math.round(posX + MAIN_PIN_SIZE / 2) + ', ' + Math.round(posY + MAIN_PIN_SIZE + MAIN_PIN_TALE);
  };

  var address = adForm.querySelector('#address');
  address.value = getAddress(mainPin);

  // mainPin.addEventListener('mouseup', getAddress);

  // определяем минимальное значение цены
  var placeType = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');

  var setMinPrice = function () {
    if (placeType.value === 'bungalo') {
      price.min = 0;
      price.placeholder = '0';
    }

    if (placeType.value === 'flat') {
      price.min = 1000;
      price.placeholder = '1000';
    }

    if (placeType.value === 'house') {
      price.min = 5000;
      price.placeholder = '5000';
    }

    if (placeType.value === 'palace') {
      price.min = 10000;
      price.placeholder = '10000';
    }
  };

  placeType.addEventListener('change', setMinPrice);

  // синхронизация времени заезда и времени выезда

  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  var synchronizeTimeOut = function () {
    timeOut.value = timeIn.value;
  };

  var synchronizeTimeIn = function () {
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener('change', synchronizeTimeOut);
  timeOut.addEventListener('change', synchronizeTimeIn);

  window.form = {
    adForm: adForm,
    fieldsetList: fieldsetList,
    filterForm: filterForm,
    address: address
  };
})();
