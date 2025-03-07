import React, { useEffect } from "react";
import { Button } from "../../components/ui/Button";
import { Mail, User } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../../components/ui/Dialog";
import { Textarea } from "../../components/ui/TextArea";
import { Input } from "../../components/ui/Input";
import EventNotFound from "./EventNotFound";
import { useEventDetails } from "../../Contexts/Events/EventDetailsProvider";
import EventsDetailHeroSection from "../../components/Events/EventsDetailHeroSection";
import EventDetailSection from "../../components/Events/EventDetailSection";

const EventDetails = () => {
  const {
    event,

    userInfo,
    showInfoDialog,

    handleInfoSubmit,
    handleInfoDialog: setShowInfoDialog,
    handleUserInfo: setUserInfo,
  } = useEventDetails();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!event) {
    return <EventNotFound />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <EventsDetailHeroSection />

        {/* Event Details */}
        <EventDetailSection />
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
