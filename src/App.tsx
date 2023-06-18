import { ConnectedWeatherListItem } from "./components/WheatherListItem.tsx";
import { useCurrentCurrentCoordinates } from "./utils/useCurrentCoordinates.ts";
import { Location } from "./types/types.ts";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Button } from "./components/Button.tsx";

function App() {
  const [selectedLocation, setSelectedLocation] = useState<
    Location | undefined
  >(undefined);
  const locations: Location[] = [
    {
      name: "Current location",
      coordinates: useCurrentCurrentCoordinates(),
      zipCode: undefined,
    },
    {
      name: "Nuuk",
      coordinates: undefined,
      zipCode: undefined,
    },
  ];

  const currentPage =
    selectedLocation === undefined ? (
      <Dashboard
        locations={locations}
        onSelectLocation={(location) => setSelectedLocation(location)}
      />
    ) : (
      <DetailsPage
        location={selectedLocation}
        onBack={() => setSelectedLocation(undefined)}
      />
    );

  return (
    <main className="px-4 pt-4 bg-gray-950 text-white App">{currentPage}</main>
  );
}

export function DetailsPage({
  location,
  onBack,
}: {
  location: Location;
  onBack: () => void;
}) {
  return (
    <div>
      <Button onClick={onBack}>
        <IoIosArrowRoundBack size={40} />
      </Button>
      <span>Detail</span>
      <div>
        <span>{location.name}</span>
      </div>
    </div>
  );
}

export function Dashboard({
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

export default App;
