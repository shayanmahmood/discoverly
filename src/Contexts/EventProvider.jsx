/* eslint-disable react/prop-types */
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
import { createContext, useContext, useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";

const EventsContext = createContext();
const allEvents = [
  {
    id: "1",
    title: "World Tech Summit 2023",
    date: "June 15, 2023",
    time: "9:00 AM - 5:00 PM",
    location: "San Francisco Convention Center",
    category: "Technology",
    categoryExtends: {
      id: "technology",
      name: "Technology",
      description: "Tech conferences and workshops",
      icon: Code,
      color: "from-[#6366f1]/20 to-[#8b5cf6]/20",
    },
    attendees: 1250,
    image:
      "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=800&q=80",
    featured: false,
    upcomming: true,
    price: "$299",
    extendedEventDetails: {
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
  },
  {
    id: "2",
    title: "Leadership & Innovation Conference",
    date: "June 22, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "New York Business Center",
    category: "Business",
    categoryExtends: {
      id: "business",
      name: "Business",
      description: "Networking and professional events",
      icon: Briefcase,
      color: "from-[#0ea5e9]/20 to-[#6366f1]/20",
    },
    attendees: 850,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1560523159-4a9692d222ef?auto=format&fit=crop&w=800&q=80",
    upcomming: false,
    price: "$199",
    extendedEventDetails: {
      description:
        "The Leadership & Innovation Conference brings together executives, entrepreneurs, and thought leaders to explore cutting-edge strategies for business growth and innovation. Learn from successful leaders and gain insights that will transform your organization.",
      organizer: "Business Innovation Network",
      ticketPrice: "$349",
      website: "https://leadershipconference.example.com",
      agenda: [
        { time: "10:00 AM", activity: "Welcome & Introduction" },
        {
          time: "10:30 AM",
          activity: "Keynote: Transformational Leadership",
        },
        { time: "12:00 PM", activity: "Networking Lunch" },
        { time: "1:30 PM", activity: "Workshop: Innovation Frameworks" },
        { time: "3:00 PM", activity: "Panel: Future of Work" },
        { time: "4:00 PM", activity: "Closing Session & Networking" },
      ],
      sponsors: ["LeaderCorp", "InnovateNow", "FutureLeaders"],
    },
  },
  {
    id: "3",
    title: "Digital Art Exhibition",
    date: "July 5, 2023",
    time: "11:00 AM - 7:00 PM",
    location: "Modern Art Gallery, London",
    category: "Art",
    categoryExtends: {
      id: "art",
      name: "Art & Design",
      description: "Exhibitions and creative workshops",
      icon: Palette,
      color: "from-[#f43f5e]/20 to-[#ec4899]/20",
    },
    attendees: 620,
    upcomming: false,
    featured: false,
    price: "$999",
    extendedEventDetails: {
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
    categoryExtends: {
      id: "health",
      name: "Health & Wellness",
      description: "Fitness classes and mental wellness",
      icon: HeartPulse,
      color: "from-[#10b981]/20 to-[#14b8a6]/20",
    },
    attendees: 380,
    featured: false,
    upcomming: false,
    price: "$599",
    extendedEventDetails: {
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
    categoryExtends: {
      id: "technology",
      name: "Technology",
      description: "Tech conferences and workshops",
      icon: Code,
      color: "from-[#6366f1]/20 to-[#8b5cf6]/20",
    },
    attendees: 2800,
    upcomming: false,
    price: "$1099",
    extendedEventDetails: {
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
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },
  {
    id: "6",
    title: "International Film Festival",
    date: "September 5-12, 2023",
    time: "Various Times",
    location: "Berlin Cultural Center, Germany",
    category: "Entertainment",
    categoryExtends: {
      id: "entertainment",
      name: "Entertainment",
      description: "Concerts, shows, and performances",
      icon: Film,
      color: "from-[#f59e0b]/20 to-[#f97316]/20",
    },
    attendees: 4500,
    upcomming: true,
    price: "$299",
    extendedEventDetails: {
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
    categoryExtends: {
      id: "business",
      name: "Business",
      description: "Networking and professional events",
      icon: Briefcase,
      color: "from-[#0ea5e9]/20 to-[#6366f1]/20",
    },
    attendees: 1200,
    price: "$109",
    extendedEventDetails: {
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
        {
          time: "2:00 PM",
          activity: "Workshop: Measuring & Reporting Impact",
        },
        { time: "4:00 PM", activity: "Case Studies: Success Stories" },
        { time: "5:30 PM", activity: "Closing Reception" },
      ],
      sponsors: ["EcoGroup", "SustainableFuture", "GreenTech"],
    },
    upcomming: true,
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
    category: "Business",
    categoryExtends: {
      id: "business",
      name: "Business",
      description: "Networking and professional events",
      icon: Briefcase,
      color: "from-[#0ea5e9]/20 to-[#6366f1]/20",
    },
    attendees: 850,
    price: "$119",
    upcomming: true,
    extendedEventDetails: {
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

    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: "9",
    title: "Global Education Forum 2023",
    date: "December 10-12, 2023",
    time: "9:00 AM - 6:00 PM",
    location: "Oxford University, UK",
    category: "Education",
    categoryExtends: {
      id: "education",
      name: "Education",
      description: "Courses, lectures, and learning events",
      icon: Lightbulb,
      color: "from-[#3b82f6]/20 to-[#6366f1]/20",
    },
    attendees: 1500,
    price: "$199",
    upcomming: false,
    featured: false,
    extendedEventDetails: {
      description:
        "The Global Education Forum brings together educators, policymakers, and researchers to discuss the future of education. Topics include digital learning, inclusive education, and the role of AI in teaching.",
      organizer: "International Education Association",
      ticketPrice: "$199",
      website: "https://globaleducationforum.example.com",
      agenda: [
        { time: "9:00 AM", activity: "Opening Remarks & Keynote" },
        {
          time: "10:30 AM",
          activity: "Panel: The Future of Online Learning",
        },
        { time: "12:00 PM", activity: "Lunch & Networking" },
        { time: "2:00 PM", activity: "Workshop: AI in Education" },
        {
          time: "4:00 PM",
          activity: "Case Studies: Successful Learning Models",
        },
        { time: "5:30 PM", activity: "Closing Session" },
      ],
      sponsors: ["EduTech", "FutureClassroom", "SmartLearning"],
    },
    image:
      "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "10",
    title: "Neighborhood Clean-Up Drive",
    date: "2024-03-15",
    time: "08:00 - 13:00",
    location: "Central Park, New York",
    category: "Community",
    categoryExtends: {
      id: "community",
      name: "Community",
      description: "Meetups and social gatherings",
      icon: Users,
      color: "from-[#ec4899]/20 to-[#8b5cf6]/20",
    },
    attendees: 500,
    price: 0,
    upcoming: false,
    featured: false,
    extendedEventDetails: {
      description:
        "Join us in making a difference by participating in the Neighborhood Clean-Up Drive! Volunteers will work together to clean public spaces, plant trees, and promote environmental awareness.",
      organizer: "Green Earth Initiative",
      ticketPrice: 0,
      website: "https://communitycleanup.example.com",
      agenda: [
        { time: "08:00", activity: "Welcome & Briefing" },
        {
          time: "08:30",
          activity: "Group Assignments & Safety Instructions",
        },
        { time: "09:00", activity: "Clean-Up Activities Begin" },
        { time: "11:30", activity: "Tree Planting Ceremony" },
        { time: "12:30", activity: "Closing Remarks & Refreshments" },
      ],
      sponsors: ["EcoFriendly", "Local Green", "Community Helpers"],
    },
    image:
      "https://plus.unsplash.com/premium_photo-1671350973810-d60e59970416?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "11",
    title: "Summer Beats Music Festival",
    date: "2024-06-22",
    time: "16:00 - 23:30",
    location: "Sunset Beach, California",
    category: "Music",
    categoryExtends: {
      id: "music",
      name: "Music",
      description: "Live shows and festivals",
      icon: Mic2,
      color: "from-[#8b5cf6]/20 to-[#ec4899]/20",
    },
    attendees: 10000,
    price: 50,
    upcoming: true,
    featured: true,
    extendedEventDetails: {
      description:
        "Experience an electrifying night at the Summer Beats Music Festival! Enjoy live performances from top artists, food stalls, and a breathtaking beachside atmosphere.",
      organizer: "Sunset Vibes Entertainment",
      ticketPrice: 50,
      website: "https://summerbeatsfestival.com",
      lineup: [
        { time: "16:30", artist: "DJ Sonic" },
        { time: "18:00", artist: "The Midnight Band" },
        { time: "20:00", artist: "Luna & The Stars" },
        { time: "22:00", artist: "EchoWave" },
      ],
      sponsors: ["Beats Audio", "Coca-Cola", "Sunset Hotels"],
    },
    image:
      "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?auto=format&fit=crop&w=800&q=80",
  },
];
const Testmonials = [
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
];
const SubTopics = [
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
];

const initialState = {
  // Global Events States
  allEvents: allEvents,
  Testmonials: Testmonials,
  SubTopics: SubTopics,

  // AllEvents page's Filteration States
  searchQueryAllEvents: "",
  selectedCategoryAllEvents: "All Categories",
  selectedLocationAllEvents: "All Locations",
  filteredEventsAllEvents: allEvents,
};

function reducer(state, action) {
  switch (action.type) {
    case "setFilterAllEvents":
      return { ...state, filteredEventsAllEvents: action.payload };
    case "setCategoryAllEvents":
      return { ...state, selectedCategoryAllEvents: action.payload };
    case "setSearchQueryAllEvents":
      return { ...state, searchQueryAllEvents: action.payload };
    case "setLocationAllEvents":
      return { ...state, selectedLocationAllEvents: action.payload };
    case "resetAllEvents":
      return {
        ...state,
        searchQueryAllEvents: "",
        selectedCategoryAllEvents: "All Categories",
        selectedLocationAllEvents: "All Locations",
        filteredEventsAllEvents: state.allEvents,
      };
    default:
      throw new Error("Unknown Action");
  }
}

const EventProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("cat");

  const [
    {
      UpcomingEvents,
      Testmonials,
      SubTopics,
      Categorys,
      allEvents,
      extendedEventDetails,

      searchQueryAllEvents,
      selectedCategoryAllEvents,
      selectedLocationAllEvents,
      filteredEventsAllEvents,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const categoriesAllEvents = allEvents?.reduce((acc, event) => {
    if (!acc.some((cat) => cat.id === event.categoryExtends.id)) {
      acc.push(event.categoryExtends);
    }
    return acc;
  }, []);

  const LocationsCatAllEvents = allEvents?.reduce((acc, event) => {
    if (!acc.some((cat) => cat.id === event.categoryExtends.id)) {
      acc.push(event);
    }
    return acc;
  }, []);

  const categoriesNamesAllEvents = categoriesAllEvents?.map((cat) => cat.name);
  categoriesNamesAllEvents?.push("All Categories");

  const locationsAllEvents = LocationsCatAllEvents?.map((cat) => cat.location);
  locationsAllEvents?.push("All Locations");

  useEffect(() => {
    const filtered = allEvents.filter((event) => {
      const matchesSearch =
        event.title
          .toLowerCase()
          .includes(searchQueryAllEvents.toLowerCase()) ||
        event.location
          .toLowerCase()
          .includes(searchQueryAllEvents.toLowerCase()) ||
        event.category
          .toLowerCase()
          .includes(searchQueryAllEvents.toLowerCase());

      // Filter by category
      const matchesCategory =
        selectedCategoryAllEvents === "All Categories" ||
        event.category === selectedCategoryAllEvents;

      // Filter by location
      const matchesLocation =
        selectedLocationAllEvents === "All Locations" ||
        event.location
          .toLowerCase()
          .includes(selectedLocationAllEvents.toLowerCase());

      return matchesSearch && matchesCategory && matchesLocation;
    });

    dispatch({ type: "setFilterAllEvents", payload: filtered });
  }, [
    searchQueryAllEvents,
    selectedCategoryAllEvents,
    selectedLocationAllEvents,
    allEvents,
  ]);

  useEffect(() => {
    if (category) {
      dispatch({ type: "setCategoryAllEvents", payload: `${category}` });
    }
  }, [category, selectedCategoryAllEvents]);

  const handleChangeSearchQuery = (data) => {
    dispatch({ type: "setSearchQueryAllEvents", payload: data });
  };

  const handleChangeCategory = (data) => {
    dispatch({ type: "setCategoryAllEvents", payload: data });
  };

  const handleChangeLocation = (data) => {
    dispatch({ type: "setLocationAllEvents", payload: data });
  };

  const handleResetFilters = () => {
    dispatch({ type: "resetAllEvents" });
  };

  return (
    <EventsContext.Provider
      value={{
        UpcomingEvents,
        Testmonials,
        SubTopics,
        Categorys,

        allEvents,
        extendedEventDetails,

        searchQueryAllEvents,
        selectedCategoryAllEvents,
        selectedLocationAllEvents,
        filteredEventsAllEvents,
        locationsAllEvents,
        categoriesNamesAllEvents,

        handleChangeSearchQuery,
        handleChangeCategory,
        handleChangeLocation,
        handleResetFilters,
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
