'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (item, i) {
    var pin = mapPin.cloneNode(true);
    pin.style.left = item.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = item.location.y - PIN_HEIGHT + 'px';
    pin.dataset.index = i;
    pin.querySelector('img').src = item.author.avatar;
    pin.querySelector('img').alt = item.offer.title;
    return pin;
  };

  // функция отрисовки карточки на карте

  var renderCard = function (data, template) {
    var card = template.cloneNode(true);
    card.style = 'left: 10px; top: 100px;';
    card.querySelector('.popup__avatar').src = data.author.avatar;
    card.querySelector('.popup__title').textContent = data.offer.title;
    card.querySelector('.popup__text--address').textContent = data.offer.address;
    card.querySelector('.popup__text--price').textContent = data.offer.price + ' ₽/ночь';
    card.querySelector('.popup__type').textContent = data.offer.type;
    card.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до: ' + data.offer.checkout;
    card.querySelector('.popup__description').textContent = data.offer.description;
    return card;
  };

  window.advert = {
    renderPin: renderPin,
    createCard: renderCard
  };
})();
