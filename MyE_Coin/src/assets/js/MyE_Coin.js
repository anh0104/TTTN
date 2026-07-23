// -------------------------------------------------------------
// MyE_Coin.js — Recharge packages and checkout view router
// -------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const pageRecharge = document.getElementById("page-mye-coin-recharge");
    const pageCheckout = document.getElementById("page-payment-checkout");
    const packGridMain = document.getElementById("packages-grid");
    const packGridOther = document.getElementById("checkout-other-packages");
    const methodCards = document.querySelectorAll(".method-card");
    const breadcrumbCurrent = document.getElementById("breadcrumb-current");

    // Invoice elements
    const invoiceAccount = document.getElementById("invoice-account");
    const invoiceMyeId = document.getElementById("invoice-mye-id");
    const invoiceCoins = document.getElementById("invoice-coins");
    const invoiceMethodPill = document.getElementById("invoice-method-pill");
    const invoiceTotalVnd = document.getElementById("invoice-total-vnd");
    const btnCheckout = document.getElementById("btn-checkout-submit");

    // Balance display on page
    const userBalanceField = document.getElementById("user-balance-field");
    const userAccountField = document.getElementById("user-account-field");
    const userMyeidField = document.getElementById("user-myeid-field");

    const packagesData = [
        { coins: 20, price: "20.000 VNĐ", label: "20 MyE Coin", img: "../assets/images/MyE_Coin/Chon_goi_nap/20_MYE_COIN.png" },
        { coins: 50, price: "50.000 VNĐ", label: "50 MyE Coin", img: "../assets/images/MyE_Coin/Chon_goi_nap/50_MYE_COIN.png" },
        { coins: 100, price: "100.000 VNĐ", label: "100 MyE Coin", img: "../assets/images/MyE_Coin/Chon_goi_nap/100_MYE_COIN.png" },
        { coins: 500, price: "500.000 VNĐ", label: "500 MyE Coin", img: "../assets/images/MyE_Coin/Chon_goi_nap/500_MYE_COIN.png" },
        { coins: 1000, price: "1.000.000 VNĐ", label: "1000 MyE Coin", img: "../assets/images/MyE_Coin/Chon_goi_nap/1000_MYE_COIN.png" },
        { coins: 2000, price: "2.000.000 VNĐ", label: "2000 MyE Coin", img: "../assets/images/MyE_Coin/Chon_goi_nap/2000_MYE_COIN.png" },
        { coins: 5000, price: "5.000.000 VNĐ", label: "5000 MyE Coin", img: "../assets/images/MyE_Coin/Chon_goi_nap/5000_MYE_COIN.png" },
        { coins: 10000, price: "10.000.000 VNĐ", label: "10000 MyE Coin", img: "../assets/images/MyE_Coin/Chon_goi_nap/10000_MYE_COIN.png" }
    ];

    const localState = {
        selectedMethod: {
            id: "momo",
            name: "Momo",
            img: "../assets/images/MyE_Coin/Hinh_thuc_nap/MOMO.png"
        },
        selectedPackage: {
            coins: 500,
            price: "500.000 VNĐ",
            label: "500 MyE Coin"
        }
    };

    // Load initial info from global appState
    updateDashboardUI();
    renderPackages(packGridMain, true);
    renderPackages(packGridOther, false);
    setupMethods();

    function updateDashboardUI() {
        if (window.appState) {
            if (userBalanceField) {
                userBalanceField.innerHTML = `${window.appState.balance} <img src="../assets/images/MyE_Coin/coin_M.png" class="coin-icon" alt="coin">`;
            }
            if (userAccountField) userAccountField.textContent = window.appState.username;
            if (userMyeidField) userMyeidField.textContent = window.appState.myeId;
        }
    }

    function renderPackages(grid, goToCheckout) {
        if (!grid) return;
        grid.innerHTML = "";

        packagesData.forEach(pack => {
            const card = document.createElement("div");
            card.className = "package-card cursor-pointer";
            card.innerHTML = `
                <img src="${pack.img}" class="package-card-bg" alt="${pack.label}">
                <div class="package-card-body">
                    <div class="package-info">
                        <div class="package-title">${pack.coins} MyE Coin</div>
                        <div class="package-price">${pack.price}</div>
                    </div>
                    <button class="btn-package-buy">NẠP</button>
                </div>
            `;
            card.addEventListener("click", () => {
                localState.selectedPackage = pack;
                if (goToCheckout) {
                    showView("checkout");
                }
                updateInvoice();
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
            grid.appendChild(card);
        });
    }

    function setupMethods() {
        methodCards.forEach(card => {
            card.addEventListener("click", () => {
                methodCards.forEach(c => c.classList.remove("active"));
                card.classList.add("active");
                localState.selectedMethod = {
                    id: card.getAttribute("data-method-id"),
                    name: card.querySelector(".method-name").innerText,
                    img: card.querySelector(".method-img").src
                };
            });
        });
    }

    function showView(view) {
        if (view === "checkout") {
            if (pageRecharge) pageRecharge.classList.add("d-none");
            if (pageCheckout) pageCheckout.classList.remove("d-none");
            if (breadcrumbCurrent) breadcrumbCurrent.textContent = "Thông tin giao dịch";
        } else {
            if (pageCheckout) pageCheckout.classList.add("d-none");
            if (pageRecharge) pageRecharge.classList.remove("d-none");
            if (breadcrumbCurrent) breadcrumbCurrent.textContent = "MyE Coin";
        }
    }

    function updateInvoice() {
        if (!invoiceAccount) return;
        invoiceAccount.textContent = window.appState.username;
        invoiceMyeId.textContent = window.appState.myeId;
        invoiceCoins.textContent = localState.selectedPackage.coins;
        invoiceTotalVnd.textContent = localState.selectedPackage.price;
        if (invoiceMethodPill) {
            invoiceMethodPill.innerHTML = `
                <img src="${localState.selectedMethod.img}" alt="${localState.selectedMethod.name}" onerror="this.style.display='none'">
                <span>${localState.selectedMethod.name}</span>
            `;
        }
    }

    if (btnCheckout) {
        btnCheckout.addEventListener("click", () => {
            alert(`Giao dịch thành công!\nGói nạp: ${localState.selectedPackage.coins} MyE Coin\nSố tiền: ${localState.selectedPackage.price}\nHình thức: ${localState.selectedMethod.name}`);

            // Add balance
            if (window.appState) {
                window.appState.balance += localState.selectedPackage.coins;
                // update page UI
                updateDashboardUI();
                // update header UI via global method
                if (window.updateSharedHeaderBalance) {
                    window.updateSharedHeaderBalance(window.appState.balance);
                }
            }
            showView("recharge");
        });
    }

    // Listen to header login state change
    document.addEventListener("login-state-change", () => {
        updateDashboardUI();
    });
});
