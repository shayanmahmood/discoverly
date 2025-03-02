import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { Input } from "../components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import { Button } from "../components/ui/Button";
import { Search, Filter } from "lucide-react";
import { useEvents } from "../Contexts/EventProvider";
import { useSearchParams } from "react-router-dom";

const AllEvents = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("cat");

  const { allEvents } = useEvents();
  const categories = allEvents?.reduce((acc, event) => {
    if (!acc.some((cat) => cat.id === event.categoryExtends.id)) {
      acc.push(event.categoryExtends);
    }
    return acc;
  }, []);

  const categoriesNames = categories?.map((cat) => cat.name);
  categoriesNames?.push("All Categories");

  const LocationsCat = allEvents?.reduce((acc, event) => {
    if (!acc.some((cat) => cat.id === event.categoryExtends.id)) {
      acc.push(event);
    }
    return acc;
  }, []);
  const locations = LocationsCat?.map((cat) => cat.location);
  locations?.push("All Locations");

  // States for filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [filteredEvents, setFilteredEvents] = useState(allEvents);

  // Effect to filter events based on search and filters
  useEffect(() => {
    const filtered = allEvents.filter((event) => {
      // Filter by search query
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by category
      const matchesCategory =
        selectedCategory === "All Categories" ||
        event.category === selectedCategory;

      // Filter by location
      const matchesLocation =
        selectedLocation === "All Locations" ||
        event.location.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchesSearch && matchesCategory && matchesLocation;
    });

    setFilteredEvents(filtered);
  }, [searchQuery, selectedCategory, selectedLocation, allEvents]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (category) {
      setSelectedCategory(`${category}`);
    }
  }, [category, selectedCategory]);

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
            <div className="max-w-4xl mx-auto bg-card rounded-xl shadow-sm border border-border p-4 md:p-6 -mb-16 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesNames.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
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

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                  setSelectedLocation("All Locations");
                }}
              >
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
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Categories");
                    setSelectedLocation("All Locations");
                  }}
                >
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
