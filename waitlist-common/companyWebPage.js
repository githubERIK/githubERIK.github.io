export function setCompanyWebPage(inputSelector = '#company-web-page', buttonSelector = '#flow-company-web-page') {
    let field = document.querySelector(inputSelector);

    const btn = document.querySelector(buttonSelector);
    if (!btn) return;
    const target = btn.dataset.target;
    btn.addEventListener('click', () => {
        if (field.checkValidity()) {
            field.classList.remove('input--error');
            window.location.href = target;
        } else {
            inputFail(field);
        }
    });

    if (sessionStorage.getItem("web_page")) {
        field.value = sessionStorage.getItem("web_page");
    }

    function inputFail(inputBox) {
        inputBox.className = 'input--error';
    }

    field.addEventListener("input", () => {
        field.classList.remove('input--error');
        if (field.checkValidity()) {
            sessionStorage.setItem("web_page", field.value);
        } else {
            inputFail(field);
        };
    });
}

setCompanyWebPage();
