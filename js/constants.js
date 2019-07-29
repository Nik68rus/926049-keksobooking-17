'use strict';
(function () {
  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 80,
    RADIUS: 32,
    DEFAULT_POSITION: {
      X: 602,
      Y: 407,
    },
  };

  var MapRect = {
    LEFT: -32,
    TOP: 130,
    RIGHT: 1200 - 32,
    BOTTOM: 630,
  };

  var PinSize = {
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

  var PalaceCode = {
    ROOMS: 0,
    CAPACITY: 100,
  };

  var PhotoSize = {
    WIDTH: 45,
    HEIGHT: 40,
  };

  window.constants = {
    MapArea: MapRect,
    MainPinSize: MainPinSize,
    PinSize: PinSize,
    offerType: offerType,
    offerTypeToMinPrice: offerTypeToMinPrice,
    PalaceCode: PalaceCode,
    PhotoSize: PhotoSize,
  };
})();
