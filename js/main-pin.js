'use strict';
(function (makeDragStart, makeDragOnce, activate, MapArea, MainPinSize) {
  var mainPin = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');

  var renderMainPin = function (x, y) {
    mainPin.style.left = x + 'px';
    mainPin.style.top = y + 'px';
  };

  var getMainPinCoords = function (point) {
    return {
      x: mainPin.offsetLeft + MainPinSize.RADIUS,
      y: mainPin.offsetTop + point,
    };
  };

  var renderAddress = function (coords) {
    address.value = coords.x + ', ' + coords.y;
  };

  renderAddress(getMainPinCoords(MainPinSize.RADIUS));

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
    renderAddress(getMainPinCoords(MainPinSize.HEIGHT));
  };

  var onPinDragStart = makeDragStart(onPinStart, onPinMove);

  var onPinChange = function () {
    activate();
  };

  var onPinDragOnce = makeDragOnce(onPinChange);

  mainPin.addEventListener('mousedown', onPinDragOnce, {once: true});
  mainPin.addEventListener('mousedown', onPinDragStart);

})(window.util.makeDragStart, window.util.makeDragOnce, window.init.activate, window.constants.MapArea, window.constants.MainPinSize);
