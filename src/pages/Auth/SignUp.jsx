import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import {
  User,
  Lock,
  Mail,
  Image as ImageIcon,
  Phone,
  PenTool,
} from "lucide-react";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuthUser";
import { PageLoader } from "../../components/ui/Loader";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [phone, setPhone] = useState(null);
  const [bio, setBio] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { handleRegister, isLoading: isLoadingApi } = useAuth();

  const handlePhotoChange = (e) => {
    const files = e.target.files; // Extract files safely

    if (!files || files.length === 0) {
      console.error("No file selected");
      return; // Exit if no file is selected
    }

    const file = files[0]; // Get the first file
    setPhoto(file);
    console.log("Selected file:", file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password <= 5) {
      toast.error("Passwords should be 6 Chanracter long");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setIsLoading(true);
    handleRegister(email, password, fullName, photo, phone, bio);
    setIsLoading(false);
  };

  if (isLoadingApi) return <PageLoader />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary/80"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div className="relative">
              <User className="absolute left-3 top-[10px] h-5 w-5 text-gray-400" />
              <Input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                className="pl-10"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-[10px] h-5 w-5 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="pl-10"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-[10px] h-5 w-5 text-gray-400" />
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="pl-10"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-[10px] h-5 w-5 text-gray-400" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="pl-10"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-[10px] h-5 w-5 text-gray-400" />
              <Input
                id="phone"
                name="phone"
                type="number"
                className="pl-10"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="relative">
              <PenTool className="absolute left-3 top-[10px] h-5 w-5 text-gray-400" />
              <Input
                id="bio"
                name="bio"
                type="text"
                className="pl-10"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-[10px] h-5 w-5 text-gray-400" />
              <Input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                className="pl-10"
                onChange={handlePhotoChange}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="flex w-full justify-center"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
