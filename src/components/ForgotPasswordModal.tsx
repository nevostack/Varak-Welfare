import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Lock, Mail, Clock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authApi } from "@/lib/api"; // Make sure this import exists

interface ForgotPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ForgotPasswordModal = ({ open, onOpenChange }: ForgotPasswordModalProps) => {
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const { toast } = useToast();

  const handleSendOTP = async () => {
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await authApi.requestOTPEmail(email.trim());
      if (res.success) {
        setStep('otp');
        setResendTimer(60);
        const countdown = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              clearInterval(countdown);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        toast({
          title: "OTP Sent",
          description: `Password reset OTP has been sent to ${email}`,
        });
      } else {
        toast({
          title: "Error",
          description: res.message || "Failed to send OTP",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      toast({
        title: "Error",
        description: "Please enter the OTP",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Call backend to verify OTP
      const res = await authApi.verifyOTP({ user_email: email.trim() }, otp.trim());
      if (res.success) {
        setStep('reset');
        toast({
          title: "OTP Verified",
          description: "Please set your new password",
        });
      } else {
        toast({
          title: "Invalid OTP",
          description: res.message || "Please enter the correct OTP",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to verify OTP",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both password fields",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"}/user/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_email: email.trim(),
            new_password: newPassword.trim(),
          }),
        }
      );
      const result = await res.json();
      if (result.success) {
        toast({
          title: "Success",
          description: "Your password has been reset successfully",
        });
        handleClose();
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to reset password",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to reset password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
    if (resendTimer > 0) return;
    
    setResendTimer(60);
    const countdown = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    toast({
      title: "OTP Resent",
      description: `New OTP has been sent to ${email}`,
    });
  };

  const handleClose = () => {
    setStep('email');
    setEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setResendTimer(0);
    onOpenChange(false);
  };

  const handleBack = () => {
    if (step === 'otp') {
      setStep('email');
      setOtp('');
    } else if (step === 'reset') {
      setStep('otp');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-sm mx-auto my-4 rounded-2xl border-0 shadow-2xl bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-2 relative">
          <div className="flex items-center justify-between mb-2">
            {step !== 'email' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="flex-1" />
          </div>

          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Lock className="h-6 w-6 sm:h-8 sm:w-8 text-rose-600" />
          </div>

          <DialogTitle className="text-lg sm:text-xl font-bold text-gray-900">
            {step === 'email' && 'Forgot Password'}
            {step === 'otp' && 'Verify OTP'}
            {step === 'reset' && 'Reset Password'}
          </DialogTitle>
        </DialogHeader>

        <Separator className="mb-4" />

        {/* Form Content */}
        <div className="space-y-4 px-1">
          {step === 'email' && (
            <>
              <div className="text-center text-gray-600 text-xs sm:text-sm px-2">
                Enter your email address and we'll send you an OTP to reset your password.
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="reset-email" className="text-sm font-medium text-gray-700">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-10 border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 text-sm"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <Button 
                onClick={handleSendOTP}
                disabled={isLoading}
                className="w-full h-10 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-xs sm:text-sm"
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </>
          )}

          {step === 'otp' && (
            <>
              <div className="text-center text-gray-600 text-xs sm:text-sm px-2">
                We've sent a 6-digit OTP to<br />
                <span className="font-medium text-gray-900">{email}</span>
              </div>

              {/* Demo Info */}
              <div className="text-center text-xs sm:text-sm text-blue-600 bg-blue-50 p-2 sm:p-3 rounded-lg">
                <strong>Demo:</strong> Use OTP <strong>123456</strong> to verify
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
                  Enter OTP *
                </Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="h-10 border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 text-center text-sm sm:text-lg tracking-widest"
                  placeholder="123456"
                  maxLength={6}
                />
              </div>

              <Button 
                onClick={handleVerifyOTP}
                disabled={isLoading}
                className="w-full h-10 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-xs sm:text-sm"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Button>

              <div className="text-center">
                {resendTimer > 0 ? (
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Resend OTP in {resendTimer}s</span>
                  </div>
                ) : (
                  <button 
                    onClick={handleResendOTP}
                    className="text-rose-600 hover:text-rose-700 text-xs sm:text-sm font-medium hover:underline transition-colors"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </>
          )}

          {step === 'reset' && (
            <>
              <div className="text-center text-gray-600 text-xs sm:text-sm px-2">
                Create a new password for your account.
              </div>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="new-password" className="text-sm font-medium text-gray-700">
                    New Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10 pr-12 h-10 border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 text-sm"
                      placeholder="Enter new password"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowNewPassword(!showNewPassword)} 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-12 h-10 border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 text-sm"
                      placeholder="Confirm new password"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleResetPassword}
                disabled={isLoading}
                className="w-full h-10 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-xs sm:text-sm"
              >
                {isLoading ? 'Resetting Password...' : 'Reset Password'}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
