'use strict';

var ACCOMODATION_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var PIN_WIDTH = 50;

var cityMap = document.querySelector('.map');
cityMap.classList.remove('map--faded');
var similarListElement = cityMap.querySelector('.map__pins');

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateMock = function (amount) {
  var adverts = [];
  for (var i = 0; i < amount; i++) {
    var j = i + 1;
    adverts[i] = {
      author: {
        avatar: 'img/avatars/user0' + j + '.png'
      },
      offer: {
        type: ACCOMODATION_TYPE[getRandomInRange(0, 3)]
      },
      location: {
        x: getRandomInRange(PIN_WIDTH / 2, similarListElement.clientWidth - PIN_WIDTH / 2),
        y: getRandomInRange(130, 630)
      }
    };
  }
  return adverts;
};

var ads = generateMock(8);

var similarAdTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderAd = function (ad) {
  var adElement = similarAdTemplate.cloneNode(true);
  adElement.style = 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px;';
  adElement.querySelector('img').src = ad.author.avatar;
  adElement.querySelector('img').alt = ad.type;
  return adElement;
};

var pinAds = function (adList) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adList.length; i++) {
    fragment.appendChild(renderAd(adList[i]));
  }
  return fragment;
};

similarListElement.appendChild(pinAds(ads));

