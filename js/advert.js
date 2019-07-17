'use strict';
(function (Pin, offerType) {
  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var renderPin = function (item, i) {
    var pin = mapPin.cloneNode(true);
    var pinAvatar = pin.querySelector('img');
    pin.style.left = item.location.x - Pin.WIDTH_HALF + 'px';
    pin.style.top = item.location.y - Pin.HEIGHT + 'px';
    pin.dataset.index = i;
    pinAvatar.src = item.author.avatar;
    pinAvatar.alt = item.offer.title;
    return pin;
  };

  // функция отрисовки карточки на карте

  var renderCard = function (ad) {
    var card = cardTemplate.cloneNode(true);
    var offer = ad.offer;

    card.querySelector('.popup__avatar').src = ad.author.avatar;
    card.querySelector('.popup__title').textContent = offer.title;
    card.querySelector('.popup__text--address').textContent = offer.address;
    card.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
    card.querySelector('.popup__type').textContent = offerType[offer.type];
    card.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до: ' + offer.checkout;
    card.querySelector('.popup__description').textContent = offer.description;
    return card;
  };

  window.advert = {
    renderPin: renderPin,
    createCard: renderCard
  };
})(window.constants.Pin, window.constants.offerType);
