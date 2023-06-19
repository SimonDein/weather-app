import { useCurrentCurrentCoordinates } from "./utils/hooks.ts";
import { Location } from "./types/types.ts";
import { useState } from "react";
import { DashboardPage } from "./pages/DashboardPage.tsx";
import { DetailsPage } from "./pages/DetailsPage.tsx";

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
      <DashboardPage
        locations={locations}
        onSelectLocation={(location: Location) => setSelectedLocation(location)}
      />
    ) : (
      <DetailsPage
        location={selectedLocation}
        onBack={() => setSelectedLocation(undefined)}
      />
    );

  return (
    <main className="px-4 pt-4 bg-slate-950 text-white App">{currentPage}</main>
  );
}

export default App;
