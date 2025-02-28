/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/react-in-jsx-scope */
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
import { createContext, useContext, useReducer } from "react";

const EventsContext = createContext();

const initialState = {
  FeaturedEvents: [
    {
      id: "5",
      title: "Annual Global AI Conference: The Future of Machine Learning",
      date: "August 18-20, 2023",
      time: "All Day Event",
      location: "Tokyo International Forum, Japan",
      category: "Technology",
      attendees: 2800,
      image:
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80",
      featured: true,
    },
    {
      id: "6",
      title: "International Film Festival",
      date: "September 5-12, 2023",
      time: "Various Times",
      location: "Berlin Cultural Center, Germany",
      category: "Entertainment",
      attendees: 4500,
      image:
        "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      id: "7",
      title: "Sustainable Business Summit",
      date: "October 10, 2023",
      time: "9:00 AM - 6:00 PM",
      location: "Green Convention Center, Stockholm",
      category: "Business",
      attendees: 1200,
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      id: "8",
      title: "Digital Marketing Masterclass",
      date: "November 15, 2023",
      time: "10:00 AM - 4:00 PM",
      location: "Tech Hub, San Francisco",
      category: "Marketing",
      attendees: 850,
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
  ],
  UpcomingEvents: [
    {
      title: "Tech Summit 2025",
      category: "Technology",
      date: "May 15-17, 2025",
      location: "San Francisco, CA",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      price: "$299",
    },
    {
      title: "Business Leadership Conference",
      category: "Business",
      date: "June 5, 2025",
      location: "New York, NY",
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2032&q=80",
      price: "$199",
    },
    {
      title: "Modern Art Exhibition",
      category: "Art & Culture",
      date: "May 22, 2025",
      location: "Chicago, IL",
      image:
        "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      price: "$25",
    },
    {
      title: "Wellness Retreat Weekend",
      category: "Health & Wellness",
      date: "June 10-12, 2025",
      location: "Austin, TX",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80",
      price: "$350",
    },
  ],
  Testmonials: [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      rating: 5,
      testimonial:
        "I've discovered so many valuable networking events through this platform. The search filters make it easy to find exactly what I'm looking for!",
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      rating: 5,
      testimonial:
        "The tech events I've attended through this platform have significantly advanced my career. The recommendations are always spot on!",
    },
    {
      name: "Emily Rodriguez",
      role: "Art Enthusiast",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80",
      rating: 4,
      testimonial:
        "I love how easy it is to find art exhibitions and cultural events in my area. This has become my go-to platform for weekend plans!",
    },
  ],
  SubTopics: [
    {
      id: "ai",
      name: "AI & Machine Learning",
      count: 128,
      category: "technology",
    },
    {
      id: "web3",
      name: "Web3 & Blockchain",
      count: 85,
      category: "technology",
    },
    { id: "ux", name: "UX/UI Design", count: 76, category: "art" },
    {
      id: "marketing",
      name: "Digital Marketing",
      count: 94,
      category: "business",
    },
    { id: "yoga", name: "Yoga & Meditation", count: 112, category: "health" },
    {
      id: "film",
      name: "Film Festivals",
      count: 43,
      category: "entertainment",
    },
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
    {
      id: "finance",
      name: "Personal Finance",
      count: 58,
      category: "business",
    },
    { id: "vr", name: "Virtual Reality", count: 47, category: "technology" },
  ],
  Categorys: [
    {
      id: "technology",
      name: "Technology",
      description: "Tech conferences and workshops",
      icon: Code,
      color: "from-[#6366f1]/20 to-[#8b5cf6]/20",
    },
    {
      id: "business",
      name: "Business",
      description: "Networking and professional events",
      icon: Briefcase,
      color: "from-[#0ea5e9]/20 to-[#6366f1]/20",
    },
    {
      id: "art",
      name: "Art & Design",
      description: "Exhibitions and creative workshops",
      icon: Palette,
      color: "from-[#f43f5e]/20 to-[#ec4899]/20",
    },
    {
      id: "health",
      name: "Health & Wellness",
      description: "Fitness classes and mental wellness",
      icon: HeartPulse,
      color: "from-[#10b981]/20 to-[#14b8a6]/20",
    },
    {
      id: "entertainment",
      name: "Entertainment",
      description: "Concerts, shows, and performances",
      icon: Film,
      color: "from-[#f59e0b]/20 to-[#f97316]/20",
    },
    {
      id: "education",
      name: "Education",
      description: "Courses, lectures, and learning events",
      icon: Lightbulb,
      color: "from-[#3b82f6]/20 to-[#6366f1]/20",
    },
    {
      id: "community",
      name: "Community",
      description: "Meetups and social gatherings",
      icon: Users,
      color: "from-[#ec4899]/20 to-[#8b5cf6]/20",
    },
    {
      id: "music",
      name: "Music",
      description: "Live shows and festivals",
      icon: Mic2,
      color: "from-[#8b5cf6]/20 to-[#ec4899]/20",
    },
  ],
};

function reducer(state, action) {}

const EventProvider = ({ children }) => {
  const [
    { FeaturedEvents, UpcomingEvents, Testmonials, SubTopics, Categorys },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <EventsContext.Provider
      value={{
        FeaturedEvents,
        UpcomingEvents,
        Testmonials,
        SubTopics,
        Categorys,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
const useEvents = () => {
  const context = useContext(EventsContext);
  if (context === undefined)
    throw new Error("Context is used outSide of the Provider");

  return context;
};

export { EventProvider, useEvents };
