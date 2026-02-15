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


const meetings = document.getElementById('meetings');
const totalSocialMonthlyEl = document.getElementById('totalSocialMonthly');
const totalSocialOneTimeEl = document.getElementById('totalSocialOneTime');

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

    // --- Social media management ---
    // prices
    const PRICES = {
        contractFee: 49,       // one-time
        dmPerMonth: 99,        // per month
        calendarPerMonth: 49,  // per month
        meetingPer30: 9,       // per 30-min
        rebrandOneTime: 299,
        newProfileOneTime: 299,
        sponsorsPerMonth: 49
    };

    const contractEl = document.querySelector('#contract input[type="checkbox"]');
    const dmEl = document.querySelector('#dm input[type="checkbox"]');
    const calendarEl = document.querySelector('#calendar input[type="checkbox"]');
    const rebrandEl = document.querySelector('#rebrand input[type="checkbox"]');
    const newProfileEl = document.querySelector('#newProfile input[type="checkbox"]');
    const sponsorsEl = document.querySelector('#findSponsor input[type="checkbox"]');
    const meetingsEl = document.querySelector('#meetings');

    const contractChecked = !!(contractEl && contractEl.checked);
    const dmChecked = !!(dmEl && dmEl.checked);
    const calendarChecked = !!(calendarEl && calendarEl.checked);
    const rebrandChecked = !!(rebrandEl && rebrandEl.checked);
    const newProfileChecked = !!(newProfileEl && newProfileEl.checked);
    const sponsorsChecked = !!(sponsorsEl && sponsorsEl.checked);
    const meetingsCount = Math.max(0, Math.min(999, toInt(meetingsEl)));

    let totalSocialMonthly = 0;
    let totalSocialOneTime = 0;
    if (contractChecked) totalSocialOneTime += PRICES.contractFee;
    if (dmChecked) totalSocialMonthly += PRICES.dmPerMonth;
    if (calendarChecked) totalSocialMonthly += PRICES.calendarPerMonth;
    if (meetingsCount > 0) totalSocialMonthly += PRICES.meetingPer30 * meetingsCount;
    if (rebrandChecked) totalSocialOneTime += PRICES.rebrandOneTime;
    if (newProfileChecked) totalSocialOneTime += PRICES.newProfileOneTime;
    if (sponsorsChecked) totalSocialMonthly += PRICES.sponsorsPerMonth;

    totalSocialMonthlyEl.textContent = totalSocialMonthly + '€';
    totalSocialOneTimeEl.textContent = totalSocialOneTime + '€';
}

// listen to custom element change/input events
['input', 'change'].forEach(evt => {
    videos.addEventListener(evt, calc);
    photoSport.addEventListener(evt, calc);
    hours.addEventListener(evt, calc);
    meetings.addEventListener(evt, calc);
});
locationEl.addEventListener('input', calc);
document.querySelectorAll('.switch input[type="checkbox"]').forEach(cb => cb.addEventListener('change', calc));
calc();