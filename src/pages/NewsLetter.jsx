/* eslint-disable react/react-in-jsx-scope */
import { Mail } from "lucide-react";

function NewsLetter() {
  return (
    <section className="py-10 sm:py-16 bg-indigo-100">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
            Never Miss an Event
          </h2>
          <p className="text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base">
            Subscribe to our newsletter and get personalized event
            recommendations delivered to your inbox
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto">
            <div className="flex-1 relative">
              <Mail
                className="absolute left-3 top-2.5 sm:top-3 text-gray-400"
                size={18}
              />
              <input
                type="email"
                placeholder="Your email address"
                className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              />
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md transition duration-300 font-medium text-sm sm:text-base">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;
