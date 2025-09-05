import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      // Optionally fetch user profile
      signIn({ token });
      navigate("/");
    }
  }, [navigate, signIn]);

  return <div>Signing in with Google...</div>;
};

export default GoogleCallback;
