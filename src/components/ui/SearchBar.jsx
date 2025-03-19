import { useCallback, useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "./Button";
import { Input } from "../ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  MapPin,
  Search,
  Tag,
  Filter,
} from "lucide-react";
import { Calendar } from "./Calendar";
import { format } from "date-fns";
import { useEvents } from "../../Contexts/EventProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";

const SearchBar = ({ className }) => {
  const { allEvents } = useEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState(undefined);
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("Any Location");
  const navigate = useNavigate();

  const data = allEvents.map((cat) => ({
    name: cat.title,
    link: `/event/${cat.id}`,
  }));

  // Filter suggestions based on input
  const filteredSuggestions = data?.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = useCallback(() => {
    if (filteredSuggestions.length >= 1) {
      const link = `${filteredSuggestions[0].link}`;
      navigate(`${link}`);
    }
  });

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleClick();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [filteredSuggestions, handleClick]);
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-2 w-full max-w-4xl mx-auto",
        className
      )}
    >
      {/* Search Input with Filter Icon */}
      <div
        className="relative flex-grow md:flex-grow-[2] animate-fade-in opacity-0 "
        style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-12 h-12 md:h-14 rounded-lg border-input bg-background/70 backdrop-blur-md hover:border-primary/50 focus:border-primary/80"
        />

        {/* Show Suggestions */}
        {/* Suggestion Box */}
        {searchTerm && filteredSuggestions.length > 0 && (
          <div className="absolute !z-[5000] mt-1 w-full bg-background/70 backdrop-blur-lg border rounded-lg shadow-lg max-h-40 overflow-y-auto">
            {filteredSuggestions.map((event, index) => (
              <Link
                key={index}
                to={event.link}
                className="block w-full text-left p-2 hover:bg-muted-foreground/20 text-primary font-medium"
              >
                {event.name}
              </Link>
            ))}
          </div>
        )}

        {/* Filter Button inside Input */}
        {/*OPTIONAL FILTRING*? */
        /* <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
            >
              <Filter className="h-5 w-5 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="absolute z-50 w-[250px] p-2 rounded-lg shadow-lg border bg-background/70 backdrop-blur-lg">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between mb-2"
                >
                  <div className="flex items-center">
                    <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm truncate">{category}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-2 rounded-lg">
                <div className="max-h-[200px] overflow-y-auto space-y-1">
                  {[
                    "All Categories",
                    "Technology",
                    "Business",
                    "Art",
                    "Health",
                    "Entertainment",
                    "Education",
                    "Science",
                    "Food",
                    "Sports",
                  ].map((cat) => (
                    <Button
                      key={cat}
                      variant="ghost"
                      className="w-full justify-start font-normal"
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between mb-2"
                >
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm truncate">{location}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-2 rounded-lg">
                <div className="max-h-[200px] overflow-y-auto space-y-1">
                  {[
                    "Any Location",
                    "San Francisco",
                    "New York",
                    "London",
                    "Berlin",
                    "Tokyo",
                    "Paris",
                    "Sydney",
                    "Toronto",
                    "Singapore",
                  ].map((loc) => (
                    <Button
                      key={loc}
                      variant="ghost"
                      className="w-full justify-start font-normal"
                      onClick={() => setLocation(loc)}
                    >
                      {loc}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm truncate">
                      {dateRange ? format(dateRange, "PPP") : "Select date"}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full min-w-[250px] p-2 rounded-lg shadow-md border bg-background/70 backdrop-blur-lg">
                <Calendar
                  mode="single"
                  selected={dateRange}
                  onSelect={setDateRange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </PopoverContent>
        </Popover> */}
      </div>

      {/* Find Events Button */}
      <Button
        onClick={handleClick}
        className="h-12 md:h-14 px-8 rounded-lg animate-fade-in opacity-0"
        style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
      >
        Find Events
      </Button>
    </div>
  );
};

export default SearchBar;
