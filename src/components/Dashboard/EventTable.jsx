/* eslint-disable react/prop-types */

import React from "react";
import { Link } from "react-router-dom";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

const EventTable = ({ events, onEditEvent, onDeleteEvent }) => {
  if (events.length === 0) {
    return (
      <tr>
        <td colSpan="7" className="p-4 text-center text-muted-foreground">
          No events found
        </td>
      </tr>
    );
  }

  return (
    <>
      {events.map((event) => (
        <tr
          key={event.id}
          className="border-b transition-colors hover:bg-muted/50"
        >
          <td className="p-4 align-middle">{event.title}</td>
          <td className="p-4 align-middle">{event.date}</td>
          <td className="p-4 align-middle">{event.location}</td>
          <td className="p-4 align-middle">{event.attendees}</td>
          <td className="p-4 align-middle">{event.sales}</td>
          <td className="p-4 align-middle">
            <Badge variant={event.status === "active" ? "default" : "outline"}>
              {event.status === "active" ? "Active" : "Draft"}
            </Badge>
          </td>
          <td className="p-4 align-middle">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link to={`/event/${event.id}`}>
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEditEvent(event)}
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteEvent(event)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default EventTable;
