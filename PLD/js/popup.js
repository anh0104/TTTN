/* ============================================================
   POPUP.JS – Toàn bộ logic popup cho trang Vote
   Sử dụng Bootstrap 5 Modal API.
   Không viết JS inline trong HTML.
============================================================ */

// ==================== DỮ LIỆU MẪU ====================
var userFlowers = 10000; // Số hoa người dùng hiện có
window.accumulatedFlowers = 0; // Số hoa tích lũy tổng cộng
var activeContestant = null;
var activeContestantIndex = null;

// Lịch sử mặc định ban đầu
var historyRecords = [
    { type: "Hoa", desc: "Đã tặng 100 hoa cho Lục Trà Bạc Hà", date: "23/07/2026" },
    { type: "Code", desc: "ABACA0145656", date: "23/07/2026" }
];

// ==================== CÁC HÀM CHÍNH ====================

/**
 * Mở popup thông tin thí sinh
 * @param {Object} data - { ten, sbd, bangHoi, server, gioiThieu, hoa, rank, images }
 * @param {number} idx - chỉ số thí sinh trong danh sách
 */
function openPopup(data, idx) {
    activeContestant = data;
    activeContestantIndex = idx;
    var popup = document.getElementById("popupOverlay");
    if (!popup) return;

    // Điền thông tin
    var elName = document.getElementById("popupName");
    var elSBD = document.getElementById("popupSBD");
    var elGuild = document.getElementById("popupGuild");
    var elServer = document.getElementById("popupServer");
    var elDesc = document.getElementById("popupDesc");
    var elHoa = document.getElementById("popupHoa");
    var elRank = document.getElementById("popupRank");
    var elMainImg = document.getElementById("popupMainImage");
    var flowerInput = document.getElementById("flowerInput");

    if (elName) elName.textContent = data.ten || "";
    if (elSBD) elSBD.textContent = data.sbd || "";
    if (elGuild) elGuild.textContent = data.bangHoi || "";
    if (elServer) elServer.textContent = data.server || "";
    if (elDesc) elDesc.textContent = data.gioiThieu || "";
    if (elHoa) elHoa.textContent = data.hoa || 0;
    if (elRank) elRank.textContent = data.rank || 0;

    // Ảnh
    if (data.images && data.images.length > 0) {
        if (elMainImg) elMainImg.src = data.images[0];
        var thumbs = popup.querySelectorAll(".popup-thumb");
        thumbs.forEach(function (t, i) {
            if (data.images[i]) {
                t.src = data.images[i];
                t.style.display = "";
            } else {
                t.style.display = "none";
            }
            t.classList.toggle("active", i === 0);
        });
    }

    // Reset flower input
    if (flowerInput) flowerInput.value = "1";

    // Show bằng Bootstrap Modal
    if (typeof bootstrap !== "undefined") {
        bootstrap.Modal.getOrCreateInstance(popup).show();
    }
}

/**
 * Đóng popup chính (thông tin thí sinh) bằng Bootstrap Modal
 */
function closePopup() {
    var popup = document.getElementById("popupOverlay");
    if (!popup) return;
    if (typeof bootstrap !== "undefined") {
        var instance = bootstrap.Modal.getInstance(popup);
        if (instance) instance.hide();
    }
}

/**
 * Đổi ảnh lớn khi click thumbnail
 */
function changeImage(src, thumbEl) {
    var mainImg = document.getElementById("popupMainImage");
    if (mainImg) mainImg.src = src;

    // Active thumbnail
    var popup = document.getElementById("popupOverlay");
    if (popup) {
        popup.querySelectorAll(".popup-thumb").forEach(function (t) {
            t.classList.remove("active");
        });
    }
    if (thumbEl) thumbEl.classList.add("active");
}

/**
 * Tăng số hoa
 */
function increaseFlower() {
    var input = document.getElementById("flowerInput");
    if (!input) return;
    var val = parseInt(input.value) || 0;
    if (val < userFlowers) {
        input.value = val + 1;
    } else {
        input.value = userFlowers;
    }
}

/**
 * Giảm số hoa (min 1)
 */
function decreaseFlower() {
    var input = document.getElementById("flowerInput");
    if (!input) return;
    var val = parseInt(input.value) || 0;
    if (val > 1) {
        input.value = val - 1;
    }
}

/**
 * Set MAX hoa
 */
function setMaxFlower() {
    var input = document.getElementById("flowerInput");
    if (input) input.value = userFlowers;
}

