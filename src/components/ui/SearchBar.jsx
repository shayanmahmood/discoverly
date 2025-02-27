import { useState } from "react";
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
} from "lucide-react";
import { Calendar } from "./Calendar";
import { format } from "date-fns";

const SearchBar = ({ className }) => {
  const [dateRange, setDateRange] = useState(undefined);
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("Any Location");

  const categories = [
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
  ];

  const locations = [
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
  ];

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-2 w-full max-w-4xl mx-auto",
        className
      )}
    >
      <div
        className="relative flex-grow md:flex-grow-[2] animate-fade-in opacity-0"
        style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for events..."
          className="pl-10 h-12 md:h-14 rounded-lg border-input bg-background/70 backdrop-blur-sm hover:border-primary/50 focus:border-primary/80"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-12 md:h-14 justify-between px-4 md:w-[180px] border-input bg-background/70 backdrop-blur-sm hover:border-primary/50 animate-fade-in opacity-0"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              <div className="flex items-center">
                <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm truncate">{category}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[220px] p-2 rounded-lg">
            <div className="max-h-[300px] overflow-y-auto space-y-1">
              {categories.map((cat) => (
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
              className="h-12 md:h-14 justify-between px-4 md:w-[180px] border-input bg-background/70 backdrop-blur-sm hover:border-primary/50 animate-fade-in opacity-0"
              style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
            >
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm truncate">{location}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[220px] p-2 rounded-lg">
            <div className="max-h-[300px] overflow-y-auto space-y-1">
              {locations.map((loc) => (
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
            <Button
              variant="outline"
              className="h-12 md:h-14 justify-between px-4 md:w-[180px] border-input bg-background/70 backdrop-blur-sm hover:border-primary/50 animate-fade-in opacity-0"
              style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
            >
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm truncate">
                  {dateRange ? format(dateRange, "PPP") : "Select date"}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateRange}
              onSelect={setDateRange}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button
          className="h-12 md:h-14 px-8 rounded-lg animate-fade-in opacity-0"
          style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
        >
          Find Events
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
