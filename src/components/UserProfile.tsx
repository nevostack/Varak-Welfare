
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, Settings, Heart, LogOut, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link, redirect } from 'react-router-dom';
import {useEffect} from 'react'
import { useAuth } from "@/contexts/AuthContext";

interface UserProfileProps {
  // avatar?: string
  onSignOut: () => void;
}

type UserData = {
  success: boolean;
  user: {
    user_name?: string;
    user_email?: string;
    user_mobile?: string;
    user_password?: string;
    pan_details?: string;
    gender?: "MALE" | "FEMALE" | "OTHER";
    date_of_birth?: Date;
    occupation?: "SALARIED" | "UNEMPLOYED" | "STUDENT";
    education?: "HIGH_SCHOOL" | "BACHELORS" | "MASTERS";
    address?: string;
  };
};


const UserProfile = ({ onSignOut }: UserProfileProps) => {
  const { toast } = useToast();
  const [user, setUserData] = useState<UserData | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const API_BASE_URL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
    const getUserData = async () => {
      const user = await fetch(`${API_BASE_URL}/user/me`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await user.json();
      setUserData(data);
    };
    getUserData();
  }, []);

  const handleSignOut = () => {
    onSignOut();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
  };
  const handleMyProfileClick = () => {
    redirect('/profile');
  };

  const handleMyFundraisersClick = () => {
    toast({
      title: "My Fundraisers",
      description: "View and manage your fundraising campaigns.",
    });
  };

  const handleDonationsClick = () => {
    toast({
      title: "My Donations",
      description: "View your donation history and impact.",
    });
  };

  const handleSettingsClick = () => {
    toast({
      title: "Settings",
      description: "Account settings coming soon!",
    });
  };

  // Get user initials for avatar fallback
  const getInitials = (user_name?: string) => {
    return user_name
      ? user_name
          .split(' ')
          .map(word => word[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : '';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-rose-50">
          <Avatar className="h-10 w-10 border-2 border-rose-200">
            <AvatarImage src={''} alt={user?.user.user_name} />
            <AvatarFallback className="bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium">
              {getInitials(user?.user.user_name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-64 bg-white border border-gray-200 shadow-xl rounded-lg p-2 z-50" align="end">
        {/* User Info */}
        <DropdownMenuLabel className="px-3 py-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-gray-900">{user?.user?.user_name}</p>
            <p className="text-xs text-gray-500">{user?.user?.user_email}</p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="my-2" />
        
        {/* Profile Actions */}
        <DropdownMenuItem 

          className="hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer rounded-md px-3 py-2 flex items-center gap-3"
        >
          <User className="h-4 w-4" />
          <span><Link to="/profile">My Profile</Link></span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={handleMyFundraisersClick}
          className="hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer rounded-md px-3 py-2 flex items-center gap-3"
        >
          <Heart className="h-4 w-4" />
          <span>My Fundraisers</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={handleDonationsClick}
          className="hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer rounded-md px-3 py-2 flex items-center gap-3"
        >
          <DollarSign className="h-4 w-4" />
          <span>My Donations</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={handleSettingsClick}
          className="hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer rounded-md px-3 py-2 flex items-center gap-3"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="my-2" />
        
        {/* Sign Out */}
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer rounded-md px-3 py-2 flex items-center gap-3 text-red-600"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;

