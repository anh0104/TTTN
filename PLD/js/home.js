(function () {
  "use strict";

  /* ============ STAGE SCALING ============ */
  var stage = document.getElementById("ldpStage");
  var wrapper = document.querySelector(".ldp-wrapper");
  var STAGE_WIDTH = 1920;

  function scaleStage() {
    var viewportWidth = window.innerWidth;
    var scale = viewportWidth / STAGE_WIDTH;
    stage.style.transform = "scale(" + scale + ")";
    var realHeight = stage.getBoundingClientRect().height / scale;
    wrapper.style.height = (realHeight * scale) + "px";
  }

  window.addEventListener("resize", scaleStage);
  window.addEventListener("load", scaleStage);
  scaleStage();

  /* ============ PHOTO UPLOAD ============ */
  var fileMain = document.getElementById("fileMain");
  var uploadMainLabel = document.getElementById("uploadMainLabel");
  var photoSlots = Array.prototype.slice.call(document.querySelectorAll(".photo-slot"));
  var mainFilled = false;

  function findEmptySlot() {
    for (var i = 0; i < photoSlots.length; i++) {
      if (!photoSlots[i].classList.contains("is-filled")) return photoSlots[i];
    }
    return null;
  }

  function fillSlot(slot, url) {
    slot.style.backgroundImage = "url('" + url + "')";
    slot.classList.add("is-filled");

    var oldBtn = slot.querySelector(".photo-slot__remove");
    if (oldBtn) oldBtn.remove();

    var removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "photo-slot__remove";
    removeBtn.setAttribute("aria-label", "Xóa ảnh");
    removeBtn.innerHTML = "&times;";
    removeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      slot.classList.remove("is-filled");
      slot.style.backgroundImage = "url('assets/themanhnho.png')";
      removeBtn.remove();
    });
    slot.appendChild(removeBtn);
  }

  function setMainPhoto(url) {
    uploadMainLabel.style.backgroundImage = "url('" + url + "')";
    uploadMainLabel.style.backgroundSize = "cover";
    mainFilled = true;
  }

  function resetAllPhotos() {
    mainFilled = false;
    uploadMainLabel.style.backgroundImage = "url('assets/themanh.png')";
    uploadMainLabel.style.backgroundSize = "contain";
    photoSlots.forEach(function (slot) {
      slot.classList.remove("is-filled");
      slot.style.backgroundImage = "url('assets/themanhnho.png')";
      var btn = slot.querySelector(".photo-slot__remove");
      if (btn) btn.remove();
    });
  }

  if (fileMain) {
    fileMain.addEventListener("change", function (e) {
      var file = e.target.files && e.target.files[0];
      if (!file) return;
      var url = URL.createObjectURL(file);

      if (!mainFilled) {
        setMainPhoto(url);
      } else {
        var slot = findEmptySlot();
        if (slot) {
          fillSlot(slot, url);
        } else {
          alert("Bạn đã thêm đủ 4 ảnh dự thi.");
        }
      }
      fileMain.value = "";
    });
  }

  ["filePhoto1", "filePhoto2", "filePhoto3"].forEach(function (id) {
    var input = document.getElementById(id);
    if (!input) return;
    input.addEventListener("change", function (e) {
      var file = e.target.files && e.target.files[0];
      if (!file) return;
      var url = URL.createObjectURL(file);
      var slot = input.closest(".photo-slot");
      if (slot) fillSlot(slot, url);
    });
  });

  /* CCCD mặt trước/sau */
  ["fileCccdFront", "fileCccdBack"].forEach(function (id) {
    var input = document.getElementById(id);
    if (!input) return;
    input.addEventListener("change", function (e) {
      var file = e.target.files && e.target.files[0];
      if (!file) return;
      var label = input.closest(".ldp-upload-field");
      label.title = file.name;
      label.style.outline = "2px solid #2fe4e8";
    });
  });

  /* HỦY BỎ: reset toàn bộ ảnh đã thêm */
  var btnCancel = document.getElementById("btnCancel");
  if (btnCancel) {
    btnCancel.addEventListener("click", function () {
      resetAllPhotos();
    });
  }

  /* ============ ĐĂNG KÝ THÀNH CÔNG (Bootstrap Modal) ============ */
  var registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var modalEl = document.getElementById("modalSuccess");
      if (modalEl && typeof bootstrap !== "undefined") {
        bootstrap.Modal.getOrCreateInstance(modalEl).show();
      }
    });
  }
})();