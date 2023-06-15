import { Location } from "../types/types.ts";
import { useEffect, useState } from "react";
import { openWeather } from "../utils/openWeatherAPI.ts";
import { CurrentResponse } from "openweathermap-ts/dist/types";

interface WheatherListItemProps {
  locationName: string;
  currentTemperature: number;
}

export function WheatherListItem({
  locationName,
  currentTemperature,
}: WheatherListItemProps) {
  return (
    <li className="flex justify-between">
      <span>{locationName}</span>
      <span>{currentTemperature}</span>
    </li>
  );
}

function useCurrentWeatherDataForLocation(location: Location) {
  const [data, setData] = useState<CurrentResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  async function fetchData() {
    try {
      setIsLoading(true);
      const weather = await openWeather.getCurrentWeatherByGeoCoordinates(
        location?.coordinates?.latitude,
        location?.coordinates?.longitude
      );
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
  const currentTemperature = data?.main.temp ?? 0;

  return (
    <>
      <WheatherListItem
        locationName={location.name}
        currentTemperature={currentTemperature}
      />
      <span>{location.coordinates?.latitude}</span>
    </>
  );
}
