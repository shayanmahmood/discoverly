import { Calendar, MapPin, ArrowRight, Mail } from "lucide-react";
import EventCard from "./components/EventCard";
import CategoryCard from "./components/CategoryCard";
import TestimonialCard from "./components/TestimonialCard";
import BlogCard from "./components/BlogCard";
import Footer from "./components/Footer";
import HeroSection from "./pages/HeroSection";
import Navbar from "./components/Navbar";
import CatogarySection from "./pages/CatogarySection";
import Hero from "./pages/Hero";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <Navbar />

      {/* <HeroSection /> */}
      <Hero />
      {/* Event Topics Section */}
      <CatogarySection />

      {/* Sub-Topics Section */}
      <section className="py-8 sm:py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
              Popular Sub-Categories
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Find more specific events that match your interests
            </p>
          </div>

          <div className="flex overflow-x-auto pb-4 gap-3 sm:gap-4 hide-scrollbar">
            {[
              "AI & Machine Learning",
              "Web Development",
              "Startup Networking",
              "Investment Workshops",
              "Art Exhibitions",
              "Film Festivals",
              "Yoga & Meditation",
              "Music Concerts",
              "Food & Drink",
              "Photography",
              "Book Clubs",
              "Career Fairs",
            ].map((topic, index) => (
              <div
                key={index}
                className="min-w-[140px] sm:min-w-[180px] bg-white rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
              >
                <p className="font-medium text-center text-sm sm:text-base">
                  {topic}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-10 sm:py-16 container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-10">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
              Upcoming Events
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Don't miss out on these exciting events happening soon
            </p>
          </div>
          <button className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm sm:text-base">
            View All <ArrowRight size={16} className="ml-1 sm:ml-2" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <EventCard
            title="Tech Summit 2025"
            category="Technology"
            date="May 15-17, 2025"
            location="San Francisco, CA"
            image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            price="$299"
          />
          <EventCard
            title="Business Leadership Conference"
            category="Business"
            date="June 5, 2025"
            location="New York, NY"
            image="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2032&q=80"
            price="$199"
          />
          <EventCard
            title="Modern Art Exhibition"
            category="Art & Culture"
            date="May 22, 2025"
            location="Chicago, IL"
            image="https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            price="$25"
          />
          <EventCard
            title="Wellness Retreat Weekend"
            category="Health & Wellness"
            date="June 10-12, 2025"
            location="Austin, TX"
            image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80"
            price="$350"
          />
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-10 sm:py-16 bg-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 sm:mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
              Featured Events
            </h2>
            <p className="text-indigo-200 max-w-2xl mx-auto text-sm sm:text-base">
              Premium events curated just for you
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            <div className="bg-indigo-800 rounded-xl overflow-hidden shadow-xl flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 h-48 sm:h-56 md:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Global Tech Conference"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2 sm:px-3 py-1 bg-indigo-700 text-indigo-100 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                    Technology
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">
                    Global Tech Conference 2025
                  </h3>
                  <p className="text-indigo-200 mb-3 sm:mb-4 text-sm sm:text-base">
                    Join industry leaders and innovators for the biggest tech
                    event of the year
                  </p>
                  <div className="flex items-center mb-2 sm:mb-4">
                    <Calendar size={16} className="mr-2 text-indigo-300" />
                    <span className="text-indigo-200 text-sm sm:text-base">
                      July 10-12, 2025
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-indigo-300" />
                    <span className="text-indigo-200 text-sm sm:text-base">
                      Las Vegas, NV
                    </span>
                  </div>
                </div>
                <button className="mt-4 sm:mt-6 bg-white text-indigo-900 hover:bg-indigo-100 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition duration-300 text-sm sm:text-base">
                  Register Now
                </button>
              </div>
            </div>

            <div className="bg-indigo-800 rounded-xl overflow-hidden shadow-xl flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 h-48 sm:h-56 md:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Music Festival"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2 sm:px-3 py-1 bg-indigo-700 text-indigo-100 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                    Entertainment
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">
                    Summer Music Festival
                  </h3>
                  <p className="text-indigo-200 mb-3 sm:mb-4 text-sm sm:text-base">
                    Three days of amazing performances from top artists across
                    multiple genres
                  </p>
                  <div className="flex items-center mb-2 sm:mb-4">
                    <Calendar size={16} className="mr-2 text-indigo-300" />
                    <span className="text-indigo-200 text-sm sm:text-base">
                      August 5-7, 2025
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-indigo-300" />
                    <span className="text-indigo-200 text-sm sm:text-base">
                      Miami, FL
                    </span>
                  </div>
                </div>
                <button className="mt-4 sm:mt-6 bg-white text-indigo-900 hover:bg-indigo-100 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition duration-300 text-sm sm:text-base">
                  Get Tickets
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-10 sm:py-16 container mx-auto px-4">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
            What Attendees Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Hear from people who have discovered amazing events through our
            platform
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <TestimonialCard
            name="Sarah Johnson"
            role="Marketing Director"
            image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            rating={5}
            testimonial="I've discovered so many valuable networking events through this platform. The search filters make it easy to find exactly what I'm looking for!"
          />
          <TestimonialCard
            name="Michael Chen"
            role="Software Engineer"
            image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            rating={5}
            testimonial="The tech events I've attended through this platform have significantly advanced my career. The recommendations are always spot on!"
          />
          <TestimonialCard
            name="Emily Rodriguez"
            role="Art Enthusiast"
            image="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80"
            rating={4}
            testimonial="I love how easy it is to find art exhibitions and cultural events in my area. This has become my go-to platform for weekend plans!"
          />
        </div>
      </section>

      {/* Blog & News Section */}
      <section className="py-10 sm:py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-10">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                Event Insights & Tips
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Stay updated with the latest event trends and planning advice
              </p>
            </div>
            <button className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm sm:text-base">
              View All Articles{" "}
              <ArrowRight size={16} className="ml-1 sm:ml-2" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <BlogCard
              title="10 Tips for Networking at Business Events"
              category="Business"
              date="April 28, 2025"
              image="https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              excerpt="Learn how to make meaningful connections and maximize your networking opportunities at business events."
            />
            <BlogCard
              title="The Rise of Virtual Reality in Events"
              category="Technology"
              date="April 25, 2025"
              image="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              excerpt="Discover how VR technology is transforming the event industry and creating immersive experiences."
            />
            <BlogCard
              title="How to Choose the Right Events for Your Personal Growth"
              category="Lifestyle"
              date="April 22, 2025"
              image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
              excerpt="Find out how to select events that align with your personal and professional development goals."
            />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
