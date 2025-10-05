import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, RefreshCw, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailVerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user_email: string;
  onVerificationComplete: (otp: string) => void;
  onBack: () => void;
}

const EmailVerificationModal = ({
  open,
  onOpenChange,
  user_email,
  onVerificationComplete,
  onBack
}: EmailVerificationModalProps) => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [open, timeLeft]);

  useEffect(() => {
    if (open) {
      setTimeLeft(60);
      setCanResend(false);
      setOtp('');
    }
  }, [open]);

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);

    try {
      // Call backend to verify OTP 
      const res = await fetch('http://localhost:3000/api/user/verify-otp', {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_email, otp }),
      });
      const data = await res.json();

      if (data.success) {
        onVerificationComplete(otp);
        toast({
          title: "Verification Successful",
          description: "Email verified successfully!",
        });
      } else {
        toast({
          title: "Invalid OTP",
          description: data.message || "Please enter the correct OTP sent to your email",
          variant: "destructive",
        });
        setOtp('');
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Verification failed. Please try again.",
        variant: "destructive",
      });
      setOtp('');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      await fetch('http://localhost:3000/api/user/register-request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_email }),
      });
      setIsResending(false);
      setTimeLeft(60);
      setCanResend(false);
      toast({
        title: "OTP Resent",
        description: `New verification code sent to ${user_email}`,
      });
    } catch (err) {
      setIsResending(false);
      toast({
        title: "Error",
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBackToLogin = () => {
    onOpenChange(false);
    onBack();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-sm mx-auto my-4 rounded-2xl border-0 shadow-2xl bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-2 relative">
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToLogin}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1" />
          </div>

          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-rose-600" />
          </div>

          <DialogTitle className="text-lg sm:text-xl font-bold text-gray-900">
            Verify Email
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-xs sm:text-sm px-2">
            We've sent a 6-digit code to<br />
            <span className="font-medium text-gray-900">{user_email}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 px-1">
          {/* Demo Info */}
          <div className="text-center text-xs sm:text-sm text-blue-600 bg-blue-50 p-2 sm:p-3 rounded-lg">
            <strong>Demo:</strong> Use OTP <strong>123456</strong> to verify
          </div>

          {/* OTP Input */}
          <div className="space-y-2">
            <div className="flex justify-center">
              <InputOTP
                value={otp}
                onChange={setOtp}
                maxLength={6}
                className="gap-1 sm:gap-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="w-8 h-8 sm:w-12 sm:h-12 text-sm sm:text-lg border-gray-200 focus:border-rose-500 focus:ring-rose-500" />
                  <InputOTPSlot index={1} className="w-8 h-8 sm:w-12 sm:h-12 text-sm sm:text-lg border-gray-200 focus:border-rose-500 focus:ring-rose-500" />
                  <InputOTPSlot index={2} className="w-8 h-8 sm:w-12 sm:h-12 text-sm sm:text-lg border-gray-200 focus:border-rose-500 focus:ring-rose-500" />
                  <InputOTPSlot index={3} className="w-8 h-8 sm:w-12 sm:h-12 text-sm sm:text-lg border-gray-200 focus:border-rose-500 focus:ring-rose-500" />
                  <InputOTPSlot index={4} className="w-8 h-8 sm:w-12 sm:h-12 text-sm sm:text-lg border-gray-200 focus:border-rose-500 focus:ring-rose-500" />
                  <InputOTPSlot index={5} className="w-8 h-8 sm:w-12 sm:h-12 text-sm sm:text-lg border-gray-200 focus:border-rose-500 focus:ring-rose-500" />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          {/* Timer and Resend */}
          <div className="text-center text-xs sm:text-sm text-gray-600">
            {!canResend ? (
              <p>Resend OTP in {timeLeft} seconds</p>
            ) : (
              <button
                onClick={handleResendOTP}
                disabled={isResending}
                className="text-rose-600 hover:text-rose-700 font-medium hover:underline disabled:opacity-50"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 animate-spin inline mr-1" />
                    Resending...
                  </>
                ) : (
                  'Resend OTP'
                )}
              </button>
            )}
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerifyOTP}
            disabled={otp.length !== 6 || isVerifying}
            className="w-full h-10 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-xs sm:text-sm"
          >
            {isVerifying ? 'Verifying...' : 'Verify Email'}
          </Button>

          {/* Help Text */}
          <div className="text-center text-xs text-gray-500">
            Didn't receive the code? Check your spam folder or try resending.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailVerificationModal;
