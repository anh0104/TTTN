(function () {
  "use strict";

  /* ============================================================
     Chuyển tab BẢNG XẾP HẠNG (Mỹ Nhân / Mỹ Nam / Phú Giáp Thiên Hạ)
  ============================================================ */
  var bxhTabs = document.querySelectorAll(".bxh-tab");
  bxhTabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      bxhTabs.forEach(function (t) { t.classList.remove("is-active"); });
      tab.classList.add("is-active");
    });
  });

  /* ============================================================
     Nút "NHẬN" trong popup Hoa Free
  ============================================================ */
  document.querySelectorAll(".nhanhoa-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var input = btn.previousElementSibling;
      if (input && !input.value.trim()) {
        input.focus();
        return;
      }
      alert("Đã ghi nhận yêu cầu nhận hoa!");
    });
  });
})();

/* ============================================================
   DỮ LIỆU THÍ SINH
============================================================ */
const thisSinh = [
  {
    ten: "Lục Trà Bạc Hà",
    sbd: "01239",
    bangHoi: "Lạc Viên",
    server: "S1 - Lý Bạch",
    gioiThieu: "Xin chào, mình là Lục Trà Bạc Hà. Mình tham gia Mister để lưu giữ lại kỉ niệm và những khoảnh khắc đẹp.",
    rank: 999,
    hoa: 9999,
    images: ["../assets/anhto.png", "../assets/anhnho1.png", "../assets/anhnho2.png", "../assets/anhnho3.png"]
  },
  {
    ten: "Bạch Nguyệt Vân",
    sbd: "01240",
    bangHoi: "Thiên Hạ",
    server: "S1 - Lý Bạch",
    gioiThieu: "Xin chào, mình là Bạch Nguyệt Vân. Rất vui được tham gia cuộc thi lần này!",
    rank: 998,
    hoa: 9520,
    images: ["../assets/anhto.png", "../assets/anhnho1.png", "../assets/anhnho2.png", "../assets/anhnho3.png"]
  },
  {
    ten: "Thanh Vũ Ca",
    sbd: "01241",
    bangHoi: "Phong Vân",
    server: "S1 - Lý Bạch",
    gioiThieu: "Xin chào, mình là Thanh Vũ Ca. Mình yêu thế giới game và muốn chia sẻ khoảnh khắc đẹp.",
    rank: 997,
    hoa: 9300,
    images: ["../assets/anhto.png", "../assets/anhnho1.png", "../assets/anhnho2.png", "../assets/anhnho3.png"]
  },
  {
    ten: "Diệp Tử Yên",
    sbd: "01242",
    bangHoi: "Vân Mộng",
    server: "S1 - Lý Bạch",
    gioiThieu: "Xin chào, mình là Diệp Tử Yên. Hãy vote cho mình nhé!",
    rank: 996,
    hoa: 9100,
    images: ["../assets/anhto.png", "../assets/anhnho1.png", "../assets/anhnho2.png", "../assets/anhnho3.png"]
  },
  {
    ten: "Hàn Mộ Thanh",
    sbd: "01243",
    bangHoi: "Thiên Cơ",
    server: "S1 - Lý Bạch",
    gioiThieu: "Xin chào, mình là Hàn Mộ Thanh. Cảm ơn mọi người đã ủng hộ!",
    rank: 995,
    hoa: 9000,
    images: ["../assets/anhto.png", "../assets/anhnho1.png", "../assets/anhnho2.png", "../assets/anhnho3.png"]
  },
  {
    ten: "Tô Tuyết Nhi",
    sbd: "01244",
    bangHoi: "Tuyết Sơn",
    server: "S1 - Lý Bạch",
    gioiThieu: "Xin chào, mình là Tô Tuyết Nhi. Rất vui khi tham gia!",
    rank: 994,
    hoa: 8888,
    images: ["../assets/anhto.png", "../assets/anhnho1.png", "../assets/anhnho2.png", "../assets/anhnho3.png"]
  },
  {
    ten: "Vân Thường Y",
    sbd: "01245",
    bangHoi: "Thiên Hạ",
    server: "S1 - Lý Bạch",
    gioiThieu: "Xin chào, mình là Vân Thường Y.",
    rank: 993,
    hoa: 8700,
    images: ["../assets/anhto.png", "../assets/anhnho1.png", "../assets/anhnho2.png", "../assets/anhnho3.png"]
  },
  {
    ten: "Lâm Tịch Dương",
    sbd: "01246",
    bangHoi: "Phong Vân",
    server: "S1 - Lý Bạch",
    gioiThieu: "Xin chào, mình là Lâm Tịch Dương.",
    rank: 992,
    hoa: 8600,
    images: ["../assets/anhto.png", "../assets/anhnho1.png", "../assets/anhnho2.png", "../assets/anhnho3.png"]
  },
  {
    ten: "Mộc Uyển Nhi",
    sbd: "01247",
    bangHoi: "Lạc Viên",
    server: "S1 - Lý Bạch",
    gioiThieu: "Xin chào, mình là Mộc Uyển Nhi.",
    rank: 991,
    hoa: 8500,
    images: ["../assets/anhto.png", "../assets/anhnho1.png", "../assets/anhnho2.png", "../assets/anhnho3.png"]
  }
];

/* ============================================================
   RENDER THẺ THÍ SINH
============================================================ */
const grid = document.getElementById("thisinhGrid");
if (grid) {
  grid.innerHTML = thisSinh.map((item, index) => `
<div class="col-lg-4 col-md-6">

    <div class="thisinh-card"
         data-index="${index}">

        <img src="../assets/card.png" class="thisinh-card__bg">

        <div class="thisinh-card__rank">
            <img src="../assets/xephang.png">
            <span>${item.rank}</span>
        </div>

        <div class="thisinh-card__flower">
            <span>${item.hoa}</span>
            <img src="../assets/hoa.png">
        </div>

        <div class="thisinh-card__name">${item.ten}</div>

        <div class="thisinh-card__server">${item.server}</div>

    </div>

</div>
`).join("");

  // Gắn sự kiện click cho thẻ thí sinh (event delegation)
  grid.addEventListener("click", function (e) {
    var card = e.target.closest(".thisinh-card");
    if (!card) return;
    var idx = parseInt(card.getAttribute("data-index"));
    if (isNaN(idx) || !thisSinh[idx]) return;
    if (typeof openPopup === "function") {
      openPopup(thisSinh[idx], idx);
    }
  });
}

/* ============================================================
   KHỞI TẠO SỰ KIỆN POPUP + NÚT NHẬN QUÀ
   (popup HTML đã inline trong vote.html, không cần fetch)
============================================================ */
document.addEventListener("DOMContentLoaded", function () {
  console.log("vote.js: DOMContentLoaded fired");
  // Khởi tạo sự kiện popup
  if (typeof initPopupEvents === "function") {
    console.log("vote.js: calling initPopupEvents");
    initPopupEvents();
  } else {
    console.warn("vote.js: initPopupEvents is not defined!");
  }

  // NÚT NHẬN QUÀ (tích lũy mốc đổi quà)
  document.querySelectorAll(".gift-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var milestone = btn.getAttribute("data-milestone") || "XX";
      var code = btn.getAttribute("data-code") || "ABACA0145656";

      // Check required flowers milestone
      var required = parseInt(milestone) || 0;
      var currentAccumulated = window.accumulatedFlowers || 0;
      giftMilestone.textContent = milestone;
        giftCode.textContent = code;
        popupGift.show();

      if (typeof showGiftPopup === "function") {
        showGiftPopup(milestone, code);
      }
    });
  });
});