import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Add more imports as needed for the Avatar component
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Camera } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import EmailVerificationModal from "./EmailVerificationModal";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  user_name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  user_email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  user_avatar: z.string().optional(),
  user_mobile: z
    .string()
    .min(10)
    .max(15)
    .regex(/^[0-9]+$/, {
      message: "Please enter a valid mobile number.",
    }),
  pan_details: z.string().max(10, {
    message: "PAN Number should be maximum 10 characters.",
  }),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  date_of_birth: z.date(),
  education: z.enum(["HIGH_SCHOOL", "BACHELORS", "MASTERS"]),
  occupation: z.enum(["SALARIED", "UNEMPLOYED", "STUDENT"]),
  address: z.string().min(2).max(100, {
    message: "Please enter a valid address.",
  }),
});

interface ProfileFormProps {
  data: {
    user_name?: string;
    user_email?: string;
    user_mobile?: string;
    user_password?: string;
    user_avatar?: string;
    pan_details?: string;
    gender?: "MALE" | "FEMALE" | "OTHER";
    date_of_birth?: Date;
    occupation?: "SALARIED" | "UNEMPLOYED" | "STUDENT";
    education?: "HIGH_SCHOOL" | "BACHELORS" | "MASTERS";
    address?: string;
  };
}

// Helper function to compress images
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        // Set maximum dimensions
        const MAX_WIDTH = 500;
        const MAX_HEIGHT = 500;
        
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = height * (MAX_WIDTH / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = width * (MAX_HEIGHT / height);
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Get compressed image as base64 string with reduced quality
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); // 0.7 quality (70%)
        resolve(compressedBase64);
      };
      img.onerror = (error) => {
        reject(error);
      };
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export function ProfileForm({ data }: ProfileFormProps) {
  const { toast } = useToast();
  const token = localStorage.getItem("token");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
  const [avatarPreview, setAvatarPreview] = useState<string | null>(data?.user_avatar || null);
  const { updateUser } = useAuth(); // Add this line to get the updateUser function
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_name: data?.user_name || "",
      user_email: data?.user_email || "",
      user_mobile: data?.user_mobile || "",
      user_avatar: data?.user_avatar || "",
      pan_details: data?.pan_details || "",
      gender: data?.gender || "MALE",
      date_of_birth: data?.date_of_birth 
        ? (typeof data.date_of_birth === 'string' 
           ? new Date(data.date_of_birth) 
           : data.date_of_birth) 
        : new Date(),
      education: data?.education || "HIGH_SCHOOL",
      occupation: data?.occupation || "SALARIED",
      address: data?.address || "",
    },
  });

  // Handle file upload and convert to base64
  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (limit to 5MB for original file)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Profile picture must be less than 5MB"
        });
        return;
      }

      try {
        // Compress the image
        const compressedBase64 = await compressImage(file);
        
        setAvatarPreview(compressedBase64);
        form.setValue("user_avatar", compressedBase64);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error processing image",
          description: "Failed to process the image. Please try another."
        });
      }
    }
  };

  useEffect(() => {
    if (data) {
      form.reset({
        user_name: data.user_name || "",
        user_email: data.user_email || "",
        user_mobile: data.user_mobile || "",
        user_avatar: data.user_avatar || "",
        pan_details: data.pan_details || "",
        gender: data.gender || "MALE",
        // Convert string date to Date object if it's a string
        date_of_birth: data.date_of_birth 
          ? (typeof data.date_of_birth === 'string' 
             ? new Date(data.date_of_birth) 
             : data.date_of_birth) 
          : new Date(),
        education: data.education || "HIGH_SCHOOL",
        occupation: data.occupation || "SALARIED",
        address: data.address || "",
      });
      
      // Set avatar preview from data
      if (data.user_avatar) {
        setAvatarPreview(data.user_avatar);
      }
    }
  }, [data, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch(`${API_BASE_URL}/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(values)
      });
      
      const result = await res.json();
      
      if (!result.success) {
        toast({
          variant: "destructive",
          title: "Couldn't Update User",
          description: result.error || "An error occurred while updating your profile"
        });
        return;
      }
      
      // Update the auth context with the new user data including the avatar
      updateUser({ 
        ...result.data,
        user_avatar: values.user_avatar 
      });
      
      toast({
        variant: "default",
        title: "Profile Updated",
        description: "Your profile has been updated successfully"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "There was a problem connecting to the server"
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Add Avatar Upload Component */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative group">
            <Avatar className="h-24 w-24 border-2 border-rose-200">
              <AvatarImage src={avatarPreview || ""} alt={data.user_name} />
              <AvatarFallback className="bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xl font-medium">
                {data.user_name?.split(" ").map(name => name[0]).join("").toUpperCase().slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <label 
              htmlFor="avatar-upload" 
              className="absolute bottom-0 right-0 bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-full cursor-pointer shadow-md transition-colors"
            >
              <Camera className="h-4 w-4" />
              <input 
                id="avatar-upload" 
                type="file" 
                accept="image/jpeg, image/png, image/gif" 
                className="hidden" 
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <FormDescription className="mt-2 text-center">
            Upload a profile picture (max 1MB)
          </FormDescription>
          <FormField
            control={form.control}
            name="user_avatar"
            render={() => <></>}
          />
        </div>
        <FormField
          control={form.control}
          name="user_name"
          defaultValue={data.user_name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user_mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input placeholder="+91 xxxxx xxxxx" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pan_details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pan Details</FormLabel>
              <FormControl>
                <Input placeholder="HDxxxxxxxx" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Gender</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <h1 className="text-2xl font-bold mb-6">Other Details</h1>
        <FormField
          control={form.control}
          name="education"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Education</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your education" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="HIGH_SCHOOL">High School</SelectItem>
                  <SelectItem value="BACHELORS">Bachelor's</SelectItem>
                  <SelectItem value="MASTERS">Master's</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Occupation</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your occupation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="SALARIED">Salaried</SelectItem>
                  <SelectItem value="UNEMPLOYED">Unemployed</SelectItem>
                  <SelectItem value="STUDENT">Student</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your address"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="mt-4 text-sm">
          <a href="/">
          Update Password
          </a>
        </p>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
