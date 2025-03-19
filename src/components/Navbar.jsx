/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/Button";
import {
  Calendar,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  User,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropDown-Menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import useAuth from "../hooks/useAuthUser";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, loading } = useAuthUser();
  const { handleLogout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(user ? true : false);
  const isDetailPage = location.pathname.includes("/event/");

  // This is just for demo purposes - in a real app you would use an auth system
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    handleLogout();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-8 transition-all duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
            : `bg-transparent  ${isDetailPage && "!text-primary"}`
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">discoverly</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/events">
              <Button
                variant="ghost"
                className={`text-foreground/80 hover:text-foreground ${
                  !isScrolled &&
                  ` ${isDetailPage && "!text-white hover:!text-blue-400"}`
                }`}
              >
                Browse Events
              </Button>
            </Link>
            <Link to="/dashboard?tab=myEvents">
              <Button
                variant="ghost"
                className={`text-foreground/80 hover:text-foreground ${
                  !isScrolled &&
                  ` ${isDetailPage && "!text-white hover:!text-blue-400"}`
                }`}
              >
                Create Event
              </Button>
            </Link>

            <Link to="/Contact">
              <Button
                variant="ghost"
                className={`text-foreground/80 hover:text-foreground ${
                  !isScrolled &&
                  ` ${isDetailPage && "!text-white hover:!text-blue-400"}`
                }`}
              >
                Contact Us
              </Button>
            </Link>

            <Link to="/dashboard?tab=settings">
              <Button
                variant="ghost"
                className={`text-foreground/80 hover:text-foreground ${
                  !isScrolled &&
                  ` ${isDetailPage && "!text-white hover:!text-blue-400"}`
                }`}
              >
                Settings
              </Button>
            </Link>
          </nav>

          {!loading && user ? (
            <div className="hidden md:flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full border border-primary/10 hover:bg-primary/10"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user?.photoURL}
                        alt={user?.displayName}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user?.displayName
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 absolute right-0 top-full z-50"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.displayName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard"
                      className="flex w-full cursor-pointer items-center"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard?tab=messages"
                      className="flex w-full cursor-pointer items-center"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Messages</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard?tab=settings"
                      className="flex w-full cursor-pointer items-center"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={toggleLogin}
                    className="flex w-full cursor-pointer items-center text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/signup">
                <Button
                  variant="outline"
                  className="border-primary/20 hover:border-primary/40"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/login">
                <Button>Get Started</Button>
              </Link>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-6 space-y-8">
          <nav className="flex flex-col space-y-4">
            <Button
              variant="ghost"
              className="justify-start h-12 text-lg font-medium"
            >
              Browse Events
            </Button>
            <Button
              variant="ghost"
              className="justify-start h-12 text-lg font-medium"
            >
              Create Event
            </Button>
            <Button
              variant="ghost"
              className="justify-start h-12 text-lg font-medium"
            >
              Blog
            </Button>
            <Button
              variant="ghost"
              className="justify-start h-12 text-lg font-medium"
            >
              About
            </Button>
          </nav>
          <div className="mt-auto flex flex-col space-y-4">
            <Button variant="outline" className="w-full">
              Sign In
            </Button>
            <Button className="w-full">Get Started</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
