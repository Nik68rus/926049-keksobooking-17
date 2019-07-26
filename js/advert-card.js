'use strict';
(function (offerType, removeActivePin, makeFragmentRender) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cityMap = document.querySelector('.map');
  var filtersContainer = cityMap.querySelector('.map__filters-container');
  var currentCard = cityMap.querySelector('.map__card');


  // функция отрисовки карточки на карте

  var removeOptions = function (block, option) {
    var options = block.querySelectorAll(option);
    options.forEach(function (it) {
      block.removeChild(it);
    });
  };

  var renderFeature = function (feature) {
    var node = document.createElement('li');
    node.classList = 'popup__feature popup__feature--' + feature;
    return node;
  };

  var renderPhoto = function (photo) {
    var node = document.createElement('img');
    node.classList.add('popup__photo');
    node.width = '45';
    node.height = '40';
    node.src = photo;
    node.alt = 'Фотография жилья';
    return node;
  };

  var makeFeaturesFragment = makeFragmentRender(renderFeature);
  var makePhotosFragment = makeFragmentRender(renderPhoto);

  var setFeatures = function (features, featuresList) {
    removeOptions(features, '.popup__feature');
    features.appendChild(makeFeaturesFragment(featuresList));
  };

  var setPhotos = function (photos, photosList) {
    removeOptions(photos, '.popup__photo');
    photos.appendChild(makePhotosFragment(photosList));
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
    setPhotos(photos, offer.photos);
    return card;
  };

  var closeCard = function () {
    cityMap.removeChild(currentCard);
    removeActivePin();
    document.removeEventListener('keydown', onCardEscPress);
    currentCard = null;
  };

  var onCardEscPress = function (evt) {
    window.util.isEscEvent(evt, closeCard);
  };

  var showCard = function (data) {
    var card = renderCard(data);
    if (currentCard) {
      cityMap.removeChild(currentCard);
    }
    cityMap.insertBefore(card, filtersContainer);
    currentCard = cityMap.querySelector('.map__card');
    var popupClose = currentCard.querySelector('.popup__close');
    popupClose.addEventListener('click', closeCard);
    document.addEventListener('keydown', onCardEscPress);
  };

  window.advertCard = {
    showCard: showCard,
  };
})(window.constants.offerType, window.advertPin.removeActivePin, window.util.makeFragmentRender);
