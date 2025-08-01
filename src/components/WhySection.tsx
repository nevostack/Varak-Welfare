import { 
  TrendingUp, 
  Users, 
  Settings, 
  CreditCard, 
  Headphones,
  Monitor,
  Wallet,
  Globe,
  Star,
  Heart
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: TrendingUp,
    title: "95% Success Rate",
    description: "Industry-leading success rate with proven fundraising strategies",
    stat: "95%"
  },
  {
    icon: Users,
    title: "5.5M+ Contributors",
    description: "Massive community of generous supporters worldwide",
    stat: "5.5M+"
  },
  {
    icon: Settings,
    title: "AI-Powered Tools",
    description: "Smart automation that boosts your results by 40%",
    stat: "+40%"
  },
  {
    icon: CreditCard,
    title: "200+ Payment Methods",
    description: "Accept donations via all major payment methods",
    stat: "200+"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock expert support when you need it",
    stat: "24/7"
  },
  {
    icon: Wallet,
    title: "Instant Withdrawals",
    description: "Lightning-fast withdrawals in under 2 hours",
    stat: "2hrs"
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Accept donations from 195+ countries worldwide",
    stat: "195+"
  },
  {
    icon: Monitor,
    title: "Real-time Analytics",
    description: "Track your campaign performance in real-time",
    stat: "Live"
  }
];


const WhySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header with Badge */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-200 rounded-full px-6 py-3 mb-6 shadow-lg">
            <div className="w-2 h-2 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full"></div>
            <span className="text-sm font-bold text-rose-700">Why Choose Us</span>
            <Heart className="h-4 w-4 text-rose-600" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Why Choose <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">Varak</span>?
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands who trust us with their fundraising campaigns
          </p>
        </div>

        {/* Clean Features Grid */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { 
                delayChildren: 0.2, 
                staggerChildren: 0.1 
              } 
            }
          }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div 
                key={index}
                className="text-center group"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.5 }
                  }
                }}
              >
                {/* Simple Icon Circle */}
                <div className="w-20 h-20 mx-auto rounded-full bg-rose-50 border-2 border-rose-200 flex items-center justify-center mb-4 group-hover:bg-rose-100 group-hover:border-rose-300 transition-all duration-300">
                  <Icon className="h-8 w-8 text-rose-500" />
                </div>

                {/* Statistic */}
                <div className="text-2xl font-bold text-rose-500 mb-2">
                  {feature.stat}
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default WhySection;