/**
 * Hiện popup Tặng hoa thành công bằng Bootstrap Modal
 */
function showSuccessPopup() {
    var input = document.getElementById("flowerInput");
    var count = input ? parseInt(input.value) || 0 : 0;

    // Kiểm tra hợp lệ
    if (count < 1) {
        if (input) input.value = "1";
        if (input) input.focus();
        return;
    }
    if (count > userFlowers) {
        if (input) input.value = userFlowers;
        count = userFlowers;
    }

    // Thực hiện trừ hoa của user và cộng cho thí sinh
    userFlowers -= count;
    if (activeContestant) {
        activeContestant.hoa += count;

        // Cập nhật text trong popup
        var elHoa = document.getElementById("popupHoa");
        if (elHoa) elHoa.textContent = activeContestant.hoa;

        // Cập nhật thẻ thí sinh ngoài grid
        if (activeContestantIndex !== null && typeof activeContestantIndex !== "undefined") {
            var card = document.querySelector('.thisinh-card[data-index="' + activeContestantIndex + '"]');
            if (card) {
                var flowerSpan = card.querySelector(".thisinh-card__flower span");
                if (flowerSpan) flowerSpan.textContent = activeContestant.hoa;
            }
        }

        // Thêm bản ghi lịch sử tặng hoa
        addHistoryRecord("Hoa", "Đã tặng " + count + " hoa cho " + activeContestant.ten);
    }

    // Tăng hoa tích lũy mốc đổi quà
    updateAccumulatedFlowers(count);

    var el = document.getElementById("successFlowerCount");
    if (el) el.textContent = count;

    bootstrap.Modal.getInstance(document.getElementById("popupOverlay")).hide();

setTimeout(() => {
    bootstrap.Modal.getOrCreateInstance(
        document.getElementById("popupSuccess")
    ).show();
}, 350);
}

/**
 * Đóng popup phụ (success / gift / history) bằng Bootstrap Modal
 */
function closeSubPopup(id) {
    var popup = document.getElementById(id);
    if (!popup) return;
    if (typeof bootstrap !== "undefined") {
        var instance = bootstrap.Modal.getInstance(popup);
        if (instance) instance.hide();
    }
}

/**
 * Hiện popup nhận quà (gift code) bằng Bootstrap Modal
 */
// Popup Bootstrap
const popupGift = new bootstrap.Modal(document.getElementById("popupGift"));

const giftMilestone = document.getElementById("giftMilestone");
const giftCode = document.getElementById("giftCode");

// Bấm nút NHẬN
document.querySelectorAll(".gift-btn").forEach(btn => {
    btn.addEventListener("click", function () {

        // Lấy dữ liệu từ nút
        const milestone = this.dataset.milestone;
        const code = this.dataset.code;

        // Đổ dữ liệu vào popup
        giftMilestone.textContent = milestone;
        giftCode.textContent = code;

        // Hiện popup
        popupGift.show();
    });
});
document.getElementById("btnCopyCode").addEventListener("click", function () {

    const code = giftCode.textContent;

    navigator.clipboard.writeText(code).then(() => {
        this.textContent = "ĐÃ SAO CHÉP";

        setTimeout(() => {
            this.textContent = "SAO CHÉP";
        }, 1500);
    });

});

/**
 * Cập nhật số hoa tích lũy mốc đổi quà
 */
function updateAccumulatedFlowers(amount) {
    window.accumulatedFlowers = (window.accumulatedFlowers || 0) + amount;

    // Cập nhật text tích lũy
    var textEl = document.querySelector(".tichluy-current b");
    if (textEl) {
        textEl.textContent = window.accumulatedFlowers;
    }

    // Cập nhật phần trăm tiến trình (từ các mộc 50, 150, 500, 1000)
    var pct = 0;
    if (window.accumulatedFlowers <= 50) {
        pct = (window.accumulatedFlowers / 50) * 14;
    } else if (window.accumulatedFlowers <= 150) {
        pct = 14 + ((window.accumulatedFlowers - 50) / 100) * 25;
    } else if (window.accumulatedFlowers <= 500) {
        pct = 39 + ((window.accumulatedFlowers - 150) / 350) * 25;
    } else if (window.accumulatedFlowers <= 1000) {
        pct = 64 + ((window.accumulatedFlowers - 500) / 500) * 25;
    } else {
        pct = 89 + Math.min(11, ((window.accumulatedFlowers - 1000) / 1000) * 11);
    }

    var fillEl = document.querySelector(".progress-fill");
    if (fillEl) {
        fillEl.style.width = pct + "%";
    }
}

