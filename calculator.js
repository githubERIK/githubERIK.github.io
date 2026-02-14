function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
document.getElementById('contentCreationBtn').addEventListener('click', (event) => openTab(event, 'contentCreation'));
document.getElementById('socialMediaManagementBtn').addEventListener('click', (event) => openTab(event, 'socialMediaManagement'));

const locPrices = { "Tartu": 0, "Võru": 142, "Tallinn": 372 };

const videos = document.getElementById('videos');
const photoSport = document.getElementById('photoSport');
const hours = document.getElementById('hours');
const locationEl = document.getElementById('location');
document.querySelectorAll('.loc-card').forEach(btn => {
    btn.addEventListener('click', () => {
        // visual state
        document.querySelectorAll('.loc-card').forEach(b => {
            b.classList.remove('selected');
            b.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('selected');
        btn.setAttribute('aria-checked', 'true');

        // update hidden input and trigger input event
        const hidden = document.getElementById('location');
        if (hidden) {
            hidden.value = btn.dataset.value;
            const ev = new Event('input', { bubbles: true });
            hidden.dispatchEvent(ev);
        }
    });
});


const totalFirstEl = document.getElementById('total');

function toInt(el) {
    const v = parseInt(el.value, 10);
    return Number.isFinite(v) ? v : 0;
}

function calc() {
    const v = Math.max(0, Math.min(999, toInt(videos)));
    const photosS = Math.max(0, Math.min(999, toInt(photoSport)));
    const hrs = Math.max(0, Math.min(999, toInt(hours)));

    const videosOneTime = v * 99;
    const photosSOneTime = photosS * 299;
    const hoursOneTime = hrs * 99;
    const loc = locationEl.value;
    const locPrice = locPrices[loc] || 0;

    const contentOneTime = videosOneTime + photosSOneTime + hoursOneTime + locPrice;
    const totalFirst = contentOneTime;

    totalFirstEl.textContent = totalFirst + '€';
}

// listen to custom element change/input events
['input', 'change'].forEach(evt => {
    videos.addEventListener(evt, calc);
    photoSport.addEventListener(evt, calc);
    hours.addEventListener(evt, calc);
});
locationEl.addEventListener('input', calc);
calc();