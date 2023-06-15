import OpenWeatherMap from "openweathermap-ts";

const openWeather = new OpenWeatherMap({
  apiKey: "64ad740280c3ff976830c99298fed69c",
  units: "metric",
  language: "en",
});

export { openWeather };
