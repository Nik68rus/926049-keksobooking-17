'use strict';
(function (Pin, offerType) {
  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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

  // функция отрисовки карточки на карте
  var setFeatures = function (features, featuresList) {
    var showedFeatures = features.querySelectorAll('.popup__feature');
    showedFeatures.forEach(function (it) {
      features.removeChild(it);
    });
    var fragment = document.createDocumentFragment();
    featuresList.forEach(function (it) {
      var feature = document.createElement('li');
      feature.classList = 'popup__feature popup__feature--' + it;
      fragment.appendChild(feature);
    });
    features.appendChild(fragment);
  };

  var showPhotos = function (photos, photosList) {
    var showedPhotos = photos.querySelectorAll('.popup__photo');
    showedPhotos.forEach(function (it) {
      photos.removeChild(it);
    });
    var fragment = document.createDocumentFragment();
    photosList.forEach(function (it) {
      var photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.width = '45';
      photo.height = '40';
      photo.src = it;
      photo.alt = 'Фотография жилья';
      fragment.appendChild(photo);
    });
    photos.appendChild(fragment);

  };

  var renderCard = function (ad) {
    var card = cardTemplate.cloneNode(true);
    var offer = ad.offer;
    var features = card.querySelector('.popup__features');
    var photos = card.querySelector('.popup__photos');

    card.querySelector('.popup__avatar').src = ad.author.avatar;
    card.querySelector('.popup__title').textContent = offer.title;
    card.querySelector('.popup__text--address').textContent = offer.address;
    card.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
    card.querySelector('.popup__type').textContent = offerType[offer.type];
    card.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до: ' + offer.checkout;
    setFeatures(features, offer.features);
    card.querySelector('.popup__description').textContent = offer.description;
    showPhotos(photos, offer.photos);
    return card;
  };

  window.advert = {
    renderPin: renderPin,
    createCard: renderCard
  };
})(window.constants.Pin, window.constants.offerType);
