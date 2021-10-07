import './style.css'
let searchResult = ''
const baseUrl = 'https://geo.ipify.org/api/v1?apiKey=at_MtMdip93KaiHmQuJC6khzvk5SmPkY';


const searchResultInput = document.querySelector('input');
searchResultInput.addEventListener('input', (inputEvent)  => {
  searchResult = inputEvent.target.value;
})

// create Map with key-value pairs for each state
const statesMap = new Map([
  ['Alabama', 'AL'],
  ['Alaska', 'AK'],
  ['American Samoa', 'AS'],
  ['Arizona', 'AZ'],
  ['Arkansas', 'AR'],
  ['Armed Forces Americas', 'AA'],
  ['Armed Forces Europe', 'AE'],
  ['Armed Forces Pacific', 'AP'],
  ['California', 'CA'],
  ['Colorado', 'CO'],
  ['Connecticut', 'CT'],
  ['Delaware', 'DE'],
  ['District Of Columbia', 'DC'],
  ['Florida', 'FL'],
  ['Georgia', 'GA'],
  ['Guam', 'GU'],
  ['Hawaii', 'HI'],
  ['Idaho', 'ID'],
  ['Illinois', 'IL'],
  ['Indiana', 'IN'],
  ['Iowa', 'IA'],
  ['Kansas', 'KS'],
  ['Kentucky', 'KY'],
  ['Louisiana', 'LA'],
  ['Maine', 'ME'],
  ['Marshall Islands', 'MH'],
  ['Maryland', 'MD'],
  ['Massachusetts', 'MA'],
  ['Michigan', 'MI'],
  ['Minnesota', 'MN'],
  ['Mississippi', 'MS'],
  ['Missouri', 'MO'],
  ['Montana', 'MT'],
  ['Nebraska', 'NE'],
  ['Nevada', 'NV'],
  ['New Hampshire', 'NH'],
  ['New Jersey', 'NJ'],
  ['New Mexico', 'NM'],
  ['New York', 'NY'],
  ['North Carolina', 'NC'],
  ['North Dakota', 'ND'],
  ['Northern Mariana Islands', 'NP'],
  ['Ohio', 'OH'],
  ['Oklahoma', 'OK'],
  ['Oregon', 'OR'],
  ['Pennsylvania', 'PA'],
  ['Puerto Rico', 'PR'],
  ['Rhode Island', 'RI'],
  ['South Carolina', 'SC'],
  ['South Dakota', 'SD'],
  ['Tennessee', 'TN'],
  ['Texas', 'TX'],
  ['US Virgin Islands', 'VI'],
  ['Utah', 'UT'],
  ['Vermont', 'VT'],
  ['Virginia', 'VA'],
  ['Washington', 'WA'],
  ['West Virginia', 'WV'],
  ['Wisconsin', 'WI'],
  ['Wyoming', 'WY'],
]);

// check if input result has letter or number, check first character
const isLetter = (str) => {
  return str.length === 1 && str.match(/[a-z]/i);
}

// pass in region from data, finds it in Map and returns the value
const formatRegion = (state) => {
  return statesMap.get(state)
}

const updateData = async(data) => {
  document.getElementById('searchResultIp').innerHTML = data.ip;
  document.getElementById('searchResultLocation').innerHTML = `${data.location.city}, ${formatRegion(data.location.region)} </br>${data.location.postalCode}`;
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

const mymap = L.map('mapid', { zoomControl: false });

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
