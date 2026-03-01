export function setPackage(
    managementSelector = "#package-social-media-management",
    contentSelector = "#package-content-creation",
    buttonSelector = '#flow-package'
) {
    const managementId = managementSelector.slice(1);;
    const contentId = contentSelector.slice(1);
    const management = document.querySelector(managementSelector);
    const content = document.querySelector(contentSelector);

    function anySelected() {
        return sessionStorage.getItem(managementId) === 'true'
            || sessionStorage.getItem(contentId) === 'true';
    }

    function updateSelected(managementEl, contentEl) {
        const mg = sessionStorage.getItem('package-social-media-management') === 'true';
        const ct = sessionStorage.getItem('package-content-creation') === 'true';

        mg ? managementEl.classList.add('selected') : managementEl.classList.remove('selected');
        ct ? contentEl.classList.add('selected') : contentEl.classList.remove('selected');
    }

    function updateStorage(key, value) {
        sessionStorage.setItem(key, value);
    }

    const btn = document.querySelector(buttonSelector);
    if (!btn) return;
    const target = btn.dataset.target;
    btn.addEventListener('click', (e) => {
        if (anySelected()) {
            window.location.href = target;
        } else {
            management.classList.add('invalid');
            content.classList.add('invalid');
            setTimeout(() => {
                management.classList.remove('invalid');
                content.classList.remove('invalid');
            }, 2000);
        }
    });

    // ensure default values exist
    if (sessionStorage.getItem(managementId) === null) sessionStorage.setItem(managementId, 'false');
    if (sessionStorage.getItem(contentId) === null) sessionStorage.setItem(contentId, 'false');

    // init UI from storage
    updateSelected(management, content);

    management.addEventListener('click', () => {
        const current = sessionStorage.getItem(managementId) === 'true';
        updateStorage(managementId, (!current).toString());
        updateSelected(management, content);
    });

    content.addEventListener('click', () => {
        const current = sessionStorage.getItem(contentId) === 'true';
        updateStorage(contentId, (!current).toString());
        updateSelected(management, content);
    });
}

setPackage();
