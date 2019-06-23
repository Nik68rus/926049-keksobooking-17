'use strict';

(function () {
  var PIN_WIDTH = 50;
  var ACCOMODATION_TYPE = ['palace', 'flat', 'house', 'bungalo'];
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
          y: getRandomInRange(window.map.MIN_Y, window.map.MAX_Y)
        }
      };
    }
    return adverts;
  };

  var ads = generateMock(8);

  window.data = {
    ads: ads
  };
})();
