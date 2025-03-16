import React, { useEffect, useRef, useState } from "react";
import { Card } from "../ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Separator } from "../ui/Separater";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuthUser";
import useAuthUser from "../../hooks/useAuth";
import { PageLoader, Spinner } from "../ui/Loader";
import { Eye, EyeOff } from "lucide-react";
import { auth } from "../../firebase/firebase";

const ProfileSettings = () => {
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState();
  const [photoFile, setPhotoFile] = useState();
  const [errors, setErrors] = useState({});
  const {
    getUserById,
    updateUser,
    isLoading,
    updatePassword,
    handleCreateCollection,
  } = useAuth();
  const { user: CurrentUser } = useAuthUser();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "Acme Inc.",
    bio: "",
    avatar: null,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    if (!CurrentUser?.uid) return;

    const fetchUser = async () => {
      const fetchedUser = await getUserById(CurrentUser.uid);
      setUser(fetchedUser);
    };

    fetchUser();
  }, [CurrentUser?.uid]);

  useEffect(() => {
    if (user) {
      console.log(user);
      setProfileData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        bio: user.bio || "",
        avatar: user.photoURL || "",
        currentPassword: user.password || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setPasswordData((prev) => ({
        ...prev,
        currentPassword: user.password || "",
      }));
    }
  }, [user, passwordData]);

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    enableMessaging: false,
  });

  const validateProfileForm = () => {
    const newErrors = {};

    if (!profileData.name.trim()) newErrors.name = "Name is required";

    if (!profileData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(profileData.email)) {
      newErrors.email = "Email format is invalid";
    }

    if (!profileData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!profileData.bio.trim()) {
      newErrors.bio = "Bio is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateProfileForm()) {
      // Log form data to console
      console.log("Profile form submitted with data:", profileData);

      const updatedData = {
        name: profileData.name,
        photo: photoFile || profileData.avatar,
        email: profileData.email,
        phoneNumber: profileData.phone,
        bio: profileData.bio,
        company: profileData.company,
      };

      // Simulate API call
      updateUser(CurrentUser.uid, updatedData);
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validatePasswordForm()) {
      // Log form data to console
      console.log("Password form submitted with data:", passwordData);
      updatePassword(
        auth.currentUser,
        passwordData.currentPassword,
        passwordData.confirmPassword
      );
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
    }
  };

  const handleNotificationUpdate = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (notificationSettings.enableMessaging === true) {
      handleCreateCollection(auth.currentUser.uid);
    }

    setIsSubmitting(false);
  };

  const toggleNotification = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };

  const handleAvatarChange = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({
          ...profileData,
          avatar: e.target.result,
        });
        console.log("Avatar changed to:", file.name);
        toast.success(`Avatar updated to ${file.name}`);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Profile Settings</h3>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6 h-10">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="password">Change Password</TabsTrigger>
          <TabsTrigger value="notifications">
            Notifications & Messaging
          </TabsTrigger>
          <TabsTrigger value="billing">Billing & Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profileData.avatar} alt="Profile" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAvatarChange}
                >
                  Change Avatar
                </Button>
              </div>

              <form onSubmit={handleProfileUpdate} className="flex-1 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      disabled
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium">
                      Company/Organization
                    </label>
                    <Input
                      id="company"
                      value={profileData.company}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          company: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="bio" className="text-sm font-medium">
                    Bio
                  </label>
                  <Input
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    className={errors.bio ? "border-red-500" : ""}
                  />
                  {errors.bio && (
                    <p className="text-sm text-red-500">{errors.bio}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner className="mr-2" size="sm" /> Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </form>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="password" className="space-y-6">
          <Card className="p-6">
            <h4 className="text-lg font-medium mb-4">Change Password</h4>
            <form
              onSubmit={handlePasswordChange}
              className="space-y-4 max-w-md"
            >
              {/* Current Password */}
              <div className="space-y-2">
                <label
                  htmlFor="currentPassword"
                  className="text-sm font-medium"
                >
                  Current Password
                </label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword.current ? "text" : "password"}
                    value={profileData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    className={`pr-10 ${
                      errors.currentPassword ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2 text-gray-500"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        current: !showPassword.current,
                      })
                    }
                  >
                    {showPassword.current ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="text-sm text-red-500">
                    {errors.currentPassword}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label htmlFor="newPassword" className="text-sm font-medium">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    className={`pr-10 ${
                      errors.newPassword ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2 text-gray-500"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        new: !showPassword.new,
                      })
                    }
                  >
                    {showPassword.new ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-sm text-red-500">{errors.newPassword}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPassword.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className={`pr-10 ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2 text-gray-500"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        confirm: !showPassword.confirm,
                      })
                    }
                  >
                    {showPassword.confirm ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner className="mr-2" size="sm" /> Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <h4 className="text-lg font-medium mb-4">
              Notification Preferences
            </h4>
            <form onSubmit={handleNotificationUpdate} className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive updates and alerts via email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notificationSettings.emailNotifications}
                      onChange={() => toggleNotification("emailNotifications")}
                    />
                    <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-focus:ring-4 peer-focus:ring-primary/20 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                <Separator />
              </div>

              <h4 className="text-lg font-medium mb-4">
                Messaging Preferences
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Messaging</p>
                    <p className="text-sm text-muted-foreground">
                      Receive and sent messages to other Users via app
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notificationSettings.enableMessaging}
                      onChange={() => toggleNotification("enableMessaging")}
                    />
                    <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-focus:ring-4 peer-focus:ring-primary/20 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                <Separator />
              </div>

              <Button type="submit" className="mt-6" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner className="mr-2" size="sm" /> Saving...
                  </>
                ) : (
                  "Save Preferences"
                )}
              </Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card className="p-6">
            <h4 className="text-lg font-medium mb-4">Billing Information</h4>
            <p className="text-muted-foreground mb-6">
              Manage your payment methods and billing history
            </p>

            <div className="space-y-6">
              <div>
                <h5 className="text-md font-medium mb-2">Payment Methods</h5>
                <div className="rounded-md border p-4 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-16 bg-muted rounded-md flex items-center justify-center text-xs">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">
                        Expires 12/25
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>

                <Button variant="outline" size="sm" className="mt-4">
                  Add Payment Method
                </Button>
              </div>

              <Separator />

              <div>
                <h5 className="text-md font-medium mb-2">Billing History</h5>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Date
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Description
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Amount
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">Nov 15, 2023</td>
                          <td className="p-4 align-middle">
                            Tech Conference 2023
                          </td>
                          <td className="p-4 align-middle">$499.00</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-700 border-green-200">
                              Paid
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">Oct 10, 2023</td>
                          <td className="p-4 align-middle">
                            Marketing Workshop
                          </td>
                          <td className="p-4 align-middle">$149.00</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-700 border-green-200">
                              Paid
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSettings;
