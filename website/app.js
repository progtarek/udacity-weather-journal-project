/* Global Variables */
const API_KEY = 'fce79c782428128cb595bec2a1977f31';
const baseURL = `http://api.openweathermap.org/data/2.5/weather`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const fetchWeather = async (baseURL, zip, API_KEY) => {
  const res = await fetch(`${baseURL}?appid=${API_KEY}&zip=${zip}`);
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('Ooops... ', err);
  }
};

const onGenerateClickHandler = async () => {
  const res = await fetchWeather(baseURL, 94040, API_KEY);
  console.log(res);
};

const generateElement = document.getElementById('generate');
generateElement.addEventListener('click', onGenerateClickHandler);
