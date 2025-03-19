/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { cn } from "../../lib/utils";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}

      <main className="flex-grow flex items-center justify-center px-4">
        <div
          className={cn(
            "max-w-md w-full py-12 animate-fade-in",
            "text-center space-y-6"
          )}
        >
          <div className="space-y-2">
            <h1 className="text-6xl font-bold">404</h1>
            <h2 className="text-2xl font-semibold">Page not found</h2>
            <p className="text-muted-foreground">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>

          <div className="pt-6">
            <Button asChild className="min-w-[140px]">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default NotFound;
