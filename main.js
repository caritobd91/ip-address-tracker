import './style.css'
let searchResult = ''

const searchResultInput = document.querySelector('input');
searchResultInput.addEventListener('input', (inputEvent)  => {
  searchResult = inputEvent.target.value;
})

// check if input result has letter or number, check first character
const isLetter = (str) => {
  return str.length === 1 && str.match(/[a-z]/i);
}

const sendData = async () => {

  const firstChar = searchResult.charAt(0);
  const initialUrl = 'https://geo.ipify.org/api/v1?apiKey=at_MtMdip93KaiHmQuJC6khzvk5SmPkY';
  let inputParam = '';

  if (isLetter(firstChar)){
    // if string - add domain parameter
    inputParam = `&domain=${searchResult}`;
  } else {
    // if number - add ipAddress parameter
    inputParam = `&ipAddress=${searchResult}`;
  }

  // build url
  const fullUrl = `${initialUrl}${inputParam}`;

  // fetch data from API
  // using await to get data back rather than a Promise
  const response = await fetch(`${fullUrl}`)
  const apiData = await response.json()
  // .then(response => response.json())
  // .then(data => data);
  console.log(apiData.location);
  updateMap(apiData.location.lat, apiData.location.lng);
}

const mymap = L.map('mapid');

const updateMap = (lat, long) => {
  mymap.setView([lat, long], 13);
}

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

updateMap(51.505, -0.09);

const form = document.getElementById('form');
form.addEventListener('submit', (submitEvent) => {
  submitEvent.preventDefault();

  sendData();
})
