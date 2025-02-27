import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

const EventCard = ({ 
  title, 
  category, 
  date, 
  location, 
  image, 
  price 
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="relative h-40 sm:h-48">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white py-1 px-2 sm:px-3 rounded-full text-xs sm:text-sm font-medium text-indigo-600">
          {price}
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium mb-2 sm:mb-3">
          {category}
        </span>
        <h3 className="font-bold text-base sm:text-lg mb-2 hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center text-gray-500 mb-1 sm:mb-2">
          <Calendar size={14} className="mr-1.5 sm:mr-2 flex-shrink-0" />
          <span className="text-xs sm:text-sm truncate">{date}</span>
        </div>
        <div className="flex items-center text-gray-500 mb-3 sm:mb-4">
          <MapPin size={14} className="mr-1.5 sm:mr-2 flex-shrink-0" />
          <span className="text-xs sm:text-sm truncate">{location}</span>
        </div>
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 sm:py-2 rounded-md transition duration-300 font-medium text-xs sm:text-sm">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default EventCard;