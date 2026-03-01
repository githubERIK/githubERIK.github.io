function formComplete(
    companyName,
    role,
    webPage,
    packages,
    email,
    startTime,
    consent,
    targetPage
) {
    const payload = {
        company_name: companyName,
        role: role,
        web_page: webPage,
        package: packages.toString(),
        email: email,
        start_time: startTime,
        consent: consent
    };


    fetch('https://changelogapi.eu/vorm/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
        .then(response => {
            if (response.ok) {
                return response.json().catch(() => null);
            } else {
                return response.text().then(text => { throw new Error(text); });
            }
        })
        .then(data => {
            console.log('POST successful', data);
            window.location.href = targetPage;
        })
        .catch(err => {
            console.error('POST failed', err);
            const [name, ext] = targetPage.split('.');
            window.location.href = `${name}-error.${ext}`;
        });
}

export function finishFlow(selector = '#flow-i-agree') {
    const btn = document.querySelector(selector);
    if (!btn) return;

    const companyName = sessionStorage.getItem("company_name");
    if (!companyName) {
        // ...
    }

    const role = sessionStorage.getItem("role")
    if (!role) {
        // ...
    }

    const webPage = sessionStorage.getItem("web_page")
    if (!webPage) {
        // ...
    }

    const mg = sessionStorage.getItem('package-social-media-management') === 'true';
    const ct = sessionStorage.getItem('package-content-creation') === 'true';
    if (!mg && !ct) {
        // ...
    }
    const packages = [];
    if (mg) packages.push("social media");
    if (ct) packages.push("content creation");


    const email = sessionStorage.getItem("email")
    if (!email) {
        // ...
    }

    const startTime = sessionStorage.getItem("start")
    if (!startTime) {
        // ...
    }

    btn.addEventListener('click', () => {
        btn.disabled = true;
        btn.style.display = 'none';

        try {
            formComplete(
                companyName,
                role,
                webPage,
                packages,
                email,
                startTime,
                true,
                btn.dataset.target
            );
        } finally {
            btn.disabled = false;
            btn.style.display = '';
        }
    });
}

finishFlow();
