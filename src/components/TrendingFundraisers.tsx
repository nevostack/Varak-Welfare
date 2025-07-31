import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Clock, Facebook, ArrowRight, Users, Target } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const fundraisers = [
  {
    id: 1,
    title: "Support My Dad's Brain Injury Recovery – Urgent Help Needed",
    organizer: "Alok Ramayan Chaurasia",
    image: "https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg",
    raised: 2825498,
    goal: 3000000,
    supporters: 3563,
    daysLeft: 14,
    category: "AR"
  },
  {
    id: 2,
    title: "Offer Support To Me, Varun Kulkarni, An Actor & Theatre Artist",
    organizer: "Rhea Rai",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=250",
    raised: 2087837,
    goal: 2500000,
    supporters: 1148,
    daysLeft: 4,
    category: "RR"
  },
  {
    id: 3,
    title: "Offer A Helping Hand To Support Sahil Jadhav's Treatment",
    organizer: "Tanu Rajan",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=400&h=250",
    raised: 1941544,
    goal: 2000000,
    supporters: 1228,
    daysLeft: 76,
    category: "TR"
  },
  {
    id: 4,
    title: "Help Priya Fight Cancer - Emergency Medical Support",
    organizer: "Amit Sharma",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=400&h=250",
    raised: 1650000,
    goal: 2000000,
    supporters: 892,
    daysLeft: 22,
    category: "AS"
  },
  {
    id: 5,
    title: "Education Fund for Underprivileged Children",
    organizer: "Kavya Patel",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=400&h=250",
    raised: 875000,
    goal: 1200000,
    supporters: 567,
    daysLeft: 45,
    category: "KP"
  }
];

const TrendingFundraisers = () => {
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
    return `₹${amount}`;
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-rose-50/30 to-purple-50/20 overflow-hidden">
      {/* Background Graphics */}
      <div className="absolute inset-0 opacity-30">
        {/* Geometric shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-purple-200 to-rose-200 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-3xl"></div>
        
        {/* Heart patterns */}
        <div className="absolute top-20 right-10 text-rose-200 text-6xl opacity-20">♥</div>
        <div className="absolute bottom-32 right-1/3 text-pink-200 text-4xl opacity-20">✨</div>
        <div className="absolute top-1/2 left-10 text-purple-200 text-5xl opacity-20">🌟</div>
        
        {/* Dotted pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(244,63,94,0.15)_1px,transparent_0)] bg-[length:24px_24px]"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-rose-200 rounded-full px-6 py-3 shadow-lg mb-6">
            <Target className="h-5 w-5 text-rose-500" />
            <span className="text-sm font-bold text-rose-800">Live Campaigns</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Trending</span>{" "}
            <span className="text-gray-900">Fundraisers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Join thousands of compassionate people supporting urgent causes. Every contribution makes a real difference in someone's life.
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">₹15Cr+</div>
              <div className="text-sm text-gray-600 font-medium">Raised This Month</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">25,000+</div>
              <div className="text-sm text-gray-600 font-medium">Active Supporters</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">500+</div>
              <div className="text-sm text-gray-600 font-medium">Lives Helped</div>
            </div>
          </div>
        </div>

        {/* Enhanced Carousel */}
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {fundraisers.map((fundraiser) => {
                const progressPercentage = Math.round((fundraiser.raised / fundraiser.goal) * 100);
                
                return (
                  <CarouselItem key={fundraiser.id} className="pl-4 md:basis-1/2 lg:basis-1/3 py-2">
                    <Card className="group relative overflow-hidden bg-white shadow-xl border-0 rounded-3xl">
                      {/* Image with enhanced overlay */}
                      <div className="relative overflow-hidden rounded-t-3xl">
                        <img
                          src={fundraiser.image}
                          alt={fundraiser.title}
                          className="w-full h-48 object-cover rounded-t-3xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                          <span className="text-xs font-bold text-gray-800">{fundraiser.category}</span>
                        </div>
                        
                        {/* Urgency Badge */}
                        {fundraiser.daysLeft <= 7 && (
                          <div className="absolute top-4 right-4 bg-red-500 text-white rounded-full px-3 py-1 shadow-lg animate-pulse">
                            <span className="text-xs font-bold">URGENT</span>
                          </div>
                        )}
                        
 
                      </div>
                      
                      <CardContent className="p-6 space-y-4">
                        {/* Title and Organizer */}
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2 leading-tight">
                            {fundraiser.title}
                          </h3>
                          <p className="text-sm text-gray-600 font-medium">by {fundraiser.organizer}</p>
                        </div>

                        {/* Progress Info */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-gray-900">
                              {formatCurrency(fundraiser.raised)}
                            </span>
                            <span className="text-sm text-gray-600 font-medium">
                              raised of {formatCurrency(fundraiser.goal)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="h-full bg-gradient-to-r from-rose-500 to-pink-600 rounded-full transition-all duration-300"
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-rose-600 font-bold">{progressPercentage}% completed</span>
                            <span className="text-gray-600 font-medium">
                              {formatCurrency(fundraiser.goal - fundraiser.raised)} to go
                            </span>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4 text-rose-500" />
                            <span className="font-bold">{fundraiser.daysLeft}</span>
                            <span className="font-medium">days left</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="h-4 w-4 text-rose-500" />
                            <span className="font-bold">{fundraiser.supporters}</span>
                            <span className="font-medium">supporters</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                          <Button 
                            variant="outline" 
                            className="flex-1 border-2 border-gray-200 text-gray-700 hover:bg-gray-50 font-bold rounded-xl transition-all duration-300"
                          >
                            <Facebook className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                          <Button className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <Heart className="h-4 w-4 mr-2" />
                            Donate
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="-left-12 lg:-left-16 w-12 h-12 bg-white shadow-xl hover:shadow-2xl border-2 border-rose-100 hover:border-rose-300 text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-all duration-300 transform hover:scale-110" />
            <CarouselNext className="-right-12 lg:-right-16 w-12 h-12 bg-white shadow-xl hover:shadow-2xl border-2 border-rose-100 hover:border-rose-300 text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-all duration-300 transform hover:scale-110" />
          </Carousel>
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-6 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            View All Fundraisers
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingFundraisers;
