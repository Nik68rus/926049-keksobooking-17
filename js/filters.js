'use strict';
(function (renderPins) {
  var pinContainer = document.querySelector('.map__pins');
  var housingType = document.querySelector('#housing-type');
  var adverts = [];

  var initFilters = function (data) {
    adverts = data;
    housingType.addEventListener('change', onHousingTypeChange);
  };

  var onHousingTypeChange = function () {
    var showedPins = pinContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
    showedPins.forEach(function (item) {
      pinContainer.removeChild(item);
    });
    if (housingType.value === 'any') {
      renderPins(adverts);
    } else {
      renderPins(adverts.filter(function (advert) {
        return advert.offer.type === housingType.value;
      }));
    }
  };

  window.filters = {
    initFilters: initFilters,
    onHousingTypeChange: onHousingTypeChange,
  };

})(window.advertPin.renderPins);
