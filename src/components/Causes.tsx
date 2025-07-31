import { Card, CardContent } from "@/components/ui/card";
import { 
  Heart, 
  GraduationCap, 
  Stethoscope, 
  BookOpen,
  Users,
  Shield,
  TrendingUp,
  Award,
  Star,
  Target,
  Baby,
  Activity
} from "lucide-react";

const causes = [
  {
    icon: Heart,
    title: "CANCER CARE",
    description: "Comprehensive cancer treatment and support services",
    color: "text-white",
    bgColor: "bg-gradient-to-br from-rose-500 to-pink-600",
    category: "cancer",
    stats: "5,000+ Patients Treated",
    impact: "₹2Cr+ Treatment Cost Covered"
  },
  {
    icon: Stethoscope,
    title: "EARLY DETECTION",
    description: "Free cancer screening and awareness programs",
    color: "text-white", 
    bgColor: "bg-gradient-to-br from-rose-400 to-rose-500",
    category: "cancer",
    stats: "10,000+ Screenings Done",
    impact: "95% Early Detection Rate"
  },
  {
    icon: Users,
    title: "FAMILY SUPPORT",
    description: "Emotional and financial support for families",
    color: "text-white",
    bgColor: "bg-gradient-to-br from-pink-500 to-rose-500",
    category: "cancer",
    stats: "3,000+ Families Supported",
    impact: "24/7 Support Available"
  },
  {
    icon: GraduationCap,
    title: "CHILD EDUCATION",
    description: "Quality education and learning opportunities for children",
    color: "text-white",
    bgColor: "bg-gradient-to-br from-purple-500 to-pink-500",
    category: "education",
    stats: "5,000+ Children Educated",
    impact: "₹1.2Cr+ Education Support"
  },
  {
    icon: Activity,
    title: "CHILD HEALTHCARE",
    description: "Comprehensive medical care and nutrition for children",
    color: "text-white",
    bgColor: "bg-gradient-to-br from-blue-400 to-purple-500",
    category: "child healthcare",
    stats: "8,000+ Children Treated",
    impact: "24/7 Medical Support"
  },
  {
    icon: Shield,
    title: "CHILD PROTECTION",
    description: "Safety, security and rights protection for vulnerable children",
    color: "text-white",
    bgColor: "bg-gradient-to-br from-pink-400 to-purple-500",
    category: "child protection",
    stats: "3,500+ Children Protected",
    impact: "Zero Tolerance Policy"
  }
];

