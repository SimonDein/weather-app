import { Location } from "../types/types.ts";
import { temparatureFormatter, windSpeedFormatter } from "../utils/format.ts";
import { useCurrentWeatherDataForLocation } from "../utils/hooks.ts";

interface WheatherListItemProps {
  onClick: () => void;
  locationName: string;
  currentTemperature: number;
  windSpeed: number | undefined;
}

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
