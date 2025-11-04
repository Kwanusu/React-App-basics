import { useState, useEffect } from "react";
import axios from "axios";

function Weather() {
   const [city, setCity] = useState("") ;
   const [weather, setWeather] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
   const API_KEY = import.meta.env.VITE_API_KEY;
   const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";


    const fetchWeather = async () => {
            if (!city.trim()) return;

            setLoading(true);
            setError("");
            setWeather(null);

            try {
                const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
                const response = await axios.get(
                    url
                );
                setWeather(response.data)
                
            } catch (error) {
                setError("City not found or API Key is invalid!")
            } finally {
                setLoading(false);
            }
    };
    useEffect(() => {
        fetchWeather(city)
    }, []);

   const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
   }

   return (
    <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-6">🌤️ Weather App</h1>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 mb-6 w-full max-w-md"
      >
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-lg animate-pulse">Fetching weather...</p>}

      {error && <p className="text-red-600">{error}</p>}

      {weather && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 w-80 text-center">
          <h2 className="text-2xl font-semibold mb-2">{weather.name}</h2>
          <p className="text-gray-600 mb-2">
            {weather.weather[0].description.toUpperCase()}
          </p>
          <p className="text-4xl font-bold mb-2">
            {Math.round(weather.main.temp)}°C
          </p>
          <div className="flex justify-around mt-4">
            <p>💧 {weather.main.humidity}%</p>
            <p>🌬️ {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
    </>
   )
}
export default Weather;