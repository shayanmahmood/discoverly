/* eslint-disable react/no-unescaped-entities */
import { ArrowRight } from "lucide-react"
import EventCard from "../components/EventCard"

/* eslint-disable react/react-in-jsx-scope */
function UpCommingEvts() {
    return (
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
    )
}

export default UpCommingEvts
