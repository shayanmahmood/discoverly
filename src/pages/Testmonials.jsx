/* eslint-disable react/react-in-jsx-scope */
import TestimonialCard from "../components/TestimonialCard"

function Testmonials() {
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
    )
}

export default Testmonials
