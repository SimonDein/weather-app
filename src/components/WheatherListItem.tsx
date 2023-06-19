import { Location } from "../types/types.ts";
import { temparatureFormatter } from "../utils/format.ts";
import { useCurrentWeatherDataForLocation } from "../utils/hooks.ts";

// Handles the connection to any fetching of data
export function ConnectedWeatherListItem({
  location,
  onClick,
}: {
  location: Location;
  onClick: () => void;
}) {
  const { data, isLoading, error } = useCurrentWeatherDataForLocation(location);
  const isNoDataPresent = !data && !isLoading;
  const currentTemperature = data?.main?.temp ?? 0;
  const locationName = data?.name ?? location.name ?? "Unknown location";

  if (isLoading) {
    // Return fx. a loading skeleton
  }

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

interface WheatherListItemProps {
  disabled: boolean;
  onClick: () => void;
  error: Error | undefined;
  locationName: string;
  currentTemperature: number;
}

// Purely presentational. This would be nice to fx. use for mocking and to showcase different states in Storybook.
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
      <span className="text-lg">
        {temparatureFormatter.format(currentTemperature)}
      </span>
    </>
  );

  return (
    <li
      className="flex px-4 py-6 bg-cyan-950 rounded-md justify-between"
      onClick={!disabled ? onClick : undefined}
    >
      <span className="text-lg font-semibold">{locationName}</span>
      <div className="flex flex-col">{content}</div>
    </li>
  );
}
