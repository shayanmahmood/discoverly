import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  Share2,
  BookmarkPlus,
  TicketIcon,
  TicketCheckIcon,
} from "lucide-react";
import { AspectRatio } from "../components/ui/AspectRation";
import { Input } from "../components/ui/Input";
import { toast } from "../components/ui/Use-Toast";
import { useEvents } from "../Contexts/EventProvider";
import EventNotFound from "./EventNotFound";

const EventDetails = () => {
  const { allEvents } = useEvents();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [extendedDetails, setExtendedDetails] = useState(null);
  const [register, setRegister] = useState(false);
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    if (id) {
      const foundEvent = allEvents.find((e) => e.id === id);
      if (foundEvent) {
        setEvent(foundEvent);
        // Get extended details if available
        const details = foundEvent.extendedEventDetails;
        if (details) {
          setExtendedDetails(details);
        }
      }
    }
  }, [id, allEvents]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Event link has been copied to clipboard",
      duration: 3000,
    });
  };

  const handleBookmark = () => {
    toast({
      title: "Event saved",
      description: "This event has been added to your bookmarks",
      duration: 3000,
    });
  };

  const handleRegister = () => {
    setRegister(true);
    toast({
      title: "Registration successful",
      description: `You are now registered for ${event?.title}`,
      duration: 3000,
    });
  };

  if (!event) {
    return <EventNotFound />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
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
                  to="/"
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

                <div className="flex space-x-3">
                  <Button
                    onClick={handleRegister}
                    size="lg"
                    className="gap-2"
                    disabled={register}
                  >
                    {register ? (
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
                    onClick={handleBookmark}
                    className="gap-2"
                  >
                    <BookmarkPlus className="h-5 w-5" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleShare}
                    className="bg-background/20 backdrop-blur-sm hover:bg-background/30 border-white/20"
                  >
                    <Share2 className="h-5 w-5 text-white" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Details */}
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
              {extendedDetails?.agenda && extendedDetails.agenda.length > 0 && (
                <section className="bg-card rounded-xl border p-6">
                  <h2 className="text-2xl font-bold mb-4">Event Agenda</h2>
                  <div className="space-y-4">
                    {extendedDetails.agenda.map((item, index) => (
                      <div
                        key={index}
                        className="flex border-b border-border pb-4 last:border-0"
                      >
                        <div className="w-24 font-medium text-primary">
                          {item.time}
                        </div>
                        <div>{item.activity}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Additional Images */}
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

              {/* Sponsors */}
              {extendedDetails?.sponsors &&
                extendedDetails.sponsors.length > 0 && (
                  <section className="bg-card rounded-xl border p-6">
                    <h2 className="text-2xl font-bold mb-4">Event Sponsors</h2>
                    <div className="flex flex-wrap gap-2">
                      {extendedDetails.sponsors.map((sponsor, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-sm py-1"
                        >
                          {sponsor}
                        </Badge>
                      ))}
                    </div>
                  </section>
                )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Organizer Info */}
              <div className="bg-card rounded-xl border p-6">
                <h3 className="text-lg font-semibold mb-3">Organizer</h3>
                <p className="text-muted-foreground">
                  {extendedDetails?.organizer || "Unknown organizer"}
                </p>

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
                <h3 className="text-lg font-semibold mb-3">
                  Ticket Information
                </h3>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="text-xl font-bold">
                      {event?.price || "Free"}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    Available
                  </Badge>
                </div>
                <Button className="w-full gap-2" onClick={handleRegister}>
                  <TicketIcon className="h-4 w-4" />
                  Register Now
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
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetails;
