import './style.css'
//set variable with empty string, then update it
// get value on submit - wrap button on a form
let searchResult = ''

const searchResultInput = document.querySelector('input');
searchResultInput.addEventListener('input', (inputEvent)  => {
  searchResult = inputEvent.target.value;
})

const isLetter = (str) => {
  return str.length === 1 && str.match(/[a-z]/i);
}

const sendData = () => {
  // send search result to API
    const apiData = fetch(`https://geo.ipify.org/api/v1?apiKey=at_MtMdip93KaiHmQuJC6khzvk5SmPkY&ipAddress=${searchResult}`)
    .then(response => response.json())
    .then(data => data);
    console.log(searchResult);
    console.log(apiData);

  // check if input result has letter or number, check first character

  const firstChar = searchResult.charAt(0);

  if (isLetter(firstChar)){
    console.log('is letter')
  } else {
    console.log('number')
  }

  // if number - add ipAddress parameter
  // if string - add domain parameter
  // check response of API

  // show result of API on map
}

const mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'your.mapbox.access.token'
// }).addTo(mymap);

const form = document.getElementById('form');
form.addEventListener('submit', (submitEvent) => {
  submitEvent.preventDefault();

  sendData();
})
