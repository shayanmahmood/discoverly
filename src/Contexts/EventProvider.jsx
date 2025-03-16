/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/react-in-jsx-scope */

import { createContext, useContext, useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import { PageLoader } from "../components/ui/Loader";
import { useGetEvents } from "../hooks/Events/useGetEvents";

const EventsContext = createContext();

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

function reducer(state, action) {
  switch (action.type) {
    case "events/loading":
      return { ...state, isLoading: true };
    case "events/loaded":
      return { ...state, isLoading: true };
    case "events/error":
      return { ...state, error: true, ErrorMessage: action.payload };
    case "events/abortError":
      return { ...state, error: false, ErrorMessage: "" };
    case "events/setAllEvents":
      return { ...state, allEvents: action.payload };

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
  const { events, loading, refetch } = useGetEvents();

  const initialState = {
    allEvents: [],
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
      {
        id: "music",
        name: "Live Music",
        count: 103,
        category: "entertainment",
      },
      {
        id: "finance",
        name: "Personal Finance",
        count: 58,
        category: "business",
      },
      { id: "vr", name: "Virtual Reality", count: 47, category: "technology" },
    ],
    isLoading: false,
    isError: false,
    ErrorMessage: "",

    searchQueryAllEvents: "",
    selectedCategoryAllEvents: "All Categories",
    selectedLocationAllEvents: "All Locations",
    filteredEventsAllEvents: [],
  };

  const [
    {
      isLoading,
      isError,
      ErrorMessage,

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

  if (!loading && allEvents.length === 0 && events.length > 0) {
    dispatch({ type: "events/setAllEvents", payload: events });
    dispatch({ type: "setFilterAllEvents", payload: events });
  }

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

  useEffect(() => {
    dispatch({ type: "events/setAllEvents", payload: events });
    dispatch({ type: "setFilterAllEvents", payload: events });
    refetch(); // Fetch latest events on page visit
  }, [refetch, events]);

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

  const handleLoading = () => {
    dispatch({ type: "events/loading" });
  };

  const handleLoaded = () => {
    dispatch({ type: "events/loaded" });
  };

  const handleError = () => {
    dispatch({ type: "events/error" });
  };

  const handleAbortError = (data) => {
    dispatch({ type: "events/abortError", payload: data });
  };

  if (isLoading && loading) return <PageLoader />;

  return (
    <EventsContext.Provider
      value={{
        isLoading,
        handleLoaded,
        handleLoading,

        isError,
        ErrorMessage,
        handleError,
        handleAbortError,

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
