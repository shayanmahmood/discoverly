import React from "react";
import { cn } from "../../lib/utils";
import EventCard from "../ui/EventCard";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";
import { useEvents } from "../../Contexts/EventProvider";

const FeaturedEvents = ({ className }) => {
  const { FeaturedEvents } = useEvents();
  return (
    <section className={cn("py-16 px-4 relative overflow-hidden", className)}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div className="mb-6 md:mb-0">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
              Premium Events
            </span>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Featured Events
            </h2>
            <p className="text-muted-foreground max-w-md mt-2 text-sm">
              Don't miss these highlighted events from around the world
            </p>
          </div>

          <Button variant="outline" size="sm" className="group">
            View all events{" "}
            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {FeaturedEvents.map((event, index) => (
            <EventCard
              key={event.id}
              {...event}
              className="animate-fade-in opacity-0"
              style={{
                animationDelay: `${100 * index}ms`,
                animationFillMode: "forwards",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
