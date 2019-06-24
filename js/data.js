'use strict';

(function () {
  var ACCOMODATION_TYPE = ['palace', 'flat', 'house', 'bungalo'];

  /*
  var TYPES = {
    flat: {text: 'Квартира', minPrice: 1000},
    house: {text: 'Дом', minPrice: 5000},
    bungalo: {text: 'Бунгало', minPrice: 0},
    palace: {text: 'Дворец', minPrice: 10000}
  };*/

  var AD_TITLES = ['Уютное гнездышко для молодоженов', 'Квартирка в центре для двоих', 'Шикарные аппартаменты', 'Квартира у метро', 'Студия для одного', 'Королевские аппартаменты'];
  var AD_ADDRESS = ['г. Токио, ул. Советская, д. 15', 'г. Токио, ул. Пушкина, д. 20', 'г. Токио, ул. Гагарина, д. 7', 'г. Токио, ул. Интернациональная, д. 40'];
  var MIN_Y = 130;
  var MAX_Y = 630;

  // функция генерации массива похожих объявлений

  var generateData = function (amount) {
    var adverts = [];
    for (var i = 0; i < amount; i++) {
      adverts[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          type: ACCOMODATION_TYPE[window.util.getRandomInRange(0, 3)],
          title: AD_TITLES[window.util.getRandomInRange(0, 5)],
          address: AD_ADDRESS[window.util.getRandomInRange(0, 3)],
          price: window.util.getRandomInRange(1, 20000),
        },
        location: {
          x: window.util.getRandomInRange(0, window.init.similarList.clientWidth),
          y: window.util.getRandomInRange(MIN_Y, MAX_Y)
        }
      };
    }
    return adverts;
  };

  var adverts = generateData(8);

  window.data = {
    adverts: adverts,
    generateData: generateData,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y
  };
})();
