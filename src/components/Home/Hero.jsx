/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import SearchBar from "../ui/SearchBar";
import { cn } from "../../lib/utils";

const Hero = ({ className }) => {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden min-h-[90vh] flex items-center justify-center pt-20 px-4",
        className
      )}
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background"></div>
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-[30%] left-[30%] w-[400px] h-[400px] bg-accent rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-12">
        <div className="text-center space-y-6 mb-10 max-w-4xl">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm backdrop-blur-sm text-primary font-medium mb-4 animate-fade-in">
            Discover extraordinary events near you
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in opacity-0"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            Find & Join Amazing <span className="text-gradient">Events</span>{" "}
            That Matter To You
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in opacity-0"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            Explore thousands of events from conferences and workshops to
            concerts and meetups. Connect with like-minded people and expand
            your horizons.
          </p>
        </div>

        <SearchBar />

        <div className=" mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
          {[
            { value: "10K+", label: "Events" },
            { value: "500+", label: "Communities" },
            { value: "120+", label: "Cities" },
            { value: "1M+", label: "Attendees" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="animate-fade-in opacity-0"
              style={{
                animationDelay: `${400 + index * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
