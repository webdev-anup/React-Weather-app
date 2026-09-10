import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";

function Weather() {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    city: "",
    country: "",
  });

  const APIKEY = "02f0363abcdd3d1100b1266d33c6c46d";

  async function weatherData(e) {
    e.preventDefault();

    if (form.city.trim() === "") {
      setError("Please enter a city name.");
      setWeather([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&APPID=${APIKEY}`,
      );

      const data = await response.json();

      if (!response.ok) {
        setWeather([]);
        setError(
          data.message === "city not found"
            ? "City not found. Please enter a valid city name."
            : "Unable to fetch weather data. Please try again.",
        );
        return;
      }

      setWeather({ data: data });
    } catch (err) {
      setWeather([]);
      setError("Something went wrong. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className="weather">
      <br />
      <br />

      <span className="title">GET WEATHER AROUND</span>

      <br />

      <span>
        This Weather app is a web application which will tell you
        <br />
        about the weather details of any particular city.
      </span>

      <br />
      <br />
      <br />

      <form onSubmit={weatherData}>
        <input
          type="text"
          placeholder="City"
          name="city"
          value={form.city}
          onChange={handleChange}
        />
        &nbsp; &nbsp; &nbsp;&nbsp;
        <input
          type="text"
          placeholder="Country"
          name="country"
          value={form.country}
          onChange={handleChange}
        />
        <br />
        <br />
        <br />
        <button className="getweather" type="submit">
          Submit
        </button>
        <br />
        <br />
      </form>

      {loading && <p>Loading weather...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && weather.data !== undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
}

export default Weather;
