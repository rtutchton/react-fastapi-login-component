import React, { useState } from "react";
import LoginDialog from "./components/LoginDialog";
import {
  Typography,
  ThemeProvider,
  CssBaseline,
  Container,
  Button,
  Box,
  MenuItem,
  InputLabel,
  Select,
  createTheme
} from "@mui/material";

function App() {
  const [openLogin, setOpenLogin] = useState(false);
  const [message, setMessage] = useState("");

  const handleLoginSuccess = () => {
    setMessage("Logged in successfully");
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        {/* Navbar */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ py: 2 }}
        >
          <Typography variant="h5">🌸 My App</Typography>
          <Box display="flex" alignItems="center" gap={2}>
          </Box>
        </Box>

        {/* Main Content */}
        <Box display="flex" flexDirection="column" alignItems="center" py={6}>
          <Typography variant="h4" gutterBottom>
            Welcome
          </Typography>
          <Button variant="outlined" onClick={() => setOpenLogin(true)}>
            Login
          </Button>
            <LoginDialog
            open={openLogin}
            onClose={() => setOpenLogin(false)}
            onLoginSuccess={handleLoginSuccess}
            />
          <Typography sx={{ mt: 2 }}>{message}</Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;


