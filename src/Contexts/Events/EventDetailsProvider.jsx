/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useEvents } from "../EventProvider";
import { useParams } from "react-router-dom";
import { toast } from "../../hooks/use-toast";
import useAuth from "../../hooks/useAuthUser";
import { auth } from "../../firebase/firebase";
import { PageLoader } from "../../components/ui/Loader";
import { format } from "date-fns";

const EventsDetailsContext = createContext();

const initialState = {
  event: null,
  extendedDetails: null,
  showInfoDialog: false,
  isRegister: false,
  isCopy: false,
  isMessaged: false,
  saveCalendar: false,
  userInfo: {
    name: "",
    subject: "",
    email: "",
    message: "",
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
    case "setMessaged":
      return { ...state, isMessaged: true };
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
      isMessaged,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { allEvents } = useEvents();
  const { id } = useParams();
  const {
    handleRegisterUser,
    isLoading,
    sendUserMessage,
    handleMessageRegister,
  } = useAuth();

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

  const memoizedRegisteredUsers = useMemo(() => {
    return JSON.stringify(event?.registeredUsers);
  }, [event?.registeredUsers]);

  useEffect(() => {
    if (memoizedRegisteredUsers) {
      const Registered = JSON.parse(memoizedRegisteredUsers).includes(
        auth.currentUser.uid
      );
      if (Registered) dispatch({ type: "setRegister" });
    }
  }, [memoizedRegisteredUsers]);

  const memoizedMessagedUsers = useMemo(() => {
    return JSON.stringify(event?.messageUsers);
  }, [event?.messageUsers]);

  useEffect(() => {
    if (memoizedMessagedUsers) {
      const Registered = JSON.parse(memoizedMessagedUsers).includes(
        auth.currentUser.uid
      );
      if (Registered) dispatch({ type: "setMessaged" });
    }
  }, [memoizedMessagedUsers]);

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
    handleRegisterUser(event.docId, auth.currentUser.uid);
  };

  const handleGetInfo = () => {
    dispatch({ type: "openDialog" });
  };

  const date = format(new Date(), "dd MMM yyyy");

  const handleInfoSubmit = (e) => {
    e.preventDefault();

    const messageToSend = {
      id: crypto.randomUUID(),
      preview:
        userInfo.message.length > 30
          ? userInfo.message.substring(0, 30) + "..."
          : userInfo.message,
      receiverId: event.organizeruid,
      event: event.title,
      senderId: auth.currentUser.uid,
      date: date.toString(),
      eventId: event.id,
      message: userInfo.message,
      sender: {
        name: auth.currentUser.displayName,
        email: userInfo.email,
        avatar: auth.currentUser.photoURL,
      },
      unread: true,
      subject: userInfo.message,
    };
    sendUserMessage(messageToSend.receiverId, messageToSend);
    handleMessageRegister(event.docId, auth.currentUser.uid);
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

  if (isLoading) return <PageLoader />;

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
        isMessaged,
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
