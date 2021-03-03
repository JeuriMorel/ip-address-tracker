const form = document.getElementById('form');
const button = document.querySelector('.input__button');
const body = document.querySelector('.body');


let file = 'https://geo.ipify.org/api/v1?apiKey=at_iNxW19FkpU4or6bkRwz8J4PkUmIjG';

async function getIp(file) {
    let header = document.querySelector('.heading');
    header.classList.add('loading');

    let res = await fetch(file);
    let data = await res.json();
    parseRes(data);
    
    createMapDiv();
    loadMap(data.location.lat, data.location.lng);
    header.classList.remove('loading')
};

const createMapDiv = () => { 
    map.remove();

    let myDiv = document.createElement('div');
    myDiv.id = 'map';
    myDiv.classList.add('map');
    body.appendChild(myDiv);


}

const searchIp = (search) => {
    if (
        search.match(
            /^(([1-9]?\d|1\d\d|2[0-5][0-5]|2[0-4]\d)\.){3}([1-9]?\d|1\d\d|2[0-5][0-5]|2[0-4]\d)$/
        ) ||
        search.match(
            /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/gm
        )
    ) {

        let newFile = file + '&ipAddress=' + search;
        getIp(newFile);
        
        
    } else { 
        let newFile = file + '&domain=' + search;
        getIp(newFile);
    }

};


const loadMap = (lat, long) => {

    var map = L.map("map", {
        center: [lat + 0.0001, long],
        zoom: 18,
        zoomControl: false,
    });
    
    var myIcon = L.icon({
        iconUrl: "/images/icon-location.svg",
        iconSize: [50, 60],
        iconAnchor: [25, 30],
        popupAnchor: [-3, -76],
    });
    
    L.marker([lat, long], { icon: myIcon }).addTo(map);
    
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
};

function submitForm(e) { 
    let search = document.querySelector(".input__field");
    e.preventDefault();
    if (search.value) {
        searchIp(search.value);
        
    };
    form.reset();
};


body.onload = async () => {
    let file =
        "https://geo.ipify.org/api/v1?apiKey=at_iNxW19FkpU4or6bkRwz8J4PkUmIjG";
    let res = await fetch(file);
    let data = await res.json();

    console.log(data)
    parseRes(data);
    loadMap(data.location.lat, data.location.lng);
};

form.addEventListener('submit', submitForm);

function parseRes(data) { 
    let ip = data.ip;
    let isp = data.isp;
    let utc = "UTC" + data.location.timezone;
    let location = data.location.city + ', ' + data.location.region + ' ' + data.location.postalCode;

    let iPad = document.getElementById('ip');
    let loc = document.getElementById('location');
    let timeZone = document.getElementById('utc');
    let serviceProvider = document.getElementById('isp');

    iPad.textContent = ip;
    loc.textContent = location;
    timeZone.textContent = utc;
    serviceProvider.textContent = isp;
}