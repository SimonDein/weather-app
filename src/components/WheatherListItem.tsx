import { Location } from "../types/types.ts";

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

function getWeatherDataForLocation(location: Location) {
  // const [data, setData] = useState<CurrentWeatherResponse | null>();
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<Error | null>(null);

  console.log(location.coordinates);
  if (location.coordinates !== undefined) {
    // openWeather
    //   .getCurrentWeatherByGeoCoordinates(
    //     location.coordinates.latitude,
    //     location.coordinates.longitude
    //   )
    //   .then((response) => {
    //     console.log(response);
    //   });
  }

  // return { data, isLoading, error };
}

export function ConnectedWeatherListItem({ location }: { location: Location }) {
  getWeatherDataForLocation(location);

  return (
    <>
      <WheatherListItem locationName={location.name} currentTemperature={22} />
      <span>{location.coordinates?.latitude}</span>
    </>
  );
}
