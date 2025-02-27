import React, { useRef } from "react";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const subTopics = [
  {
    id: "ai",
    name: "AI & Machine Learning",
    count: 128,
    category: "technology",
  },
  { id: "web3", name: "Web3 & Blockchain", count: 85, category: "technology" },
  { id: "ux", name: "UX/UI Design", count: 76, category: "art" },
  {
    id: "marketing",
    name: "Digital Marketing",
    count: 94,
    category: "business",
  },
  { id: "yoga", name: "Yoga & Meditation", count: 112, category: "health" },
  { id: "film", name: "Film Festivals", count: 43, category: "entertainment" },
  { id: "crypto", name: "Cryptocurrency", count: 67, category: "business" },
  { id: "photography", name: "Photography", count: 59, category: "art" },
  { id: "startups", name: "Startups", count: 81, category: "business" },
  { id: "cooking", name: "Cooking Classes", count: 74, category: "food" },
  { id: "gaming", name: "Gaming", count: 90, category: "entertainment" },
  {
    id: "languages",
    name: "Language Exchange",
    count: 65,
    category: "education",
  },
  { id: "music", name: "Live Music", count: 103, category: "entertainment" },
  { id: "finance", name: "Personal Finance", count: 58, category: "business" },
  { id: "vr", name: "Virtual Reality", count: 47, category: "technology" },
];

const SubTopicCarousel = ({ className }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={cn("py-16 px-4 bg-secondary", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Popular Topics</h2>
            <p className="text-muted-foreground">
              Find specialized events based on specific interests
            </p>
          </div>
          <div className="hidden md:flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="h-9 w-9"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="h-9 w-9"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 snap-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {subTopics.map((topic, index) => (
              <div
                key={topic.id}
                className="flex-none snap-start min-w-[260px] sm:min-w-[280px] animate-fade-in opacity-0"
                style={{
                  animationDelay: `${100 * (index % 10)}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="group h-full bg-background rounded-lg border border-border hover:border-primary/40 hover:shadow-sm transition-all duration-300 p-5 flex flex-col cursor-pointer">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                      {topic.name}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-accent font-medium rounded-full text-accent-foreground">
                      {topic.count}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {topic.count} events in this category
                  </div>
                  <div className="mt-auto pt-4">
                    <div className="text-sm font-medium text-primary flex items-center transition-all group-hover:translate-x-1">
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
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-secondary to-transparent pointer-events-none hidden md:block" />
        </div>
      </div>
    </section>
  );
};

export default SubTopicCarousel;
