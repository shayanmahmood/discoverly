import { Check, Mail, Share2, TicketCheckIcon, TicketIcon } from "lucide-react";
import { useEventDetails } from "../../Contexts/Events/EventDetailsProvider";
import { Button } from "../ui/Button";
import EventDetailSponsors from "./EventDetailSponsors";
import EventsDetailAdditionalImages from "./EventsDetailAdditionalImages";
import EventsDetailsAgenda from "./EventsDetailsAgenda";
import { Badge } from "../ui/Badge";
import { Input } from "../ui/Input";

/* eslint-disable react/react-in-jsx-scope */
function EventDetailSection() {
  const {
    extendedDetails,
    handleGetInfo,
    handleRegister,
    isCopy,
    handleShare,
    isRegister,
    isMessaged,
  } = useEventDetails();
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <section className="bg-card rounded-xl border p-6">
            <h2 className="text-2xl font-bold mb-4">About This Event</h2>
            <p className="text-muted-foreground leading-relaxed">
              {extendedDetails?.description || "No description available."}
            </p>
          </section>

          {/* Agenda */}
          <EventsDetailsAgenda />

          {/* Additional Images */}
          <EventsDetailAdditionalImages />

          {/* Sponsors */}
          <EventDetailSponsors />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Organizer Info */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-lg font-semibold mb-3">Organizer</h3>
            <p className="text-muted-foreground mb-4">
              {extendedDetails?.organizer || "Unknown organizer"}
            </p>
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={handleGetInfo}
              disabled={isMessaged}
            >
              <Mail className="h-4 w-4" />
              Get Event Info from Organizer
            </Button>

            {extendedDetails?.website && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Website</h3>
                <a
                  href={extendedDetails.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-block"
                >
                  {extendedDetails.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
          </div>

          {/* Ticket Info */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-lg font-semibold mb-3">Ticket Information</h3>
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-xl font-bold">
                  {extendedDetails?.ticketPrice || "Free"}
                </p>
              </div>
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20"
              >
                Available
              </Badge>
            </div>
            <Button
              className="w-full gap-2"
              onClick={handleRegister}
              disabled={isRegister}
            >
              <TicketIcon className="h-4 w-4" />
              {isRegister ? (
                <>
                  <TicketCheckIcon className="h-5 w-5" />
                  Registered
                </>
              ) : (
                <>
                  <TicketIcon className="h-5 w-5" />
                  Register Now
                </>
              )}
            </Button>
          </div>

          {/* Location Map Placeholder */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-lg font-semibold mb-3">Location</h3>
            <p className="text-muted-foreground mb-3">{event.location}</p>
            <div className="bg-muted rounded-md h-40 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Map view would be here
              </p>
            </div>
          </div>

          {/* Share & Social */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-lg font-semibold mb-3">Share This Event</h3>
            <div className="flex items-center space-x-2">
              <Input
                value={window.location.href}
                readOnly
                className="text-xs"
              />
              <Button variant="outline" size="sm" onClick={handleShare}>
                {isCopy ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Share2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailSection;
