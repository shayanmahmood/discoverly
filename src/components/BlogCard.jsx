/* eslint-disable react/prop-types */
import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

const BlogCard = ({ 
  title, 
  category, 
  date, 
  image, 
  excerpt 
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="h-40 sm:h-48">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-center mb-2 sm:mb-3">
          <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
            {category}
          </span>
          <div className="flex items-center text-gray-500">
            <Calendar size={12} className="mr-1" />
            <span className="text-xs">{date}</span>
          </div>
        </div>
        <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
          {excerpt}
        </p>
        <button className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-xs sm:text-sm">
          Read More <ArrowRight size={14} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;