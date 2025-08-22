import Header from "@/components/Header";
import { ProfileForm } from "@/components/ProfileForm";
import React, { useEffect, useState } from "react";
import { userApi } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

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

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
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
  return (
    <>
      <Header />
      <section className="container mx-auto px-80 py-8">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        <ProfileForm data={userData?.user ?? {}} />
      </section>
    </>
  );
};

export default Profile;
