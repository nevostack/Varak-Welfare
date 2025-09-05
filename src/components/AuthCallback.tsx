import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Adjust path as needed

export default function AuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      // Get token from URL parameters
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
        // Store token in localStorage
        localStorage.setItem("token", token);

        // Update auth context
        login({ token }); // Assuming User type has a 'token' property

        // Redirect to home page or dashboard
        navigate("/");
      } else {
        // Handle error case
        navigate("/login?error=no_token");
      }
    };

    handleCallback();
  }, [login, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Authenticating...</h2>
        <p className="mt-2">Please wait while we complete your sign-in process.</p>
      </div>
    </div>
  );
}
