import './style.css'
//set variable with empty string, then update it
// get value on submit - wrap button on a form
let searchResult = ''

const searchResultInput = document.querySelector('input');
searchResultInput.addEventListener('input', (inputEvent)  => {
  searchResult = inputEvent.target.value;
})

const sendData = () => {
  // send search result to API
    const apiData = fetch(`https://geo.ipify.org/api/v1?apiKey=at_MtMdip93KaiHmQuJC6khzvk5SmPkY&ipAddress=${searchResult}`)
    .then(response => response.json())
    .then(data => data);
    console.log(searchResult);
    console.log(apiData);

  // check if input result has letter or number, check first character
  // if number - add ipAddress parameter
  // if string - add domain parameter
  // check response of API

  // show result of API on map
}

const form = document.getElementById('form');
form.addEventListener('submit', (submitEvent) => {
  submitEvent.preventDefault();

  sendData();
})
