const api = {
  key: "ec935391c16814478414863566b78b76",
  base: "http://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  console.log("setQuery");
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  console.log("getResults");
  fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then((weather) => {
    //   console.log(weather.json());
    //   var weatherData = weather;
    //   displayResults(weatherData);
      return weather.json();
    })
    .then((data) => {
        console.log(data)
        displayResults(data)
    });
  //     }
  //   );
}

function displayResults(weather) {
  console.log("displayResults");
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°f</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(weather.main.temp_min)}°f / ${Math.round(
    weather.main.temp_max
  )}°f`;
}

function dateBuilder(d) {
  console.log("dateBuilder");
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
