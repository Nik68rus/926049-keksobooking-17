'use strict';
(function (FILE_TYPES, DEFAULT_AVATAR, PicPreviewSize, removeElement) {
  var avaChooser = document.querySelector('#avatar');
  var picChooser = document.querySelector('#images');
  var avatar = document.querySelector('.ad-form-header__preview img');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var picPreviewTemplate = document.querySelector('.ad-form__photo');

  var loadFile = function (source, cb) {
    var file = source.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        cb(reader.result);
      });

      reader.readAsDataURL(file);
    }
  };

  var renderPicPreview = function (url) {
    var node = document.createElement('div');
    var pic = document.createElement('img');
    pic.width = PicPreviewSize.WIDTH;
    pic.height = PicPreviewSize.HEIGHT;
    pic.style.borderRadius = PicPreviewSize.BORDER_RADIUS + 'px';
    pic.src = url;
    pic.alt = 'Фотография жилья';
    node.appendChild(pic);
    node.classList.add('ad-form__photo');
    return node;
  };

  var resetUploadedPics = function () {
    var photos = document.querySelectorAll('.ad-form__photo');
    photos.forEach(removeElement);
    photoContainer.appendChild(picPreviewTemplate);
    avatar.src = DEFAULT_AVATAR;
  };

  var onAvatarLoad = function (src) {
    avatar.src = src;
  };

  var onPicLoad = function (src) {
    picPreviewTemplate.remove();
    photoContainer.appendChild(renderPicPreview(src));
  };

  avaChooser.addEventListener('change', function () {
    loadFile(avaChooser, onAvatarLoad);
  });

  picChooser.addEventListener('change', function () {
    loadFile(picChooser, onPicLoad);
  });

  window.fileUpload = {
    resetUploadedPics: resetUploadedPics,
  };

})(window.constants.FILE_TYPES, window.constants.DEFAULT_AVATAR, window.constants.PicPreviewSize, window.util.removeElement);
