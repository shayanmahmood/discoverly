/* eslint-disable react/prop-types */
import React from 'react';
import * as LucideIcons from 'lucide-react';

const CategoryCard = ({ 
  title, 
  icon, 
  description,
  color
}) => {
  const Icon = LucideIcons[icon];
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 text-center p-3 sm:p-6">
      <div className={`${color} w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4`}>
        <Icon size={20} className="text-white sm:hidden" />
        <Icon size={28} className="text-white hidden sm:block" />
      </div>
      <h3 className="font-bold text-sm sm:text-lg mb-1 sm:mb-2">{title}</h3>
      <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">{description}</p>
    </div>
  );
};

export default CategoryCard;