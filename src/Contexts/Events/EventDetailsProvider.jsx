/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { createContext, useContext, useEffect, useReducer } from "react";
import { useEvents } from "../EventProvider";
import { useParams } from "react-router-dom";
import { toast } from "../../hooks/use-toast";

const EventsDetailsContext = createContext();

const initialState = {
  event: null,
  extendedDetails: null,
  showInfoDialog: false,
  isRegister: false,
  isCopy: false,
  saveCalendar: false,
  userInfo: {
    name: "",
    email: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "setEvent":
      return { ...state, event: action.payload };
    case "setExtendedDetails":
      return { ...state, extendedDetails: action.payload };
    case "setIsCopy":
      return { ...state, isCopy: true };
    case "setRegister":
      return { ...state, isRegister: true };
    case "openDialog":
      return { ...state, showInfoDialog: true };
    case "closeDialog":
      return { ...state, showInfoDialog: false };
    case "setCalendar":
      return { ...state, saveCalendar: true };
    case "setInfoDialog":
      return { ...state, showInfoDialog: action.payload };
    case "setUserInfo":
      return { ...state, userInfo: action.payload };
    case "reset":
      return {
        ...state,
        showInfoDialog: false,
        userInfo: {
          name: "",
          email: "",
        },
      };

    default:
      throw new Error("Unknown Action");
  }
}

const EventDetailsProvider = ({ children }) => {
  const [
    {
      event,
      extendedDetails,
      isRegister,
      isCopy,
      saveCalendar,
      userInfo,
      showInfoDialog,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { allEvents } = useEvents();
  const { id } = useParams();



  useEffect(() => {
    if (id) {
      const foundEvent = allEvents.find((e) => e.id === id);
      if (foundEvent) {
        // Get extended details if available
        handleSetEvent(foundEvent);
        const details = foundEvent.extendedEventDetails;
        if (details) {
          handleSetExtendedDetails(details);
        }
      }
    }
  }, [id, allEvents]);

  const handleSetEvent = (data) => {
    dispatch({ type: "setEvent", payload: data });
  };

  const handleSetExtendedDetails = (data) => {
    dispatch({ type: "setExtendedDetails", payload: data });
  };

  const handleShare = () => {
    dispatch({ type: "setIsCopy" });
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Event link has been copied to clipboard",
      duration: 3000,
    });
  };

  const handleRegister = () => {
    dispatch({ type: "setRegister" });
    toast({
      title: "Registration successful",
      description: `You are now registered for ${event?.title}`,
      duration: 3000,
    });
  };

  const handleGetInfo = () => {
    dispatch({ type: "openDialog" });
  };

  const handleInfoSubmit = (e) => {
    e.preventDefault();

    if (!userInfo.name.trim() || !userInfo.email.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both your name and email",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    toast({
      title: "Request sent",
      description: `Event information will be sent to ${userInfo.email}`,
      duration: 3000,
    });

    dispatch({ type: "reset" });
  };

  const handleSaveToCalendar = () => {
    if (!event) return;

    // Format event details for Google Calendar
    dispatch({ type: "setCalendar" });
    const title = encodeURIComponent(event.title);
    const location = encodeURIComponent(event.location);
    const description = encodeURIComponent(
      extendedDetails?.description || event.title
    );

    // For simplicity, use the date string as-is (in real app, would parse to proper format)
    const dates = encodeURIComponent(event.date);

    // Create Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&location=${location}&details=${description}&dates=${dates}`;

    // Open in new tab
    window.open(googleCalendarUrl, "_blank");

    toast({
      title: "Calendar event",
      description: "Google Calendar opened with event details",
      duration: 3000,
    });
  };

  const handleInfoDialog = (data) => {
    dispatch({ type: "setInfoDialog", payload: data });
  };

  const handleUserInfo = (data) => {
    dispatch({ type: "setUserInfo", payload: data });
  };

  return (
    <EventsDetailsContext.Provider
      value={{
        event,
        extendedDetails,
        isRegister,
        isCopy,
        saveCalendar,
        userInfo,
        showInfoDialog,

        handleSetEvent,
        handleSetExtendedDetails,
        handleShare,
        handleRegister,
        handleGetInfo,
        handleInfoSubmit,
        handleSaveToCalendar,
        handleInfoDialog,
        handleUserInfo,
      }}
    >
      {children}
    </EventsDetailsContext.Provider>
  );
};

const useEventDetails = () => {
  const context = useContext(EventsDetailsContext);
  if (!context) throw new Error("Context is used outside of the context");
  return context;
};

export { useEventDetails, EventDetailsProvider };
