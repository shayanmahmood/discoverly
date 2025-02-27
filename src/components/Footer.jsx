import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 sm:pt-16 pb-6 sm:pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="col-span-2 md:col-span-1 mb-4 sm:mb-0">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">EventFinder</h3>
            <p className="text-gray-400 mb-4 text-xs sm:text-sm">
              Discover and attend events that match your interests, connect with like-minded people, and create memorable experiences.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">Browse Events</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">Create Event</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">Calendar</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Support</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">Community Guidelines</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">Feedback</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">Accessibility</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <p className="text-center text-gray-500 text-xs sm:text-sm">
            © 2025 EventFinder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;