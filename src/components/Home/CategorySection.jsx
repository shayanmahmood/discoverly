/* eslint-disable react/react-in-jsx-scope */
import { Link } from "react-router-dom";
import { useEvents } from "../../Contexts/EventProvider";
import { cn } from "../../lib/utils";
import {
  Briefcase,
  Code,
  Film,
  HeartPulse,
  Lightbulb,
  Mic2,
  Palette,
  Users,
} from "lucide-react";

// Mapping icon names to actual components
const iconMap = {
  Briefcase: Briefcase,
  Code: Code,
  Film: Film,
  HeartPulse: HeartPulse,
  Lightbulb: Lightbulb,
  Mic2: Mic2,
  Palette: Palette,
  Users: Users,
};

const CategorySection = ({ className }) => {
  const { allEvents } = useEvents();

  const Categorys = allEvents?.reduce((acc, event) => {
    if (!acc.some((cat) => cat.id === event.categoryExtends.id)) {
      acc.push(event.categoryExtends);
    }
    return acc;
  }, []);

  return (
    <section className={cn("py-20 px-4", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover events by category and find experiences that match your interests.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Categorys.map((category, index) => {
            const IconComponent = iconMap[category.icon] || Briefcase; // Default to Briefcase if missing

            return (
              <div
                key={category.id}
                className="group relative overflow-hidden bg-card rounded-xl shadow-sm border border-border/40 hover:border-primary/20 hover:shadow-md transition-all duration-300 animate-fade-in opacity-0"
                style={{
                  animationDelay: `${100 * index}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-50 transition-opacity group-hover:opacity-80`} />
                
                <div className="relative p-6 h-full flex flex-col">
                  <div className="rounded-full bg-background/70 backdrop-blur-sm w-12 h-12 flex items-center justify-center mb-4 shadow-sm">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{category.description}</p>

                  <div className="mt-auto">
                    <Link to={`/events?cat=${category.name}`}>
                      <button className="text-sm font-medium text-primary flex items-center transition-all group-hover:translate-x-1">
                        Browse events
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
