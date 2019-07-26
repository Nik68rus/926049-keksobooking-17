'use strict';
(function (offerTypeToMinPrice) {
  var adForm = document.querySelector('.ad-form');
  var placeTypeInput = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var roomNumberInput = adForm.querySelector('#room_number');
  var capacityInput = adForm.querySelector('#capacity');

  // определяем минимальное значение цены

  var onTypeChange = function (evt) {
    var minPrice = offerTypeToMinPrice[evt.target.value];
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

  // зависимость количества гостей от количества комнат

  var showOption = function (option) {
    option.style.display = 'block';
  };

  var hideOption = function (option) {
    option.style.display = 'none';
  };

  var onRoomChange = function () {
    var roomNumber = roomNumberInput.value;
    for (var i = 0; i < capacityInput.options.length; i++) {
      var capacityValue = capacityInput.options[i];
      if (+capacityValue.value > +roomNumber) {
        hideOption(capacityValue);
      } else {
        showOption(capacityValue);
      }
      capacityInput.value = roomNumber;
      if (+roomNumber === 0) {
        showOption(capacityInput.options[capacityInput.options.length - 1]);
        capacityInput.value = '100';
      }
    }
  };

  placeTypeInput.addEventListener('change', onTypeChange);
  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);
  roomNumberInput.addEventListener('change', onRoomChange);
})(window.constants.offerTypeToMinPrice);

