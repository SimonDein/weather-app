import { Location } from "../types/types.ts";
import { Button } from "../components/Button.tsx";
import { IoIosArrowRoundBack } from "react-icons/io";
import { PageTitle } from "../components/PageTitle.tsx";
import {
  distanceFormatter,
  temparatureFormatter,
  unixToLocaleTimeString,
} from "../utils/format.ts";
import { useCurrentWeatherDataForLocation } from "../utils/hooks.ts";

export function DetailsPage({
  location,
  onBack,
}: {
  location: Location;
  onBack: () => void;
}) {
  const { data, isLoading, error } = useCurrentWeatherDataForLocation(location);

  if (error) {
    return <div>{error.name}</div>;
  }

  if (!data) {
    return null; // TODO: Handle missing data
  }

  // Get the local date and time components from the Date object
  const formattedVisibilityInKM = distanceFormatter.format(
    data.visibility / 1000
  );
  return (
    <div className="flex flex-col items-center h-full pb-4">
      <div className="flex items-center">
        <Button className="flex items-center" onClick={onBack}>
          <IoIosArrowRoundBack size={40} />
        </Button>
        <PageTitle>{location.name}</PageTitle>
      </div>

      {!isLoading && (
        <div className="flex flex-col justify-center sm:flex-row items-center h-full w-full">
          <div className="flex flex-1 flex-col justify-center items-center">
            <span>{data?.weather[0].main}</span>
            <span className="text-4xl">
              {temparatureFormatter.format(data.main.temp)}
            </span>

            <div className="flex gap-4">
              <span>L: {data?.main.temp_min}</span>
              <span>H: {data?.main.temp_max}</span>
            </div>
          </div>

          <div className="flex flex-col flex-1 w-full justify-center">
            <div className="aspect-square flex flex-col">
              <div className="flex border-b h-full w-full">
                <WeatherMetaDataTile
                  className="border-r flex-1"
                  title="Sunrise"
                  value={unixToLocaleTimeString(data.sys.sunrise)}
                />
                <WeatherMetaDataTile
                  title="Sunset"
                  value={unixToLocaleTimeString(data.sys.sunset)}
                />
              </div>
              <div className="flex h-full w-full">
                <WeatherMetaDataTile
                  title="Humidity"
                  className="border-r flex-1"
                  value={`${data.main.humidity}%`}
                />
                <WeatherMetaDataTile
                  className="flex-1"
                  title="Visibility"
                  value={formattedVisibilityInKM}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function WeatherMetaDataTile({
  title,
  value,
  className,
}: {
  title: string;
  value: number | string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col justify-center items-center flex-1 p-4 ${className}`}
    >
      <span className="whitespace-nowrap">{title}</span>
      <span className="whitespace-nowrap">{value}</span>
    </div>
  );
}
