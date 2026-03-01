function updateSelected(asap, month, quarter, year) {
    if (sessionStorage.getItem("start-id")) {
        const value = sessionStorage.getItem("start-id");
        const selected = "selected"
        switch (value) {
            case "start-asap":
                month.classList.remove(selected);
                quarter.classList.remove(selected);
                asap.classList.add(selected);
                year.classList.remove(selected);
                break;
            case "start-month":
                month.classList.add(selected);
                quarter.classList.remove(selected);
                asap.classList.remove(selected);
                year.classList.remove(selected);
                break;
            case "start-quarter":
                month.classList.remove(selected);
                quarter.classList.add(selected);
                asap.classList.remove(selected);
                year.classList.remove(selected);
                break;
            default:
                month.classList.remove(selected);
                quarter.classList.remove(selected);
                asap.classList.remove(selected);
                year.classList.add(selected);
        }
    }
}

function updateStorage(role) {
    sessionStorage.setItem("start-id", role.id)
    sessionStorage.setItem("start", role.textContent)
}

export function setStartTime(
    asapSelector = '#start-asap',
    monthSelector = '#start-month',
    quarterSelector = '#start-quarter',
    yearSelector = '#start-year',
    parentSelector = '#start-list'
) {
    const parent = document.querySelector(parentSelector);
    const target = parent.dataset.target;

    const asap = document.querySelector(asapSelector);
    const month = document.querySelector(monthSelector);
    const quarter = document.querySelector(quarterSelector);
    const year = document.querySelector(yearSelector);

    updateSelected(asap, month, quarter, year);

    asap.addEventListener('click', () => {
        updateStorage(asap);
        updateSelected(asap, month, quarter, year);
        window.location.href = target;
    });

    month.addEventListener('click', () => {
        updateStorage(month);
        updateSelected(asap, month, quarter, year);
        window.location.href = target;
    });

    quarter.addEventListener('click', () => {
        updateStorage(quarter);
        updateSelected(asap, month, quarter, year);
        window.location.href = target;
    });

    year.addEventListener('click', () => {
        updateStorage(year);
        updateSelected(asap, month, quarter, year)
        window.location.href = target;
    });
}

setStartTime();
