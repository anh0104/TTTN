(function () {
  "use strict";


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

  function openModal(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.add("show");
  }

  function closeModal(el) {
    if (!el) return;
    el.classList.remove("show");
  }

  document.querySelectorAll("[data-modal-open]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal(btn.getAttribute("data-modal-open"));
    });
  });

  document.querySelectorAll("[data-modal-close]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      closeModal(btn.closest(".ldp-modal"));
    });
  });

  // Bấm vào nền tối (ngoài khung ảnh popup) để đóng
  document.querySelectorAll("[data-modal-backdrop]").forEach(function (backdrop) {
    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

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
      fileMain.value = ""; // cho phép chọn tiếp để thêm ảnh kế tiếp
    });
  }

  /* Bấm trực tiếp vào từng ô ảnh nhỏ (filePhoto1/2/3) cũng thêm được ảnh luôn,
     không cần bấm qua ảnh chính. */
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

  /* CCCD mặt trước/sau: đánh dấu đã chọn file */
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

  
  var registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // TODO: gọi API đăng ký thực tế tại đây trước khi show popup thành công
      openModal("modalSuccess");
    });
  }
})();

const form=document.getElementById("registerForm");
const success=document.getElementById("modalSuccess");

form.addEventListener("submit",function(e){

    e.preventDefault();

    success.classList.add("show");

});
document.querySelector(".ldp-modal__close").onclick=function(){

    document.getElementById("modalSuccess")
            .classList.remove("show");

}