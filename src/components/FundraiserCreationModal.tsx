import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, ArrowLeft, Check, Zap } from "lucide-react";
import { toast, useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import StartFundraiserModal from "@/components/StartFundraiserModal";
import FundraiserBasicForm from "@/components/fundraiser/FundraiserBasicForm";
import FundraiserStoryForm from "@/components/fundraiser/FundraiserStoryForm";
import FundraiserDocumentForm from "@/components/fundraiser/FundraiserDocumentForm";

interface FundraiserCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FundraiserCreationModal = ({ open, onOpenChange }: FundraiserCreationModalProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    goalAmount: '',
    patientRelation: '',
    educationQualification: '',
    employmentStatus: '',
    hearAbout: '',
    fundraiserImage: '',
    patientName: '',
    patientAge: '',
    medicalCondition: '',
    hospitalizationStatus: '',
    hospital: '',
    city: '',
    fullStory: '',
    fundraiserTitle: '',
    briefDescription: '',
    urgencyLevel: '',
    contactNumber: '',
    medicalDocuments: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.goalAmount) newErrors.goalAmount = 'Goal amount is required';
    else if (Number(formData.goalAmount) < 2000) {
      newErrors.goalAmount = 'Minimum ₹2,000 required';
    }
    if (!formData.patientRelation) newErrors.patientRelation = 'Patient relationship is required';
    if (!formData.educationQualification) newErrors.educationQualification = 'Education qualification is required';
    if (!formData.employmentStatus) newErrors.employmentStatus = 'Employment status is required';
    if (!formData.hearAbout) newErrors.hearAbout = 'Please tell us how you heard about us';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.patientName?.trim()) newErrors.patientName = 'Patient name is required';
    if (!formData.patientAge) newErrors.patientAge = 'Patient age is required';
    if (!formData.medicalCondition) newErrors.medicalCondition = 'Medical condition is required';
    if (!formData.hospitalizationStatus) newErrors.hospitalizationStatus = 'Hospitalization status is required';
    if (!formData.hospital) newErrors.hospital = 'Hospital is required';
    if (!formData.city?.trim()) newErrors.city = 'City is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullStory.trim()) newErrors.fullStory = 'Story is required';
    else if (formData.fullStory.length < 200) {
      newErrors.fullStory = 'Story must be at least 200 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    
    if (currentStep === 1) isValid = validateStep1();
    else if (currentStep === 2) isValid = validateStep2();
    else if (currentStep === 3) isValid = validateStep3();
    
    if (isValid) {
      if (currentStep === 3) {
        handleSubmit();
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      // Request OTP for email before showing signup modal
      await requestOtp(user?.user_email || "");
      setShowSignUp(true);
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      
      // Navigate to the success page with state data
      navigate('/fundraiser-success', {
        state: {
          userName: user?.user_name || "",
          fromFundraiserCreation: true
        }
      });
      
      setCurrentStep(1);
      setFormData({
        goalAmount: '',
        patientRelation: '',
        educationQualification: '',
        employmentStatus: '',
        hearAbout: '',
        fundraiserImage: '',
        patientName: '',
        patientAge: '',
        medicalCondition: '',
        hospitalizationStatus: '',
        hospital: '',
        city: '',
        fullStory: '',
        fundraiserTitle: '',
        briefDescription: '',
        urgencyLevel: '',
        contactNumber: '',
        medicalDocuments: '',
      });
      setErrors({});
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Basic Details";
      case 2: return "Patient Information";
      case 3: return "Story & Documents";
      default: return "Create Fundraiser";
    }
  };



  return (
    <>
      <Dialog open={open && !showSignUp} onOpenChange={onOpenChange}>
        <DialogContent className="w-[90vw] max-w-2xl mx-auto rounded-xl border-0 shadow-2xl bg-white max-h-[85vh] overflow-hidden flex flex-col">
          {/* Compact Progress */}
          <div className="flex items-center justify-center gap-1 mb-3">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === currentStep
                      ? 'bg-rose-500 text-white shadow-lg'
                      : step < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step < currentStep ? <Check className="h-3 w-3" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-6 h-0.5 mx-1 rounded ${
                    step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <DialogHeader className="text-center pb-0 px-6 pt-6">
            <DialogTitle className="text-lg font-bold text-gray-900 mb-2">
              {getStepTitle()}
            </DialogTitle>
            
            <Progress 
              value={(currentStep / 3) * 100} 
              className="w-full h-1.5 mb-4" 
            />
          </DialogHeader>

          {/* Main Content Area - Scrollable */}
          <div className="flex-1 overflow-y-auto px-6">
            {currentStep === 1 && (
              <FundraiserBasicForm
                formData={formData}
                onInputChange={handleInputChange}
                errors={errors}
              />
            )}
            {currentStep === 2 && (
              <FundraiserStoryForm
                formData={formData}
                onInputChange={handleInputChange}
                errors={errors}
              />
            )}
            {currentStep === 3 && (
              <FundraiserDocumentForm
                formData={formData}
                onInputChange={handleInputChange}
                errors={errors}
              />
            )}
          </div>

          {/* Updated Footer with Back button for all steps */}
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                size="sm"
                className="flex items-center gap-1.5 h-9 px-3 text-gray-600 border-gray-300 hover:bg-gray-50 disabled:opacity-50"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </Button>

              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  size="sm"
                  className="h-9 px-4 bg-rose-500 hover:bg-rose-600 text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
                >
                  Continue
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  size="sm"
                  className="h-9 px-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </div>
                  ) : isAuthenticated ? (
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Create Fundraiser
                    </div>
                  ) : (
                    "Sign Up & Create"
                  )}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <StartFundraiserModal
        open={showSignUp}
        onOpenChange={setShowSignUp}
      />
    </>
  );
};

export default FundraiserCreationModal;

// Example: To use 'user' and 'toast', define requestOtp inside the FundraiserCreationModal component.
// Move the following function inside FundraiserCreationModal if needed:


const requestOtp = async (user_email: string) => {
  await fetch('/user/request-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_email }),
  });

  toast({
    title: "OTP Sent",
    description: `A verification code has been sent to your email: ${user_email}`,
  });
};
