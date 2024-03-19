
        document.addEventListener('DOMContentLoaded', function () {
            const countrySelect = document.getElementById('countrySelect');
            const countryCard = document.getElementById('countryCard');
            const weatherCard = document.getElementById('weatherCard');
            const countryName = document.getElementById('countryName');
            const capitalElement = document.getElementById('capital');
            const latlngElement = document.getElementById('latlng');
            const regionElement = document.getElementById('region');
            const weatherTitle = document.getElementById('weatherTitle');
            const temperatureElement = document.getElementById('temperature');
            const weatherDescriptionElement = document.getElementById('weatherDescription');

            // Fetch countries data from Rest Countries API
            fetch('https://restcountries.com/v3.1/all')
                .then(response => response.json())
                .then(countries => {
                    countries.forEach(country => {
                        const option = document.createElement('option');
                        option.value = country.name.common;
                        option.textContent = country.name.common;
                        countrySelect.appendChild(option);
                    });
                })
                .catch(error => console.error('Error fetching countries:', error));

            // Event listener for country selection
            countrySelect.addEventListener('change', function () {
                const selectedCountry = countrySelect.value;

                // Display country information
                const selectedCountryData = countries.find(country => country.name.common === selectedCountry);
                countryName.textContent = selectedCountryData.name.common;
                capitalElement.textContent = selectedCountryData.capital[0];
                latlngElement.textContent = selectedCountryData.latlng.join(', ');
                regionElement.textContent = selectedCountryData.region;

                // Show the country card
                countryCard.style.display = 'block';

                // Fetch weather data from OpenWeatherMap API
                const apiKey = '95535c8aa6957755d94d2cd333c138e5';
                const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCountryData.capital[0]}&appid=${apiKey}`;

                fetch(weatherApiUrl)
                    .then(response => response.json())
                    .then(weatherData => {
                        const temperature = weatherData.main.temp;
                        const weatherDescription = weatherData.weather[0].description;

                        // Display weather information
                        weatherTitle.textContent = `Weather in ${selectedCountryData.capital[0]}`;
                        temperatureElement.textContent = temperature;
                        weatherDescriptionElement.textContent = weatherDescription;

                        // Show the weather card
                        weatherCard.style.display = 'block';
                    })
                    .catch(error => console.error('Error fetching weather:', error));
            });
        });
  