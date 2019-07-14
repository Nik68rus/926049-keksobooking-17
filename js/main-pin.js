'use strict';
(function (makeDragStart, activate, MapArea, MainPinSize) {
  var mainPin = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var notActivePinCoords = {
    x: mainPin.offsetLeft + MainPinSize.WIDTH_HALF,
    y: mainPin.offsetTop + MainPinSize.HEIGHT_HALF,
  };

  var renderMainPin = function (x, y) {
    mainPin.style.left = x + 'px';
    mainPin.style.top = y + 'px';
  };

  var getPinCoords = function (pin) {
    return {
      x: pin.offsetLeft + MainPinSize.WIDTH_HALF,
      y: pin.offsetTop + MainPinSize.HEIGHT_WITH_POINTER,
    };
  };

  var renderAddress = function (coords) {
    address.value = coords.x + ', ' + coords.y;
  };

  renderAddress(notActivePinCoords);

  var onPinStart = function () {
    return {
      x: mainPin.offsetLeft,
      y: mainPin.offsetTop,
    };
  };

  var onPinMove = function (x, y) {
    x = Math.min(Math.max(x, MapArea.LEFT), MapArea.RIGHT);
    y = Math.min(Math.max(y, MapArea.TOP), MapArea.BOTTOM);

    renderMainPin(x, y);
    renderAddress(getPinCoords(mainPin));
  };

  var onPinDragStart = makeDragStart(onPinStart, onPinMove);

  mainPin.addEventListener('mousedown', onPinDragStart);
  mainPin.addEventListener('click', activate, {once: true});


})(window.util.makeDragStart, window.init.activate, window.constants.MapArea, window.constants.MainPinSize);
