'use strict';
(function () {
  var MainPinSize = {
    WIDTH: 62,
    HEIGHT: 58,
    HEIGHT_WITH_POINTER: 80,
    WIDTH_HALF: 31,
    HEIGHT_HALF: 29,
  };

  var MapArea = {
    TOP: 130,
    BOTTOM: 630,
    LEFT: -MainPinSize.WIDTH_HALF,
    RIGHT: 1200 - MainPinSize.WIDTH_HALF,
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
    MapArea: MapArea,
    MainPinSize: MainPinSize,
    Pin: Pin,
    offerType: offerType,
    offerTypeToMinPrice: offerTypeToMinPrice,
  };
})();
