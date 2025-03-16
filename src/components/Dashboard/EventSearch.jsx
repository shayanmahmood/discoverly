/* eslint-disable react/prop-types */

import React from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Search, X } from "lucide-react";

const EventSearch = ({ searchTerm, setSearchTerm, placeholder }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder={placeholder || "Search events..."}
        className="pl-10 w-[250px] border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-gray-700"
          onClick={() => setSearchTerm("")}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

export default EventSearch;
