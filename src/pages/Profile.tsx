import Header from "@/components/Header";
import { ProfileForm } from "@/components/ProfileForm";
import React from "react";

const Profile = () => {
  return (
    <>
      <Header />
      <section className="container mx-auto px-80 py-8">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        <ProfileForm />
      </section>
    </>
  );
};

export default Profile;
