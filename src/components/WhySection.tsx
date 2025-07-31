import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Settings, 
  CreditCard, 
  Headphones,
  Monitor,
  Wallet,
  Globe,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Star,
  Award,
  Shield,
  Zap
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const features = [
  {
    icon: TrendingUp,
    title: "Industry's Best Success Rate",
    description: "95% success rate with our proven fundraising strategies and expert guidance",
    stat: "95%",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    category: "Performance"
  },
  {
    icon: Users,
    title: "55,00,000+ Contributors",
    description: "Join our massive community of generous supporters from around the globe",
    stat: "5.5M+",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    category: "Community"
  },
  {
    icon: Settings,
    title: "AI-Powered Campaign Tools",
    description: "Smart automation and optimization tools that boost your results by 40%",
    stat: "+40%",
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    category: "Technology"
  },
  {
    icon: CreditCard,
    title: "Universal Payment Support",
    description: "Accept donations via 200+ payment methods including crypto and wallets",
    stat: "200+",
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-50",
    iconColor: "text-rose-600",
    category: "Payments"
  },
  {
    icon: Headphones,
    title: "24/7 Expert Support",
    description: "Dedicated success managers and round-the-clock technical support",
    stat: "24/7",
    color: "from-orange-500 to-amber-600",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    category: "Support"
  },
  {
    icon: Monitor,
    title: "Advanced Analytics Dashboard",
    description: "Real-time insights with predictive analytics and donor behavior tracking",
    stat: "Real-time",
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-600",
    category: "Analytics"
  },
  {
    icon: Wallet,
    title: "Instant Fund Withdrawal",
    description: "Lightning-fast withdrawals in under 2 hours with zero processing fees",
    stat: "<2hrs",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    category: "Finance"
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Accept donations from 195+ countries with automatic currency conversion",
    stat: "195+",
    color: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
    category: "Global"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Medical Fundraiser",
    content: "Raised $50,000 in just 2 weeks! The platform made it so easy.",
    avatar: "SJ",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Education Campaign",
    content: "Best decision ever. The support team guided me through everything.",
    avatar: "MC",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Community Project",
    content: "Exceeded our goal by 200%! The tools here are game-changing.",
    avatar: "ER",
    rating: 5
  }
];

const WhySection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-700 mb-4">
            Why Choose FundHope?
          </h2>
        </div>

        {/* Features Grid */}
<motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1, transition: { delayChildren: 0.3, staggerChildren: 0.2 } }
          }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index} 
                className="text-center"
                variants={ {
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
              >
                {/* Icon Circle */}
                <div className="w-20 h-20 mx-auto rounded-full border-2 border-rose-400 flex items-center justify-center mb-4">
                  <Icon className="h-8 w-8 text-rose-500" />
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-700 mb-3 leading-tight">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed">
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