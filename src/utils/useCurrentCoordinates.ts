import { useEffect, useState } from "react";
import { Coordinates } from "../types/types.ts";

export function useCurrentCurrentCoordinates() {
  const [locationCoordinates, setLocationCoordinates] = useState<
    Coordinates | undefined
  >(undefined);

  function onSuccess(position: GeolocationPosition) {
    const { latitude, longitude } = position.coords;
    setLocationCoordinates({ latitude, longitude });
  }

  useEffect(() => {
    return navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  return locationCoordinates;
}
