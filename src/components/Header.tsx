
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, User, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import SignInModal from "@/components/SignInModal";
import StartFundraiserModal from "@/components/StartFundraiserModal";
import FundraiserCreationModal from "@/components/FundraiserCreationModal";
import UserProfile from "@/components/UserProfile";
import { useAuth } from "@/contexts/AuthContext";
import { Search } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isStartFundraiserModalOpen, setIsStartFundraiserModalOpen] = useState(false);
  const [isFundraiserCreationModalOpen, setIsFundraiserCreationModalOpen] = useState(false);
  const { isAuthenticated, user, signOut } = useAuth();

  const handleOpenSignIn = () => {
    setIsSignInModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleOpenStartFundraiser = () => {
    if (isAuthenticated) {
      setIsFundraiserCreationModalOpen(true);
    } else {
      setIsStartFundraiserModalOpen(true);
    }
    setIsMenuOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <div className="flex  items-center -space-x-2 group">
              <img 
                src="/lovable-uploads/6f963d4c-07e4-448f-9377-5fee8010d0fc.png" 
                alt="HopeHeal NGO Logo" 
                className="h-12 w-12 sm:h-16 sm:w-16 transition-transform group-hover:scale-105"
              />
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                HopeHeal
              </span>
            </div>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="space-x-2">
                <NavigationMenuItem>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-rose-50 hover:text-rose-600 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    About Us
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-rose-50 hover:text-rose-600 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-rose-50 data-[state=open]:text-rose-600">
                      Browse Fundraisers
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 bg-white border border-gray-200 shadow-xl rounded-lg p-2 z-50">
                      <DropdownMenuLabel className="text-sm font-semibold text-gray-900 px-2 py-1">
                        Medical & Health
                      </DropdownMenuLabel>
                      <DropdownMenuItem className="hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer rounded-md px-3 py-2">
                        Medical Treatment
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer rounded-md px-3 py-2">
                        Cancer Treatment
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer rounded-md px-3 py-2">
                        Accident & Emergency
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer rounded-md px-3 py-2">
                        Heart Surgery
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator className="my-2" />
                      
                      <DropdownMenuLabel className="text-sm font-semibold text-gray-900 px-2 py-1">
                        Education & Social
                      </DropdownMenuLabel>
                      <DropdownMenuItem className="hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer rounded-md px-3 py-2">
                        Education Support
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer rounded-md px-3 py-2">
                        Disaster Relief
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer rounded-md px-3 py-2">
                        Animal Welfare
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer rounded-md px-3 py-2">
                        Community Development
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator className="my-2" />
                      
                      <DropdownMenuItem className="hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer rounded-md px-3 py-2 font-medium">
                        View All Categories →
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-rose-50 hover:text-rose-600 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    How it Works
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated && user ? (
                <>
                  <Button 
                    className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium px-6"
                    onClick={handleOpenStartFundraiser}
                  >
                    Start Fundraiser
                  </Button>
                  <UserProfile user={user} onSignOut={handleSignOut} />
                </>
              ) : (
                <>
                  <Button 
                    className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium px-6"
                    onClick={handleOpenStartFundraiser}
                  >
                    Start Fundraiser
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleOpenSignIn}
                    className="border-2 border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 font-medium px-6 transition-all duration-200"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-lg hover:bg-gray-100 transition-colors active:bg-gray-200 touch-manipulation"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in bg-white">
              <div className="flex flex-col space-y-1">
                {/* Mobile Menu Items */}
                <div className="space-y-1 mb-4">
                  <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors font-medium block p-3 hover:bg-rose-50 rounded-lg">Fundraise For</a>
                  
                  <details className="group">
                    <summary className="flex justify-between items-center text-gray-700 hover:text-rose-500 transition-colors cursor-pointer font-medium p-3 hover:bg-rose-50 rounded-lg touch-manipulation">
                      Browse Fundraisers
                      <svg className="h-5 w-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="mt-2 ml-4 space-y-2 pb-2">
                      <div className="mb-3">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Medical & Health</h4>
                        <a href="#" className="block text-sm text-gray-600 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-md">Medical Treatment</a>
                        <a href="#" className="block text-sm text-gray-600 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-md">Cancer Treatment</a>
                        <a href="#" className="block text-sm text-gray-600 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-md">Accident & Emergency</a>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Education & Social</h4>
                        <a href="#" className="block text-sm text-gray-600 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-md">Education Support</a>
                        <a href="#" className="block text-sm text-gray-600 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-md">Disaster Relief</a>
                        <a href="#" className="block text-sm text-gray-600 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-md">Animal Welfare</a>
                      </div>
                    </div>
                  </details>
                  
                  <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors font-medium block p-3 hover:bg-rose-50 rounded-lg">How it Works</a>
                  
                  
                </div>
                
                {/* Mobile Action Buttons */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
                  {isAuthenticated && user ? (
                    <>
                      <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <Button 
                        size="lg"
                        className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 font-medium w-full h-12 text-base"
                        onClick={handleOpenStartFundraiser}
                      >
                        Start Fundraiser
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        onClick={handleSignOut}
                        className="border-2 border-red-200 text-red-600 hover:bg-red-50 font-medium w-full h-12 text-base"
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        size="lg"
                        className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 font-medium w-full h-12 text-base"
                        onClick={handleOpenStartFundraiser}
                      >
                        Start Fundraiser
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        onClick={handleOpenSignIn}
                        className="border-2 border-rose-200 text-rose-600 hover:bg-rose-50 font-medium w-full h-12 text-base"
                      >
                        <User className="h-5 w-5 mr-2" />
                        Sign In
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Sign In Modal */}
      <SignInModal 
        open={isSignInModalOpen} 
        onOpenChange={setIsSignInModalOpen}
        onOpenStartFundraiser={handleOpenStartFundraiser}
      />

      {/* Start Fundraiser Modal - for non-authenticated users */}
      <StartFundraiserModal 
        open={isStartFundraiserModalOpen} 
        onOpenChange={setIsStartFundraiserModalOpen}
        onOpenSignIn={handleOpenSignIn}
      />

      {/* Fundraiser Creation Modal - for authenticated users */}
      <FundraiserCreationModal 
        open={isFundraiserCreationModalOpen} 
        onOpenChange={setIsFundraiserCreationModalOpen} 
      />
    </>
  );
};

export default Header;
