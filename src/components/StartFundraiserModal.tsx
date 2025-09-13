import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, User, Mail, Lock, Phone, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import MobileVerificationModal from "@/components/MobileVerificationModal";
import EmailVerificationModal from "./EmailVerificationModal";
import { signUp, signIn } from "@/api/auth";

interface StartFundraiserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenSignIn?: () => void;
}

const countries = [
  {
    code: "+1",
    name: "US",
    flag: "🇺🇸",
  },
  {
    code: "+44",
    name: "UK",
    flag: "🇬🇧",
  },
  {
    code: "+91",
    name: "IN",
    flag: "🇮🇳",
  },
  {
    code: "+86",
    name: "CN",
    flag: "🇨🇳",
  },
  {
    code: "+81",
    name: "JP",
    flag: "🇯🇵",
  },
  {
    code: "+49",
    name: "DE",
    flag: "🇩🇪",
  },
  {
    code: "+33",
    name: "FR",
    flag: "🇫🇷",
  },
  {
    code: "+39",
    name: "IT",
    flag: "🇮🇹",
  },
  {
    code: "+34",
    name: "ES",
    flag: "🇪🇸",
  },
  {
    code: "+61",
    name: "AU",
    flag: "🇦🇺",
  },
  {
    code: "+55",
    name: "BR",
    flag: "🇧🇷",
  },
  {
    code: "+7",
    name: "RU",
    flag: "🇷🇺",
  },
  {
    code: "+82",
    name: "KR",
    flag: "🇰🇷",
  },
  {
    code: "+92",
    name: "PK",
    flag: "🇵🇰",
  },
  {
    code: "+880",
    name: "BD",
    flag: "🇧🇩",
  },
];

