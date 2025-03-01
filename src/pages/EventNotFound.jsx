import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

/* eslint-disable react/react-in-jsx-scope */
function EventNotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <p className="text-muted-foreground mb-6">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default EventNotFound;
