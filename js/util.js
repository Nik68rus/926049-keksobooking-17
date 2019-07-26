'use strict';

(function () {
  var isEscapeKey = function (evt) {
    return evt.key === 'Escape' || evt.key === 'Esc';
  };

  var isEnterKey = function (evt) {
    return evt.key === 'Enter';
  };

  var setDisabled = function (element) {
    element.disabled = true;
  };

  var unsetDisabled = function (element) {
    element.disabled = false;
  };

  var makeDragStart = function (onStart, onMove) {
    return function (evt) {
      evt.preventDefault();

      var start = onStart(evt);
      start.x = start.x || 0;
      start.y = start.y || 0;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        onMove(
            start.x + moveEvt.clientX - evt.clientX,
            start.y + moveEvt.clientY - evt.clientY
        );
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp, {once: true});
    };
  };

  var makeFragmentRender = function (render) {
    return function (dataList) {
      var fragment = document.createDocumentFragment();
      dataList.forEach(function (data) {
        fragment.appendChild(render(data));
      });
      return fragment;
    };
  };

  window.util = {
    isEscEvent: function (evt, action) {
      return isEscapeKey && action();
    },

    isEnterEvent: function (evt, action) {
      return isEnterKey && action();
    },

    makeDragStart: makeDragStart,
    setDisabled: setDisabled,
    unsetDisabled: unsetDisabled,
    makeFragmentRender: makeFragmentRender,
  };
})();
