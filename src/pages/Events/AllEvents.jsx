import React, { useEffect } from "react";

import { Button } from "../../components/ui/Button";
import { Filter } from "lucide-react";
import EventCard from "../../components/EventCard";
import { useEvents } from "../../Contexts/EventProvider";

import FiltersAllEvents from "../../components/Events/FiltersAllEvents";
import { PageLoader } from "../../components/ui/Loader";

const AllEvents = () => {
  const {
    filteredEventsAllEvents: filteredEvents,
    handleResetFilters: reset,
    isLoading,
  } = useEvents();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-background via-background to-background/50 pt-20 pb-8">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover All Events
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Browse our comprehensive collection of events from around the
              world. Find the perfect event that matches your interests.
            </p>

            {/* Filters */}
            <FiltersAllEvents />
          </div>
        </section>

        {/* Events grid */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Filter className="h-5 w-5 mr-2 text-primary" />
                <span className="text-sm font-medium">
                  {filteredEvents.length} events found
                </span>
              </div>

              <Button variant="ghost" size="sm" onClick={() => reset()}>
                Reset Filters
              </Button>
            </div>

            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEvents.map((event, index) => (
                  <EventCard
                    link={`/event/${event.id}`}
                    key={event.id}
                    {...event}
                    className="animate-fade-in opacity-0"
                    style={{
                      animationDelay: `${50 * index}ms`,
                      animationFillMode: "forwards",
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <h3 className="text-xl font-medium mb-2">No events found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search filters
                </p>
                <Button variant="outline" onClick={() => reset()}>
                  Show All Events
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AllEvents;
