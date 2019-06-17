'use strict';

var ACCOMODATION_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var PIN_WIDTH = 50;
var MAIN_PIN_SIZE = 65;
var MAIN_PIN_TALE = 22;

var cityMap = document.querySelector('.map');
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

// опишем неактивное состояние окна

var fieldsetList = document.querySelectorAll('.ad-form fieldset');
var adForm = document.querySelector('.ad-form');
var filterForm = document.querySelector('.map__filters');

var disactivatePage = function () {
  if (!cityMap.classList.contains('map--faded')) {
    cityMap.classList.add('map--faded');
  }
  if (!adForm.classList.contains('ad-form--disabled')) {
    adForm.classList.remove('ad-form--disabled');
  }
  for (var i = 0; i < fieldsetList.length; i++) {
    fieldsetList[i].disabled = true;
  }
  adForm.disabled = true;
  filterForm.disabled = true;
};

disactivatePage();

// опишем функцию активации окна

var activatePage = function () {
  cityMap.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < fieldsetList.length; i++) {
    fieldsetList[i].disabled = false;
  }
  adForm.disabled = false;
  filterForm.disabled = false;
  similarListElement.appendChild(pinAds(ads));
};

var mainPin = document.querySelector('.map__pin--main');
mainPin.addEventListener('click', activatePage);

// реализуем заполнение поля с адресом

var getAddress = function (pin) {
  var posX = pin.offsetLeft;
  var posY = pin.offsetTop;
  return Math.round(posX + MAIN_PIN_SIZE / 2) + ', ' + Math.round(posY + MAIN_PIN_SIZE + MAIN_PIN_TALE);
};

var address = adForm.querySelector('#address');
address.value = getAddress(mainPin);

mainPin.addEventListener('mouseup', getAddress);

// определяем минимальное значение цены
var placeType = adForm.querySelector('#type');
var price = adForm.querySelector('#price');

var setMinPrice = function () {
  if (placeType.value === 'bungalo') {
    price.min = 0;
    price.placeholder = '0';
  }

  if (placeType.value === 'flat') {
    price.min = 1000;
    price.placeholder = '1000';
  }

  if (placeType.value === 'house') {
    price.min = 5000;
    price.placeholder = '5000';
  }

  if (placeType.value === 'palace') {
    price.min = 10000;
    price.placeholder = '10000';
  }
};

placeType.addEventListener('change', setMinPrice);

// синхронизация времени заезда и времени выезда

var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');

var synchronizeTimeOut = function () {
  timeOut.value = timeIn.value;
};

var synchronizeTimeIn = function () {
  timeIn.value = timeOut.value;
};

timeIn.addEventListener('change', synchronizeTimeOut);
timeOut.addEventListener('change', synchronizeTimeIn);
