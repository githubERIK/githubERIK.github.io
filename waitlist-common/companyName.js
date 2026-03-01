export function setCompanyName(inputSelector = '#company-name', buttonSelector = '#flow-company-name') {
    const field = document.querySelector(inputSelector);

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

    if (sessionStorage.getItem("company_name")) {
        field.value = sessionStorage.getItem("company_name");
    }

    field.addEventListener("input", () => {
        if (field.checkValidity()) {
            sessionStorage.setItem("company_name", field.value);
            field.classList.remove('input--error');
        } else {
            inputFail(field);
        };
    });

    function inputFail(inputBox) {
        inputBox.className = 'input--error';
    }
}

setCompanyName();
