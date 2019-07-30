'use strict';
(function (renderPins, PriceLimit) {
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingPriceSelect = document.querySelector('#housing-price');
  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var housingGuestsSelect = document.querySelector('#housing-guests');
  var featureWifiCheckbox = document.querySelector('#filter-wifi');
  var featureDishwasherCheckbox = document.querySelector('#filter-dishwasher');
  var featureParkingCheckbox = document.querySelector('#filter-parking');
  var featureWasherCheckbox = document.querySelector('#filter-washer');
  var featureElevatorCheckbox = document.querySelector('#filter-elevator');
  var featureConditionerCheckbox = document.querySelector('#filter-conditioner');
  var adverts = [];

  var initFilters = function (data) {
    adverts = data;
  };

  var filterHousingType = function (data) {
    if (housingTypeSelect.value === 'any') {
      return data;
    } else {
      return data.filter(function (it) {
        return it.offer.type === housingTypeSelect.value;
      });
    }
  };

  var filterHousingRooms = function (data) {
    if (housingRoomsSelect.value === 'any') {
      return data;
    } else {
      return data.filter(function (it) {
        return it.offer.rooms === +housingRoomsSelect.value;
      });
    }
  };

  var filterHousingGuests = function (data) {
    if (housingGuestsSelect.value === 'any') {
      return data;
    } else {
      return data.filter(function (it) {
        return it.offer.guests === +housingGuestsSelect.value;
      });
    }
  };

  var categorizePrice = function (price) {
    if (price < PriceLimit.MIDDLE_MIN) {
      return 'low';
    } else {
      if (price <= PriceLimit.MIDDLE_MAX) {
        return 'middle';
      } else {
        return 'high';
      }
    }
  };

  var filterHousingPrice = function (data) {
    if (housingPriceSelect.value === 'any') {
      return data;
    } else {
      return data.filter(function (it) {
        return categorizePrice(it.offer.price) === housingPriceSelect.value;
      });
    }
  };

  var onFilterChange = function () {
    window.advertPin.removePins();
    window.advertCard.closeCard();
    renderPins(filterHousingType(filterHousingRooms(filterHousingGuests(filterHousingPrice(adverts)))));
  };

  window.filters = {
    initFilters: initFilters,
  };

  housingTypeSelect.addEventListener('change', onFilterChange);
  housingPriceSelect.addEventListener('change', onFilterChange);
  housingRoomsSelect.addEventListener('change', onFilterChange);
  housingGuestsSelect.addEventListener('change', onFilterChange);

})(window.advertPin.renderPins, window.constants.PriceLimit);
