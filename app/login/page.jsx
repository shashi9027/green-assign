"use client";
import { signIn } from "next-auth/react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Router } from "next/router";

export default function Login() {
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

  const res =  await signIn("credentials", {
      username: form.get("username"),
      password: form.get("password"),
      callbackUrl: "/dashboard",
    });
    if (res?.error) { 
      console.log()
    } 
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Admin Login</Typography>

      <form onSubmit={handleLogin}>
        <TextField fullWidth name="username" label="Username" />
        <TextField fullWidth name="password" type="password" label="Password" sx={{ mt: 2 }} />
        <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Box>
  );
}
