'use strict';
(function (offerTypeToMinPrice, PalaceCode, showElement, hideElement, setDefault, removePins, onCardClose, save, disactivate, showSuccess, showError) {
  var adForm = document.querySelector('.ad-form');
  var placeTypeInput = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var roomNumberInput = adForm.querySelector('#room_number');
  var capacityInput = adForm.querySelector('#capacity');
  var cleanFormButton = adForm.querySelector('.ad-form__reset');

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

  var cleanForm = function () {
    var inputList = adForm.querySelectorAll('input');
    var adDescription = adForm.querySelector('textarea');
    var features = adForm.querySelectorAll('.feature__checkbox');

    inputList.forEach(function (input) {
      input.value = '';
    });
    adDescription.value = '';
    features.forEach(function (feature) {
      feature.checked = false;
    });
  };

  var cleanMap = function () {
    removePins();
    onCardClose();
  };

  var onSuccess = function () {
    cleanForm();
    cleanMap();
    disactivate();
    setDefault();
    showSuccess();
  };

  var onError = function () {
    showError(save, new FormData(adForm), onSuccess, onError);
  };

  placeTypeInput.addEventListener('change', onTypeChange);
  timeInSelect.addEventListener('change', onTimeInChange);
  timeOutSelect.addEventListener('change', onTimeOutChange);
  roomNumberInput.addEventListener('change', onRoomChange);
  cleanFormButton.addEventListener('click', cleanForm);
  adForm.addEventListener('submit', function (evt) {
    save(new FormData(adForm), onSuccess, onError);
    evt.preventDefault();
  });

  window.form = {
    initForm: initForm,
  };

})(window.constants.offerTypeToMinPrice,
    window.constants.PalaceCode,
    window.util.showElement,
    window.util.hideElement,
    window.mainPin.setDefault,
    window.advertPin.removePins,
    window.advertCard.onCardClose,
    window.backend.save,
    window.init.disactivate,
    window.notification.showSuccess,
    window.notification.showError);

