import { Location } from "../types/types.ts";
import { Button } from "../components/Button.tsx";
import { IoIosArrowRoundBack } from "react-icons/io";

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
