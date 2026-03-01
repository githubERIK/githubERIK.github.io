export function setCompanyEmail(inputSelector = '#company-email', buttonSelector = '#flow-company-email') {
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

    if (sessionStorage.getItem("email")) {
        field.value = sessionStorage.getItem("email");
    }

    function inputFail(inputBox) {
        inputBox.className = 'input--error';
    }

    field.addEventListener("input", () => {
        field.classList.remove('input--error');
        if (field.checkValidity()) {
            sessionStorage.setItem("email", field.value);
        } else {
            inputFail(field);
        };
    });
}

setCompanyEmail();
