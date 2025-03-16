import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Calendar({ selectedDate, onDateChange }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startMonth = startOfMonth(currentMonth);
  const endMonth = endOfMonth(currentMonth);
  const startWeek = startOfWeek(startMonth);
  const endWeek = endOfWeek(endMonth);

  const days = eachDayOfInterval({ start: startWeek, end: endWeek });

  return (
    <div className="w-80 p-4 border rounded-lg shadow-lg bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-600 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-1">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <button
            key={day}
            className={`p-2 text-sm rounded-md ${
              isSameMonth(day, currentMonth) ? "text-black" : "text-gray-400"
            } ${
              isSameDay(day, selectedDate)
                ? "bg-blue-400 !text-white" // Light blue background & white text for selected date
                : "hover:bg-gray-200"
            }`}
            onClick={() => onDateChange(day)}
          >
            {format(day, "d")}
          </button>
        ))}
      </div>
    </div>
  );
}
