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
import { X, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { authApi, validators, ApiError } from "@/lib/api";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";
import MobileVerificationModal from "@/components/MobileVerificationModal";
import EmailVerificationModal from "@/components/EmailVerificationModal";
import { signIn } from "@/api/auth"; // Add this import

interface SignInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenStartFundraiser?: () => void;
}

const SignInModal = ({
  open,
  onOpenChange,
  onOpenStartFundraiser,
}: SignInModalProps) => {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isMobileVerificationOpen, setIsMobileVerificationOpen] =
    useState(false);
  const [isEmailVerificationOpen, setIsEmailVerificationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const { toast } = useToast();
  const { signIn: authSignIn } = useAuth();

  // Function to detect if input is mobile number
  const isMobileNumber = (input: string) => {
    return validators.isMobile(input);
  };

  // Function to detect if input is email
  const isEmail = (input: string) => {
    return validators.isEmail(input);
  };

  // Function to handle successful login
  const handleSuccessfulLogin = (userData: any) => {
    // Check what structure we have and handle accordingly
    if (userData.data) {
      // Response comes from authApi.signin()
      const { jwt, user } = userData.data;
      
      // Pass both token and user data to authSignIn
      authSignIn({ token: jwt, ...user });
      
      // Store token in localStorage
      localStorage.setItem("token", jwt);
      
      toast({
        title: "Login Successful",
        description: `Welcome to Varak Welfare! You're now signed in as ${user.user_name}`,
      });
    } else {
      // Direct userData object (used elsewhere)
      authSignIn(userData);
      
      // Store token if available
      if (userData.token) {
        localStorage.setItem("token", userData.token);
      } else if (userData.jwt) {
        localStorage.setItem("token", userData.jwt);
      }
      
      const userName = userData.user_name || (userData.user && userData.user.user_name) || "User";
      
      toast({
        title: "Login Successful",
        description: `Welcome to Varak Welfare! You're now signed in as ${userName}`,
      });
    }
    
    onOpenChange(false);
    resetForm();
  };
  
  const handleGoogleLogin = () => {
    const apiBaseUrl =
      import.meta.env.VITE_API_BASE_URL || "<http://localhost:3000/api>";
    window.location.href = `${apiBaseUrl}/user/auth/google`;
  };

  const handleGetOTP = async () => {
    if (!emailOrMobile.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email or mobile number",
        variant: "destructive",
      });
      return;
    }
    const cleanInput = emailOrMobile.trim();

    if (!isEmail(cleanInput) && !isMobileNumber(cleanInput)) {
      toast({
        title: "Invalid Input",
        description:
          "Please enter a valid email address or 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isEmail(cleanInput)) {
        await authApi.requestOTPEmail(cleanInput);
        setIsEmailVerificationOpen(true);
        toast({
          title: "OTP Sent",
          description: `Verification code sent to ${cleanInput}. Please check your email.`,
        });
      } else if (isMobileNumber(cleanInput)) {
        await authApi.requestOTPMobile(cleanInput); // Empty for now
        setIsMobileVerificationOpen(true);
        toast({
          title: "OTP Sent",
          description: `Verification code sent to ${countryCode} ${cleanInput}`,
        });
      }
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordLogin = async () => {
    if (!emailOrMobile.trim() || !password.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      let payload: {
        user_email?: string;
        user_mobile?: string;
        user_password: string;
      } = {
        user_password: password.trim(),
      };
      if (isEmail(emailOrMobile.trim())) {
        payload.user_email = emailOrMobile.trim();
      } else if (isMobileNumber(emailOrMobile.trim())) {
        payload.user_mobile = emailOrMobile.trim();
      }
      const res = await authApi.signin(payload);
      handleSuccessfulLogin(res);
    } catch (err: any) {
      toast({
        title: "Login Failed",
        description: err.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToOTP = () => {
    setShowPasswordLogin(false);
    setPassword("");
  };

  const handleForgotPassword = () => {
    onOpenChange(false);
    setIsForgotPasswordOpen(true);
  };

  const handleLoginViaOTP = () => {
    setShowPasswordLogin(false);
    setPassword("");
  };

  const handleMobileVerificationComplete = () => {
    setIsMobileVerificationOpen(false);
    handleSuccessfulLogin(emailOrMobile);
  };

  const handleEmailVerificationComplete = async (otp?: string) => {
    setIsEmailVerificationOpen(false);
    setIsLoading(true);
    try {
      // Call login API with OTP
      const res = await authApi.signin({
        user_email: emailOrMobile.trim(),
        otp: otp,
      });
      
      handleSuccessfulLogin(res);
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid OTP",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMobileVerificationBack = () => {
    setIsMobileVerificationOpen(false);
    onOpenChange(true);
  };

  const handleEmailVerificationBack = () => {
    setIsEmailVerificationOpen(false);
    onOpenChange(true);
  };

  const resetForm = () => {
    setEmailOrMobile("");
    setPassword("");
    setShowPasswordLogin(false);
  };

  const handleStartFundraiser = () => {
    onOpenChange(false);
    if (onOpenStartFundraiser) {
      onOpenStartFundraiser();
    }
  };

  // Example for OTP verification inside your modal
  const handleVerifyOTP = async (otp: string) => {
    setIsLoading(true);
    try {
      let identifier: { user_email?: string; user_mobile?: string } = {};
      if (isEmail(emailOrMobile.trim())) {
        identifier.user_email = emailOrMobile.trim();
      } else if (isMobileNumber(emailOrMobile.trim())) {
        identifier.user_mobile = emailOrMobile.trim();
      }
      const res = await authApi.verifyOTP(identifier, otp);
      // if(res.success) {
      //   signIn(user)
      // }
      toast({
        title: "Verification Successful",
        description: `Welcome, ${res.data.user.name}`,
      });
      // Close modal here
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "Invalid OTP",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[95vw] max-w-md mx-auto my-4 p-0 gap-0 bg-white rounded-2xl border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <DialogHeader className="p-4 sm:p-6 pb-3 sm:pb-4 text-center relative">
            {showPasswordLogin && (
              <button
                onClick={handleBackToOTP}
                className="absolute left-3 sm:left-4 top-3 sm:top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 p-1"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </button>
            )}
            <DialogTitle className="text-xl sm:text-2xl font-semibold text-gray-900 px-8">
              {showPasswordLogin ? "Login with Password" : "Login"}
            </DialogTitle>
            {/* <DialogTitle className="text-xl sm:text-2xl font-semibold text-gray-900 px-8">
              {showPasswordLogin ? 'Login with Password' : 'Login'}
            </DialogTitle> */}
            <DialogDescription className="text-gray-600 text-sm mt-2 px-2">
              {showPasswordLogin
                ? "Enter your credentials to continue"
                : "Enter your email or mobile number to get started"}
            </DialogDescription>
          </DialogHeader>

          {/* Promotional Banner */}
          <div className="mx-4 sm:mx-6 mb-4 sm:mb-6 bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-xl sm:text-2xl">🎁</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-700">
                  <span className="font-medium">
                    Save a life with just ₹10 on the Varak App.
                  </span>
                </p>
                p
              </div>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto text-rose-600 border-rose-300 hover:bg-rose-50 text-xs px-2 py-1 h-auto"
              >
                Download
              </Button>
            </div>
          </div>

          {/* Form Content */}
          <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 sm:space-y-6">
            {!showPasswordLogin ? (
              <>
                {/* Email/Mobile Input for OTP */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-600 text-sm">
                    Email / Mobile Number *
                  </Label>
                  <div className="flex gap-2">
                    {/* Country Code Selector (shown only when typing mobile) */}
                    {isMobileNumber(emailOrMobile) && (
                      <select
                        title={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-16 sm:w-20 px-1 sm:px-2 py-2 border border-gray-300 rounded-md focus:border-rose-500 focus:ring-rose-500 text-sm"
                      >
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                      </select>
                    )}
                    <Input
                      id="email"
                      type="text"
                      value={emailOrMobile}
                      onChange={(e) => setEmailOrMobile(e.target.value)}
                      className="flex-1 border-gray-300 focus:border-rose-500 focus:ring-rose-500 text-sm h-10"
                      placeholder="Enter email or 10-digit mobile"
                    />
                  </div>
                  {emailOrMobile && (
                    <p className="text-xs text-gray-500">
                      {isMobileNumber(emailOrMobile)
                        ? "📱 Mobile number detected - OTP will be sent via SMS"
                        : isEmail(emailOrMobile)
                        ? "📧 Email detected - OTP will be sent to your inbox"
                        : "⚠️ Please enter a valid email or 10-digit mobile number"}
                    </p>
                  )}
                </div>

                {/* OTP Login Button */}
                <Button
                  onClick={handleGetOTP}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-medium py-2.5 sm:py-3 rounded-lg text-sm sm:text-base h-auto"
                >
                  {isLoading ? "Sending OTP..." : "Get OTP"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">OR</span>
                  </div>
                </div>

                {/* Google Sign In */}
                <Button
                  onClick={() => handleGoogleLogin()}
                  variant="outline"
                  disabled={isLoading}
                  className="w-full border-gray-300 hover:bg-gray-50 py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base h-auto"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    {/* Google SVG */}
                  </svg>
                  Sign in with Google
                </Button>

                <div className="text-center text-sm text-gray-600 mt-2">
                  Want to start a fundraiser?{" "}
                  <button
                    className="text-rose-600 hover:text-rose-700 font-medium hover:underline transition-colors"
                    onClick={handleStartFundraiser}
                  >
                    Click here
                  </button>
                </div>
                <div className="text-center mt-2">
                  <button
                    className="text-rose-600 hover:text-rose-700 font-medium hover:underline transition-colors text-sm"
                    onClick={() => setShowPasswordLogin(true)}
                  >
                    Sign in with password
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Password Login Form */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="login-email"
                      className="text-gray-600 text-sm"
                    >
                      Email / Mobile Number *
                    </Label>
                    <Input
                      id="login-email"
                      type="text"
                      value={emailOrMobile}
                      onChange={(e) => setEmailOrMobile(e.target.value)}
                      className="w-full border-gray-300 focus:border-rose-500 focus:ring-rose-500 text-sm h-10"
                      placeholder="Enter your email or mobile number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-600 text-sm">
                      Password *
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border-gray-300 focus:border-rose-500 focus:ring-rose-500 text-sm h-10"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                {/* Login Button */}
                <Button
                  onClick={handlePasswordLogin}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-medium py-2.5 sm:py-3 rounded-lg text-sm sm:text-base h-auto"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                {/* Forgot Password and Login via OTP */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-center">
                  <button
                    onClick={handleForgotPassword}
                    className="text-rose-600 hover:text-rose-700 hover:underline text-sm font-medium"
                  >
                    Forgot Password?
                  </button>
                  <span className="text-gray-400 hidden sm:inline">|</span>
                  <button
                    onClick={handleLoginViaOTP}
                    className="text-rose-600 hover:text-rose-700 hover:underline text-sm font-medium"
                  >
                    Login via OTP
                  </button>
                </div>

                {/* Start Fundraiser Link for Password Login */}
                <div className="text-center text-sm text-gray-600">
                  Want to start a fundraiser?{" "}
                  <button
                    className="text-rose-600 hover:text-rose-700 font-medium hover:underline transition-colors"
                    onClick={handleStartFundraiser}
                  >
                    Click here
                  </button>
                </div>
              </>
            )}

            {/* Terms */}
            <div className="text-center text-xs text-gray-500">
              By continuing you agree to our{" "}
              <button className="text-rose-600 hover:text-rose-700">
                Terms of Service
              </button>{" "}
              and{" "}
              <button className="text-rose-600 hover:text-rose-700">
                Privacy Policy
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        open={isForgotPasswordOpen}
        onOpenChange={setIsForgotPasswordOpen}
      />

      {/* Mobile Verification Modal */}
      <MobileVerificationModal
        open={isMobileVerificationOpen}
        onOpenChange={setIsMobileVerificationOpen}
        mobileNumber={emailOrMobile}
        countryCode={countryCode}
        onVerificationComplete={handleMobileVerificationComplete}
        onBack={handleMobileVerificationBack}
      />

      {/* Email Verification Modal */}
      <EmailVerificationModal
        open={isEmailVerificationOpen}
        onOpenChange={setIsEmailVerificationOpen}
        user_email={emailOrMobile}
        onVerificationComplete={handleEmailVerificationComplete}
        onBack={handleEmailVerificationBack}
      />
    </>
  );
};

export default SignInModal;
