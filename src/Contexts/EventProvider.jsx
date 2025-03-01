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
  allEvents: [
    {
      id: "1",
      title: "World Tech Summit 2023",
      date: "June 15, 2023",
      time: "9:00 AM - 5:00 PM",
      location: "San Francisco Convention Center",
      category: "Technology",
      attendees: 1250,
      image:
        "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "2",
      title: "Leadership & Innovation Conference",
      date: "June 22, 2023",
      time: "10:00 AM - 4:00 PM",
      location: "New York Business Center",
      category: "Business",
      attendees: 850,
      image:
        "https://images.unsplash.com/photo-1560523159-4a9692d222ef?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "3",
      title: "Digital Art Exhibition",
      date: "July 5, 2023",
      time: "11:00 AM - 7:00 PM",
      location: "Modern Art Gallery, London",
      category: "Art",
      attendees: 620,
      image:
        "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "4",
      title: "Wellness & Mindfulness Retreat",
      date: "July 12, 2023",
      time: "8:00 AM - 6:00 PM",
      location: "Sunshine Wellness Center, Austin",
      category: "Health",
      attendees: 380,
      image:
        "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80",
    },
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
  extendedEventDetails: {
    1: {
      description:
        "Join us for the World Tech Summit 2023, where industry leaders and innovators gather to discuss the latest advancements in technology. This year's summit will focus on artificial intelligence, blockchain, quantum computing, and sustainable technology solutions.",
      organizer: "Global Tech Association",
      ticketPrice: "$299",
      website: "https://worldtechsummit.example.com",
      agenda: [
        { time: "9:00 AM", activity: "Registration & Breakfast" },
        {
          time: "10:00 AM",
          activity: "Opening Keynote: The Future of Technology",
        },
        { time: "11:30 AM", activity: "Panel Discussion: AI Ethics" },
        { time: "1:00 PM", activity: "Lunch Break & Networking" },
        { time: "2:30 PM", activity: "Workshops (Multiple Tracks)" },
        { time: "4:30 PM", activity: "Closing Remarks" },
      ],
      sponsors: ["TechCorp", "InnovateLabs", "FutureWorks"],
      additionalImages: [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
      ],
    },
    2: {
      description:
        "The Leadership & Innovation Conference brings together executives, entrepreneurs, and thought leaders to explore cutting-edge strategies for business growth and innovation. Learn from successful leaders and gain insights that will transform your organization.",
      organizer: "Business Innovation Network",
      ticketPrice: "$349",
      website: "https://leadershipconference.example.com",
      agenda: [
        { time: "10:00 AM", activity: "Welcome & Introduction" },
        { time: "10:30 AM", activity: "Keynote: Transformational Leadership" },
        { time: "12:00 PM", activity: "Networking Lunch" },
        { time: "1:30 PM", activity: "Workshop: Innovation Frameworks" },
        { time: "3:00 PM", activity: "Panel: Future of Work" },
        { time: "4:00 PM", activity: "Closing Session & Networking" },
      ],
      sponsors: ["LeaderCorp", "InnovateNow", "FutureLeaders"],
    },
    3: {
      description:
        "Experience the cutting edge of digital art at this immersive exhibition. Featuring works from renowned digital artists around the world, this exhibition showcases how technology is pushing the boundaries of artistic expression in the 21st century.",
      organizer: "Modern Art Collective",
      ticketPrice: "$25",
      website: "https://digitalartexhibition.example.com",
      additionalImages: [
        "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1598395927056-8d895e701c3b?auto=format&fit=crop&w=800&q=80",
      ],
    },
    4: {
      description:
        "Take a day to focus on your mental and physical wellbeing at our Wellness & Mindfulness Retreat. Expert instructors will guide you through meditation sessions, yoga practices, and workshops on stress management and healthy living.",
      organizer: "Wellness Collective",
      ticketPrice: "$75",
      agenda: [
        { time: "8:00 AM", activity: "Morning Meditation" },
        { time: "9:30 AM", activity: "Yoga Session" },
        { time: "11:00 AM", activity: "Mindful Eating Workshop" },
        { time: "12:30 PM", activity: "Plant-based Lunch" },
        { time: "2:00 PM", activity: "Stress Management Workshop" },
        { time: "4:00 PM", activity: "Sound Healing Session" },
        { time: "5:30 PM", activity: "Closing Circle" },
      ],
    },
    5: {
      description:
        "The Annual Global AI Conference is the premier event for AI researchers, industry leaders, and practitioners. This three-day conference will cover the latest breakthroughs in machine learning, applications of AI across industries, and the ethical implications of artificial intelligence.",
      organizer: "International AI Society",
      ticketPrice: "$499",
      website: "https://globalaiconference.example.com",
      agenda: [
        { time: "Day 1", activity: "Research Presentations & Workshops" },
        { time: "Day 2", activity: "Industry Applications & Case Studies" },
        {
          time: "Day 3",
          activity: "Future Directions & Ethical Considerations",
        },
      ],
      sponsors: ["AITech", "Neural Systems", "DeepMind Inc", "FutureTech"],
    },
    6: {
      description:
        "The International Film Festival showcases independent films from around the world. From documentaries to feature films, short films to experimental cinema, this week-long festival celebrates the diversity and creativity of global filmmaking.",
      organizer: "International Film Association",
      ticketPrice: "$15 per screening / $120 festival pass",
      website: "https://internationalfilmfest.example.com",
      additionalImages: [
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
      ],
    },
    7: {
      description:
        "The Sustainable Business Summit brings together business leaders, policymakers, and sustainability experts to discuss strategies for building environmentally responsible and socially conscious businesses. Learn how leading companies are integrating sustainability into their core business models.",
      organizer: "Green Business Coalition",
      ticketPrice: "$275",
      website: "https://sustainablebusiness.example.com",
      agenda: [
        { time: "9:00 AM", activity: "Registration" },
        {
          time: "9:30 AM",
          activity: "Opening Keynote: Business in the Climate Crisis Era",
        },
        { time: "11:00 AM", activity: "Panel: Circular Economy Models" },
        { time: "12:30 PM", activity: "Networking Lunch" },
        { time: "2:00 PM", activity: "Workshop: Measuring & Reporting Impact" },
        { time: "4:00 PM", activity: "Case Studies: Success Stories" },
        { time: "5:30 PM", activity: "Closing Reception" },
      ],
      sponsors: ["EcoGroup", "SustainableFuture", "GreenTech"],
    },
    8: {
      description:
        "The Digital Marketing Masterclass is an intensive one-day workshop designed for marketing professionals looking to enhance their digital skills. Expert instructors will guide you through the latest strategies in SEO, content marketing, social media, and digital advertising.",
      organizer: "Digital Marketing Institute",
      ticketPrice: "$199",
      website: "https://digitalmarketingclass.example.com",
      agenda: [
        { time: "10:00 AM", activity: "SEO & Content Strategy" },
        { time: "11:30 AM", activity: "Social Media Marketing" },
        { time: "1:00 PM", activity: "Networking Lunch" },
        { time: "2:00 PM", activity: "Email Marketing & Automation" },
        { time: "3:30 PM", activity: "Analytics & Performance Tracking" },
      ],
      sponsors: ["DigitalPro", "MarketingGenius", "AnalyticsMaster"],
    },
  },
  FeaturedEvents: [
    {
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
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
    {
      FeaturedEvents,
      UpcomingEvents,
      Testmonials,
      SubTopics,
      Categorys,
      allEvents,
      extendedEventDetails,
    },
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
        allEvents,
        extendedEventDetails,
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
