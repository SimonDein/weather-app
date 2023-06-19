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
import { BsSunrise, BsSunset } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineVisibility } from "react-icons/md";
import { IoSunnyOutline } from "react-icons/io5";

export function DetailsPage({
  location,
  onBack,
}: {
  location: Location;
  onBack: () => void;
}) {
  const { data, isLoading, error } = useCurrentWeatherDataForLocation(location);

  if (isLoading) {
    return null; // We could use this flag to fx. display some nice loading animation
  }

  if (error) {
    return <div>{error.name}</div>;
  }

  if (!data) {
    return (
      <span>
        Something unexpected happened. Please contact supports if this is a
        recurring issue.
      </span>
    );
  }

  const formattedVisibilityInKM = distanceFormatter.format(
    data.visibility / 1000
  );

  return (
    <div className="flex flex-col relative items-center h-full pb-4 gap-4">
      <div>
        <Button className="absolute top-0 left-0 items-center" onClick={onBack}>
          <IoIosArrowRoundBack size={40} />
        </Button>
        <div className="flex items-center">
          <PageTitle>{location.name}</PageTitle>
        </div>
      </div>

      {!isLoading && (
        <div className="flex flex-col gap-4 justify-center sm:flex-row items-center h-full w-full">
          <div className="flex flex-1 gap-4 h-full flex-col justify-center items-center bg-cyan-950 w-full rounded-md">
            <div className="flex flex-col items-center">
              <IoSunnyOutline size={80} className="text-yellow-400" />
              <span>{data?.weather[0].main}</span>
            </div>
            <span className="text-4xl">
              {temparatureFormatter.format(data.main.temp)}
            </span>

            <div className="flex gap-4">
              <span>L: {temparatureFormatter.format(data?.main.temp_min)}</span>
              <span>H: {temparatureFormatter.format(data?.main.temp_max)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1 w-full h-full justify-center">
            <div className="flex h-full w-full gap-4">
              <WeatherMetaDataTile
                className="flex-1"
                icon={<BsSunrise size={40} />}
                value={unixToLocaleTimeString(data.sys.sunrise)}
              />
              <WeatherMetaDataTile
                icon={<BsSunset size={40} />}
                value={unixToLocaleTimeString(data.sys.sunset)}
              />
            </div>
            <div className="flex h-full w-full gap-4">
              <WeatherMetaDataTile
                icon={<WiHumidity size={40} />}
                className="flex-1"
                value={`${data.main.humidity}%`}
              />
              <WeatherMetaDataTile
                className="flex-1"
                icon={<MdOutlineVisibility size={40} />}
                value={formattedVisibilityInKM}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function WeatherMetaDataTile({
  value,
  icon,
  className,
}: {
  value: number | string;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex border flex-col justify-center items-center flex-1 p-4 border-cyan-900 rounded-md ${className}`}
    >
      {/*<span className="whitespace-nowrap">{title}</span>*/}
      <span className="whitespace-nowrap">{icon}</span>
      <span className="whitespace-nowrap text-xl">{value}</span>
    </div>
  );
}
