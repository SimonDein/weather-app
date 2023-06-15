import { ConnectedWeatherListItem } from "./components/WheatherListItem.tsx";
import { useCurrentCurrentCoordinates } from "./utils/useCurrentCoordinates.ts";
import { Location } from "./types/types.ts";

function App() {
  const locations: Location[] = [
    {
      name: "Current location",
      coordinates: useCurrentCurrentCoordinates(),
      zipCode: undefined,
    },
    {
      name: "London",
      coordinates: undefined,
      zipCode: undefined,
    },
  ];

  return (
    <div className="px-4 pt-4 bg-gray-950 text-white App">
      <h1 className="text-xl">Dashboard</h1>
      <ul className="flex flex-col gap-2">
        {locations.map((location, index) => (
          <ConnectedWeatherListItem
            onClick={() => console.log(locations[index])}
            location={location}
            key={index}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
