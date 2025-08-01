
import { 
  Heart, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Shield,
  Award,
  Users,
  Globe,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Company Info - Enhanced */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo and Brand */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
                    Varak
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Empowering communities through compassionate crowdfunding. Together, we transform lives and create lasting change across India.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-2xl font-bold text-rose-400">5.5M+</div>
                  <div className="text-gray-400 text-sm">Trusted Users</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-2xl font-bold text-rose-400">₹100Cr+</div>
                  <div className="text-gray-400 text-sm">Funds Raised</div>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Connect With Us</h4>
                <div className="flex space-x-3">
                  {[
                    { icon: Facebook, href: "#", label: "Facebook" },
                    { icon: Twitter, href: "#", label: "Twitter" },
                    { icon: Instagram, href: "#", label: "Instagram" },
                    { icon: Linkedin, href: "#", label: "LinkedIn" },
                    { icon: Youtube, href: "#", label: "YouTube" }
                  ].map(({ icon: Icon, href, label }) => (
                    <a 
                      key={label}
                      href={href} 
                      className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-rose-500 transition-all duration-300 group border border-white/20"
                      aria-label={label}
                    >
                      <Icon className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-400" />
              Causes We Support
            </h3>
            <ul className="space-y-3">
              {[
                "Medical Treatment",
                "Cancer Care",
                "Heart Surgery", 
                "Child Education",
                "Emergency Relief",
                "Elderly Care",
                "Disaster Recovery"
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors text-sm flex items-center gap-2 group">
                    <ChevronRight className="h-3 w-3 text-gray-500 group-hover:text-rose-400 transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* How It Works */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Users className="h-4 w-4 text-rose-400" />
              Platform
            </h3>
            <ul className="space-y-3">
              {[
                "Start a Fundraiser",
                "Browse Campaigns",
                "Success Stories",
                "Fundraising Tips",
                "How It Works",
                "Withdraw Funds",
                "Corporate Partners"
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors text-sm flex items-center gap-2 group">
                    <ChevronRight className="h-3 w-3 text-gray-500 group-hover:text-rose-400 transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* About & Support */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Shield className="h-4 w-4 text-rose-400" />
              Support & Trust
            </h3>
            <ul className="space-y-3">
              {[
                "Help Center",
                "Trust & Safety",
                "Contact Support",
                                    "About Varak",
                "Team & Careers",
                "Media Coverage",
                "Blog & Resources"
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors text-sm flex items-center gap-2 group">
                    <ChevronRight className="h-3 w-3 text-gray-500 group-hover:text-rose-400 transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Compact Contact */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Globe className="h-4 w-4 text-rose-400" />
              Contact Us
            </h3>
            
            <div className="space-y-4">
              {/* Main Contact */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-rose-400 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">hello@varak.org</div>
                    <div className="text-gray-400 text-xs">General Inquiries</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-rose-400 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">+91 9876543210</div>
                    <div className="text-gray-400 text-xs">24/7 Support Available</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-medium">Mumbai, India</div>
                    <div className="text-gray-400 text-xs">Serving Pan-India</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-4 border-t border-white/10">
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-2 text-sm text-gray-300 hover:text-rose-400 transition-colors">
                    <ExternalLink className="h-3 w-3" />
                    Press Inquiries
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-gray-300 hover:text-rose-400 transition-colors">
                    <ExternalLink className="h-3 w-3" />
                    Help Center
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-gray-300 hover:text-rose-400 transition-colors">
                    <ExternalLink className="h-3 w-3" />
                    Report Issue
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Payment Methods Section */}
        <motion.div 
          className="mt-16 pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center justify-center gap-2">
              <Shield className="h-5 w-5 text-rose-400" />
              Secure Payment Methods
            </h3>
            <p className="text-gray-400 text-sm">
              Your donations are protected with bank-level security and 256-bit SSL encryption
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            {/* Payment Logos */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 w-16 object-contain" />
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png" alt="MasterCard" className="h-6 w-16 object-contain" />
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" alt="UPI" className="h-6 w-16 object-contain" />
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <span className="text-blue-300 font-bold text-sm">NET BANKING</span>
            </div>
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg px-4 py-3 border border-rose-400 hover:from-rose-600 hover:to-pink-700 transition-all duration-300">
              <span className="text-white font-bold text-sm flex items-center gap-2">
                <Shield className="h-4 w-4" />
                100% Secure
              </span>
            </div>
          </div>

          {/* Security Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-sm text-gray-300">SSL Secured</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
              <Award className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-gray-300">PCI Compliant</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
              <Users className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-gray-300">Trusted by 5.5M+</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Bottom Footer */}
      <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center items-center gap-3 text-sm">
              {[
                "Terms of Service",
                "Privacy Policy", 
                "Cookie Policy",
                "Refund Policy",
                "Anti-Money Laundering"
              ].map((link, index) => (
                <div key={link} className="flex items-center gap-3">
                  {index > 0 && <span className="w-1 h-1 bg-gray-500 rounded-full"></span>}
                  <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors">
                    {link}
                  </a>
                </div>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">
                Copyright © 2025 <span className="text-rose-400 font-semibold">Varak</span> Online Ventures Pvt Ltd. All Rights Reserved.
              </p>
              <p className="text-xs text-gray-500 max-w-4xl mx-auto leading-relaxed">
                Varak is a registered online crowdfunding platform facilitating secure donations for medical, educational, and social causes. 
                We connect generous donors with verified campaigns to create meaningful impact across India. 
                All transactions are secured and monitored for transparency and donor protection.
              </p>
            </div>

            {/* Final CTA */}
            <div className="text-center pt-6 border-t border-white/5">
              {/* <p className="text-gray-400 text-sm mb-4">
                Made with <Heart className="inline h-4 w-4 text-rose-400 mx-1" /> to transform lives through compassionate giving
              </p> */}
              <div className="flex justify-center gap-4">
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105"
                >
                  <Heart className="h-4 w-4" />
                  Start Fundraising
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300"
                >
                  <ExternalLink className="h-4 w-4" />
                  Browse Campaigns
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
