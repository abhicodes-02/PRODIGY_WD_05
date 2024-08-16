const apiKey="6af0bf46a6a3cc2582107eef6df3f951";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


const searchbox=document.querySelector(".searchbar input");
const searchbtn=document.querySelector(".searchbar button");

const weathericon=document.querySelector(".weather-icon");



async function checkWeatherbyLocation(lat,lon)
{
    console.log(lat,lon);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&q` + `&appid=${apiKey}`);
    var data=await response.json();


    document.querySelector(".cityname").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if(data.weather[0].main == "Clouds"){
         weathericon.src="clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weathericon.src="clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weathericon.src="rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weathericon.src="drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weathericon.src="mist.png";
    }

    document.querySelector(".weather").style.display="block";
}
async function getLocation(position){
      const result=await checkWeatherbyLocation(
        position.coords.latitude,
        position.coords.longitude
      );
}
function failedToGet(){
    console.log("There was some issue");
}
const but=document.getElementById('get-location-button');
but.addEventListener('click',()=>{
    navigator.geolocation.getCurrentPosition(getLocation,failedToGet);
});

async function checkWeatherbySearch(city)
{
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if(response.status==404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }
    else{
        var data=await response.json();


    document.querySelector(".cityname").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if(data.weather[0].main == "Clouds"){
         weathericon.src="clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weathericon.src="clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weathericon.src="rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weathericon.src="drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weathericon.src="mist.png";
    }

    document.querySelector(".weather").style.display="block";
    document.querySelector(".error").style.display="none";
}}

searchbtn.addEventListener("click",()=>{
    checkWeatherbySearch(searchbox.value);
    });