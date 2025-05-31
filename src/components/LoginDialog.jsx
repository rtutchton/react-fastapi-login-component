// LoginDialog.js
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Tabs,
    Tab,
    Typography,
  } from "@mui/material";
  import { useState } from "react";
  import API from "../api";
  
  export default function LoginDialog({ open, onClose, onLoginSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("login");
    const [message, setMessage] = useState("");
  
    const handleAuth = async () => {
      try {
        const endpoint = mode === "login" ? "/login" : "/register";
        const res = await API.post(endpoint, { username, password });
        setMessage(res.data.message);
        if (mode === "login") {
          onLoginSuccess?.(res.data.username);
          onClose();
        }
      } catch (err) {
        setMessage(err.response?.data?.detail || "Something went wrong");
      }
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{mode === "login" ? "Login" : "Register"}</DialogTitle>
        <DialogContent>
          <Tabs value={mode} onChange={(e, val) => setMode(val)} centered>
            <Tab label="Login" value="login" />
            <Tab label="Register" value="register" />
          </Tabs>
          <TextField
            label="Username"
            fullWidth
            sx={{ mt: 2 }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            sx={{ mt: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography color="error" sx={{ mt: 1 }}>
            {message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAuth}>
            {mode === "login" ? "Login" : "Register"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  