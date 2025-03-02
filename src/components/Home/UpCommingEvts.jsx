/* eslint-disable react/no-unescaped-entities */
import { ArrowRight } from "lucide-react";
import EventCard from "../EventCard";
import { useEvents } from "../../Contexts/EventProvider";

/* eslint-disable react/react-in-jsx-scope */
function UpCommingEvts() {
  const { allEvents } = useEvents();
  const UpcomingEvents = allEvents?.filter((el) => el.upcomming);

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
        {UpcomingEvents?.map((event, index) => (
          <EventCard key={index} link={`/event/${event.id}`} {...event} />
        ))}
      </div>
    </section>
  );
}

export default UpCommingEvts;
