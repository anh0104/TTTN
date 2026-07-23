// -------------------------------------------------------------
// Tai_khoan.js — Account page logic
// Handles: tabs, personal info editor, facebook/google sync
// -------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    let isSynced = false;

    // ========= PROFILE TABS =========
    const tabs = document.querySelectorAll(".profile-tab");
    const tabContents = document.querySelectorAll(".tab-content-area");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            const targetId = tab.getAttribute("data-tab");
            tabContents.forEach(tc => tc.classList.add("d-none"));
            const target = document.getElementById(targetId);
            if (target) target.classList.remove("d-none");
        });
    });

    // ========= PERSONAL INFO EDIT =========
    const btnEdit = document.getElementById("btn-edit-info");
    const btnSave = document.getElementById("btn-save-info");
    const btnCancel = document.getElementById("btn-cancel-edit");
    const editActions = document.getElementById("info-edit-actions");

    const fields = ["name", "gender", "dob", "address", "email", "phone"];

    if (btnEdit) {
        btnEdit.addEventListener("click", () => {
            toggleEditMode(true);
        });
    }

    if (btnCancel) {
        btnCancel.addEventListener("click", () => {
            toggleEditMode(false);
        });
    }

    if (btnSave) {
        btnSave.addEventListener("click", () => {
            fields.forEach(f => {
                const input = document.getElementById("input-" + f);
                const display = document.getElementById("field-" + f);
                if (input && display) {
                    if (f === "email") {
                        display.innerHTML = `<span>${input.value}</span><span class="badge bg-success ms-2" style="font-size:10px">✓</span>`;
                    } else {
                        display.textContent = input.value;
                    }
                }
            });
            toggleEditMode(false);
            alert("Thông tin đã được cập nhật thành công!");
        });
    }

    function toggleEditMode(editing) {
        fields.forEach(f => {
            const display = document.getElementById("field-" + f);
            const input = document.getElementById("input-" + f);
            if (display && input) {
                display.classList.toggle("d-none", editing);
                input.classList.toggle("d-none", !editing);
            }
        });
        if (editActions) editActions.classList.toggle("d-none", !editing);
        if (btnEdit) {
            btnEdit.textContent = editing ? "Đang chỉnh sửa..." : "Chỉnh Sửa";
            btnEdit.disabled = editing;
        }
    }

    // ========= SYNC SECTION & INTERACTIVE FLOW =========

    // Selectors
    const syncBody = document.getElementById("sync-body");
    const syncChevron = document.getElementById("sync-chevron");
    const syncChevronCircle = document.getElementById("sync-chevron-circle");
    const syncToggleHeader = document.getElementById("sync-toggle-header");

    const stateUnlinked = document.getElementById("sync-state-unlinked");
    const stateEditing = document.getElementById("sync-state-editing");
    const stateLinked = document.getElementById("sync-state-linked");

    const btnGoToSync = document.getElementById("btn-go-to-sync");
    const btnConfirmSync = document.getElementById("btn-confirm-sync");

    // Summary row and details block for Linked state (State 3)
    const linkedSummaryRow = document.getElementById("sync-linked-row-summary");
    const linkedDetailsBlock = document.getElementById("sync-linked-details");

    const unlinkedProviderName = document.getElementById("unlinked-provider-name");
    const unlinkedProviderSub = document.getElementById("unlinked-provider-sub");

    const editingProviderName = document.getElementById("editing-provider-name");
    const editingProviderSub = document.getElementById("editing-provider-sub");

    const linkedProviderName = document.getElementById("linked-provider-name");
    const linkedProviderSub = document.getElementById("linked-provider-sub");
    const linkedMyeSub = document.getElementById("linked-mye-sub");

    const linkedProviderNameSummary = document.getElementById("linked-provider-name-summary");
    const linkedProviderSubSummary = document.getElementById("linked-provider-sub-summary");
    const linkedMyeSubSummary = document.getElementById("linked-mye-sub-summary");

    // Configure Provider data (Default Facebook)
    function configureProviderData() {
        // Facebook (defaults)
        if (unlinkedProviderName) unlinkedProviderName.textContent = "Nguyễn Văn A";
        if (unlinkedProviderSub) unlinkedProviderSub.textContent = "fb.01020";

        if (editingProviderName) editingProviderName.textContent = "Nguyễn Văn A";
        if (editingProviderSub) editingProviderSub.textContent = "fb.01823";

        if (linkedProviderName) linkedProviderName.textContent = "Nguyễn Văn A";
        if (linkedProviderSub) linkedProviderSub.textContent = "fb.01823";

        if (linkedProviderNameSummary) linkedProviderNameSummary.textContent = "Nguyễn Văn A";
        if (linkedProviderSubSummary) linkedProviderSubSummary.textContent = "fb.01823";
    }

    configureProviderData();

    // Toggle Card view: Unlinked Row <-> Edit Form (when unlinked) OR collapse/expand Sync Details (when linked)
    if (syncToggleHeader) {
        syncToggleHeader.addEventListener("click", () => {
            if (!isSynced) {
                // Toggle between unlinked row view (Image 1) and editing form view (Image 2)
                if (stateUnlinked && stateEditing) {
                    const isFormHidden = stateEditing.classList.contains("d-none");
                    if (isFormHidden) {
                        stateUnlinked.classList.add("d-none");
                        stateEditing.classList.remove("d-none");
                    } else {
                        stateEditing.classList.add("d-none");
                        stateUnlinked.classList.remove("d-none");
                    }
                }
            } else {
                // If synced, toggles the detailed view underneath the synced summary row
                if (linkedDetailsBlock) {
                    linkedDetailsBlock.classList.toggle("d-none");
                }
            }
        });
    }

    // Toggle Linked Details View inside Expanded Linked Card
    if (linkedSummaryRow && linkedDetailsBlock) {
        linkedSummaryRow.addEventListener("click", (e) => {
            e.stopPropagation();
            linkedDetailsBlock.classList.toggle("d-none");
        });
    }

    // Transition: Unlinked -> Editing Form
    if (btnGoToSync) {
        btnGoToSync.addEventListener("click", (e) => {
            e.stopPropagation();
            if (stateUnlinked) stateUnlinked.classList.add("d-none");
            if (stateEditing) stateEditing.classList.remove("d-none");
        });
    }

    // Transition: Confirm Sync -> Linked Successful
    if (btnConfirmSync) {
        btnConfirmSync.addEventListener("click", () => {
            const userVal = document.getElementById("sync-username-input").value.trim();
            const passVal = document.getElementById("sync-password-input").value.trim();
            const confirmVal = document.getElementById("sync-password-confirm").value.trim();

            if (!userVal || !passVal || !confirmVal) {
                alert("Vui lòng điền đầy đủ tất cả các trường!");
                return;
            }
            if (userVal.length < 3) {
                alert("Tên tài khoản phải từ 3 ký tự trở lên!");
                return;
            }
            if (passVal.length < 6) {
                alert("Mật khẩu mới phải từ 6 ký tự trở lên!");
                return;
            }
            if (passVal !== confirmVal) {
                alert("Xác nhận lại mật khẩu không chính xác!");
                return;
            }

            // Sync successful
            isSynced = true;
            if (linkedMyeSubSummary) {
                linkedMyeSubSummary.textContent = userVal;
            }
            if (linkedMyeSub) linkedMyeSub.textContent = userVal;

            if (stateEditing) stateEditing.classList.add("d-none");
            if (stateLinked) stateLinked.classList.remove("d-none");
            alert("Đồng bộ tài khoản thành công!");
        });
    }

    // ========= ACTIVITY HISTORY TOGGLE & REVOKE =========
    const historyHeader = document.getElementById("history-toggle-header");
    const historyBody = document.getElementById("history-body");
    const historyChevronCircle = document.getElementById("history-chevron-circle");
    const btnLogoutAll = document.getElementById("btn-logout-all");
    const historyTbody = document.getElementById("history-table-tbody");

    if (historyHeader) {
        historyHeader.addEventListener("click", () => {
            if (historyBody) historyBody.classList.toggle("d-none");
            if (historyChevronCircle) historyChevronCircle.classList.toggle("open");
        });
    }

    if (btnLogoutAll) {
        btnLogoutAll.addEventListener("click", () => {
            const confirmed = confirm("Bạn có chắc chắn muốn đăng xuất khỏi tất cả các thiết bị đang lưu đăng nhập?");
            if (confirmed) {
                if (historyTbody) {
                    historyTbody.innerHTML = `
                        <tr>
                            <td colspan="4" class="text-center text-muted py-4">
                                <i class="fa-solid fa-circle-info me-1"></i> Không tìm thấy thiết bị lưu đăng nhập nào khác.
                            </td>
                        </tr>
                    `;
                }
                alert("Đăng xuất khỏi tất cả các thiết bị thành công!");
            }
        });
    }
});


