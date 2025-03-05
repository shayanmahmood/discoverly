/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Card } from "./ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/TextArea";
import {
  Archive,
  Filter,
  Mail,
  MoreHorizontal,
  Search,
  Send,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog";
import { Separator } from "./ui/Separater";
import { Badge } from "./ui/Badge";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropDown-Menu";

// Sample message data
const messageData = [
  {
    id: 1,
    sender: {
      name: "Alice Johnson",
      email: "alice@example.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    subject: "Question about Tech Conference",
    event: "Tech Conference 2023",
    eventId: "101",
    preview:
      "Hi there, I had a question about the upcoming tech conference. Will there be...",
    message:
      "Hi there,\n\nI had a question about the upcoming tech conference. Will there be any workshops on artificial intelligence? I'm particularly interested in machine learning applications.\n\nAlso, are there any discounts for students?\n\nThanks,\nAlice",
    date: "2023-11-05",
    unread: true,
  },
  {
    id: 2,
    sender: {
      name: "Mark Wilson",
      email: "mark@example.com",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    subject: "Marketing Workshop Details",
    event: "Marketing Workshop",
    eventId: "102",
    preview:
      "Hello, I registered for the marketing workshop next week and wanted to confirm...",
    message:
      "Hello,\n\nI registered for the marketing workshop next week and wanted to confirm the exact location. The confirmation email mentioned Room B, but the website says Room C.\n\nCould you please clarify?\n\nBest regards,\nMark",
    date: "2023-11-03",
    unread: false,
  },
  {
    id: 3,
    sender: {
      name: "Sarah Chen",
      email: "sarah@example.com",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    subject: "Speaking Opportunity",
    event: "Product Launch Party",
    eventId: "103",
    preview:
      "I'm interested in speaking at your product launch event. I have experience...",
    message:
      "I'm interested in speaking at your product launch event. I have experience in product marketing and would love to share insights about launching successful products in the current market.\n\nI've attached my portfolio for your review.\n\nLooking forward to hearing from you,\nSarah",
    date: "2023-10-30",
    unread: false,
  },
];

const MessageInbox = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [messages, setMessages] = useState(messageData);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectMessage = (message) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === message.id ? { ...msg, unread: false } : msg
    );
    setMessages(updatedMessages);
    setSelectedMessage(message);
  };

  const handleReply = () => {
    if (replyText.trim() === "") return;

    toast.success("Reply sent successfully!");
    setReplyDialogOpen(false);
    setReplyText("");
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.event.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = messages.filter((message) => message.unread).length;

  const markAsRead = (messageId) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === messageId ? { ...msg, unread: false } : msg
    );
    setMessages(updatedMessages);
    toast.success("Marked as read");
  };

  const archiveMessage = (messageId) => {
    // In a real app, would move to archive. Here we just notify
    toast.success("Message archived");
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Message Inbox
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="w-[250px] pl-9 rounded-full border-muted bg-background/50 focus-visible:ring-purple-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Unread</DropdownMenuItem>
              <DropdownMenuItem>Recent</DropdownMenuItem>
              <DropdownMenuItem>All Messages</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="overflow-hidden rounded-xl shadow-md border-0 bg-gradient-to-br from-white to-slate-50 dark:from-gray-900 dark:to-gray-950">
        <Tabs defaultValue="inbox" className="w-full">
          <div className="flex border-b px-4 bg-gray-50/80 dark:bg-gray-800/20">
            <TabsList className="h-12 bg-transparent gap-4">
              <TabsTrigger
                value="inbox"
                className="relative data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Inbox
                {unreadCount > 0 && (
                  <Badge className="ml-2 px-1.5 py-0.5 h-5 min-w-5 absolute -top-1 -right-3 bg-purple-500">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="sent"
                className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Sent
              </TabsTrigger>
              <TabsTrigger
                value="archived"
                className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Archived
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="inbox" className="p-0 m-0">
            <div className="grid lg:grid-cols-[300px_1fr] h-[600px]">
              {/* Message list */}
              <div className="border-r overflow-y-auto bg-gray-50/50 dark:bg-gray-900/50">
                {filteredMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center text-muted-foreground gap-3">
                    <Mail className="h-12 w-12 text-muted-foreground/50" />
                    <p>No messages found</p>
                  </div>
                ) : (
                  filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 border-b cursor-pointer hover:bg-gray-100/80 dark:hover:bg-gray-800/30 transition-all duration-200 ${
                        selectedMessage?.id === message.id
                          ? "bg-blue-50 dark:bg-blue-950/20"
                          : ""
                      } ${
                        message.unread
                          ? "bg-purple-50/70 dark:bg-purple-950/10"
                          : ""
                      }`}
                      onClick={() => handleSelectMessage(message)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                          <AvatarImage
                            src={message.sender.avatar}
                            alt={message.sender.name}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-500">
                            {message.sender.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1 overflow-hidden flex-1">
                          <div className="flex items-center justify-between">
                            <p
                              className={`text-sm font-medium truncate ${
                                message.unread
                                  ? "font-semibold text-purple-700 dark:text-purple-300"
                                  : ""
                              }`}
                            >
                              {message.sender.name}
                            </p>
                            <div className="flex items-center">
                              {message.unread && (
                                <span className="h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {message.date}
                              </span>
                            </div>
                          </div>
                          <p
                            className={`text-sm font-medium truncate ${
                              message.unread ? "font-semibold" : ""
                            }`}
                          >
                            {message.subject}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {message.preview}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className="text-xs bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
                        >
                          {message.event}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => markAsRead(message.id)}
                            >
                              Mark as read
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => archiveMessage(message.id)}
                            >
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message content */}
              <div className="p-6 overflow-y-auto flex flex-col h-full bg-white dark:bg-gray-950">
                {selectedMessage ? (
                  <>
                    <div className="mb-4">
                      <h4 className="text-xl font-semibold mb-1 text-gray-800 dark:text-gray-100">
                        {selectedMessage.subject}
                      </h4>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                            <AvatarImage
                              src={selectedMessage.sender.avatar}
                              alt={selectedMessage.sender.name}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-500">
                              {selectedMessage.sender.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {selectedMessage.sender.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {selectedMessage.sender.email}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {selectedMessage.date}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="mb-4 px-3 py-1 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-800/50"
                      >
                        {selectedMessage.event}
                      </Badge>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex-grow bg-gray-50/50 dark:bg-gray-900/20 p-4 rounded-lg">
                      <div className="whitespace-pre-line text-sm leading-relaxed">
                        {selectedMessage.message}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                        >
                          <Archive className="h-4 w-4 mr-2" /> Archive
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </Button>
                      </div>
                      <Button
                        onClick={() => setReplyDialogOpen(true)}
                        className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                      >
                        <Send className="h-4 w-4 mr-2" /> Reply
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground gap-4">
                    <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center">
                      <Mail className="h-10 w-10 text-muted-foreground/50" />
                    </div>
                    <h3 className="text-xl font-medium">Your Messages</h3>
                    <p className="text-sm max-w-xs">
                      Select a message from the list to view its contents
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sent" className="p-0 m-0">
            <div className="flex flex-col items-center justify-center h-[600px] text-center text-muted-foreground gap-4">
              <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center">
                <Send className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-medium">Sent Messages</h3>
              <p className="text-sm max-w-xs">
                Messages you've sent will appear here
              </p>
            </div>
          </TabsContent>

          <TabsContent value="archived" className="p-0 m-0">
            <div className="flex flex-col items-center justify-center h-[600px] text-center text-muted-foreground gap-4">
              <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center">
                <Archive className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-medium">Archived Messages</h3>
              <p className="text-sm max-w-xs">
                Messages you've archived will appear here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent className="sm:max-w-[625px] rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Reply to: {selectedMessage?.subject}
            </DialogTitle>
            <DialogDescription>
              Composing reply to {selectedMessage?.sender.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/20">
              <p className="text-sm font-medium">
                To: {selectedMessage?.sender.name} (
                {selectedMessage?.sender.email})
              </p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/20">
              <p className="text-sm font-medium">
                Subject: Re: {selectedMessage?.subject}
              </p>
            </div>
            <div className="space-y-2">
              <Textarea
                className="min-h-[200px] focus-visible:ring-purple-400 border-gray-200"
                placeholder="Write your reply here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setReplyDialogOpen(false)}
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReply}
              className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Send className="mr-2 h-4 w-4" /> Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageInbox;
