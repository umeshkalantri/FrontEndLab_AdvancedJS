// Search functionality
let inputCity = document.getElementById('search');

inputCity.addEventListener('keypress', ( e ) => {
    if (e.key === "Enter") {
        getResults(e.target.value);
        e.target.value = '';
    }
});

// API call : api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const api = {
    url: "https://api.openweathermap.org/data/2.5/weather?q=",
    key: "93c4a59b8da61584994e0c6f78e49637"
};

function getResults( cityName ) {
    fetch( `${api.url}${cityName}&appid=${api.key}&units=metric` )
    .then( result => {
        if (result.ok) {
            return result.json();
        } else {
            console.log("Error: city name invalid");
        }
     } ) 
    .then( res => {
        if (res === undefined) {
            console.log("Error!!");
            alert("Enter valid city name or City not found!");
        } else {
            displayResults(res);
        }
    } );
}

function displayResults( res ) {
    let cityName = document.getElementById('city');
    cityName.innerText = `${res.name}, ${res.sys.country}`;

    let dateInfo = document.getElementById('date');
    dateInfo.innerText = formatDate();

    let temperatureDisplay = document.getElementById('temp');
    temperatureDisplay.innerText = `${res.main.temp}°C`;

    let weatherInfo = document.getElementById('weather');
    weatherInfo.innerText = `${res.weather[0].main}
    ${Math.floor(res.main.temp_min)}°C / ${Math.floor(res.main.temp_max)}°C`;
}

function formatDate() {
    let currdate = new Date();
    let day = currdate.getDay();
    let date = currdate.getDate();
    let month = currdate.getMonth();
    let year = currdate.getFullYear();

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return `${days[day]} ${date} ${months[month]} ${year}`;
}

window.onload = getResults('Delhi');
