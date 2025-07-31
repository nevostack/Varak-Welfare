import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, GraduationCap, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 h-screen flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl"></div>
            </div>
            
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div className="space-y-6">
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-rose-200 rounded-full px-6 py-3 shadow-lg">
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-rose-800">Transforming Lives Since 2020</span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-gray-900">Fighting </span>
                <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">Cancer</span>
                <span className="text-gray-900">,</span>
                <br />
                <span className="text-gray-900">Empowering </span>
                <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">Education</span>
              </h1>
              
              <p className="text-lg text-gray-700 leading-relaxed max-w-xl font-medium">
                Join our mission to provide comprehensive cancer support and quality education opportunities. 
                Together, we're building a healthier, more educated society.
              </p>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-rose-200">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent mb-1">5,000+</div>
                <div className="text-xs text-gray-600 font-semibold">Cancer Patients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent mb-1">15,000+</div>
                <div className="text-xs text-gray-600 font-semibold">Students Educated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent mb-1">₹5Cr+</div>
                <div className="text-xs text-gray-600 font-semibold">Lives Impacted</div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-6 py-3 text-base font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl"
              >
                <Heart className="mr-2 h-4 w-4" />
                Support Our Mission
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-rose-300 text-rose-700 hover:bg-rose-50 px-6 py-3 text-base font-bold transition-all duration-300 rounded-xl"
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 font-medium">Registered NGO</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 font-medium">80G Tax Benefits</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600 font-medium">100% Transparency</span>
              </div>
            </div>
          </div>

          {/* Right Content - Clean Hospital Images */}
          <div className="relative h-[60vh]">
            {/* Main Featured Image Grid */}
            <div className="grid grid-cols-2 gap-3 h-full">
              {/* Large Main Image */}
              <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&h=400&q=80" 
                  alt="Cancer patient receiving care in hospital"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="text-base font-bold">Cancer Patient Care</h3>
                  <p className="text-xs opacity-90">Comprehensive treatment & support</p>
                </div>
              </div>
              
              {/* Child in Hospital */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Child receiving education support in hospital"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/40 to-transparent"></div>
                <div className="absolute bottom-2 left-2 text-white">
                  <p className="text-xs font-bold">Education Support</p>
                </div>
              </div>
              
              {/* Medical Team */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Medical team providing treatment"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-600/40 to-transparent"></div>
                <div className="absolute bottom-2 left-2 text-white">
                  <p className="text-xs font-bold">Expert Medical Team</p>
                </div>
              </div>
            </div>
            
            {/* Simple Floating Badge */}
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full p-2 shadow-lg">
              <Heart className="h-4 w-4" />
            </div>
            
            {/* Success Card - Clean Design */}
            <div className="absolute -bottom-4 left-2 right-2 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-sm">Success Story</p>
                  <p className="text-xs text-gray-600 mt-1">"Thanks to HopeHeal, I completed my cancer treatment successfully."</p>
                  <p className="text-xs text-rose-600 font-semibold mt-1">- Priya Sharma</p>
                </div>
              </div>
            </div>
            
            {/* Simple Stats Badge */}
            <div className="absolute top-12 -left-3 bg-white rounded-lg p-2 shadow-lg border border-rose-100">
              <div className="text-center">
                <div className="text-lg font-bold text-rose-600">5000+</div>
                <div className="text-xs text-gray-600">Lives Saved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;