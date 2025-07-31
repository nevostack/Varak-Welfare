import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Share2, DollarSign, ArrowRight, Users, TrendingUp, Sparkles, Target } from "lucide-react";
import FundraiserCreationModal from "@/components/FundraiserCreationModal";
import StartFundraiserModal from "@/components/StartFundraiserModal";
import { useAuth } from "@/contexts/AuthContext";

const steps = [{
  icon: PlusCircle,
  title: "Create Your Campaign",
  description: "Upload photos, share your story, and set your fundraising goal. Our simple process gets you started in minutes.",
  feature: "2-minute setup",
  color: "from-rose-500 to-pink-600",
  stepNumber: "01"
}, {
  icon: Share2,
  title: "Share & Promote",
  description: "Spread the word through social media, WhatsApp, and email. Connect with supporters who care about your cause.",
  feature: "Social integration",
  color: "from-pink-500 to-rose-600",
  stepNumber: "02"
}, {
  icon: DollarSign,
  title: "Receive Funds",
  description: "Access donations instantly with secure bank transfers. Track every contribution with full transparency.",
  feature: "Instant withdrawal",
  color: "from-rose-600 to-pink-500",
  stepNumber: "03"
}];

const StartFundraiser = () => {
  const [isFundraiserCreationModalOpen, setIsFundraiserCreationModalOpen] = useState(false);
  const [isStartFundraiserModalOpen, setIsStartFundraiserModalOpen] = useState(false);
  const {
    isAuthenticated
  } = useAuth();
  
  const handleStartFundraiser = () => {
    if (isAuthenticated) {
      setIsFundraiserCreationModalOpen(true);
    } else {
      setIsStartFundraiserModalOpen(true);
    }
  };

  return (
    <>
      <section className="relative py-20 bg-gradient-to-br from-white via-rose-50/40 to-purple-50/30 overflow-hidden">
        {/* Enhanced Background Graphics */}
        <div className="absolute inset-0 opacity-20">
          {/* Large background elements */}
          <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-rose-300 to-pink-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-20 w-32 h-32 bg-gradient-to-br from-purple-300 to-rose-300 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full blur-3xl"></div>
          
          {/* Decorative patterns */}
          <div className="absolute top-16 right-16 text-rose-300 text-8xl opacity-30 rotate-12">✨</div>
          <div className="absolute bottom-24 right-1/3 text-pink-300 text-6xl opacity-30 -rotate-12">🚀</div>
          <div className="absolute top-1/2 left-16 text-purple-300 text-7xl opacity-30 rotate-45">💎</div>
          <div className="absolute bottom-1/3 left-1/2 text-rose-300 text-5xl opacity-30">🌟</div>
          
          {/* Geometric shapes */}
          <div className="absolute top-32 left-1/2 w-24 h-24 border-4 border-rose-200 rounded-full opacity-40"></div>
          <div className="absolute bottom-32 right-1/4 w-16 h-16 border-4 border-pink-200 rotate-45 opacity-40"></div>
          
          {/* Dotted grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_3px_3px,rgba(244,63,94,0.2)_1px,transparent_0)] bg-[length:30px_30px]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm border-2 border-rose-200 rounded-full shadow-xl mb-8">
              <Target className="w-5 h-5 text-rose-500" />
              <span className="text-rose-800 font-bold text-sm uppercase tracking-wide">Simple Process</span>
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-heading">
              <span className="text-gray-900">Launch Your Campaign in</span>
              <br />
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Just 3 Easy Steps
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Join thousands of successful fundraisers who've raised millions for causes they care about. 
              <span className="text-rose-600 font-semibold"> Start your journey today!</span>
            </p>
            
            {/* Success metrics */}
            <div className="flex items-center justify-center gap-8 mt-10">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">₹50Cr+</div>
                <div className="text-sm text-gray-600 font-medium">Funds Raised</div>
              </div>
              <div className="w-px h-12 bg-rose-300"></div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">10,000+</div>
                <div className="text-sm text-gray-600 font-medium">Campaigns</div>
              </div>
              <div className="w-px h-12 bg-rose-300"></div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">98%</div>
                <div className="text-sm text-gray-600 font-medium">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <Card className="relative overflow-hidden border-2 border-rose-100 hover:border-rose-200 shadow-xl hover:shadow-2xl bg-white h-full transition-all duration-300 rounded-3xl">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-50 to-pink-50 rounded-full blur-2xl opacity-60"></div>
                    
                    <CardContent className="relative p-8 text-center">
                      {/* Step Number */}
                      <div className="relative mb-6">
                        <div className="text-6xl font-bold text-rose-50 absolute -top-2 left-1/2 transform -translate-x-1/2">
                          {step.stepNumber}
                        </div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent relative z-10">
                          Step {step.stepNumber}
                        </div>
                      </div>
                      
                      {/* Icon Container */}
                      <div className="relative mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                          <Icon className="h-10 w-10 text-white" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                          {step.title}
                        </h3>
                        
                                                 <p className="text-gray-600 leading-relaxed text-sm">
                           {step.description}
                         </p>
                      </div>
                      
                      {/* Feature Badge */}
                      <div className="mt-8">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl text-sm font-bold shadow-lg">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          <span>{step.feature}</span>
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      
                      {/* Bottom Accent */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-600 rounded-b-3xl"></div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>


        </div>
      </section>

      {/* Fundraiser Creation Modal - for authenticated users */}
      <FundraiserCreationModal open={isFundraiserCreationModalOpen} onOpenChange={setIsFundraiserCreationModalOpen} />

      {/* Start Fundraiser Modal - for non-authenticated users */}
      <StartFundraiserModal open={isStartFundraiserModalOpen} onOpenChange={setIsStartFundraiserModalOpen} />
    </>
  );
};

export default StartFundraiser;