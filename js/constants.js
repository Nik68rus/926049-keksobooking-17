'use strict';
(function () {
  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 80,
    RADIUS: 32,
  };

  var MapRect = {
    LEFT: -32,
    TOP: 130,
    RIGHT: 1200 - 32,
    BOTTOM: 630,
  };

  var Pin = {
    WIDTH: 50,
    HEIGHT: 70,
    WIDTH_HALF: 25,
  };

  var offerType = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец',
  };

  var offerTypeToMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  window.constants = {
    MapArea: MapRect,
    MainPinSize: MainPinSize,
    Pin: Pin,
    offerType: offerType,
    offerTypeToMinPrice: offerTypeToMinPrice,
  };
})();
