import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { Bell, Home, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import useAuthUser from "../../hooks/useAuth";
import useAuth from "../../hooks/useAuthUser";
import { PageLoader } from "../ui/Loader";

/* eslint-disable react/react-in-jsx-scope */
export function DashboardHeader() {
  const { user, loading } = useAuthUser();
  const { handleLogout } = useAuth();

  function handleLogoutUser() {
    handleLogout();
  }

  if (loading) return <PageLoader />;

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link to="/">
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Link>
          </Button>
          <h1 className="text-xl font-semibold tracking-tight">
            Event Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Button size="sm" variant="outline" className="gap-1">
            <Bell className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Notifications
            </span>
          </Button>

          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`${user?.photoURL}`} alt="User" />
              <AvatarFallback className="bg-primary/10 text-primary">
                {user?.displayName
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">{user?.displayName}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <Button
            size="sm"
            variant="ghost"
            className="gap-1"
            onClick={handleLogoutUser}
          >
            <LogOut className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
