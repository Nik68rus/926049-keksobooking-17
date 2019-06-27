'use strict';

(function () {
  var loadURL = 'https://js.dump.academy/keksobooking/data';
  var ads = [];

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', loadURL);
    xhr.send();
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
        for (var i = 0; i < xhr.response.length; i++) {
          ads[i] = xhr.response[i];
        }
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000; // 10s

  };

  window.backend = {
    load: load,
    adList: ads
  };

})();
