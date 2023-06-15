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
      name: "Oslo",
      coordinates: undefined,
      zipCode: undefined,
    },
    {
      name: "London",
      coordinates: undefined,
      zipCode: undefined,
    },
  ];

  return (
    <>
      <ul>
        {locations.map((location, index) => (
          <ConnectedWeatherListItem location={location} key={index} />
        ))}
      </ul>
    </>
  );
}

export default App;
