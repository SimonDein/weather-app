import { Location } from "../types/types.ts";
import { useEffect, useState } from "react";
import { openWeather } from "../utils/openWeatherAPI.ts";
import { CurrentResponse } from "openweathermap-ts/dist/types";

interface WheatherListItemProps {
  onClick: () => void;
  locationName: string;
  currentTemperature: number;
  windSpeed: number | undefined;
}

export const temparatureFormatter = new Intl.NumberFormat("no-NO", {
  style: "unit",
  unit: "celsius",
  maximumFractionDigits: 0,
});

export const windSpeedFormatter = new Intl.NumberFormat("no-NO", {
  unit: "meter-per-second",
  maximumFractionDigits: 0,
  style: "unit",
});

export function WheatherListItem({
  onClick,
  locationName,
  currentTemperature,
  windSpeed,
}: WheatherListItemProps) {
  const formattedWindSpeed = windSpeed
    ? windSpeedFormatter.format(windSpeed)
    : "/";

  return (
    <li
      className="flex px-2 py-4 bg-slate-900 rounded-md justify-between"
      onClick={onClick}
    >
      <span>{locationName}</span>
      <div className="flex flex-col">
        <span>{temparatureFormatter.format(currentTemperature)}</span>
        <span>{formattedWindSpeed}</span>
      </div>
    </li>
  );
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
    return openWeather.getCurrentWeatherByCityName({ cityName: location.name });
  }
}

export function useCurrentWeatherDataForLocation(location: Location) {
  const [data, setData] = useState<CurrentResponse | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  async function fetchData() {
    try {
      setIsLoading(true);
      const weather = await getWeatherForLocation(location);
      setData(weather);
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [location]);

  return { data, isLoading, error };
}

export function ConnectedWeatherListItem({
  location,
  onClick,
}: {
  location: Location;
  onClick: () => void;
}) {
  const { data } = useCurrentWeatherDataForLocation(location);
  console.log(data);
  const currentTemperature = data?.main?.temp ?? 0;
  const locationName = data?.name ?? location.name ?? "Unknown location";

  return (
    <WheatherListItem
      onClick={onClick}
      locationName={locationName}
      windSpeed={data?.wind?.speed}
      currentTemperature={currentTemperature}
    />
  );
}
