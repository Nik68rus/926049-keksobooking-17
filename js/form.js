'use strict';
(function () {
  // определяем минимальное значение цены
  var placeType = window.init.form.querySelector('#type');
  var price = window.init.form.querySelector('#price');

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

  var timeIn = window.init.form.querySelector('#timein');
  var timeOut = window.init.form.querySelector('#timeout');

  var synchronizeTimeOut = function () {
    timeOut.value = timeIn.value;
  };

  var synchronizeTimeIn = function () {
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener('change', synchronizeTimeOut);
  timeOut.addEventListener('change', synchronizeTimeIn);
})();

