/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/Button";
import { Calendar, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isDetailPage = location.pathname.includes("/event/");
  console.log(isDetailPage);

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
            <Button
              variant="ghost"
              className={`text-foreground/80 hover:text-foreground ${
                !isScrolled &&
                ` ${isDetailPage && "!text-white hover:!text-blue-400"}`
              }`}
            >
              Create Event
            </Button>
            <Button
              variant="ghost"
              className={`text-foreground/80 hover:text-foreground ${
                !isScrolled &&
                ` ${isDetailPage && "!text-white hover:!text-blue-400"}`
              }`}
            >
              Blog
            </Button>
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
          </nav>

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

          {/* Mobile Menu Button */}
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
