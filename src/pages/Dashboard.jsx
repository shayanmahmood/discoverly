/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";
import { Button } from "../components/ui/Button";
import { Separator } from "../components/ui/Separater";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import {
  CalendarPlus,
  BarChart3,
  MessagesSquare,
  Settings,
  Ticket,
  Calendar,
  Pencil,
  Trash2,
  Eye,
  Users,
  Search,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/Dialog";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/TextArea";
import DashboardStats from "../components/Dashboard/DashboardStats";
// import EventList from "@/components/EventList";
import MessageInbox from "../components/Dashboard/MessageInbox";
import ProfileSettings from "../components/Dashboard/ProfileSettings";
import { toast } from "sonner";
import { DashboardHeader } from "../components/Dashboard/DashboardHeader";

// Sample data for the dashboard
const mockUserEvents = [
  {
    id: "101",
    title: "Tech Conference 2023",
    date: "2023-11-15",
    location: "San Francisco, CA",
    attendees: 342,
    sales: "$15,240",
    status: "active",
  },
  {
    id: "102",
    title: "Marketing Workshop",
    date: "2023-11-22",
    location: "Online",
    attendees: 89,
    sales: "$4,450",
    status: "active",
  },
  {
    id: "103",
    title: "Product Launch Party",
    date: "2023-12-05",
    location: "New York, NY",
    attendees: 156,
    sales: "$7,800",
    status: "draft",
  },
];

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

const Dashboard = () => {
  const [isCreateEventDialogOpen, setIsCreateEventDialogOpen] = useState(false);
  const [isEditEventDialogOpen, setIsEditEventDialogOpen] = useState(false);
  const [isDeleteEventDialogOpen, setIsDeleteEventDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [searchMyEvents, setSearchMyEvents] = useState("");
  const [searchRegisteredEvents, setSearchRegisteredEvents] = useState("");
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    category: "",
    price: "",
  });

  // Filter my events based on search query
  const filteredMyEvents = mockUserEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchMyEvents.toLowerCase()) ||
      event.location.toLowerCase().includes(searchMyEvents.toLowerCase())
  );

  // Filter registered events based on search query
  const filteredRegisteredEvents = mockRegisteredEvents.filter(
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
    toast.success("Event created successfully!");
    setIsCreateEventDialogOpen(false);
    // In a real app, this would call an API to create the event
  };

  const handleEditEvent = (e) => {
    e.preventDefault();
    toast.success("Event updated successfully!");
    setIsEditEventDialogOpen(false);
    // In a real app, this would call an API to update the event
  };

  const handleDeleteEvent = () => {
    toast.success("Event deleted successfully!");
    setIsDeleteEventDialogOpen(false);
    // In a real app, this would call an API to delete the event
  };

  const openEditDialog = (event) => {
    setCurrentEvent(event);
    setNewEvent({
      title: event.title,
      date: event.date,
      time: "10:00 AM", // Example default time
      location: event.location,
      description: "Event description here", // Placeholder
      category: "Technology", // Placeholder
      price: "99.99", // Placeholder
    });
    setIsEditEventDialogOpen(true);
  };

  const openDeleteDialog = (event) => {
    setCurrentEvent(event);
    setIsDeleteEventDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <DashboardHeader />

      {/* Main Dashboard Content */}
      <main className="container py-6">
        <div className="flex flex-col space-y-6">
          {/* Dashboard Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-3xl font-bold tracking-tight">
              Your Dashboard
            </h2>
            <Button
              onClick={() => setIsCreateEventDialogOpen(true)}
              className="w-full sm:w-auto"
            >
              <CalendarPlus className="mr-2 h-4 w-4" /> Create New Event
            </Button>
          </div>

          <Separator />

          {/* Quick Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 flex flex-col">
              <p className="text-sm font-medium text-muted-foreground">
                Total Events
              </p>
              <p className="text-2xl font-bold">{mockUserEvents.length}</p>
              <p className="text-xs text-muted-foreground mt-1">
                +2 from last month
              </p>
            </Card>
            <Card className="p-4 flex flex-col">
              <p className="text-sm font-medium text-muted-foreground">
                Registered Events
              </p>
              <p className="text-2xl font-bold">
                {mockRegisteredEvents.length}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                +1 from last month
              </p>
            </Card>
            <Card className="p-4 flex flex-col">
              <p className="text-sm font-medium text-muted-foreground">
                Total Attendees
              </p>
              <p className="text-2xl font-bold">587</p>
              <p className="text-xs text-muted-foreground mt-1">
                +124 from last month
              </p>
            </Card>
            <Card className="p-4 flex flex-col">
              <p className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </p>
              <p className="text-2xl font-bold">$27,490</p>
              <p className="text-xs text-muted-foreground mt-1">
                +$5,840 from last month
              </p>
            </Card>
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="myEvents" className="w-full mt-6">
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

            {/* My Events Tab */}
            <TabsContent value="myEvents" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Events You Created</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search events..."
                      className="pl-10 w-[250px]"
                      value={searchMyEvents}
                      onChange={(e) => setSearchMyEvents(e.target.value)}
                    />
                    {searchMyEvents && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground"
                        onClick={() => setSearchMyEvents("")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
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
                      {filteredMyEvents.length === 0 ? (
                        <tr>
                          <td
                            colSpan="7"
                            className="p-4 text-center text-muted-foreground"
                          >
                            No events found
                          </td>
                        </tr>
                      ) : (
                        filteredMyEvents.map((event) => (
                          <tr
                            key={event.id}
                            className="border-b transition-colors hover:bg-muted/50"
                          >
                            <td className="p-4 align-middle">{event.title}</td>
                            <td className="p-4 align-middle">{event.date}</td>
                            <td className="p-4 align-middle">
                              {event.location}
                            </td>
                            <td className="p-4 align-middle">
                              {event.attendees}
                            </td>
                            <td className="p-4 align-middle">{event.sales}</td>
                            <td className="p-4 align-middle">
                              <Badge
                                variant={
                                  event.status === "active"
                                    ? "default"
                                    : "outline"
                                }
                              >
                                {event.status === "active" ? "Active" : "Draft"}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon" asChild>
                                  <Link to={`/event/${event.id}`}>
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">View</span>
                                  </Link>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => openEditDialog(event)}
                                >
                                  <Pencil className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => openDeleteDialog(event)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Registered Events Tab */}
            <TabsContent value="registered" className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  Events You've Registered For
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search registered events..."
                    className="pl-10 w-[280px]"
                    value={searchRegisteredEvents}
                    onChange={(e) => setSearchRegisteredEvents(e.target.value)}
                  />
                  {searchRegisteredEvents && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground"
                      onClick={() => setSearchRegisteredEvents("")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>

              {filteredRegisteredEvents.length === 0 ? (
                <div className="text-center py-8 border rounded-md">
                  <Ticket className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-lg font-medium">
                    No registered events found
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Try a different search term
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRegisteredEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="flex flex-col overflow-hidden"
                    >
                      <div className="aspect-video bg-muted relative">
                        <img
                          src={`https://source.unsplash.com/random/800x600?event&${event.id}`}
                          alt={event.title}
                          className="object-cover w-full h-full"
                        />
                        <Badge className="absolute top-2 right-2">
                          {event.ticketType}
                        </Badge>
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h4 className="font-semibold text-lg">{event.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          By {event.organizer}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground mt-2">
                          <Calendar className="h-4 w-4 mr-2" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Users className="h-4 w-4 mr-2" />
                          {event.location}
                        </div>
                        <div className="mt-auto pt-4 flex justify-between">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/event/${event.id}`}>View Details</Link>
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessagesSquare className="h-4 w-4 mr-2" /> Contact
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages">
              <MessageInbox />
            </TabsContent>

            {/* Statistics Tab */}
            <TabsContent value="stats">
              <DashboardStats />
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <ProfileSettings />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Create Event Dialog */}
      <Dialog
        open={isCreateEventDialogOpen}
        onOpenChange={setIsCreateEventDialogOpen}
      >
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new event. Click save when
              you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateEvent}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Input
                    id="title"
                    placeholder="Event Title"
                    className="w-full"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Input
                    id="category"
                    placeholder="Category"
                    className="w-full"
                    value={newEvent.category}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, category: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Input
                    id="date"
                    type="date"
                    className="w-full"
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Input
                    id="time"
                    type="time"
                    className="w-full"
                    value={newEvent.time}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, time: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Input
                  id="location"
                  placeholder="Location"
                  className="w-full"
                  value={newEvent.location}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, location: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-1">
                <Input
                  id="price"
                  placeholder="Ticket Price ($)"
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full"
                  value={newEvent.price}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, price: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-1">
                <Textarea
                  id="description"
                  placeholder="Event Description"
                  className="w-full min-h-[100px]"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Event</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog
        open={isEditEventDialogOpen}
        onOpenChange={setIsEditEventDialogOpen}
      >
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Update the details of your event. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditEvent}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Input
                    id="edit-title"
                    placeholder="Event Title"
                    className="w-full"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Input
                    id="edit-category"
                    placeholder="Category"
                    className="w-full"
                    value={newEvent.category}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, category: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Input
                    id="edit-date"
                    type="date"
                    className="w-full"
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Input
                    id="edit-time"
                    type="time"
                    className="w-full"
                    value={newEvent.time}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, time: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Input
                  id="edit-location"
                  placeholder="Location"
                  className="w-full"
                  value={newEvent.location}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, location: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-1">
                <Input
                  id="edit-price"
                  placeholder="Ticket Price ($)"
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full"
                  value={newEvent.price}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, price: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-1">
                <Textarea
                  id="edit-description"
                  placeholder="Event Description"
                  className="w-full min-h-[100px]"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Event Dialog */}
      <Dialog
        open={isDeleteEventDialogOpen}
        onOpenChange={setIsDeleteEventDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentEvent && (
              <p className="text-sm font-medium">
                Event: <span className="font-bold">{currentEvent.title}</span>
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteEventDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteEvent}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
