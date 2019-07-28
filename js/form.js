'use strict';
(function (offerTypeToMinPrice, PalaceCode, showElement, hideElement) {
  var adForm = document.querySelector('.ad-form');
  var placeTypeInput = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var roomNumberInput = adForm.querySelector('#room_number');
  var capacityInput = adForm.querySelector('#capacity');

  // определяем минимальное значение цены

  var onTypeChange = function () {
    var minPrice = offerTypeToMinPrice[placeTypeInput.value];
    priceInput.min = minPrice;
    priceInput.placeholder = minPrice;
  };

  // синхронизация времени заезда и времени выезда

  var onTimeInChange = function () {
    timeOutSelect.value = timeInSelect.value;
  };

  var onTimeOutChange = function () {
    timeInSelect.value = timeOutSelect.value;
  };

  // зависимость количества гостей от количества комнат

  var onRoomChange = function () {
    var roomNumber = +roomNumberInput.value;
    for (var i = 0; i < capacityInput.options.length; i++) {
      var capacityOption = capacityInput.options[i];
      if (+capacityOption.value > roomNumber) {
        hideElement(capacityOption);
      } else {
        showElement(capacityOption);
      }
      if (roomNumber === PalaceCode.ROOMS) {
        showElement(capacityInput.options[capacityInput.options.length - 1]);
      }
    }
  };

  var initForm = function () {
    onTypeChange();
    onTimeInChange();
    onRoomChange();
  };

  placeTypeInput.addEventListener('change', onTypeChange);
  timeInSelect.addEventListener('change', onTimeInChange);
  timeOutSelect.addEventListener('change', onTimeOutChange);
  roomNumberInput.addEventListener('change', onRoomChange);

  initForm();

})(window.constants.offerTypeToMinPrice, window.constants.PalaceCode, window.util.showElement, window.util.hideElement);

