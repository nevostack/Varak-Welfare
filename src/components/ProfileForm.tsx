import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

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
    pan_details?: string;
    gender?: "MALE" | "FEMALE" | "OTHER";
    date_of_birth?: Date;
    occupation?: "SALARIED" | "UNEMPLOYED" | "STUDENT";
    education?: "HIGH_SCHOOL" | "BACHELORS" | "MASTERS";
    address?: string;
  };
}

export function ProfileForm({ data }: ProfileFormProps) {
  const { toast } = useToast();
  const token = localStorage.getItem("token");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_name: data.user_name || "",
      user_email: data.user_email || "",
      user_mobile: data.user_mobile || "",
      pan_details: data.pan_details || "",
      gender: data.gender || "MALE",
      date_of_birth: data.date_of_birth || new Date(),
      education: data.education || "HIGH_SCHOOL",
      occupation: data.occupation || "SALARIED",
      address: data.address || "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        user_name: data.user_name || "",
        user_email: data.user_email || "",
        user_mobile: data.user_mobile || "",
        pan_details: data.pan_details || "",
        gender: data.gender || "MALE",
        date_of_birth: data.date_of_birth || new Date(),
        education: data.education || "HIGH_SCHOOL",
        occupation: data.occupation || "SALARIED",
        address: data.address || "",
      });
    }
  }, [data, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch(`${API_BASE_URL}/user/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(values)
    })
    const result = await res.json();
    if(!result.success) {
      toast({
        variant: "destructive",
        title: "Couldn't Update User",
        description: result.error
      })
    }
    toast({
      variant: "default",
      title: "User Updated"
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          Update Password{" "}
          <span className="text-blue-500 text-sm">
            <a href="">Reset</a>
          </span>
        </p>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
