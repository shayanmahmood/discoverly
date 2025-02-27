import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ 
  name, 
  role, 
  image, 
  rating, 
  testimonial 
}) => {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center mb-3 sm:mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover mr-3 sm:mr-4"
        />
        <div>
          <h4 className="font-bold text-sm sm:text-base">{name}</h4>
          <p className="text-gray-600 text-xs sm:text-sm">{role}</p>
        </div>
      </div>
      
      <div className="flex mb-3 sm:mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={i < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"} 
          />
        ))}
      </div>
      
      <p className="text-gray-700 italic text-xs sm:text-sm">"{testimonial}"</p>
    </div>
  );
};

export default TestimonialCard;