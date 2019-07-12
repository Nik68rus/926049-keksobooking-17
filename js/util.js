'use strict';

(function () {
  var isEscapeKey = function (evt) {
    return evt.key === 'Escape' || evt.key === 'Esc';
  };

  var isEnterKey = function (evt) {
    return evt.key === 'Enter';
  };

  var makeDragStart = function (onMove, onEnd) {
    return function (evt) {
      evt.preventDefault();
      if (window.init.isPageActive === false) {
        window.init.activate();
      }

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        onMove(moveEvt.movementX, moveEvt.movementY, moveEvt.clientX, moveEvt.clientY);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        return onEnd();
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp, {once: true});
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
  };
})();
