/* eslint-disable react/react-in-jsx-scope */
import { useEventDetails } from "../../Contexts/Events/EventDetailsProvider";

function EventsDetailsAgenda() {
  const { extendedDetails } = useEventDetails();
  return (
    <>
      {extendedDetails?.agenda && extendedDetails.agenda.length > 0 && (
        <section className="bg-card rounded-xl border p-6">
          <h2 className="text-2xl font-bold mb-4">Event Agenda</h2>
          <div className="space-y-4">
            {extendedDetails.agenda.map((item, index) => (
              <div
                key={index}
                className="flex border-b border-border pb-4 last:border-0"
              >
                <div className="w-24 font-medium text-primary">{item.time}</div>
                <div>{item.activity}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default EventsDetailsAgenda;
