import { Location } from "../types/types.ts";
import { temparatureFormatter } from "../utils/format.ts";
import { useCurrentWeatherDataForLocation } from "../utils/hooks.ts";

interface WheatherListItemProps {
  disabled: boolean;
  onClick: () => void;
  error: Error | undefined;
  locationName: string;
  currentTemperature: number;
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
  const isNoDataPresent = !data && !isLoading;
  console.log(isNoDataPresent);
  const currentTemperature = data?.main?.temp ?? 0;
  const locationName = data?.name ?? location.name ?? "Unknown location";

  return (
    <WheatherListItem
      disabled={isNoDataPresent || error !== undefined}
      onClick={onClick}
      error={error}
      locationName={locationName}
      currentTemperature={currentTemperature}
    />
  );
}

export function WheatherListItem({
  disabled,
  onClick,
  error,
  locationName,
  currentTemperature,
}: WheatherListItemProps) {
  const content = error ? (
    <span className="text-gray-400">{error.message}</span>
  ) : (
    <>
      <span>{temparatureFormatter.format(currentTemperature)}</span>
    </>
  );

  return (
    <li
      className="flex px-2 py-4 bg-cyan-950 rounded-md justify-between"
      onClick={!disabled ? onClick : undefined}
    >
      <span>{locationName}</span>
      <div className="flex flex-col">{content}</div>
    </li>
  );
}
