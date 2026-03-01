function updateSelected(manager, assistant, founder, other) {
    if (sessionStorage.getItem("role-id")) {
        const value = sessionStorage.getItem("role-id");
        const selected = "selected"
        switch (value) {
            case "role-founder":
                manager.classList.remove(selected);
                assistant.classList.remove(selected);
                founder.classList.add(selected);
                other.classList.remove(selected);
                break;
            case "role-manager":
                manager.classList.add(selected);
                assistant.classList.remove(selected);
                founder.classList.remove(selected);
                other.classList.remove(selected);
                break;
            case "role-assistant":
                manager.classList.remove(selected);
                assistant.classList.add(selected);
                founder.classList.remove(selected);
                other.classList.remove(selected);
                break;
            default:
                manager.classList.remove(selected);
                assistant.classList.remove(selected);
                founder.classList.remove(selected);
                other.classList.add(selected);
        }
    }
}

function updateStorage(role) {
    sessionStorage.setItem("role-id", role.id)
    sessionStorage.setItem("role", role.textContent)
}

export function setCompanyName(
    founderSelector = '#role-founder',
    managerSelector = '#role-manager',
    assistantSelector = '#role-assistant',
    otherSelector = '#role-other',
    parentSelector = '#role-list'
) {
    const parent = document.querySelector(parentSelector);
    const target = parent.dataset.target;
    const founder = document.querySelector(founderSelector);
    const manager = document.querySelector(managerSelector);
    const assistant = document.querySelector(assistantSelector);
    const other = document.querySelector(otherSelector);

    updateSelected(manager, assistant, founder, other);

    founder.addEventListener('click', () => {
        updateStorage(founder);
        updateSelected(manager, assistant, founder, other);
        window.location.href = target;
    });

    manager.addEventListener('click', () => {
        updateStorage(manager);
        updateSelected(manager, assistant, founder, other);
        window.location.href = target;
    });

    assistant.addEventListener('click', () => {
        updateStorage(assistant);
        updateSelected(manager, assistant, founder, other);
        window.location.href = target;
    });

    other.addEventListener('click', () => {
        updateStorage(other);
        updateSelected(manager, assistant, founder, other)
        window.location.href = target;
    });
}

setCompanyName();
