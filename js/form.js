'use strict';
(function (offerTypeToMinPrice) {
  var adForm = document.querySelector('.ad-form');
  var placeTypeInput = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  // определяем минимальное значение цены

  var onTypeChange = function (evt) {
    var minPrice = offerTypeToMinPrice[evt.target.value];
    priceInput.value = '';
    priceInput.min = minPrice;
    priceInput.placeholder = minPrice;
  };

  // синхронизация времени заезда и времени выезда

  var onTimeInChange = function () {
    timeOut.value = timeIn.value;
  };

  var onTimeOutChange = function () {
    timeIn.value = timeOut.value;
  };

  placeTypeInput.addEventListener('change', onTypeChange);
  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);
})(window.constants.offerTypeToMinPrice);

