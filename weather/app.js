

// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const notification2Element = document.querySelector(".notification2 p");
const notification4Element = document.querySelector(".notification4  p span");
const notification3Element = document.querySelector(".notification5 p span");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "db8b322ff2c095c09258b2c7d114ad9d";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.Pressurevalue = data.main.pressure;
            weather.windspeed = data.wind.speed;
        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}??<span>C</span>`;
    descElement.innerHTML = weather.description;
    if(weather.description=="overcast clouds"){
        notification2Element.innerHTML=`All fishermen should live the lake because a heavy rain with heavy storms is expected`;
    }
    else if(weather.description=="broken clouds"){
        notification2Element.innerHTML=`its ok to go for fishing provided you leave the lake at 5:00pm`;
    }
    else if(weather.description=="scattered clouds"){
        notification2Element.innerHTML=`its ok to go for fishing provided you leave the lake at 5:00pm`;
    }
    else if(weather.description=="light rain"){
        notification2Element.innerHTML=`its ok to go for fishing `;
    }
    
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    notification4Element.innerHTML =`${weather.Pressurevalue }Pa`;
    notification3Element.innerHTML = `${weather.windspeed}m/s`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}??<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}??<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

