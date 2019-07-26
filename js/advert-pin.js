'use strict';
(function (Pin) {
  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var cityMap = document.querySelector('.map');
  var pinList = cityMap.querySelector('.map__pins');


  var renderPin = function (item) {
    var pin = mapPin.cloneNode(true);
    var pinAvatar = pin.querySelector('img');
    pin.style.left = item.location.x - Pin.WIDTH_HALF + 'px';
    pin.style.top = item.location.y - Pin.HEIGHT + 'px';
    pin.dataset.index = item.id;
    pinAvatar.src = item.author.avatar;
    pinAvatar.alt = item.offer.title;
    return pin;
  };

  var removeActivePin = function () {
    var activePin = pinList.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  window.advertPin = {
    renderPin: renderPin,
    removeActivePin: removeActivePin,
  };
})(window.constants.Pin);
