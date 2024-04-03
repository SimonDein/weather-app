import { Location } from "../types/types.ts";
import { ConnectedWeatherListItem } from "../components/WeatherListItem.tsx";
import { PageTitle } from "../components/PageTitle.tsx";

export function DashboardPage({
  locations,
  onSelectLocation,
}: {
  locations: Location[];
  onSelectLocation: (location: Location) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <PageTitle>Dashboard</PageTitle>
      <ul className="flex flex-col gap-2">
        {locations.map((location, index) => (
          <ConnectedWeatherListItem
            onClick={() => onSelectLocation(location)}
            location={location}
            key={index}
          />
        ))}
      </ul>
    </div>
  );
}
