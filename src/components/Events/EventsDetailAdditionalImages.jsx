import { useEventDetails } from "../../Contexts/Events/EventDetailsProvider";
import { AspectRatio } from "../ui/AspectRation";

/* eslint-disable react/react-in-jsx-scope */
function EventsDetailAdditionalImages() {
  const { extendedDetails } = useEventDetails();
  return (
    <>
      {extendedDetails?.additionalImages &&
        extendedDetails.additionalImages.length > 0 && (
          <section className="bg-card rounded-xl border p-6">
            <h2 className="text-2xl font-bold mb-4">Event Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {extendedDetails.additionalImages.map((img, index) => (
                <div key={index} className="rounded-lg overflow-hidden">
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={img}
                      alt={`Event gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </div>
              ))}
            </div>
          </section>
        )}
    </>
  );
}

export default EventsDetailAdditionalImages;
