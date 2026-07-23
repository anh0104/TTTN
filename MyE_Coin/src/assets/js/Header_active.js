// -------------------------------------------------------------
// Shared Header Logic (Header_active.js)
// Handles: login, active user dropdown card, styling effects
// -------------------------------------------------------------

window.appState = {
    isLoggedIn: true,
    username: "myepro123",
    myeId: "12233548",
    balance: 1200
};

document.addEventListener("DOMContentLoaded", () => {
    const headerUserSection = document.getElementById("header-user-section");
    const userDropdownCard = document.getElementById("user-dropdown-card");
    const btnLogout = document.getElementById("btn-logout");

    renderHeaderLoginState();
    setupSharedListeners();

    function renderHeaderLoginState() {
        if (!headerUserSection) return;

        if (window.appState.isLoggedIn) {
            headerUserSection.innerHTML = `
                <div class="avatar-wrapper" id="avatar-wrapper">
                    <div class="circular-avatar">M</div>
                    <div class="avatar-info">
                        <p class="avatar-name">${window.appState.username}</p>
                        <p class="avatar-balance">
                            <span>${window.appState.balance}</span>
                            <img src="../assets/images/MyE_Coin/coin_M.png" class="coin-icon" alt="coin">
                        </p>
                    </div>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" class="ms-1" style="opacity:0.7;">
                        <path d="M1 1L5 5L9 1" stroke="#003366" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            `;

            const avatarWrapper = document.getElementById("avatar-wrapper");
            if (avatarWrapper) {
                avatarWrapper.addEventListener("click", (e) => {
                    e.stopPropagation();
                    if (userDropdownCard) userDropdownCard.classList.toggle("show");
                });
            }
        } else {
            headerUserSection.innerHTML = `
                <button class="btn btn-login-pill text-white" id="btn-login-trigger">ĐĂNG NHẬP</button>
            `;
            const loginTrigger = document.getElementById("btn-login-trigger");
            if (loginTrigger) {
                loginTrigger.addEventListener("click", () => {
                    window.appState.isLoggedIn = true;
                    renderHeaderLoginState();
                    // trigger event to pages if they need to update
                    document.dispatchEvent(new Event("login-state-change"));
                    alert("Đăng nhập thành công! Tài khoản: " + window.appState.username);
                });
            }
        }
    }

    function setupSharedListeners() {
        window.addEventListener("click", () => {
            if (userDropdownCard) userDropdownCard.classList.remove("show");
        });

        if (btnLogout) {
            btnLogout.addEventListener("click", (e) => {
                e.preventDefault();
                window.appState.isLoggedIn = false;
                renderHeaderLoginState();
                if (userDropdownCard) userDropdownCard.classList.remove("show");
                // trigger event to pages
                document.dispatchEvent(new Event("login-state-change"));
                alert("Bạn đã đăng xuất!");
            });
        }
    }

    // Expose update balance function
    window.updateSharedHeaderBalance = (newBalance) => {
        window.appState.balance = newBalance;
        renderHeaderLoginState();
    };
});
