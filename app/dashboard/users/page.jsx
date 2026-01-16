"use client";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import {
  Box, Table, TableHead, TableRow, TableCell,
  TableBody, Pagination, TextField
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
    <Box sx={{ p: 3 }}>
      <TextField
        label="Search users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <Table sx={{ mt: 2 }}>
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
                <Link href={`/dashboard/users/${u.id}`}>
                  {u.firstName} {u.lastName}
                </Link>
              </TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, p) => fetchUsers(p, search)}
        />
      </Box>
    </Box>
  );
}
