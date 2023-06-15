import { Location } from "../types/types.ts";
import { useEffect, useState } from "react";
import { openWeather } from "../utils/openWeatherAPI.ts";
import { CurrentResponse } from "openweathermap-ts/dist/types";

interface WheatherListItemProps {
  locationName: string;
  currentTemperature: number;
}

const temparatureFormatter = new Intl.NumberFormat("no-NO", {
  style: "unit",
  unit: "celsius",
  maximumFractionDigits: 0,
});

export function WheatherListItem({
  locationName,
  currentTemperature,
}: WheatherListItemProps) {
  return (
    <li className="flex px-2 py-4 bg-slate-900 rounded-md justify-between">
      <span>{locationName}</span>
      <span>{temparatureFormatter.format(currentTemperature)}</span>
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

function useCurrentWeatherDataForLocation(location: Location) {
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

export function ConnectedWeatherListItem({ location }: { location: Location }) {
  const { data } = useCurrentWeatherDataForLocation(location);
  console.log(data);
  const currentTemperature = data?.main?.temp ?? 0;
  const locationName = data?.name ?? location.name ?? "Unknown location";

  return (
    <WheatherListItem
      locationName={locationName}
      currentTemperature={currentTemperature}
    />
  );
}
