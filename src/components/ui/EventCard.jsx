/* eslint-disable react/prop-types */
import React from "react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { CalendarIcon, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { AspectRatio } from "../ui/AspectRation";

const EventCard = ({
  id,
  title,
  date,
  time,
  location,
  category,
  attendees,
  image,
  featured = false,
  className,
  style,
}) => {
  return (
    <div
      className={cn(
        "group overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/20 flex flex-col h-full",
        className
      )}
      style={{
        height: "420px", // Fixed height for all cards
        ...style,
      }}
    >
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </AspectRatio>

        <div className="absolute top-2 left-2 z-20">
          <Badge
            variant="secondary"
            className="backdrop-blur-sm bg-black/30 border-none text-white text-xs font-medium px-2 py-0.5"
          >
            {category}
          </Badge>
        </div>

        {featured && (
          <div className="absolute top-2 right-2 z-20">
            <Badge
              variant="default"
              className="backdrop-blur-sm bg-primary/90 border-none text-xs font-medium px-2 py-0.5"
            >
              Featured
            </Badge>
          </div>
        )}
      </div>

      <div className="flex flex-col p-4 flex-grow space-y-3">
        <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="space-y-1.5 mt-1 text-xs">
          <div className="flex items-center text-muted-foreground">
            <CalendarIcon className="mr-1.5 h-3 w-3 text-primary/70 flex-shrink-0" />
            <span className="truncate">{date}</span>
          </div>

          <div className="flex items-center text-muted-foreground">
            <Clock className="mr-1.5 h-3 w-3 text-primary/70 flex-shrink-0" />
            <span className="truncate">{time}</span>
          </div>

          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-1.5 h-3 w-3 text-primary/70 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>

          <div className="flex items-center text-muted-foreground">
            <Users className="mr-1.5 h-3 w-3 text-primary/70 flex-shrink-0" />
            <span className="truncate">{attendees} attending</span>
          </div>
        </div>

        <div className="mt-auto pt-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs font-medium h-8 group/btn border-primary/20 hover:bg-primary hover:text-white transition-colors"
          >
            Register
            <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
