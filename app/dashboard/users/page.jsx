"use client";
import { useEffect, useState } from "react";
import { useUserStore } from "../../../store/userStore";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  TextField,
  TableContainer,
  Paper
} from "@mui/material";
import Link from "next/link";

const LIMIT = 10;

export default function Users() {
  const { users, total, page, fetchUsers } = useUserStore();
  const [search, setSearch] = useState("");

  const totalPages = Math.ceil(total / LIMIT);

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const handleSearch = () => {
    fetchUsers(1, search);
  };

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <TextField
          label="Search users"
          placeholder="Search users by email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: { xs: "1 1 100%", sm: "1 1 300px" } }}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSearch}>Search</button>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>
                  <Link className="text-blue-600 underline"  href={`/dashboard/users/${u.id}`}>
                    {u.firstName} {u.lastName}
                  </Link>
                </TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, p) => fetchUsers(p, search)}
          size="medium"
        />
      </Box>
    </Box>
  );
}
