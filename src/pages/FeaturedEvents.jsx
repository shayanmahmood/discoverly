import React from "react";
import { cn } from "../lib/utils";
import EventCard from "../components/ui/EventCard";
import { ChevronRight } from "lucide-react";
import { Button } from "../components/ui/Button";

const featuredEvents = [
  {
    id: "5",
    title: "Annual Global AI Conference: The Future of Machine Learning",
    date: "August 18-20, 2023",
    time: "All Day Event",
    location: "Tokyo International Forum, Japan",
    category: "Technology",
    attendees: 2800,
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "6",
    title: "International Film Festival",
    date: "September 5-12, 2023",
    time: "Various Times",
    location: "Berlin Cultural Center, Germany",
    category: "Entertainment",
    attendees: 4500,
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: "7",
    title: "Sustainable Business Summit",
    date: "October 10, 2023",
    time: "9:00 AM - 6:00 PM",
    location: "Green Convention Center, Stockholm",
    category: "Business",
    attendees: 1200,
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: "8",
    title: "Digital Marketing Masterclass",
    date: "November 15, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "Tech Hub, San Francisco",
    category: "Marketing",
    attendees: 850,
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
];

const FeaturedEvents = ({ className }) => {
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
          {featuredEvents.map((event, index) => (
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