const StartFundraiserModal = ({
  open,
  onOpenChange,
  onOpenSignIn,
}: StartFundraiserModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [showMobileVerification, setShowMobileVerification] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { signIn: authSignIn } = useAuth();

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_mobile: "",
  });

  const [errors, setErrors] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_mobile: "",
  });

  const validateForm = () => {
    const newErrors = {
      user_name: "",
      user_email: "",
      user_password: "",
      user_mobile: "",
    };

    if (!formData.user_name.trim()) {
      newErrors.user_name = "Full name is required";
    } else if (formData.user_name.trim().length < 2) {
      newErrors.user_name = "Name must be at least 2 characters";
    }

    if (!formData.user_email.trim()) {
      newErrors.user_email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      newErrors.user_email = "Please enter a valid email address";
    }

    if (!formData.user_password) {
      newErrors.user_password = "Password is required";
    } else if (formData.user_password.length < 6) {
      newErrors.user_password = "Password must be at least 6 characters";
    }

    if (!formData.user_mobile.trim()) {
      newErrors.user_mobile = "Mobile number is required";
    } else if (!/^\d{8,15}$/.test(formData.user_mobile.replace(/\D/g, ""))) {
      newErrors.user_mobile = "Please enter a valid mobile number";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Check all required fields and try again",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3000/api/user/register-request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email: formData.user_email }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        if (data.message === "google_account") {
          toast({
            title: "Google Account Detected",
            description: "This email is already registered with Google. Please sign in with Google instead.",
            action: (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  onOpenChange(false);
                  if (onOpenSignIn) {
                    onOpenSignIn(); // Open sign in modal
                    // We could add a flag to automatically trigger Google sign in
                  }
                }}
                className="border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
              >
                Sign in with Google
              </Button>
            ),
          });
        } else if (data.message === "email_exists") {
          toast({
            title: "Email Already Registered",
            description: "An account with this email already exists. Please sign in instead.",
            action: (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  onOpenChange(false);
                  if (onOpenSignIn) onOpenSignIn();
                }}
                className="border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
              >
                Sign In
              </Button>
            ),
          });
        } else {
          toast({
            title: "Error",
            description: data.details || "Failed to send OTP. Please try again.",
            variant: "destructive",
          });
        }
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setShowEmailVerification(true);
      toast({
        title: "OTP Sent",
        description: `Verification code sent to ${formData.user_email}`,
      });
    } catch (err) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleVerificationComplete = async () => {
    const userData = {
      user_name: formData.user_name,
      user_email: formData.user_email,
      user_password: formData.user_password,
      user_mobile: formData.user_mobile,
    };

    try {
      // Wait for registration to complete
      await signUp(userData);

      // Login after successful registration
      const response = await signIn(formData.user_email, formData.user_password);
      
      if (response && response.data) {
        // The response from axios already contains parsed JSON data
        const { jwt, user } = response.data;
        
        if (jwt) {
          // Pass both the token and user data to authSignIn
          authSignIn({ token: jwt, ...user });
          
          setShowEmailVerification(false);
          onOpenChange(false);

          toast({
            title: "Registration Complete!",
            description: `Welcome ${formData.user_name}! You're now signed in and can start your fundraiser.`,
          });

          // Reset form
          setFormData({
            user_name: "",
            user_email: "",
            user_password: "",
            user_mobile: "",
          });
          setErrors({
            user_name: "",
            user_mobile: "",
            user_password: "",
            user_email: "",
          });
        } else {
          throw new Error("No token received");
        }
      } else {
        throw new Error("Invalid response from login");
      }
    } catch (err) {
      console.error("Registration/login error:", err);
      toast({
        title: "Error",
        description: "Failed to register or login. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBackToForm = () => {
    setShowMobileVerification(false);
  };

  const handleOpenSignIn = () => {
    onOpenChange(false);
    if (onOpenSignIn) {
      onOpenSignIn();
    }
  };

  return (
    <>
      <Dialog
        open={open && !showMobileVerification && !showEmailVerification}
        onOpenChange={onOpenChange}
      >
        <DialogContent
          className="w-[95vw] max-w-md mx-auto my-4 rounded-2xl border-0 shadow-2xl bg-white max-h-[90vh] overflow-hidden p-0"
          hideCloseButton
        >
          <div className="gradient-header-fix"></div>
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-6 rounded-gradient-header relative">
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/20 p-1.5 backdrop-blur-sm transition-colors hover:bg-white/30 focus:outline-none"
              aria-label="Close"
            >
              <X className="h-4 w-4 text-white" />
            </button>
            <DialogHeader className="text-center pb-0">
              <DialogTitle className="text-xl sm:text-2xl font-bold text-white">
                Start Your Fundraiser
              </DialogTitle>
              <DialogDescription className="text-white/90 text-sm mt-2">
                Create your account to begin your fundraising journey
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-6 bg-white relative z-10 shadow-inner">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Full Name <span className="text-rose-500">*</span>
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center h-5 w-5 rounded-full bg-rose-100">
                    <User className="h-3 w-3 text-rose-500" />
                  </div>
                  <Input
                    id="user_name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.user_name}
                    onChange={(e) =>
                      handleInputChange("user_name", e.target.value)
                    }
                    className={`pl-10 h-11 border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 text-sm ${
                      errors.user_name
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                </div>
                {errors.user_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.user_name}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Email Address <span className="text-rose-500">*</span>
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center h-5 w-5 rounded-full bg-rose-100">
                    <Mail className="h-3 w-3 text-rose-500" />
                  </div>
                  <Input
                    id="user_email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.user_email}
                    onChange={(e) =>
                      handleInputChange("user_email", e.target.value)
                    }
                    className={`pl-10 h-11 border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 text-sm ${
                      errors.user_email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                </div>
                {errors.user_email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.user_email}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Create Password <span className="text-rose-500">*</span>
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center h-5 w-5 rounded-full bg-rose-100">
                    <Lock className="h-3 w-3 text-rose-500" />
                  </div>
                  <Input
                    id="user_password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.user_password}
                    onChange={(e) =>
                      handleInputChange("user_password", e.target.value)
                    }
                    className={`pl-10 pr-12 h-11 border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 text-sm ${
                      errors.user_password
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.user_password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.user_password}
                  </p>
                )}
              </div>

              {/* Mobile Field with Country Code */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="mobile"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Mobile Number <span className="text-rose-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="w-24 h-11 border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{country.flag}</span>
                            <span className="text-sm">{country.code}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="relative flex-1">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center h-5 w-5 rounded-full bg-rose-100">
                      <Phone className="h-3 w-3 text-rose-500" />
                    </div>
                    <Input
                      id="user_mobile"
                      type="tel"
                      placeholder="Enter mobile number"
                      value={formData.user_mobile}
                      onChange={(e) =>
                        handleInputChange("user_mobile", e.target.value)
                      }
                      className={`pl-10 h-11 border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 text-sm ${
                        errors.user_mobile
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                    />
                  </div>
                </div>
                {errors.user_mobile && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.user_mobile}
                  </p>
                )}
              </div>

              {/* Next Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 mt-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none text-base"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending OTP...
                  </div>
                ) : (
                  "Continue"
                )}
              </Button>

              {/* Already have account link */}
              <div className="text-center pt-2">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-rose-600 hover:text-rose-700 font-medium hover:underline transition-colors"
                    onClick={handleOpenSignIn}
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Verification Modal */}
      <EmailVerificationModal
        open={showEmailVerification}
        onOpenChange={setShowEmailVerification}
        user_email={formData.user_email}
        onVerificationComplete={handleVerificationComplete}
        onBack={handleBackToForm}
      />
    </>
  );
};

export default StartFundraiserModal;
