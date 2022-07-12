/* Global Variables */
const prefixURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const suffixURL = '&units=imperial&APPID=9c98cf1e73ffd85584542716f6edc40f'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();


//listen to click event on button show weather
document.getElementById('generate').addEventListener('click', handleWeatherActions)

//Function that handle click event on the button to perform chained async actions.
function handleWeatherActions(e) {
    const zip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    if(zip && content){
        getCityWeather(prefixURL, zip, suffixURL)//get data from external API

        .then(function (data) {
            if(data.cod === 200){
                const {weather:[{main}],main:{temp}} = data;
                const postedData = {newDate, temp, main, content}

                postCityWeather('/add', postedData);//save data to our app endpoint

                showCityWeather()//update UI with new data
                document.getElementById('entryHolder').style.cssText= `opacity: 1; transition: all 2s;`;
            }
            else{
                document.getElementById('error').innerHTML = `Change ZIPCODE`;
                document.getElementById('error').style.cssText= `opacity: 1`;
            }
        }) 
    }
    else{
        document.getElementById('error').innerHTML = `Empty fields are not allowed`;
        document.getElementById('error').style.cssText= `opacity: 1`;
    }    
}



//GET weather data from external API
const getCityWeather = async (baseURL, zip, key) => {
    const response = await fetch(`${baseURL}${zip}${key}`);
    try{
        const data = await response.json();
        return data
    }catch(error){
        console.log(error)
    }
}

//Save recieved Data from external API to our App
const postCityWeather = async (url='' , receivedData={})=> {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(receivedData)
    })

    try{
        const data = await response.json();
    }catch(error){
        console.log(error)
    }
}

//Show these data on our app's UI
const showCityWeather = async () => {
    const request = await fetch('/all')
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = `${allData.newDate}`;
        document.getElementById('main').innerHTML = `${allData.main}`;
        document.getElementById('temp').innerHTML = `${Math.round(allData.temp)} <span>F<sup>o</sup></span>`
        document.getElementById('content').innerHTML = `${allData.content}`
        
    }catch(error){
        console.log(error);
    }
}

//hide error message
const hideError = e => document.querySelector('div#error').style.opacity = 0;







//document.getElementById('error').style.opacity = 0;

