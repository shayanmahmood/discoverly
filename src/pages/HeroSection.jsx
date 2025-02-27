import { Calendar, Filter, MapPin, Search } from "lucide-react";

function HeroSection() {
  return (
    <section
      className="relative h-[500px] sm:h-[600px] bg-cover bg-center flex items-center"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80")',
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
          Discover Amazing Events Near You
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 max-w-2xl mx-auto">
          Find and attend events that match your interests, connect with
          like-minded people, and create memorable experiences.
        </p>

        {/* Search Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-lg max-w-4xl mx-auto">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search for events..."
                className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
              <div className="relative">
                <select className="w-full appearance-none pl-10 pr-8 py-2 sm:py-3 rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Category</option>
                  <option value="technology">Technology</option>
                  <option value="business">Business</option>
                  <option value="art">Art</option>
                  <option value="health">Health</option>
                  <option value="entertainment">Entertainment</option>
                </select>
                <Filter
                  className="absolute left-3 top-2 sm:top-3 text-gray-400"
                  size={20}
                />
              </div>

              <div className="relative">
                <select className="w-full appearance-none pl-10 pr-8 py-2 sm:py-3 rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Location</option>
                  <option value="new-york">New York</option>
                  <option value="los-angeles">Los Angeles</option>
                  <option value="chicago">Chicago</option>
                  <option value="miami">Miami</option>
                  <option value="online">Online</option>
                </select>
                <MapPin
                  className="absolute left-3 top-2 sm:top-3 text-gray-400"
                  size={20}
                />
              </div>

              <div className="relative">
                <select className="w-full appearance-none pl-10 pr-8 py-2 sm:py-3 rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Date</option>
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="this-week">This Week</option>
                  <option value="this-month">This Month</option>
                  <option value="custom">Custom</option>
                </select>
                <Calendar
                  className="absolute left-3 top-2 sm:top-3 text-gray-400"
                  size={20}
                />
              </div>

              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md transition duration-300 font-medium">
                Find Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
