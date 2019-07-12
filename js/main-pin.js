'use strict';
(function (makeDragStart) {
  var mainPin = document.querySelector('.map__pin--main');
  var cityMap = document.querySelector('.map');
  var pinList = cityMap.querySelector('.map__pins');
  var address = document.querySelector('#address');

  var MapArea = {
    Y_MIN: 130,
    Y_MAX: 630,
  };

  var MainPin = {
    SIZE: 65,
    TALE: 22,
  };

  var checkInside = function (x, y, object) {
    var coords = object.getBoundingClientRect();
    return (x > coords.left && x < coords.right) || (y > coords.top && y < coords.bottom);
  };

  var getAddress = function (pin) {
    var posX = pin.offsetLeft;
    var posY = pin.offsetTop;
    return Math.round(posX + MainPin.SIZE / 2) + ', ' + Math.round(posY + MainPin.SIZE + MainPin.TALE);
  };

  var onPinDragMove = function (x, y, posX, posY) {
    var newX = mainPin.offsetLeft + x;
    var newY = mainPin.offsetTop + y;

    if (newY > MapArea.Y_MIN && newY < MapArea.Y_MAX && checkInside(posX, posY, pinList)) {
      mainPin.style.top = newY + 'px';
    }

    if (newX > 0 && newX < pinList.clientWidth - MainPin.SIZE && checkInside(posX, posY, pinList)) {
      mainPin.style.left = newX + 'px';
    }
    address.value = getAddress(mainPin);

  };

  var preventDefaultClick = function (evt) {
    evt.preventDefault();
  };

  var onPinDragEnd = function () {
    mainPin.addEventListener('click', preventDefaultClick, {once: true});
  };

  var onPinDragStart = makeDragStart(onPinDragMove, onPinDragEnd);

  mainPin.addEventListener('mousedown', onPinDragStart);


})(window.util.makeDragStart);
