import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  Play,
  Users,
  Target,
  Heart,
  Zap,
  CheckCircle,
  TrendingUp,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const stories = [
  {
    id: 1,
    name: "Priya Sharma",
    age: 8,
    title: "Childhood Cancer Treatment",
    image: "https://i.postimg.cc/RCqY3NzQ/childhood-cancer-patient.jpg",
    videoThumbnail: "",
    hasVideo: false,
    raised: 1250000,
    goal: 1000000,
    donors: 2340,
    location: "Mumbai, India",
    daysToComplete: 45,
    category: "Medical",
    urgency: "high",
    story:
      "8-year-old Priya was diagnosed with acute lymphoblastic leukemia. With your support, she completed her treatment successfully.",
    fullStory:
      "Priya's journey started when she complained of severe fatigue and frequent infections. After extensive tests, doctors diagnosed her with acute lymphoblastic leukemia. The treatment was expensive, but thanks to the generous donors on Varak, Priya completed her chemotherapy and is now in remission. She dreams of becoming a doctor to help other children like her.",
    impact:
      "Successfully completed chemotherapy treatment and is now cancer-free",
    beforeImage: "https://i.postimg.cc/9f8vY2nz/before-child-treatment.jpg",
    afterImage: "https://i.postimg.cc/D0b8mYGD/after-child-treatment.jpg",
    milestones: [
      { date: "Day 1", event: "Campaign Started", completed: true },
      { date: "Day 10", event: "50% Funding Reached", completed: true },
      { date: "Day 25", event: "Surgery Completed", completed: true },
      { date: "Day 45", event: "Full Recovery", completed: true },
    ],
    testimonialVideo: "",
    rating: 5,
    successMetrics: {
      livesImpacted: 1,
      treatmentSuccess: "100%",
      recoveryTime: "6 months",
    },
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    age: 45,
    title: "Lung Cancer Treatment",
    image: "https://i.postimg.cc/g05XqbDR/cancer-patient-1.jpg",
    videoThumbnail: "",
    hasVideo: false,
    raised: 950000,
    goal: 800000,
    donors: 1650,
    location: "Delhi, India",
    daysToComplete: 60,
    category: "Medical",
    urgency: "high",
    story:
      "45-year-old Rajesh was diagnosed with stage 3 lung cancer. With community support, he completed his treatment successfully.",
    fullStory:
      "Rajesh, a daily wage worker, was diagnosed with stage 3 lung cancer. The treatment cost was beyond his family's means. Through Varak, generous donors helped him receive chemotherapy, radiation therapy, and surgery. Today, Rajesh is cancer-free and back to supporting his family.",
    impact: "Successfully completed cancer treatment and is now in remission",
    beforeImage: "https://i.postimg.cc/YqPvXzJK/before-treatment.jpg",
    afterImage: "https://i.postimg.cc/9MWnK4gD/after-treatment.jpg",
    milestones: [
      { date: "Day 1", event: "Campaign Started", completed: true },
      { date: "Day 15", event: "Chemotherapy Began", completed: true },
      { date: "Day 35", event: "Surgery Completed", completed: true },
      { date: "Day 60", event: "Treatment Complete", completed: true },
    ],
    rating: 5,
    successMetrics: {
      livesImpacted: 1,
      treatmentSuccess: "100%",
      recoveryTime: "4 months",
    },
  },
  {
    id: 3,
    name: "Mukesh Patel",
    age: 38,
    title: "Brain Tumor Treatment",
    image: "https://i.postimg.cc/C1m6DqLY/cancer-patient-3.jpg",
    videoThumbnail: "",
    hasVideo: false,
    raised: 850000,
    goal: 800000,
    donors: 1650,
    location: "Pune, India",
    daysToComplete: 38,
    category: "Medical",
    urgency: "high",
    story:
      "38-year-old Mukesh was diagnosed with a brain tumor. Thanks to community support, he received life-saving surgery.",
    fullStory:
      "Mukesh, an engineer, started experiencing severe headaches and vision problems. Tests revealed a brain tumor that required immediate surgery. The expensive treatment was beyond his family's reach, but through Varak, donors helped fund his surgery and chemotherapy. Today, Mukesh is tumor-free and back to his normal life.",
    impact: "Successfully completed brain tumor surgery and is now cancer-free",
    beforeImage: "https://i.postimg.cc/jdFqWmtZ/before-brain-treatment.jpg",
    afterImage: "https://i.postimg.cc/vmhYyV2T/after-brain-treatment.jpg",
    milestones: [
      { date: "Day 1", event: "Campaign Started", completed: true },
      { date: "Day 15", event: "75% Funding Reached", completed: true },
      { date: "Day 25", event: "Brain Surgery Completed", completed: true },
      { date: "Day 38", event: "Recovery Complete", completed: true },
    ],
    rating: 5,
    successMetrics: {
      livesImpacted: 1,
      treatmentSuccess: "100%",
      recoveryTime: "5 weeks",
    },
  },
  {
    id: 4,
    name: "Sunita Devi",
    age: 52,
    title: "Breast Cancer Treatment",
    image: "https://i.postimg.cc/MKNQP8Gw/cancer-patient-2.jpg",
    videoThumbnail: "",
    hasVideo: false,
    raised: 780000,
    goal: 650000,
    donors: 920,
    location: "Kolkata, India",
    daysToComplete: 55,
    category: "Medical",
    urgency: "high",
    story:
      "52-year-old Sunita was diagnosed with breast cancer. Through community support, she received life-saving treatment.",
    fullStory:
      "Sunita, a school teacher, discovered a lump during a routine check-up. After diagnosis, the family was devastated by the treatment costs. Thanks to Varak donors, Sunita received surgery, chemotherapy, and reconstruction surgery. She's now cancer-free and back to teaching, inspiring her students with her courage.",
    impact:
      "Successfully completed breast cancer treatment and returned to normal life",
    beforeImage: "https://i.postimg.cc/qvK8mNpP/before-breast-treatment.jpg",
    afterImage: "https://i.postimg.cc/nzBnL9Cy/after-breast-treatment.jpg",
    milestones: [
      { date: "Day 1", event: "Campaign Launched", completed: true },
      { date: "Day 12", event: "Surgery Completed", completed: true },
      { date: "Day 30", event: "Chemotherapy Started", completed: true },
      { date: "Day 55", event: "Full Recovery", completed: true },
    ],
    rating: 5,
    successMetrics: {
      livesImpacted: 1,
      treatmentSuccess: "100%",
      recoveryTime: "3 months",
    },
  },
];

