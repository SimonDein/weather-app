import { Location } from "../types/types.ts";
import { ConnectedWeatherListItem } from "../components/WheatherListItem.tsx";

export function DashboardPage({
  locations,
  onSelectLocation,
}: {
  locations: Location[];
  onSelectLocation: (location: Location) => void;
}) {
  return (
    <>
      <h1 className="text-xl">Dashboard</h1>
      <ul className="flex flex-col gap-2">
        {locations.map((location, index) => (
          <ConnectedWeatherListItem
            onClick={() => onSelectLocation(location)}
            location={location}
            key={index}
          />
        ))}
      </ul>
    </>
  );
}
