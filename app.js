const apiKey = '0d307a226a4730a1745234b052fe53ff'; // Replace with your actual API key

// Theme toggle function
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const themeToggle = document.querySelector('.theme-toggle');
    if (document.body.classList.contains('dark-theme')) {
        themeToggle.textContent = '🌙'; // Moon icon for dark theme
    } else {
        themeToggle.textContent = '☀️'; // Sun icon for light theme
    }
}

// Fetch weather data
async function getWeather() {
    const city = document.getElementById('city').value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    
    if (data.cod === 200) {
        // Set weather info
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        // Change background gradient based on weather condition
        setBackground(data.weather[0].main);
    } else {
        document.getElementById('weather-info').innerHTML = `
            <p>${data.message}</p>
        `;
        // Reset background gradient if weather not found
        resetBackground();
    }
}

// Function to set gradient background based on weather type
function setBackground(weather) {
    const weatherInfo = document.getElementById('weather-info');
    switch (weather) {
        case 'Clear':
            weatherInfo.style.background = 'linear-gradient(to bottom, rgba(135, 206, 235, 0.8), rgba(255, 255, 255, 0.5))'; // Sky blue gradient
            break;
        case 'Clouds':
            weatherInfo.style.background = 'linear-gradient(to bottom, rgba(192, 192, 192, 0.8), rgba(255, 255, 255, 0.5))'; // Light grey gradient
            break;
        case 'Rain':
            weatherInfo.style.background = 'linear-gradient(to bottom, rgba(173, 216, 230, 0.8), rgba(0, 0, 139, 0.5))'; // Rainy gradient
            break;
        case 'Snow':
            weatherInfo.style.background = 'linear-gradient(to bottom, rgba(240, 248, 255, 0.8), rgba(255, 255, 255, 0.5))'; // Snowy gradient
            break;
        case 'Thunderstorm':
            weatherInfo.style.background = 'linear-gradient(to bottom, rgba(105, 105, 105, 0.8), rgba(0, 0, 0, 0.5))'; // Thunderstorm gradient
            break;
        case 'Drizzle':
            weatherInfo.style.background = 'linear-gradient(to bottom, rgba(211, 211, 211, 0.8), rgba(255, 255, 255, 0.5))'; // Drizzle gradient
            break;
        case 'Fog':
            weatherInfo.style.background = 'linear-gradient(to bottom, rgba(211, 211, 211, 0.8), rgba(255, 255, 255, 0.5))'; // Fog gradient
            break;
        default:
            resetBackground();
    }
}

// Function to reset background gradient
function resetBackground() {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.style.background = 'transparent'; // Reset to transparent
}