const SuccessStories = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [showFullStory, setShowFullStory] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % stories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const currentStoryData = stories[currentStory];
  const progressPercentage = (
    (currentStoryData.raised / currentStoryData.goal) *
    100
  ).toFixed(0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const getCategoryColor = (category) => {
    const colors = {
      Medical: "bg-rose-100 text-rose-700 border-rose-200",
      Education: "bg-blue-100 text-blue-700 border-blue-200",
      Healthcare: "bg-purple-100 text-purple-700 border-purple-200",
    };
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      high: "bg-red-100 text-red-700 border-red-200",
      medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
      low: "bg-green-100 text-green-700 border-green-200",
    };
    return colors[urgency] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <section ref={ref} className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/90 backdrop-blur-sm border-2 border-rose-200 rounded-full shadow-2xl mb-8">
            <Sparkles className="w-6 h-6 text-rose-500" />
            <span className="text-rose-800 font-bold text-sm uppercase tracking-wide">
              Real Impact Stories
            </span>
            <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-gray-900">Stories of </span>
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              Hope
            </span>
            <span className="text-gray-900"> & </span>
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              Change
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how your contributions transform lives and create lasting
            impact in communities across India
          </p>

          {/* Global Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-rose-100">
              <div className="text-2xl font-bold text-rose-600">5.7K+</div>
              <div className="text-sm text-gray-600">Lives Transformed</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-rose-100">
              <div className="text-2xl font-bold text-rose-600">₹3.5Cr+</div>
              <div className="text-sm text-gray-600">Funds Raised</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-rose-100">
              <div className="text-2xl font-bold text-rose-600">98.5%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-rose-100">
              <div className="text-2xl font-bold text-rose-600">6.4K+</div>
              <div className="text-sm text-gray-600">Happy Donors</div>
            </div>
          </div>
        </motion.div>

        {/* Advanced Story Display */}
        <div className="max-w-6xl mx-auto">
          {/* Navigation Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-rose-200 hover:border-rose-300 transition-colors duration-300"
              >
                {isPlaying ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">
                      Auto-playing
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      Paused
                    </span>
                  </div>
                )}
              </button>

              <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-rose-200">
                <span className="text-sm font-medium text-gray-700">
                  {currentStory + 1} of {stories.length} Stories
                </span>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevStory}
                className="bg-white/80 backdrop-blur-sm rounded-full p-3 border border-rose-200 hover:border-rose-300 hover:bg-white transition-all duration-300 group"
                title="Previous Story"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600 group-hover:text-rose-500" />
              </button>
              <button
              title="Next Story"
                onClick={nextStory}
                className="bg-white/80 backdrop-blur-sm rounded-full p-3 border border-rose-200 hover:border-rose-300 hover:bg-white transition-all duration-300 group"
              >
                <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-rose-500" />
              </button>
            </div>
          </div>

          {/* Main Story Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-rose-100"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Enhanced Image/Video Section */}
                <div className="relative overflow-hidden">
                  <div className="relative h-64 lg:h-96">
                    {/* Main Image with Overlay Effects */}
                    <div className="relative w-full h-full">
                      <img
                        src={
                          showBeforeAfter
                            ? currentStoryData.beforeImage
                            : currentStoryData.image
                        }
                        alt={currentStoryData.name}
                        className="w-full h-full object-cover transition-all duration-700"
                      />

                      {/* Gradient Overlay for Better Text Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
                    </div>

                    {/* Enhanced Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Badge
                          className={`${getCategoryColor(
                            currentStoryData.category
                          )} border font-semibold shadow-lg backdrop-blur-sm`}
                        >
                          <Heart className="w-3 h-3 mr-1" />
                          {currentStoryData.category}
                        </Badge>
                      </motion.div>
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Badge
                          className={`${getUrgencyColor(
                            currentStoryData.urgency
                          )} border font-semibold shadow-lg backdrop-blur-sm`}
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          {currentStoryData.urgency.toUpperCase()} PRIORITY
                        </Badge>
                      </motion.div>
                    </div>

                    {/* Enhanced Progress Section */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <div className="text-white">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-rose-400" />
                            <span className="text-sm font-medium">
                              Fundraising Progress
                            </span>
                          </div>
                          <span className="text-lg font-bold text-rose-400">
                            {progressPercentage}%
                          </span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                          <motion.div
                            className="bg-gradient-to-r from-rose-400 to-pink-500 h-3 rounded-full shadow-lg"
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{
                              duration: 1.5,
                              ease: "easeOut",
                              delay: 0.5,
                            }}
                          ></motion.div>
                        </div>
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-200">
                          <span>
                            {formatCurrency(currentStoryData.raised)} raised
                          </span>
                          <span>
                            Goal: {formatCurrency(currentStoryData.goal)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Location Badge */}
                    <div className="absolute top-4 right-4">
                      <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-rose-100"
                      >
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-3 h-3 text-rose-500" />
                          <span className="font-medium text-gray-700">
                            {currentStoryData.location}
                          </span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Before/After Toggle */}
                    <div className="absolute bottom-4 right-4">
                      <button
                        onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                        className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:text-rose-600 transition-all duration-300 shadow-lg border border-rose-100 hover:border-rose-300"
                      >
                        {showBeforeAfter ? (
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            Show After
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3" />
                            Show Before
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Enhanced Content Section */}
                <div className="p-6 lg:p-8">
                  <div className="h-full flex flex-col">
                    {/* Enhanced Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                          <Heart className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900">
                            {currentStoryData.name}
                          </h3>
                          {currentStoryData.age && (
                            <p className="text-sm text-gray-500 font-medium">
                              Age: {currentStoryData.age} years old
                            </p>
                          )}
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {currentStoryData.location}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">
                            Completed in
                          </div>
                          <div className="text-lg font-bold text-rose-600">
                            {currentStoryData.daysToComplete} days
                          </div>
                        </div>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-3">
                        {currentStoryData.title}
                      </h4>
                    </div>

                    {/* Enhanced Story Content */}
                    <div className="mb-6 flex-grow">
                      <div className="mb-6">
                        <div className="flex items-start gap-3 mb-4">
                          <Quote className="h-6 w-6 text-rose-500 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-gray-700 leading-relaxed italic text-lg">
                              "
                              {showFullStory
                                ? currentStoryData.fullStory
                                : currentStoryData.story}
                              "
                            </p>
                            <button
                              onClick={() => setShowFullStory(!showFullStory)}
                              className="text-rose-500 hover:text-rose-600 font-semibold text-sm mt-2 transition-colors duration-300"
                            >
                              {showFullStory ? "Show Less" : "Read Full Story"}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-5 border border-rose-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-bold text-rose-800 text-lg">
                            Impact Achieved
                          </span>
                        </div>
                        <p className="text-rose-700 font-medium text-base leading-relaxed">
                          {currentStoryData.impact}
                        </p>
                      </div>
                    </div>

                    {/* Enhanced Success Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="text-2xl font-bold text-rose-600 mb-1">
                          {formatCurrency(currentStoryData.raised)}
                        </div>
                        <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                          Amount Raised
                        </div>
                      </div>
                      <div className="text-center bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="text-2xl font-bold text-rose-600 mb-1">
                          {formatNumber(currentStoryData.donors)}
                        </div>
                        <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                          Generous Donors
                        </div>
                      </div>
                      <div className="text-center bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="text-2xl font-bold text-rose-600 mb-1">
                          {currentStoryData.daysToComplete}
                        </div>
                        <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                          Days to Success
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Star Rating & Testimonial */}
                    <div className="text-center bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[...Array(currentStoryData.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 font-medium">
                        Perfect Success Story
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Verified by Varak Team
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Story Indicators */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {stories.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentStory(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStory
                    ? "bg-rose-500 w-8"
                    : "bg-rose-200 w-2 hover:bg-rose-300"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-rose-100 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Create Your Own Success Story?
              </h3>
              <p className="text-gray-600 mb-6">
                Join thousands of successful fundraisers who have transformed
                lives through Varak
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start Your Campaign
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-rose-300 text-rose-700 hover:bg-rose-50 px-8 py-3 rounded-xl font-bold transition-all duration-300"
                >
                  <Users className="mr-2 h-5 w-5" />
                  View All Stories
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
