'use strict';

(function () {
  var MAIN_PIN_SIZE = 65;
  var MAIN_PIN_TALE = 22;
  var MIN_Y = 130;
  var MAX_Y = 630;

  var cityMap = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var similarListElement = cityMap.querySelector('.map__pins');

  var similarAdTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderAd = function (ad) {
    var adElement = similarAdTemplate.cloneNode(true);
    adElement.style = 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px;';
    adElement.querySelector('img').src = ad.author.avatar;
    adElement.querySelector('img').alt = 'Сдаю ' + ad.offer.type;
    return adElement;
  };

  var pinAds = function (adList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adList.length; i++) {
      fragment.appendChild(renderAd(adList[i]));
    }
    return fragment;
  };

  var getAddress = function (pin) {
    var posX = pin.offsetLeft;
    var posY = pin.offsetTop;
    return Math.round(posX + MAIN_PIN_SIZE / 2) + ', ' + Math.round(posY + MAIN_PIN_SIZE + MAIN_PIN_TALE);
  };

  // опишем функцию активации окна

  var activatePage = function () {
    cityMap.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < window.form.fieldsetList.length; i++) {
      window.form.fieldsetList[i].disabled = false;
    }
    window.form.adForm.disabled = false;
    window.form.filterForm.disabled = false;
    similarListElement.appendChild(pinAds(window.data.ads));
  };


  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    activatePage();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var insidePosition = {
      toTop: evt.offsetY,
      toLeft: evt.offsetX,
      toRight: MAIN_PIN_SIZE - evt.offsetX,
      toBottom: MAIN_PIN_SIZE + MAIN_PIN_TALE - evt.offsetY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };

      if (moveEvt.clientY - insidePosition.toTop > MIN_Y && moveEvt.clientY + insidePosition.toBottom < MAX_Y) {
        startCoords.y = moveEvt.clientY;
        mainPin.style.top = (mainPin.offsetTop + shift.y) + 'px';
      }
      var coord = similarListElement.getBoundingClientRect();
      if (moveEvt.clientX - insidePosition.toLeft > coord.left && moveEvt.clientX + insidePosition.toRight < coord.left + similarListElement.clientWidth) {
        startCoords.x = moveEvt.clientX;
        mainPin.style.left = (mainPin.offsetLeft + shift.x) + 'px';
      }
      address.value = getAddress(mainPin);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      address.value = getAddress(mainPin);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  window.map = {
    MAIN_PIN_SIZE: MAIN_PIN_SIZE,
    MAIN_PIN_TALE: MAIN_PIN_TALE,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    similarListElement: similarListElement,
    cityMap: cityMap
  };
})();
