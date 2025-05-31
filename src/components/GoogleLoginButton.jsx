// GoogleLoginButton.js
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; 
import axios from "axios";
import { Button } from "@mui/material";

export default function GoogleLoginButton({ onLoginSuccess }) {
  const handleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const user = jwtDecode(token);
      console.log("Decoded Google user:", user);

      // Optional: send token to your backend for verification or registration
      const res = await axios.post("http://localhost:8000/auth/google", {
        token,
      });

      onLoginSuccess?.(res.data); // pass user info to parent
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleLogin}
      onError={() => console.error("Google login error")}
    />
  );
}
