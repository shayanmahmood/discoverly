/* eslint-disable react/prop-types */

import React from "react";
import { Link } from "react-router-dom";

import { Calendar, Users, MessagesSquare, Ticket } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

const RegisteredEventCards = ({ events }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-8 border rounded-md">
        <Ticket className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
        <p className="text-lg font-medium">No registered events found</p>
        <p className="text-sm text-muted-foreground">
          Try a different search term
        </p>
      </div>
    );
  }

  console.log(events);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Card key={event.id} className="flex flex-col overflow-hidden">
          <div className="aspect-video bg-muted relative">
            <img
              src={event.image}
              alt={event.title}
              className="object-cover w-full h-full"
            />
            <Badge className="absolute top-2 right-2">
              {event.extendedEventDetails.ticketPrice}
            </Badge>
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h4 className="font-semibold text-lg">{event.title}</h4>
            <p className="text-sm text-muted-foreground mb-2">
              By {event.extendedEventDetails.organizer}
            </p>
            <div className="flex items-center text-sm text-muted-foreground mt-2">
              <Calendar className="h-4 w-4 mr-2" />
              {event.date}
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Users className="h-4 w-4 mr-2" />
              {event.location}
            </div>
            <div className="mt-auto pt-4 flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/event/${event.id}`}>View Details</Link>
              </Button>
              <Button variant="outline" size="sm">
                <MessagesSquare className="h-4 w-4 mr-2" /> Contact
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default RegisteredEventCards;
