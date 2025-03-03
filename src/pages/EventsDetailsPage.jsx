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
  TicketIcon,
  Mail,
  User,
  TicketCheckIcon,
  Check,
  ExternalLink,
  CalendarClockIcon,
} from "lucide-react";
import { AspectRatio } from "../components/ui/AspectRation";
import { toast } from "../components/ui/Use-Toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../components/ui/Dialog";
import { Textarea } from "../components/ui/TextArea";
import { Input } from "../components/ui/Input";
import EventNotFound from "./EventNotFound";
import { useEvents } from "../Contexts/EventProvider";



const EventDetails = () => {
  const { allEvents } = useEvents();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [extendedDetails, setExtendedDetails] = useState(null);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [saveCalendar, setsaveCalendar] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });

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
    setIsCopy(true);
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Event link has been copied to clipboard",
      duration: 3000,
    });
  };

  const handleRegister = () => {
    setIsRegister(true);
    toast({
      title: "Registration successful",
      description: `You are now registered for ${event?.title}`,
      duration: 3000,
    });
  };

  const handleGetInfo = () => {
    setShowInfoDialog(true);
  };

  const handleInfoSubmit = (e) => {
    e.preventDefault();

    if (!userInfo.name.trim() || !userInfo.email.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both your name and email",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setShowInfoDialog(false);
    toast({
      title: "Request sent",
      description: `Event information will be sent to ${userInfo.email}`,
      duration: 3000,
    });

    // Reset form
    setUserInfo({
      name: "",
      email: "",
    });
  };

  const handleSaveToCalendar = () => {
    if (!event) return;

    // Format event details for Google Calendar
    setsaveCalendar(true);
    const title = encodeURIComponent(event.title);
    const location = encodeURIComponent(event.location);
    const description = encodeURIComponent(
      extendedDetails?.description || event.title
    );

    // For simplicity, use the date string as-is (in real app, would parse to proper format)
    const dates = encodeURIComponent(event.date);

    // Create Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&location=${location}&details=${description}&dates=${dates}`;

    // Open in new tab
    window.open(googleCalendarUrl, "_blank");

    toast({
      title: "Calendar event",
      description: "Google Calendar opened with event details",
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
                <p className="text-muted-foreground mb-4">
                  {extendedDetails?.organizer || "Unknown organizer"}
                </p>

                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleGetInfo}
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
                <h3 className="text-lg font-semibold mb-3">
                  Ticket Information
                </h3>
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

      {/* Event Info Dialog */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Event Information</DialogTitle>
            <DialogDescription>
              Enter your details to receive more information about this event
              from the organizer.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleInfoSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium leading-none"
                >
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={userInfo.name}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, name: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10"
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium leading-none"
                >
                  Message (Optional)
                </label>
                <Textarea
                  id="message"
                  placeholder="Any specific questions for the organizer?"
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventDetails;
