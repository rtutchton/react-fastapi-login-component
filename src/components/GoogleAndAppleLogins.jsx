// GoogleAndAppleLoginButtons.js
import { GoogleLogin } from "@react-oauth/google";
import AppleLogin from "react-apple-login";
import { Box, IconButton } from "@mui/material";
import { jwtDecode } from "jwt-decode";

export default function GoogleAndAppleLoginButtons({ onLoginSuccess }) {
  const handleGoogleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const user = jwtDecode(token);
    console.log("Google user:", user);

    // Optional backend call:
    fetch("http://localhost:8000/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => onLoginSuccess?.(data));
  };

  const handleAppleSuccess = (response) => {
    const token = response.authorization?.id_token;
    if (!token) return;

    fetch("http://localhost:8000/auth/apple", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => onLoginSuccess?.(data));
  };

  const AppleLogo = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 848 1000"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: 8 }}
    >
      <path d="M747 527c-6-113 93-166 97-169-53-78-134-88-162-89-69-7-135 41-170 41s-89-40-146-39c-75 1-144 44-182 111-78 134-20 332 56 441 37 54 81 114 139 112 55-2 76-36 142-36s84 36 142 35c59-1 96-56 132-111 42-61 59-120 60-123-1-1-115-44-117-174zM585 163c32-39 54-93 48-147-46 2-101 31-134 70-29 33-55 86-48 137 51 4 103-26 134-60z" />
    </svg>
  );

  return (
    <Box display="flex" gap={2} justifyContent="center" mt={2}>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => console.error("Google Login Failed")}
        useOneTap={false}
        render={(renderProps) => (
          <IconButton
            onClick={renderProps.onClick}
            sx={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              width: 48,
              height: 48,
              borderRadius: "50%",
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
              width="24"
              height="24"
            />
          </IconButton>
        )}
      />
      <AppleLogin
        clientId="com.your.bundle.id"
        redirectURI="https://yourdomain.com/auth/apple/callback"
        responseType="code id_token"
        responseMode="fragment"
        usePopup={true}
        callback={handleAppleSuccess}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            style={{
              width: 240,
              height: 40,
              borderRadius: 4,
              backgroundColor: "black",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
            }}
          > 
          <AppleLogo/>
          Sign in with Apple
          </button>
        )}
      />
    </Box>
  );
}
