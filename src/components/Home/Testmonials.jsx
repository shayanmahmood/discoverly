/* eslint-disable react/react-in-jsx-scope */
import { useEvents } from "../../Contexts/EventProvider";
import TestimonialCard from "../TestimonialCard";

function Testmonials() {
  const { Testmonials } = useEvents();

  return (
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
        {Testmonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
}

export default Testmonials;
