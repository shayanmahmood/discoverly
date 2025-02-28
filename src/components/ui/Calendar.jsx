/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";


function Calendar({ selected, onSelect }) {
  return (
    <div className="p-4 rounded-lg border border-gray-300 shadow-md bg-white">
      <DayPicker
        mode="single"
        className="text-sm"
        selected={selected}
        onSelect={onSelect}
      />
    </div>
  );
}

export { Calendar };
