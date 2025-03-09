import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Mail, ArrowRight, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuthUser";
import { PageLoader } from "../../components/ui/Loader";
import useAuthUser from "../../hooks/useAuth";

const EmailVerification = () => {
  const email = localStorage.getItem("userEmail") || "your email";
  const { handleResendEmail, isLoading } = useAuth();
  const { user, loading } = useAuthUser();

  const handleResendEmails = () => {
    handleResendEmail();
    toast.success("Verification email resent successfully!");
  };

  if (isLoading) return <PageLoader />;

  if (!loading && user.emailVerified)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/90 p-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="flex justify-center">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-12 w-12 text-primary" />
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Congratulation 🎉 Your Email has been Verified
          </h1>

          <p className="text-muted-foreground text-lg">
            Thanks For Being part of Our Site Mr
            <span className="font-medium text-foreground">
              {user.displayName}
            </span>
          </p>

          <Button variant="default" className="w-full" asChild>
            <Link to="/">
              Proceed to Home
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/90 p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="h-12 w-12 text-primary" />
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">Verify Your Email</h1>

        <p className="text-muted-foreground text-lg">
          We've sent a verification email to{" "}
          <span className="font-medium text-foreground">{email}</span>
        </p>

        <div className="bg-muted/50 p-4 rounded-lg text-left">
          <h3 className="font-medium mb-2">What to do next:</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Check your email inbox</li>
            <li>Click on the verification link in the email</li>
            <li>Once verified, you can continue to your account</li>
          </ol>
        </div>

        <div className="pt-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            Didn't receive an email? Check your spam folder or
          </p>

          <Button
            variant="outline"
            onClick={handleResendEmails}
            className="w-full"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Resend Verification Email
          </Button>

          <Button variant="default" className="w-full" asChild>
            <Link to="/login">
              Proceed to Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
