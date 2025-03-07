/* eslint-disable react/react-in-jsx-scope */
import { Search } from "lucide-react";
import { Input } from "../ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { useEvents } from "../../Contexts/EventProvider";
function FiltersAllEvents() {
  const {
    handleChangeSearchQuery: setSearchQuery,
    searchQueryAllEvents: searchQuery,
    handleChangeCategory: setSelectedCategory,
    selectedCategoryAllEvents: selectedCategory,
    categoriesNamesAllEvents: categoriesNames,
    handleChangeLocation: setSelectedLocation,
    selectedLocationAllEvents: selectedLocation,
    locationsAllEvents: locations,
  } = useEvents();
  return (
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

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            {categoriesNames?.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
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
  );
}

export default FiltersAllEvents;
