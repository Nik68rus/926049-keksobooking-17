'use strict';
(function (loadData, setDisabled, unsetDisabled) {
  var cityMap = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var fieldsetList = document.querySelectorAll('.ad-form fieldset');
  var filterForm = document.querySelector('.map__filters');
  var activeFlag = false;

  // опишем неактивное состояние окна

  var disactivatePage = function () {
    if (!cityMap.classList.contains('map--faded')) {
      cityMap.classList.add('map--faded');
    }
    if (!adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.remove('ad-form--disabled');
    }
    fieldsetList.forEach(setDisabled);
    setDisabled(adForm);
    setDisabled(filterForm);
    activeFlag = false;
  };

  // опишем функцию активации окна

  var activatePage = function () {
    cityMap.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    fieldsetList.forEach(unsetDisabled);
    loadData();
    unsetDisabled(adForm);
    unsetDisabled(filterForm);
    activeFlag = true;
  };

  window.init = {
    activate: activatePage,
    disactivate: disactivatePage,
    activeFlag: activeFlag,
  };

})(window.loading.loadData, window.util.setDisabled, window.util.unsetDisabled);
