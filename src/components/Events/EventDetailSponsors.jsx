import { useEventDetails } from "../../Contexts/Events/EventDetailsProvider";
import { Badge } from "../ui/Badge";

/* eslint-disable react/react-in-jsx-scope */
function EventDetailSponsors() {
  const { extendedDetails } = useEventDetails();
  return (
    <>
      {extendedDetails?.sponsors && extendedDetails.sponsors.length > 0 && (
        <section className="bg-card rounded-xl border p-6">
          <h2 className="text-2xl font-bold mb-4">Event Sponsors</h2>
          <div className="flex flex-wrap gap-2">
            {extendedDetails.sponsors.map((sponsor, index) => (
              <Badge key={index} variant="secondary" className="text-sm py-1">
                {sponsor}
              </Badge>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default EventDetailSponsors;
