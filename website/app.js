/* Global Variables */
const API_KEY = 'fce79c782428128cb595bec2a1977f31';
const baseURL = `http://api.openweathermap.org/data/2.5/weather`;

const fetchWeather = async (baseURL, zip, API_KEY) => {
  const res = await fetch(`${baseURL}?appid=${API_KEY}&zip=${zip}`);
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

const saveWeatherData = async (temperature) => {
  let d = new Date();
  let date = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
  const userResponse = document.getElementById('feelings').value;
  const res = await postData('/', { temperature, date, userResponse });
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Ooops... ', err);
  }
};

const onGenerateClickHandler = async () => {
  const zipCode = document.getElementById('zip').value;
  if (!zipCode.trim()) return;
  fetchWeather(baseURL, zipCode, API_KEY).then((res) => {
    saveWeatherData(res.main.temp).then((res) => {
      console.log('==================================');
      console.log(res);
      console.log('==================================');
    });
  });
};

const generateElement = document.getElementById('generate');
generateElement.addEventListener('click', onGenerateClickHandler);
