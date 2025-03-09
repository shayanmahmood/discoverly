import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Sparkles, ArrowRight, Home } from "lucide-react";
import { toast } from "sonner";
import { PageLoader } from "../../components/ui/Loader";
import { applyActionCode, getAuth } from "firebase/auth";
import useAuthUser from "../../hooks/useAuth";

const Welcome = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const { user, loading } = useAuthUser();
  const auth = getAuth();

  // Extract oobCode from URL
  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!oobCode) {
        setIsLoading(false);
        toast.error("Invalid or missing verification code.");
        return;
      }

      try {
        await applyActionCode(auth, oobCode); // Verify email
        await auth.currentUser?.reload(); // Reload user state

        if (auth.currentUser?.emailVerified) {
          toast.success("Email verified successfully!");
        } else {
          toast.error("Email verification failed.");
        }
      } catch (error) {
        console.error("Verification Error:", error.message);
        toast.error("Invalid or expired verification link.");
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [oobCode, auth]);

  useEffect(() => {
    if (loading) return;

    if (user) {
      const newUserData = {
        name: user.displayName,
        email: user.email,
        isNewUser: !user.emailVerified, // If email is verified, it's a returning user
      };

      setUserData(newUserData);

      if (oobCode && newUserData.isNewUser) {
        const redirectTimer = setTimeout(() => {
          navigate("/dashboard");
        }, 5000); // Auto-redirect after 5 seconds for new users

        return () => clearTimeout(redirectTimer);
      }
    }
  }, [user, loading, navigate, oobCode]);

  if (isLoading) {
    return <PageLoader message="Verifying your email..." />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/90 p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-12 w-12 text-primary" />
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to Discoverly!
        </h1>

        <p className="text-muted-foreground text-lg">
          {userData?.isNewUser
            ? "Thank you for verifying your email! You'll be redirected to your dashboard shortly."
            : "Welcome back! Your email is now verified."}
        </p>

        <div className="pt-6 space-y-4">
          <Button
            size="lg"
            className="w-full"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button variant="outline" size="lg" className="w-full" asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {userData?.isNewUser && (
          <p className="text-sm text-muted-foreground animate-pulse pt-4">
            Redirecting to dashboard in a few seconds...
          </p>
        )}
      </div>
    </div>
  );
};

export default Welcome;
