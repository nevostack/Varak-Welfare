
import { ChevronLeft, ChevronRight, Award, Shield, CheckCircle, Star, Heart, Users, Globe, Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const trustPartners = [
  {
    name: "WHO",
    fullName: "World Health Organization",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c8/WHO_logo.svg",
    category: "Healthcare",
    partnership: "Official Healthcare Partner"
  },
  {
    name: "UNICEF",
    fullName: "United Nations Children's Fund",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1d/UNICEF_Logo.svg",
    category: "Children",
    partnership: "Child Welfare Initiative"
  },
  {
    name: "Red Cross",
    fullName: "International Red Cross",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/11/International_Committee_of_the_Red_Cross_Logo.svg",
    category: "Emergency",
    partnership: "Emergency Relief Partner"
  },
  {
    name: "Rotary",
    fullName: "Rotary International",
    logo: "https://upload.wikimedia.org/wikipedia/en/4/48/Rotary_International_logo.svg",
    category: "Community",
    partnership: "Community Development"
  },
  {
    name: "Oxfam",
    fullName: "Oxfam International",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/Oxfam-Logo.svg",
    category: "Poverty",
    partnership: "Poverty Alleviation"
  },
  {
    name: "Save the Children",
    fullName: "Save the Children Fund",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Save_the_Children_logo.svg",
    category: "Children",
    partnership: "Child Protection"
  },
  {
    name: "Doctors Without Borders",
    fullName: "Médecins Sans Frontières",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f3/MSF_logo.svg",
    category: "Medical",
    partnership: "Medical Outreach"
  },
  {
    name: "Greenpeace",
    fullName: "Greenpeace International",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Greenpeace_logo.svg",
    category: "Environment",
    partnership: "Environmental Protection"
  }
];

const trustIndicators = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "256-bit SSL encryption protects all transactions",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: CheckCircle,
    title: "Verified Platform",
    description: "Certified by international NGO standards",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized for excellence in fundraising",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: Users,
    title: "5.5M+ Users",
    description: "Trusted by millions of donors worldwide",
    color: "text-rose-600",
    bgColor: "bg-rose-50"
  }
];

const FeaturedIn = () => {
  const [currentPartner, setCurrentPartner] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Auto-rotate partners
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % trustPartners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-20 w-32 h-32 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-rose-200 rounded-full px-6 py-3 shadow-lg mb-6">
            <Heart className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-semibold text-rose-800">Trusted Partnerships</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-900">Trusted by </span>
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">Global</span>
            <span className="text-gray-900"> Organizations</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Partnering with world-renowned organizations to create maximum impact for causes that matter
          </p>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { 
                delayChildren: 0.3, 
                staggerChildren: 0.1 
              } 
            }
          }}
        >
          {trustIndicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                className={`${indicator.bgColor} rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group`}
              >
                <div className={`w-12 h-12 ${indicator.color} bg-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{indicator.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{indicator.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Featured Partner Spotlight */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-rose-100 mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Partner Info */}
            <div className="p-8 lg:p-12">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <Star className="w-3 h-3" />
                  Featured Partner
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {trustPartners[currentPartner].fullName}
                </h3>
                <p className="text-rose-600 font-semibold mb-4">
                  {trustPartners[currentPartner].partnership}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Working together to create meaningful change in the {trustPartners[currentPartner].category.toLowerCase()} sector through innovative fundraising solutions and community engagement.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Global Impact</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Verified Partner</span>
                </div>
              </div>
            </div>

            {/* Partner Logo & Visual */}
            <div className="bg-gradient-to-br from-rose-100 to-pink-100 p-8 lg:p-12 flex items-center justify-center relative">
              <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <img 
                  src={trustPartners[currentPartner].logo}
                  alt={trustPartners[currentPartner].name}
                  className="w-20 h-20 object-contain"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center';
                    fallback.innerHTML = `<span class="text-white font-bold text-2xl">${trustPartners[currentPartner].name.charAt(0)}</span>`;
                    target.parentNode?.appendChild(fallback);
                  }}
                />
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-rose-200">
                <span className="text-sm font-medium text-gray-700">{trustPartners[currentPartner].category}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Partner Navigation */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-rose-200 hover:border-rose-300 transition-colors duration-300"
          >
            {autoPlay ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Auto-rotating</span>
              </div>
            ) : (
              <span className="text-sm font-medium text-gray-700">Paused</span>
            )}
          </button>

          <div className="flex items-center gap-2">
            {trustPartners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPartner(index)}
                aria-label={`Select partner: ${trustPartners[index].name}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentPartner 
                    ? 'bg-rose-500 w-8' 
                    : 'bg-rose-200 w-2 hover:bg-rose-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* All Partners Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { 
                delayChildren: 1, 
                staggerChildren: 0.1 
              } 
            }
          }}
        >
          {trustPartners.map((partner, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className={`bg-white/60 backdrop-blur-sm rounded-xl p-4 border transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer ${
                index === currentPartner 
                  ? 'border-rose-300 shadow-md' 
                  : 'border-gray-200 hover:border-rose-200'
              }`}
              onClick={() => setCurrentPartner(index)}
            >
              <div className="flex items-center justify-center h-16">
                <img 
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center';
                    fallback.innerHTML = `<span class="text-white font-bold text-sm">${partner.name.charAt(0)}</span>`;
                    target.parentNode?.appendChild(fallback);
                  }}
                />
              </div>
              <p className="text-xs text-center text-gray-600 mt-2 font-medium">{partner.name}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-rose-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Join Our Network?
            </h3>
            <p className="text-gray-600 mb-6">
              Partner with us to amplify your impact and reach millions of compassionate donors worldwide
            </p>
            <button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Zap className="inline mr-2 h-5 w-5" />
              Become a Partner
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedIn;
