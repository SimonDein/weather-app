import { Location } from "../types/types.ts";
import { temparatureFormatter, windSpeedFormatter } from "../utils/format.ts";
import { useCurrentWeatherDataForLocation } from "../utils/hooks.ts";

interface WheatherListItemProps {
  disabled: boolean;
  onClick: () => void;
  locationName: string;
  currentTemperature: number;
  windSpeed: number | undefined;
}

export function WheatherListItem({
  disabled,
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
      className="flex px-2 py-4 bg-cyan-950 rounded-md justify-between"
      onClick={!disabled ? onClick : undefined}
    >
      <span>{locationName}</span>
      <div className="flex flex-col">
        <span>{temparatureFormatter.format(currentTemperature)}</span>
        <span>{formattedWindSpeed}</span>
      </div>
    </li>
  );
}

export function ConnectedWeatherListItem({
  location,
  onClick,
}: {
  location: Location;
  onClick: () => void;
}) {
  console.log(location);
  const { data, isLoading, error } = useCurrentWeatherDataForLocation(location);
  console.log(data);
  const isNoDataPresent = !data && !isLoading;
  console.log(isNoDataPresent);
  const currentTemperature = data?.main?.temp ?? 0;
  const locationName = data?.name ?? location.name ?? "Unknown location";

  return (
    <WheatherListItem
      disabled={isNoDataPresent}
      onClick={onClick}
      locationName={locationName}
      windSpeed={data?.wind?.speed}
      currentTemperature={currentTemperature}
    />
  );
}
