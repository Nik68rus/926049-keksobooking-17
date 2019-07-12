'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');


  // определяем минимальное значение цены
  var placeTypeInput = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');

  var offerTypeToMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  var onTypeChange = function (evt) {
    var minPrice = offerTypeToMinPrice[evt.target.value];
    priceInput.value = '';
    priceInput.min = minPrice;
    priceInput.placeholder = minPrice;
  };

  placeTypeInput.addEventListener('change', onTypeChange);

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
})();

