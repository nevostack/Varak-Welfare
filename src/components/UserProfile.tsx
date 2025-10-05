import { useEffect, useState } from "react";
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
import { useAuth } from "@/contexts/AuthContext";

interface UserProfileProps {
  onSignOut: () => void;
}

// Updated User type to include all fields we need
interface UserType {
  user_id?: string;
  user_name?: string;
  user_email?: string;
  user_mobile?: string;
  user_avatar?: string;
  pan_details?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  date_of_birth?: Date;
  occupation?: "SALARIED" | "UNEMPLOYED" | "STUDENT";
  education?: "HIGH_SCHOOL" | "BACHELORS" | "MASTERS";
  address?: string;
}

type UserData = {
  success: boolean;
  user: UserType;
};

// Define a more flexible type for auth user to handle different structures
type AuthUserType = {
  success?: boolean;
  message?: string;
  token?: string;
  user?: UserType;
  user_avatar?: string;
  user_name?: string;
  user_email?: string;
  user_mobile?: string;
  [key: string]: any; // Allow for other potential properties
};

export function UserProfile({ onSignOut }: UserProfileProps) {
  const { toast } = useToast();
  const { user: authUser, isAuthenticated } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  
  // Add a key to force re-render when authUser changes
  const [avatarKey, setAvatarKey] = useState(0);

  useEffect(() => {
    // Update the key when authUser changes, forcing a re-render
    setAvatarKey(prevKey => prevKey + 1);
    
    // If we have fresh data from the auth context, update userData
    if (authUser) {
      setUserData(prev => ({
        success: prev?.success ?? true,
        user: {
          ...prev?.user,
          user_avatar: authUser.user_avatar || (authUser.user && authUser.user.user_avatar)
        }
      }));
    }
  }, [authUser]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
    
    const getUserData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/me`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          console.log("User data from API:", data);
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    getUserData();
  }, []);

  // Determine which avatar to use - prioritize from userData (API call), then fall back to authUser
  const getAvatarUrl = () => {
    // First check userData from API
    if (userData?.user?.user_avatar) {
      // If URL starts with http, return as is; otherwise assume base64
      const avatarUrl = userData.user.user_avatar;
      console.log("Using userData avatar:", avatarUrl);
      return avatarUrl;
    }
    
    // Then check authUser directly
    if (authUser?.user_avatar) {
      const avatarUrl = authUser.user_avatar;
      console.log("Using authUser avatar:", avatarUrl);
      return avatarUrl;
    }
    
    // Check if authUser.user exists and has avatar
    if (authUser?.user?.user_avatar) {
      const avatarUrl = authUser.user.user_avatar;
      console.log("Using authUser.user avatar:", avatarUrl);
      return avatarUrl;
    }
    
    return '';
  };

  // Similar function for user name
  const getUserName = () => {
    if (userData?.user?.user_name) {
      return userData.user.user_name;
    }
    
    if (authUser?.user_name) {
      return authUser.user_name;
    }
    
    if (authUser?.user?.user_name) {
      return authUser.user.user_name;
    }
    
    return '';
  };

  // Similar function for user email
  const getUserEmail = () => {
    if (userData?.user?.user_email) {
      return userData.user.user_email;
    }
    
    if (authUser?.user_email) {
      return authUser.user_email;
    }
    
    if (authUser?.user?.user_email) {
      return authUser.user.user_email;
    }
    
    return '';
  };

  const handleSignOut = () => {
    onSignOut();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
  };

  // Define these handler functions that are referenced but not implemented
  const handleMyFundraisersClick = () => {
    toast({
      title: "My Fundraisers",
      description: "View your fundraising campaigns",
    });
  };

  const handleDonationsClick = () => {
    toast({
      title: "My Donations",
      description: "View your donation history",
    });
  };

  const handleSettingsClick = () => {
    toast({
      title: "Settings",
      description: "Account settings and preferences",
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

  // Debug output
  useEffect(() => {
    console.log("Auth user:", authUser);
    console.log("User data:", userData);
    console.log("Avatar URL:", getAvatarUrl());
  }, [authUser, userData]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-rose-50">
          <Avatar className="h-10 w-10 border-2 border-rose-200">
            <AvatarImage 
              key={avatarKey} // Add this key to force re-render
              src={getAvatarUrl()} 
              alt={getUserName()} 
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              onError={(e) => {
                console.error("Error loading avatar:", e);
                // Fallback to initials on error
                e.currentTarget.style.display = 'none';
              }}
            />
            <AvatarFallback className="bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium">
              {getInitials(getUserName())}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      {/* Rest of the component remains unchanged */}
      <DropdownMenuContent className="w-64 bg-white border border-gray-200 shadow-xl rounded-lg p-2 z-50" align="end">
        {/* User Info */}
        <DropdownMenuLabel className="px-3 py-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-gray-900">{getUserName()}</p>
            <p className="text-xs text-gray-500">{getUserEmail()}</p>
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
}

export default UserProfile;