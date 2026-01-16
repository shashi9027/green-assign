"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function UserDetail({ params }) {
  const { id } = params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/users/${id}`)
      .then(res => setUser(res.data));
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <Box sx={{ p: 3 }}>
      <Link href="/dashboard/users">
        <Button variant="outlined">Back to Users</Button>
      </Link>

      <Typography variant="h4" sx={{ mt: 2 }}>
        {user.firstName} {user.lastName}
      </Typography>

      <Typography>Email: {user.email}</Typography>
      <Typography>Phone: {user.phone}</Typography>
      <Typography>Gender: {user.gender}</Typography>
      <Typography>Company: {user.company.name}</Typography>
      <Typography>Department: {user.company.department}</Typography>
      <Typography>Title: {user.company.title}</Typography>
    </Box>
  );
}