/**
 * Render bảng lịch sử tặng
 */
function renderHistoryTable() {
    var tbody = document.getElementById("historyTableBody");
    if (!tbody) return;

    tbody.innerHTML = historyRecords.map(function (item, index) {
        return "<tr>" +
            "<td>" + (index + 1) + "</td>" +
            "<td>" + item.type + "</td>" +
            "<td>" + item.desc + "</td>" +
            "<td>" + item.date + "</td>" +
            "</tr>";
    }).join("");
}

/**
 * Thêm bản ghi lịch sử mới
 */
function addHistoryRecord(type, desc) {
    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var year = today.getFullYear();
    var dateString = day + "/" + month + "/" + year;

    historyRecords.unshift({ type: type, desc: desc, date: dateString });
    renderHistoryTable();
}

/**
 * Hiện popup lịch sử tặng bằng Bootstrap Modal
 */
function showHistoryPopup() {
    closePopup();
    var popup = document.getElementById("popupHistory");
    if (popup && typeof bootstrap !== "undefined") {
        bootstrap.Modal.getOrCreateInstance(popup).show();
    }
}

/**
 * Sao chép gift code vào clipboard
 */
function copyGiftCode() {
    var codeEl = document.getElementById("giftCode");
    if (!codeEl) return;

    var textToCopy = codeEl.textContent.trim();

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(function () {
            showToast();
        }).catch(function () {
            fallbackCopy(textToCopy);
        });
    } else {
        fallbackCopy(textToCopy);
    }
}

function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    showToast();
}

/**
 * Hiện toast thông báo
 */
function showToast() {
    var toast = document.getElementById("popupToast");
    if (!toast) return;
    toast.classList.add("show");
    setTimeout(function () {
        toast.classList.remove("show");
    }, 2000);
}

// ==================== GẮN SỰ KIỆN SAU KHI LOAD HTML ====================

function initPopupEvents() {
    console.log("popup.js: initPopupEvents starting...");
    // 1. Thumbnail click
    var thumbs = document.querySelectorAll(".popup-thumb");
    thumbs.forEach(function (t) {
        t.addEventListener("click", function () {
            changeImage(t.src, t);
        });
    });

    // 2. Nút +/-/MAX
    var btnInc = document.getElementById("btnIncrease");
    var btnDec = document.getElementById("btnDecrease");
    var btnMax = document.getElementById("btnMax");

    if (btnInc) btnInc.addEventListener("click", increaseFlower);
    if (btnDec) btnDec.addEventListener("click", decreaseFlower);
    if (btnMax) btnMax.addEventListener("click", setMaxFlower);

    // 3. Sanitize flower input
    var flowerInput = document.getElementById("flowerInput");
    if (flowerInput) {
        flowerInput.addEventListener("input", function () {
            this.value = this.value.replace(/[^0-9]/g, "");
        });
        flowerInput.addEventListener("blur", function () {
            var v = parseInt(this.value) || 0;
            if (v < 1) this.value = "1";
            else if (v > userFlowers) this.value = userFlowers;
        });
    }

    // 4. Nút Tặng hoa
    var btnTangHoa = document.getElementById("btnTangHoa");
    if (btnTangHoa) {
        console.log("popup.js: attaching listener to #btnTangHoa");
        btnTangHoa.addEventListener("click", function (e) {
            console.log("popup.js: #btnTangHoa clicked!");
            e.preventDefault();
            showSuccessPopup();
        });
    } else {
        console.warn("popup.js: #btnTangHoa not found!");
    }

    // 5. Nút Lịch sử tặng
    var btnLichSu = document.getElementById("btnLichSu");
    if (btnLichSu) {
        console.log("popup.js: attaching listener to #btnLichSu");
        btnLichSu.addEventListener("click", function (e) {
            console.log("popup.js: #btnLichSu clicked!");
            e.preventDefault();
            showHistoryPopup();
        });
    } else {
        console.warn("popup.js: #btnLichSu not found!");
    }

    // 6. Nút Sao chép
    var btnCopy = document.getElementById("btnCopyCode");
    if (btnCopy) btnCopy.addEventListener("click", copyGiftCode);

    // 7. Render bảng lịch sử ban đầu
    renderHistoryTable();

    console.log("popup.js: initPopupEvents finished attaching listeners");
}
