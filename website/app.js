/* Global Variables */
const API_KEY = 'fce79c782428128cb595bec2a1977f31';
const baseURL = `http://api.openweathermap.org/data/2.5/weather`;

const fetchWeather = async (baseURL, zip, API_KEY) => {
  const res = await fetch(
    `${baseURL}?appid=${API_KEY}&zip=${zip}&units=imperial`
  );
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('Ooops... ', err);
  }
};

const retrieveWeather = async () => {
  const res = await fetch('/weather');
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('Ooops... ', err);
  }
};

const postData = async (path, data = {}) => {
  return await fetch(path, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    body: JSON.stringify(data),
  });
};

const postWeather = async (temperature) => {
  let d = new Date();
  let date = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
  const userResponse = document.getElementById('feelings').value;
  const res = await postData('/weather', { temperature, date, userResponse });
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Ooops... ', err);
  }
};

const updateUIHandler = (data) => {
  const dateEle = document.getElementById('date');
  const tempEle = document.getElementById('temp');
  const contentEle = document.getElementById('content');
  dateEle.innerHTML = `Date: ${data.date}`;
  tempEle.innerHTML = `Temperature: ${data.temperature}`;
  contentEle.innerHTML = `User Input: ${data.userResponse}`;
};

// Submitting form
const onGenerateClickHandler = async () => {
  const zipCode = document.getElementById('zip').value;
  if (!zipCode.trim()) return;
  // async method to Fetch weather from OpenWeatherMap.com
  fetchWeather(baseURL, zipCode, API_KEY).then((res) => {
    if (res.main && res.main.temp) {
      // async method to save weather data
      postWeather(res.main.temp).then((_) => {
        // async method to Retrieve latest weather
        retrieveWeather().then((data) => {
          // Update UI handler
          updateUIHandler(data);
        });
      });
    }
  });
};

const generateElement = document.getElementById('generate');
generateElement.addEventListener('click', onGenerateClickHandler);
