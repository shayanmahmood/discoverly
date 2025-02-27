/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { cn } from '../lib/utils';
import { 
  Briefcase, Code, Film, HeartPulse, 
  Lightbulb, Mic2, Palette, Users 
} from 'lucide-react';

const categories = [
  {
    id: 'technology',
    name: 'Technology',
    description: 'Tech conferences and workshops',
    icon: Code,
    color: 'from-[#6366f1]/20 to-[#8b5cf6]/20'
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Networking and professional events',
    icon: Briefcase,
    color: 'from-[#0ea5e9]/20 to-[#6366f1]/20'
  },
  {
    id: 'art',
    name: 'Art & Design',
    description: 'Exhibitions and creative workshops',
    icon: Palette,
    color: 'from-[#f43f5e]/20 to-[#ec4899]/20'
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    description: 'Fitness classes and mental wellness',
    icon: HeartPulse,
    color: 'from-[#10b981]/20 to-[#14b8a6]/20'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    description: 'Concerts, shows, and performances',
    icon: Film,
    color: 'from-[#f59e0b]/20 to-[#f97316]/20'
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Courses, lectures, and learning events',
    icon: Lightbulb,
    color: 'from-[#3b82f6]/20 to-[#6366f1]/20'
  },
  {
    id: 'community',
    name: 'Community',
    description: 'Meetups and social gatherings',
    icon: Users,
    color: 'from-[#ec4899]/20 to-[#8b5cf6]/20'
  },
  {
    id: 'music',
    name: 'Music',
    description: 'Live shows and festivals',
    icon: Mic2,
    color: 'from-[#8b5cf6]/20 to-[#ec4899]/20'
  }
];

const CategorySection = ({ className }) => {
  return (
    <section className={cn('py-20 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover events by category and find experiences that match your interests
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative overflow-hidden bg-card rounded-xl shadow-sm border border-border/40 hover:border-primary/20 hover:shadow-md transition-all duration-300 animate-fade-in opacity-0"
              style={{ animationDelay: `${100 * index}ms`, animationFillMode: 'forwards' }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-50 transition-opacity group-hover:opacity-80`} />
              
              <div className="relative p-6 h-full flex flex-col">
                <div className="rounded-full bg-background/70 backdrop-blur-sm w-12 h-12 flex items-center justify-center mb-4 shadow-sm">
                  <category.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                
                <div className="mt-auto">
                  <button 
                    className="text-sm font-medium text-primary flex items-center transition-all group-hover:translate-x-1"
                  >
                    Browse events
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
