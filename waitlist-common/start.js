export function initFlowButton(selector = '#flow-lets-go') {
    const btn = document.querySelector(selector);
    if (!btn) return;
    const target = btn.dataset.target;
    btn.addEventListener('click', () => {
        window.location.href = target;
    });
}

initFlowButton();
