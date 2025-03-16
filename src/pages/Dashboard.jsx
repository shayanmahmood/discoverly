/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";
import { Button } from "../components/ui/Button";
import { Separator } from "../components/ui/Separater";
import {
  CalendarPlus,
  BarChart3,
  MessagesSquare,
  Settings,
  Ticket,
  Calendar,
} from "lucide-react";

import DashboardStats from "../components/Dashboard/DashboardStats";
import MessageInbox from "../components/Dashboard/MessageInbox";
import ProfileSettings from "../components/Dashboard/ProfileSettings";
import { toast } from "sonner";
import { DashboardHeader } from "../components/Dashboard/DashboardHeader";
import EventSearch from "../components/Dashboard/EventSearch";
import EventTable from "../components/Dashboard/EventTable";
import RegisteredEventCards from "../components/Dashboard/RegisteredEventCards";
import CreateEventDialog from "../components/Dashboard/CreateEventDialog";
import EditEventDialog from "../components/Dashboard/EditEventDialog";
import DeleteEventDialog from "../components/Dashboard/DeleteEventDialog";
import StatsCards from "../components/Dashboard/StatsCards";
import useAuth from "../hooks/useAuthUser";
import { useGetEvents } from "../hooks/Events/useGetEvents";
import { PageLoader } from "../components/ui/Loader";
import useAuthUser from "../hooks/useAuth";

// Sample data for the dashboard
// const mockUserEvents = [
//   {
//     id: "101",
//     title: "Tech Conference 2023",
//     date: "2023-11-15",
//     location: "San Francisco, CA",
//     attendees: 342,
//     sales: "$15,240",
//     status: "active",
//   },
//   {
//     id: "102",
//     title: "Marketing Workshop",
//     date: "2023-11-22",
//     location: "Online",
//     attendees: 89,
//     sales: "$4,450",
//     status: "active",
//   },
//   {
//     id: "103",
//     title: "Product Launch Party",
//     date: "2023-12-05",
//     location: "New York, NY",
//     attendees: 156,
//     sales: "$7,800",
//     status: "draft",
//   },
// ];

const mockRegisteredEvents = [
  {
    id: "201",
    title: "UX/UI Design Summit",
    date: "2023-11-18",
    location: "Chicago, IL",
    ticketType: "VIP Pass",
    organizer: "Design Academy",
  },
  {
    id: "202",
    title: "Annual Developer Conference",
    date: "2023-12-10",
    location: "Seattle, WA",
    ticketType: "General Admission",
    organizer: "TechConnect",
  },
];

const categoryOptions = [
  {
    id: "technology",
    name: "Technology",
    icon: "Code",
    color: "from-[#6366f1]/20 to-[#8b5cf6]/20",
    description: "Tech conferences and workshops",
  },
  {
    id: "business",
    name: "Business",
    icon: "Briefcase",
    color: "from-[#0ea5e9]/20 to-[#6366f1]/20",
    description: "Networking and professional events",
  },
  {
    id: "health",
    name: "Health & Wellness",
    icon: "HeartPulse",
    color: "from-[#10b981]/20 to-[#14b8a6]/20",
    description: "Fitness classes and mental wellness",
  },
  {
    id: "music",
    name: "Music",
    icon: "Mic2",
    color: "from-[#8b5cf6]/20 to-[#ec4899]/20",
    description: "Live shows and festivals",
  },
  {
    id: "art",
    name: "Art & Design",
    icon: "Palette",
    color: "from-[#f43f5e]/20 to-[#ec4899]/20",
    description: "Exhibitions and creative workshops",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: "Film",
    color: "from-[#f59e0b]/20 to-[#f97316]/20",
    description: "Concerts, shows, and performances",
  },
  {
    id: "education",
    name: "Education",
    icon: "Lightbulb",
    color: "from-[#3b82f6]/20 to-[#6366f1]/20",
    description: "Courses, lectures, and learning events",
  },
  {
    id: "community",
    name: "Community",
    icon: "Users",
    color: "from-[#ec4899]/20 to-[#8b5cf6]/20",
    description: "Meetups and social gatherings",
  },
];

