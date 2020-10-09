// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Routes
app.get('/', (req, res, next) => {
  res.status(200).json(projectData);
});

app.post('/', (req, res, next) => {
  const { temperature, date, userResponse } = req.body;
  if (!temperature || !date || !userResponse) {
    res.status(422).send('missing payload');
  }
  projectData = { temperature, date, userResponse };
  res.status(200).json(projectData);
});

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
app.listen(3000, () => {
  console.log('Server is running on 3000');
});
