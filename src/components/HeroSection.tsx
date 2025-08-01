import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Heart, 
  Star, 
  CheckCircle, 
  Target,
  Award,
  DollarSign
} from "lucide-react";

const HeroSection = () => {
  const impactStats = [
    { number: "0%", label: "Platform Fee*", icon: DollarSign },
    { number: "72 Lakh+", label: "Contributors", icon: Heart },
    { number: "3.2 Lakh+", label: "Fundraisers", icon: Target }
  ];

  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-rose-300 to-pink-300 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-52 h-52 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full blur-3xl opacity-25"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-blue-200 to-rose-200 rounded-full blur-2xl opacity-20"></div>
      </div>
            
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center h-full py-8">
          
          {/* Left Content */}
          <div className="space-y-6">
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-rose-200 rounded-full px-6 py-3 shadow-lg">
              <div className="w-3 h-3 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full shadow-sm"></div>
              <span className="text-sm font-bold text-rose-800">India's #1 Crowdfunding Platform</span>
              <Award className="h-4 w-4 text-rose-600" />
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-gray-900">Need Funds to Pay For a </span>
                <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">Medical Emergency</span>
                <span className="text-gray-900"> or </span>
                <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">Social Cause?</span>
              </h1>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-3 gap-6 py-4">
              {impactStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index}
                    className="text-center p-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg border border-rose-200"
                  >
                    <Icon className="h-6 w-6 mx-auto mb-2 text-rose-500" />
                    <div className="text-2xl lg:text-3xl font-bold mb-1 bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-xs text-gray-600 font-semibold">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-6 py-3 text-lg font-bold shadow-2xl hover:shadow-3xl rounded-xl transform hover:scale-105 transition-all duration-300"
              >
                <Heart className="mr-2 h-5 w-5" />
                Start a Fundraiser for FREE
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-rose-400 text-rose-700 hover:bg-rose-50 hover:border-rose-500 px-6 py-3 text-lg font-bold rounded-xl bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <DollarSign className="mr-2 h-5 w-5" />
                Contribute Now
              </Button>
            </div>
          </div>

          {/* Right Content - Single Image */}
          <div className="relative h-[60vh] lg:h-[65vh]">
            {/* Main Image Display */}
            <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/R.jpeg"
                alt="Child receiving medical care in hospital"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              
              {/* Image Content Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-bold mb-2">Medical Support</h3>
                <p className="text-base opacity-90">Life-saving treatments for children</p>
              </div>
            </div>

            {/* Success Story Card */}
            <div className="absolute -bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-rose-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900 text-sm">Success Story</h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-2">
                    "Thanks to Varak's amazing platform, my daughter Priya received life-saving surgery. The support was incredible!"
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-rose-600 font-semibold">- Rajesh Kumar, Father</p>
                    <span className="text-xs text-green-600 font-medium">✓ Verified Story</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;