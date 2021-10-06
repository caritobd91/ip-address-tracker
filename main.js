import './style.css'
let searchResult = ''
const baseUrl = 'https://geo.ipify.org/api/v1?apiKey=at_MtMdip93KaiHmQuJC6khzvk5SmPkY';


const searchResultInput = document.querySelector('input');
searchResultInput.addEventListener('input', (inputEvent)  => {
  searchResult = inputEvent.target.value;
})

// docoument.getElementById('searchResult').innerHTML = searchResultInput;


// check if input result has letter or number, check first character
const isLetter = (str) => {
  return str.length === 1 && str.match(/[a-z]/i);
}

const updateData = async(data) => {
  document.getElementById('searchResultIp').innerHTML = data.ip;
  document.getElementById('searchResultLocation').innerHTML = `${data.location.city}, <br />${data.location.region} ${data.location.postalCode}`;
  document.getElementById('searchResultTimeZone').innerHTML = `UTC ${data.location.timezone}`;
  document.getElementById('searchResultIsp').innerHTML = data.isp;
}

const sendData = async () => {
  const firstChar = searchResult.charAt(0);
  let inputParam = '';

  if (isLetter(firstChar)){
    // if string - add domain parameter
    inputParam = `&domain=${searchResult}`;
  } else {
    // if number - add ipAddress parameter
    inputParam = `&ipAddress=${searchResult}`;
  }

  // build url
  const fullUrl = `${baseUrl}${inputParam}`;

  // fetch data from API
  // using await to get data back rather than a Promise
  const response = await fetch(`${fullUrl}`)
  const apiData = await response.json()

  updateData(apiData);
  updateMap(apiData.location.lat, apiData.location.lng);
}

const mymap = L.map('mapid');

const updateMap = (lat, long) => {
  L.marker([lat, long]).addTo(mymap);
  mymap.setView([lat, long], 13);
}

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

// prompt user for their geolocation
if (navigator.geolocation) {
  // using the browser's geolocation object to get the users current position
  // and then setting that to the default location on the map
  navigator.geolocation.getCurrentPosition((position) => {
    updateMap(position.coords.latitude, position.coords.longitude)
  })
} else {
  // else use London as default location on map
  updateMap(51.505, -0.09);
}

const response = await fetch(`${baseUrl}`)
const responseData = await response.json();
updateData(responseData);

const form = document.getElementById('form');
form.addEventListener('submit', (submitEvent) => {
  submitEvent.preventDefault();

  sendData();
})
