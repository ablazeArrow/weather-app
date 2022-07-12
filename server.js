// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')//bodyParser is deprecated so i used express instead.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;
const server = app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`)
})

//route to show all dta
app.get('/all', (request, response) => {
    response.send(projectData);
})

//route to save data retrieved from external API
app.post('/add', (request, response) => {
    const weather = request.body;
    const {newDate, temp, main, content} = weather;

    projectData = {
        newDate,
        temp,
        main, 
        content
    }
})
