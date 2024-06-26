import { useEffect, useState } from "react";
import { Coordinates, Location } from "../types/types.ts";
import { CurrentResponse } from "openweathermap-ts/dist/types";
import { openWeather } from "./openWeatherAPI.ts";

function useCurrentCurrentCoordinates() {
  const [locationCoordinates, setLocationCoordinates] = useState<
    Coordinates | undefined
  >(undefined);

  function onSuccess(position: GeolocationPosition) {
    const { latitude, longitude } = position.coords;
    setLocationCoordinates({ latitude, longitude });
  }

  useEffect(() => {
    return navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  return locationCoordinates;
}

async function getWeatherForLocation(location: Location) {
  if (location.coordinates !== undefined) {
    return openWeather.getCurrentWeatherByGeoCoordinates(
      location.coordinates?.latitude,
      location.coordinates?.longitude
    );
  }
  if (location.zipCode !== undefined) {
    return openWeather.getCurrentWeatherByZipcode(location.zipCode);
  }

  if (location.name !== undefined) {
    return openWeather.getCurrentWeatherByCityName({
      cityName: location.name,
    });
  }
}

function useCurrentWeatherDataForLocation(location: Location) {
  const [data, setData] = useState<CurrentResponse | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  async function fetchData() {
    try {
      // Reset error state on retry
      setError(undefined);
      setIsLoading(true);
      const weather = await getWeatherForLocation(location);

      if (weather === undefined || weather?.main === undefined) {
        throw new Error("No weather data found");
      }

      setData(weather);
    } catch (error) {
      console.log(error);
      // @ts-ignore
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [location]);

  return { data, isLoading, error };
}

export { useCurrentWeatherDataForLocation, useCurrentCurrentCoordinates };
