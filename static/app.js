// বাসের ডেটা (ডjango থেকে API দিয়ে আনা হবে, এখানে ডেমো ডেটা)
const buses = [
    {id: 'bus01', name: 'Bus 01', lat: 23.7808875, lng: 90.2792371},
    {id: 'bus02', name: 'Bus 02', lat: 23.781021, lng: 90.279035},
    {id: 'bus03', name: 'Bus 03', lat: 23.779876, lng: 90.280000},
];

let map;
let markers = {};
let activeBusId = null;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 23.7808875, lng: 90.2792371},
        zoom: 15,
    });

    // সব বাসের মার্কার যোগ করা
    buses.forEach(bus => {
        const marker = new google.maps.Marker({
            position: {lat: bus.lat, lng: bus.lng},
            map: map,
            title: bus.name,
            icon: 'https://maps.google.com/mapfiles/ms/icons/bus.png'
        });
        markers[bus.id] = marker;
    });
}

// Sidebar এ বাসের তালিকা দেখানো
function populateBusList() {
    const busList = document.getElementById('bus-list');
    buses.forEach(bus => {
        const li = document.createElement('li');
        li.textContent = bus.name;
        li.dataset.busId = bus.id;

        li.addEventListener('click', () => {
            setActiveBus(bus.id);
        });

        busList.appendChild(li);
    });
}

// বাস সিলেক্ট করলে ম্যাপ সেন্টার ও মার্কার হাইলাইট করা
function setActiveBus(busId) {
    if (activeBusId) {
        // আগের সিলেক্টেড বাসের CSS সরানো
        const oldLi = document.querySelector(`#bus-list li[data-bus-id="${activeBusId}"]`);
        if(oldLi) oldLi.classList.remove('active');

        // আগের মার্কারের আইকন ডিফল্ট করা
        markers[activeBusId].setIcon('https://maps.google.com/mapfiles/ms/icons/bus.png');
    }

    activeBusId = busId;

    // নতুন সিলেক্টেড বাসের CSS দেওয়া
    const newLi = document.querySelector(`#bus-list li[data-bus-id="${busId}"]`);
    if(newLi) newLi.classList.add('active');

    // নতুন বাস মার্কার কালার পরিবর্তন
    markers[busId].setIcon('https://maps.google.com/mapfiles/ms/icons/green-dot.png');

    // ম্যাপ সেন্টার আপডেট
    const marker = markers[busId];
    map.panTo(marker.getPosition());
    map.setZoom(17);
}

// ফেক্টিভেশন ও ইনিশিয়ালাইজেশন
window.onload = () => {
    initMap();
    populateBusList();
};






function openLoginModal() {
    document.getElementById("loginModal").style.display = "block";
}

function closeLoginModal() {
    document.getElementById("loginModal").style.display = "none";
}

// Optional: Login Submit
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    alert("Login request: " + user + " / " + pass);

    // এখানে Django backend এ POST পাঠাতে পারো fetch/ajax দিয়ে
    closeLoginModal();
});