const Dashboard = () => {
  const [isCreateEventDialogOpen, setIsCreateEventDialogOpen] = useState(false);
  const [isEditEventDialogOpen, setIsEditEventDialogOpen] = useState(false);
  const [isDeleteEventDialogOpen, setIsDeleteEventDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [searchMyEvents, setSearchMyEvents] = useState("");
  const [searchRegisteredEvents, setSearchRegisteredEvents] = useState("");
  const { events, loading } = useGetEvents();
  const { user, loading: isLoading } = useAuthUser();
  const filtered = events?.filter((event) => event.organizeruid === user.uid);
  const mockUserEvents = events
    .filter((event) => event.registeredUsers)
    .filter((event) => event.registeredUsers.includes(user.uid));

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    category: "",
    featured: false,
    upcoming: true,
    image: "",
    attendees: 0,
    organizer: "",
    website: "",
    categoryId: "",
  });

  const [agendaItems, setAgendaItems] = useState([{ time: "", activity: "" }]);
  const [sponsors, setSponsors] = useState([]);
  const [additionalImages, setAdditionalImages] = useState([""]);
  const [lineup, setLineup] = useState([{ artist: "", time: "" }]);

  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab") || "myEvents"; // Default to 'myEvents'

  // Local state to track tab selection
  const [currentTab, setCurrentTab] = useState(tabFromUrl);
  const { handleAddEvent, handleTheEditEvent, handleDelEvent } = useAuth();

  // Sync local state with URL changes
  useEffect(() => {
    if (tabFromUrl !== currentTab) {
      setCurrentTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  // Handle tab change
  const handleTabChange = (tabValue) => {
    setCurrentTab(tabValue);
    setSearchParams({ tab: tabValue }); // Update URL
  };

  const filteredMyEvents = filtered.filter(
    (event) =>
      event.title.toLowerCase().includes(searchMyEvents.toLowerCase()) ||
      event.location.toLowerCase().includes(searchMyEvents.toLowerCase())
  );

  const filteredRegisteredEvents = mockUserEvents.filter(
    (event) =>
      event.title
        .toLowerCase()
        .includes(searchRegisteredEvents.toLowerCase()) ||
      event.location
        .toLowerCase()
        .includes(searchRegisteredEvents.toLowerCase()) ||
      event.organizer
        .toLowerCase()
        .includes(searchRegisteredEvents.toLowerCase())
  );

  const handleCreateEvent = (e) => {
    e.preventDefault();

    const eventObject = {
      ...newEvent,
      categoryExtends:
        categoryOptions.find((cat) => cat.id === newEvent.categoryId) || {},
      extendedEventDetails: {
        description: newEvent.description,
        organizer: newEvent.organizer,
        ticketPrice: newEvent.ticketPrice || newEvent.price,
        website: newEvent.website,
        sponsors: sponsors.filter((s) => s.trim() !== ""),
        agenda: agendaItems.filter(
          (item) => item.time.trim() !== "" || item.activity.trim() !== ""
        ),
        additionalImages: additionalImages,
        location: newEvent.location,
      },
    };

    console.log("New Event Object:", eventObject);

    toast.success("Event creating!");
    handleAddEvent(eventObject);
    setIsCreateEventDialogOpen(false);

    resetEventForm();
  };

  const handleEditEvent = (e) => {
    e.preventDefault();
    const eventObject = {
      ...newEvent,
      categoryExtends:
        categoryOptions.find((cat) => cat.id === newEvent.categoryId) || {},
      extendedEventDetails: {
        description: newEvent.description,
        organizer: newEvent.organizer,
        ticketPrice: newEvent.ticketPrice || newEvent.price,
        website: newEvent.website,
        sponsors: sponsors.filter((s) => s.trim() !== ""),
        agenda: agendaItems.filter(
          (item) => item.time.trim() !== "" || item.activity.trim() !== ""
        ),
        additionalImages: additionalImages.filter((img) => img !== ""),
        location: newEvent.location,
      },
    };
    console.log("Updated Event Object:", eventObject);
    handleTheEditEvent(eventObject.docId, eventObject);
    setIsEditEventDialogOpen(false);
  };

  const handleDeleteEvent = () => {
    console.log("Deleting Event:", currentEvent);
    handleDelEvent(currentEvent.docId);
    setIsDeleteEventDialogOpen(false);
  };

  const openEditDialog = (event) => {
    setCurrentEvent(event);

    setNewEvent({
      ...event,
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.extendedEventDetails?.description || "",
      category: event.category,
      categoryId: event.categoryExtends?.id || "",
      featured: event.featured || false,
      upcoming: event.upcoming || event.upcomming || false,
      image: event.image || "",
      attendees: event.attendees || 0,
      organizer: event.extendedEventDetails?.organizer || "",
      website: event.extendedEventDetails?.website || "",
      ticketPrice: event.extendedEventDetails?.ticketPrice || "",
    });

    if (
      event.extendedEventDetails?.agenda &&
      event.extendedEventDetails.agenda.length > 0
    ) {
      setAgendaItems(event.extendedEventDetails.agenda);
    } else {
      setAgendaItems([{ time: "", activity: "" }]);
    }

    if (
      event.extendedEventDetails?.sponsors &&
      event.extendedEventDetails.sponsors.length > 0
    ) {
      setSponsors(event.extendedEventDetails.sponsors);
    } else {
      setSponsors([""]);
    }

    if (
      event.extendedEventDetails?.additionalImages &&
      event.extendedEventDetails.additionalImages.length > 0
    ) {
      setAdditionalImages(event.extendedEventDetails.additionalImages);
    } else {
      setAdditionalImages([""]);
    }

    if (
      event.extendedEventDetails?.lineup &&
      event.extendedEventDetails.lineup.length > 0
    ) {
      setLineup(event.extendedEventDetails.lineup);
    } else {
      setLineup([{ artist: "", time: "" }]);
    }

    setIsEditEventDialogOpen(true);
  };

  const openDeleteDialog = (event) => {
    setCurrentEvent(event);
    setIsDeleteEventDialogOpen(true);
  };

  const resetEventForm = () => {
    setNewEvent({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      category: "",
      featured: false,
      upcoming: true,
      image: "",
      attendees: 0,
      organizer: "",
      website: "",
      categoryId: "",
    });

    setAdditionalImages([]);
  };

  const addAgendaItem = () => {
    setAgendaItems([...agendaItems, { time: "", activity: "" }]);
  };

  const updateAgendaItem = (index, field, value) => {
    const updatedAgenda = [...agendaItems];
    updatedAgenda[index][field] = value;
    setAgendaItems(updatedAgenda);
  };

  const removeAgendaItem = (index) => {
    if (agendaItems.length > 1) {
      const updatedAgenda = agendaItems.filter((_, i) => i !== index);
      setAgendaItems(updatedAgenda);
    }
  };

  const addSponsor = () => {
    setSponsors([...sponsors, ""]);
  };

  const updateSponsor = (index, value) => {
    const updatedSponsors = [...sponsors];
    updatedSponsors[index] = value;
    setSponsors(updatedSponsors);
  };

  const removeSponsor = (index) => {
    if (sponsors.length > 1) {
      const updatedSponsors = sponsors.filter((_, i) => i !== index);
      setSponsors(updatedSponsors);
    }
  };

  const addAdditionalImage = (data) => {
    setAdditionalImages(data);
  };

  const updateAdditionalImage = (index, value) => {
    const updatedImages = [...additionalImages];
    updatedImages[index] = value;
    setAdditionalImages(updatedImages);
  };

  const removeAdditionalImage = (index) => {
    if (additionalImages.length > 1) {
      const updatedImages = additionalImages.filter((_, i) => i !== index);
      setAdditionalImages(updatedImages);
    }
  };

  const addLineupItem = () => {
    setLineup([...lineup, { artist: "", time: "" }]);
  };

  const updateLineupItem = (index, field, value) => {
    const updatedLineup = [...lineup];
    updatedLineup[index][field] = value;
    setLineup(updatedLineup);
  };

  const removeLineupItem = (index) => {
    if (lineup.length > 1) {
      const updatedLineup = lineup.filter((_, i) => i !== index);
      setLineup(updatedLineup);
    }
  };

  const memoizedProps = useMemo(
    () => ({
      newEvent,
      setNewEvent,
      categoryOptions,
      agendaItems,
      addAgendaItem,
      updateAgendaItem,
      removeAgendaItem,
      sponsors,
      addSponsor,
      updateSponsor,
      removeSponsor,
      additionalImages,
      addAdditionalImage,
      updateAdditionalImage,
      removeAdditionalImage,
      lineup,
      addLineupItem,
      updateLineupItem,
      removeLineupItem,
      handleCreateEvent,
    }),
    [newEvent, categoryOptions, agendaItems, sponsors, additionalImages, lineup]
  );

  if (loading && isLoading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-3xl font-bold tracking-tight">
              Your Dashboard
            </h2>
            <Button
              onClick={() => {
                setCurrentEvent(false);
                resetEventForm();
                setIsCreateEventDialogOpen(true);
              }}
              className="w-full sm:w-auto"
            >
              <CalendarPlus className="mr-2 h-4 w-4" /> Create New Event
            </Button>
          </div>

          <Separator />

          <StatsCards
            userEventsCount={mockUserEvents.length}
            registeredEventsCount={mockRegisteredEvents.length}
          />

          <Tabs
            defaultValue="myEvents"
            value={currentTab}
            onValueChange={handleTabChange}
            className="w-full mt-6"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="myEvents" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> My Events
              </TabsTrigger>
              <TabsTrigger
                value="registered"
                className="flex items-center gap-2"
              >
                <Ticket className="h-4 w-4" /> Registered
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessagesSquare className="h-4 w-4" /> Messages
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" /> Statistics
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" /> Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="myEvents" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Events You Created</h3>
                <div className="flex gap-2">
                  <EventSearch
                    searchTerm={searchMyEvents}
                    setSearchTerm={setSearchMyEvents}
                    placeholder="Search events..."
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Title
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Date
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Location
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Attendees
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Sales
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Status
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {events.length === 0 ? (
                        <tr>
                          <td
                            colSpan="7"
                            className="p-4 text-center text-muted-foreground"
                          >
                            No events found
                          </td>
                        </tr>
                      ) : (
                        <EventTable
                          events={filteredMyEvents}
                          onEditEvent={openEditDialog}
                          onDeleteEvent={openDeleteDialog}
                        />
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="registered" className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  Events You've Registered For
                </h3>
                <EventSearch
                  searchTerm={searchRegisteredEvents}
                  setSearchTerm={setSearchRegisteredEvents}
                  placeholder="Search registered events..."
                />
              </div>

              <RegisteredEventCards events={filteredRegisteredEvents} />
            </TabsContent>

            <TabsContent value="messages">
              <MessageInbox />
            </TabsContent>

            <TabsContent value="stats">
              <DashboardStats />
            </TabsContent>

            <TabsContent value="settings">
              <ProfileSettings />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <CreateEventDialog
        isOpen={isCreateEventDialogOpen}
        setIsOpen={setIsCreateEventDialogOpen}
        handleSubmit={handleCreateEvent}
        {...memoizedProps}
      />

      <EditEventDialog
        isOpen={isEditEventDialogOpen}
        setIsOpen={setIsEditEventDialogOpen}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        categoryOptions={categoryOptions}
        agendaItems={agendaItems}
        addAgendaItem={addAgendaItem}
        updateAgendaItem={updateAgendaItem}
        removeAgendaItem={removeAgendaItem}
        sponsors={sponsors}
        addSponsor={addSponsor}
        updateSponsor={updateSponsor}
        removeSponsor={removeSponsor}
        additionalImages={additionalImages}
        addAdditionalImage={addAdditionalImage}
        updateAdditionalImage={updateAdditionalImage}
        removeAdditionalImage={removeAdditionalImage}
        lineup={lineup}
        addLineupItem={addLineupItem}
        updateLineupItem={updateLineupItem}
        removeLineupItem={removeLineupItem}
        handleSubmit={handleEditEvent}
      />

      <DeleteEventDialog
        isOpen={isDeleteEventDialogOpen}
        setIsOpen={setIsDeleteEventDialogOpen}
        handleDelete={handleDeleteEvent}
      />
    </div>
  );
};

export default Dashboard;
