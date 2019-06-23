'use strict';

(function () {
  var MAIN_PIN_SIZE = 65;
  var MAIN_PIN_TALE = 22;

  // активация окна по нажатию на главный пин

  window.init.mainPin.addEventListener('click', function (evt) {
    evt.preventDefault();
    var adPins = window.init.activate();
    for (var i = 0; i < adPins.length; i++) {
      if (!adPins[i].classList.contains('map__pin--main')) {
        adPins[i].addEventListener('click', onPinClick);
      }
    }
  });

  var onPinClick = function (evt) {
    var element = evt.target;
    if (!element.classList.contains('map__pin')) {
      element = element.parentElement;
    }
    if (element.classList.contains('map__pin') && !element.classList.contains('map__pin--main')) {
      showCard(window.data.adverts[parseInt(element.dataset.index, 10)]);
    }
  };

  // отрисовка карточки

  var showCard = function (data) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var card = window.advert.createCard(data, cardTemplate);
    var currentCard = window.init.map.querySelector('.map__card');
    if (currentCard) {
      window.init.map.removeChild(currentCard);
    }
    window.init.map.insertBefore(card, window.init.map.querySelector('.map__filters-container'));
    currentCard = window.init.map.querySelector('.map__card');
    var popupClose = currentCard.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      closePopup();
    });

    var closePopup = function () {
      window.init.map.removeChild(currentCard);
      document.removeEventListener('keydown', onPopupEscPress);
    };

    var onPopupEscPress = function (evt) {
      window.util.isEscEvent(evt, closePopup);
    };

    document.addEventListener('keydown', onPopupEscPress);
  };
    // функция определения адреса пина

  var getAddress = function (pin) {
    var posX = pin.offsetLeft;
    var posY = pin.offsetTop;
    return Math.round(posX + MAIN_PIN_SIZE / 2) + ', ' + Math.round(posY + MAIN_PIN_SIZE + MAIN_PIN_TALE);
  };

  var address = window.init.form.querySelector('#address');
  address.value = getAddress(window.init.mainPin);

  // реализуем перетаскивание маркера мышью

  window.init.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    window.init.activate();

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

      if (moveEvt.clientY - insidePosition.toTop + 10 > window.data.MIN_Y && moveEvt.clientY + insidePosition.toBottom < window.data.MAX_Y) {
        startCoords.y = moveEvt.clientY;
        window.init.mainPin.style.top = (window.init.mainPin.offsetTop + shift.y) + 'px';
      }
      var coord = window.init.similarList.getBoundingClientRect();
      if (moveEvt.clientX - insidePosition.toLeft > coord.left && moveEvt.clientX + insidePosition.toRight < coord.left + window.init.similarList.clientWidth) {
        startCoords.x = moveEvt.clientX;
        window.init.mainPin.style.left = (window.init.mainPin.offsetLeft + shift.x) + 'px';
      }
      address.value = getAddress(window.init.mainPin);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      address.value = getAddress(window.init.mainPin);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  window.map = {
    getAddress: getAddress
  };

})();
