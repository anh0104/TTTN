// -------------------------------------------------------------
// Nap_game.js — Interactive Logic for Game Directory page
// -------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const gameGrid = document.getElementById("game-grid");
    const searchInput = document.getElementById("search-game-input");
    const filterPills = document.querySelectorAll(".filter-pill");

    const gamesData = [
        { id: "mye-coin", title: "MYE COIN", category: "all", img: "../assets/images/Nap_Game/DS-game_nap/MYECOIN.png", badge: false, isMyeCoin: true },
        { id: "hao-khi-chien-hon", title: "HÀO KHÍ CHIẾN HỒN", category: "rpg", img: "../assets/images/Nap_Game/DS-game_nap/CARD(1).png", badge: true },
        { id: "hao-khi-du-hiep", title: "HÀO KHÍ DU HIỆP", category: "action", img: "../assets/images/Nap_Game/DS-game_nap/CARD(2).png", badge: true },
        { id: "boom-tank", title: "BOOM TANK", category: "simulation", img: "../assets/images/Nap_Game/DS-game_nap/CARD(3).png", badge: true },
        { id: "chan-vuong", title: "CHÂN VƯƠNG", category: "shooting", img: "../assets/images/Nap_Game/DS-game_nap/CARD(4).png", badge: true },
        { id: "boom-tank-2", title: "BOOM TANK", category: "simulation", img: "../assets/images/Nap_Game/DS-game_nap/CARD(3).png", badge: true },
        { id: "hao-khi-chien-hon-2", title: "HÀO KHÍ CHIẾN HỒN", category: "rpg", img: "../assets/images/Nap_Game/DS-game_nap/CARD(1).png", badge: true },
        { id: "hao-khi-du-hiep-2", title: "HÀO KHÍ DU HIỆP", category: "action", img: "../assets/images/Nap_Game/DS-game_nap/CARD(2).png", badge: true },
        { id: "boom-tank-3", title: "BOOM TANK", category: "simulation", img: "../assets/images/Nap_Game/DS-game_nap/CARD(3).png", badge: true },
        { id: "chan-vuong-2", title: "CHÂN VƯƠNG", category: "shooting", img: "../assets/images/Nap_Game/DS-game_nap/CARD(4).png", badge: true },
        { id: "boom-tank-4", title: "BOOM TANK", category: "simulation", img: "../assets/images/Nap_Game/DS-game_nap/CARD(3).png", badge: true },
        { id: "hao-khi-chien-hon-3", title: "HÀO KHÍ CHIẾN HỒN", category: "rpg", img: "../assets/images/Nap_Game/DS-game_nap/CARD(1).png", badge: true },
        { id: "hao-khi-du-hiep-3", title: "HÀO KHÍ DU HIỆP", category: "action", img: "../assets/images/Nap_Game/DS-game_nap/CARD(2).png", badge: true },
        { id: "boom-tank-5", title: "BOOM TANK", category: "simulation", img: "../assets/images/Nap_Game/DS-game_nap/CARD(3).png", badge: true },
        { id: "chan-vuong-3", title: "CHÂN VƯƠNG", category: "shooting", img: "../assets/images/Nap_Game/DS-game_nap/CARD(4).png", badge: true }
    ];

    if (gameGrid) {
        renderGamesGrid("all");
    }

    function renderGamesGrid(category, search = "") {
        if (!gameGrid) return;
        gameGrid.innerHTML = "";
        const filtered = gamesData.filter(g => {
            const catOk = category === "all" || g.category === category;
            const qOk = g.title.toLowerCase().includes(search.toLowerCase());
            return catOk && qOk;
        });

        if (filtered.length === 0) {
            gameGrid.innerHTML = `<div class="text-center py-5 text-muted" style="grid-column:1/-1">Không tìm thấy game nào phù hợp.</div>`;
            return;
        }

        filtered.forEach(game => {
            const card = document.createElement("div");
            card.className = "game-card-item cursor-pointer d-flex flex-column align-items-center text-center bg-transparent border-0 shadow-none";

            

            card.innerHTML = `
                <div class="game-card-img-wrapper position-relative bg-transparent border-0 shadow-none">
    <img src="${game.img}" alt="${game.title}" class="game-card-img d-block w-100 h-100"
        onerror="this.src='../assets/images/Nap_Game/DS-game_nap/CARD(1).png'">
</div>
                <div class="game-card-title mt-2 fw-bold text-uppercase ${game.isMyeCoin ? 'mye-coin-title' : ''}">${game.title}</div>
            `;

            card.addEventListener("click", () => {
                if (game.isMyeCoin) {
                    window.location.href = "MyE_Coin.html";
                } else {
                    alert(`Nạp thẻ cho game "${game.title}" đang được hoàn thiện. Vui lòng chọn gói "MYE COIN".`);
                }
            });

            gameGrid.appendChild(card);
        });
    }

    // Search input handler
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const active = document.querySelector(".filter-pill.active");
            const cat = active ? active.getAttribute("data-category") : "all";
            renderGamesGrid(cat, searchInput.value);
        });
    }

    // Category filter pills
    filterPills.forEach(pill => {
        pill.addEventListener("click", () => {
            filterPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            const cat = pill.getAttribute("data-category");
            renderGamesGrid(cat, searchInput ? searchInput.value : "");
        });
    });
});
