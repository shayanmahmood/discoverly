import {
  ArrowLeft,
  Calendar,
  CalendarClockIcon,
  Check,
  Clock,
  ExternalLink,
  MapPin,
  Share2,
  TicketCheckIcon,
  TicketIcon,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { useEventDetails } from "../../Contexts/Events/EventDetailsProvider";
import { Badge } from "../ui/Badge";

/* eslint-disable react/react-in-jsx-scope */
function EventsDetailHeroSection() {
  const {
    event,
    handleRegister,
    isRegister,
    isCopy,
    handleShare,
    handleSaveToCalendar,
    saveCalendar,
  } = useEventDetails();
  return (
    <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 z-20 flex flex-col justify-end">
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl">
            <Link
              to="/events"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to events</span>
            </Link>
            <br />
            <Badge className="mb-4">{event.category}</Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {event.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-white/90 mb-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                <span>{event.attendees} attending</span>
              </div>
            </div>

            <div className="flex flex-wrap space-x-3 mb-4">
              <Button
                onClick={handleRegister}
                size="lg"
                className="gap-2"
                disabled={isRegister}
              >
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
              <Button
                variant="secondary"
                size="lg"
                onClick={handleSaveToCalendar}
                className="gap-2"
              >
                {saveCalendar ? (
                  <>
                    <CalendarClockIcon className="h-5 w-5" />
                    Save again Google Calendar
                  </>
                ) : (
                  <>
                    <ExternalLink className="h-5 w-5" />
                    Save to Google Calendar
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
                className="bg-background/20 backdrop-blur-sm hover:bg-background/30 border-white/20"
              >
                {isCopy ? (
                  <Check className="h-5 w-5 text-white" />
                ) : (
                  <Share2 className="h-5 w-5 text-white" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsDetailHeroSection;
