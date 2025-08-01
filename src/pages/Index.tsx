
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrendingFundraisers from "@/components/TrendingFundraisers";
import StartFundraiser from "@/components/StartFundraiser";
import Causes from "@/components/Causes";
import WhySection from "@/components/WhySection";
import SuccessStories from "@/components/SuccessStories";
// import FeaturedIn from "@/components/FeaturedIn";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden main-content">
      <Header />
      <HeroSection />
      <TrendingFundraisers />
      <StartFundraiser />
      <Causes />
      <WhySection />
      <SuccessStories />
      {/* <FeaturedIn /> */}
      <Footer />
    </div>
  );
};

export default Index;
