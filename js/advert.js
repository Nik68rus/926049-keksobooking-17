'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var similarAdTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // функция создания фрагмента с пинами

  var getPinAds = function (adList) {
    var fragment = document.createDocumentFragment();
    adList.forEach(function (item, i) {
      var adElement = similarAdTemplate.cloneNode(true);
      adElement.dataset.index = i;
      adElement.style = 'left: ' + (item.location.x - PIN_WIDTH / 2) + 'px; top: ' + (item.location.y - PIN_HEIGHT) + 'px;';
      adElement.querySelector('img').src = item.author.avatar;
      adElement.querySelector('img').alt = item.offer.title;
      fragment.appendChild(adElement);
    });
    return fragment;
  };

  // функция отрисовки карточки на карте

  var renderCard = function (data, template) {
    var cardInfo = {
      adCapacity: '2 комнаты для 3 гостей',
      adTime: 'Заезд после 14:00, выезд до 10:00',
      adDescription: 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.'
    };

    var cardElement = template.cloneNode(true);
    cardElement.style = 'left: 10px; top: 100px;';
    cardElement.querySelector('.popup__avatar').src = data.author.avatar;

    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = data.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = data.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = cardInfo.adCapacity;
    cardElement.querySelector('.popup__text--time').textContent = cardInfo.adTime;
    cardElement.querySelector('.popup__description').textContent = cardInfo.adDescription;

    return cardElement;
  };

  window.advert = {
    createPin: getPinAds,
    createCard: renderCard
  };
})();
