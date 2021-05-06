window.addEventListener("load", () => {
    
  let long;
  let lat;
  let temperatureDescription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimeZone = document.querySelector(".location-timezone");
  let iconDOM = document.querySelector(".icon");
  let temperatureUnit = document.querySelector(".temperature-unit");
  let date = document.querySelector(".date");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)

      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=b29ce28bbc55ccd2748e0ce2e458781d`;

      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const temp = Math.floor(data.main.temp);
          const fahrenheit = Math.floor(temp * 1.8 + 32);
          const summary = data.weather[0].description;
          const timeZone = data.name;
          const icon = data.weather[0].icon;

          // set DOM elements from the API
          locationTimeZone.textContent = timeZone;
          temperatureDescription.textContent = summary;
          temperatureDegree.textContent = temp;
          iconDOM.innerHTML = `<img src = "http://openweathermap.org/img/wn/${icon}@2x.png">`;

          document.querySelector(".degree-section").addEventListener("click", () => {
              if (temperatureUnit.textContent === "°C") {
                temperatureUnit.textContent = "°F";
                temperatureDegree.textContent = fahrenheit;
              } else {
                temperatureUnit.textContent = "°C";
                temperatureDegree.textContent = temp;
              }
            });
        });

      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

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

      let dayName = days[new Date().getDay()];
      let dayNo = new Date().getDate();
      let month = months[new Date().getMonth()];
      let year = new Date().getFullYear();

      date.innerHTML = `${dayName} ${dayNo} ${month} ${year}`;
    });
  }
});