const Causes = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-rose-50/40 overflow-hidden">
      {/* Enhanced Background Graphics */}
      <div className="absolute inset-0 opacity-30">
        {/* Large background elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-20 w-48 h-48 bg-gradient-to-br from-purple-200 to-rose-200 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-1/3 w-56 h-56 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-3xl"></div>
        
                 {/* Decorative patterns */}
         <div className="absolute top-24 right-1/4 text-rose-200 text-9xl opacity-20 rotate-12">♥</div>
         <div className="absolute bottom-40 right-1/3 text-blue-200 text-7xl opacity-20 -rotate-12">👶</div>
         <div className="absolute top-1/2 left-20 text-pink-200 text-8xl opacity-20 rotate-45">✨</div>
         <div className="absolute bottom-1/4 left-1/2 text-purple-200 text-6xl opacity-20">🌟</div>
        
        {/* Geometric shapes */}
        <div className="absolute top-40 left-1/2 w-32 h-32 border-4 border-rose-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-40 right-1/4 w-24 h-24 border-4 border-purple-200 rotate-45 opacity-30"></div>
        
        {/* Enhanced dotted pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_4px_4px,rgba(244,63,94,0.15)_2px,transparent_0)] bg-[length:40px_40px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/90 backdrop-blur-sm border-2 border-rose-200 rounded-full shadow-2xl mb-8">
            <Target className="w-6 h-6 text-rose-500" />
            <span className="text-rose-800 font-bold text-sm uppercase tracking-wide">Our Mission Focus</span>
            <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight font-heading">
            <span className="text-gray-900">Our</span>{" "}
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Impact Areas</span>
          </h2>
          
                     <p className="text-xl md:text-2xl text-gray-600 max-w-5xl mx-auto leading-relaxed font-medium mb-12">
             We focus on two critical areas that transform lives - fighting cancer with comprehensive care 
             and protecting children through holistic welfare development.
             <span className="block mt-3 text-rose-600 font-semibold">Together, we're building a healthier, safer future for all.</span>
           </p>

          {/* Impact Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-rose-100">
              <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">20,000+</div>
              <div className="text-sm text-gray-600 font-semibold">Lives Transformed</div>
            </div>
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">₹5Cr+</div>
              <div className="text-sm text-gray-600 font-semibold">Funds Deployed</div>
            </div>
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">98%</div>
              <div className="text-sm text-gray-600 font-semibold">Success Rate</div>
            </div>
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">6</div>
              <div className="text-sm text-gray-600 font-semibold">Years of Impact</div>
            </div>
          </div>
        </div>

        {/* Cancer Care Section */}
        <div className="mb-20">
          <div className="flex items-center gap-6 mb-12 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-rose-100">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Cancer Care & Support</h3>
              <p className="text-gray-600 text-xl font-medium">Comprehensive healthcare and emotional support services</p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2 bg-rose-50 px-4 py-2 rounded-xl">
                  <TrendingUp className="h-4 w-4 text-rose-600" />
                  <span className="text-sm font-bold text-rose-700">95% Recovery Rate</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl">
                  <Award className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-bold text-green-700">Award Winning Care</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {causes.filter(cause => cause.category === 'cancer').map((cause, index) => {
              const Icon = cause.icon;
              return (
                <div 
                  key={index} 
                  className="group cursor-pointer h-full transform hover:scale-105 transition-all duration-500"
                >
                  <div className={`${cause.bgColor} rounded-3xl p-8 text-center shadow-2xl hover:shadow-3xl relative overflow-hidden h-full flex flex-col justify-between border-4 border-white/20`}>
                    {/* Enhanced Background Pattern */}
                    <div className="absolute inset-0 opacity-15">
                      <div className="absolute top-4 right-4 text-white text-7xl transform rotate-12">♥</div>
                      <div className="absolute bottom-4 left-4 text-white text-5xl transform -rotate-12">✨</div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-9xl opacity-5">+</div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col items-center space-y-6">
                      <div className="bg-white/25 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30">
                        <Icon className={`h-12 w-12 ${cause.color}`} />
                      </div>
                      <h4 className={`text-2xl font-bold ${cause.color} tracking-wide`}>
                        {cause.title}
                      </h4>
                      <p className={`text-base ${cause.color} opacity-95 text-center leading-relaxed font-medium`}>
                        {cause.description}
                      </p>
                      
                      {/* Stats Section */}
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 w-full border border-white/30">
                        <div className="text-white font-bold text-sm mb-1">{cause.stats}</div>
                        <div className="text-white/90 text-xs font-medium">{cause.impact}</div>
                      </div>
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute -top-3 -right-3 bg-white text-rose-600 rounded-full p-2 shadow-lg">
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Child Welfare Section */}
        <div className="mb-16">
          <div className="flex items-center gap-6 mb-12 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blue-100">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <Baby className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Child Welfare Development</h3>
              <p className="text-gray-600 text-xl font-medium">Protecting, nurturing and empowering children for a brighter future</p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-bold text-blue-700">16,500+ Children Served</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-xl">
                  <Award className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-bold text-purple-700">Holistic Child Care</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {causes.filter(cause => ['education', 'child healthcare', 'child protection'].includes(cause.category)).map((cause, index) => {
              const Icon = cause.icon;
              return (
                <div 
                  key={index} 
                  className="group cursor-pointer h-full transform hover:scale-105 transition-all duration-500"
                >
                  <div className={`${cause.bgColor} rounded-3xl p-8 text-center shadow-2xl hover:shadow-3xl relative overflow-hidden h-full flex flex-col justify-between border-4 border-white/20`}>
                                         {/* Enhanced Background Pattern */}
                     <div className="absolute inset-0 opacity-15">
                       <div className="absolute top-4 right-4 text-white text-7xl transform rotate-12">👶</div>
                       <div className="absolute bottom-4 left-4 text-white text-5xl transform -rotate-12">🌟</div>
                       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-9xl opacity-5">♥</div>
                     </div>
                    
                    <div className="relative z-10 flex flex-col items-center space-y-6">
                      <div className="bg-white/25 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30">
                        <Icon className={`h-12 w-12 ${cause.color}`} />
                      </div>
                      <h4 className={`text-2xl font-bold ${cause.color} tracking-wide`}>
                        {cause.title}
                      </h4>
                      <p className={`text-base ${cause.color} opacity-95 text-center leading-relaxed font-medium`}>
                        {cause.description}
                      </p>
                      
                      {/* Stats Section */}
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 w-full border border-white/30">
                        <div className="text-white font-bold text-sm mb-1">{cause.stats}</div>
                        <div className="text-white/90 text-xs font-medium">{cause.impact}</div>
                      </div>
                    </div>

                    {/* Floating Badge */}
                    <div className={`absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-lg ${
                      cause.category === 'education' ? 'text-purple-600' :
                      cause.category === 'child healthcare' ? 'text-blue-600' :
                      cause.category === 'child protection' ? 'text-pink-600' :
                      'text-blue-600'
                    }`}>
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="relative bg-gradient-to-br from-white via-rose-50/50 to-purple-50/30 rounded-3xl p-12 shadow-2xl border-2 border-rose-100 overflow-hidden">
                     {/* Background Pattern */}
           <div className="absolute inset-0 opacity-20">
             <div className="absolute top-6 right-6 text-rose-300 text-6xl">💝</div>
             <div className="absolute bottom-6 left-6 text-blue-300 text-5xl">👶</div>
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-200 text-8xl opacity-30">♥</div>
           </div>

          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full shadow-lg mb-8">
              <span className="text-sm font-bold uppercase tracking-wide">Join Our Mission</span>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>

            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Ready to Make a <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Difference?</span>
            </h3>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 font-medium leading-relaxed">
              Every contribution creates a ripple effect of hope and healing. 
              <span className="block mt-2 text-rose-600 font-semibold">Join thousands of compassionate supporters in our mission to transform lives.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <button className="group bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl border-4 border-white/20">
                <Heart className="inline h-6 w-6 mr-3 group-hover:animate-pulse" />
                Support Cancer Care
              </button>
                             <button className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl border-4 border-white/20">
                 <Baby className="inline h-6 w-6 mr-3 group-hover:animate-pulse" />
                 Support Child Welfare
               </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">100% Transparency</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium">80G Tax Benefits</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="font-medium">Verified NGO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Causes; 