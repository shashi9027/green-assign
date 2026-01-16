"use client";
import { useEffect, useState, useCallback } from "react";
import { useProductStore } from "@/store/productStore";
import {
  Box, Grid, Card, CardContent, CardMedia,
  TextField, MenuItem, Select, Pagination, Typography
} from "@mui/material";
import Link from "next/link";

const LIMIT = 10;

const CATEGORIES = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
];

export default function Products() {
  const { products, total, page, fetchProducts } = useProductStore();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const totalPages = Math.ceil(total / LIMIT);

  useEffect(() => {
    fetchProducts(1, search, category);
  }, []);

  const handleSearch = useCallback(() => {
    fetchProducts(1, search, category);
  }, [search, category]);

  const handlePageChange = (event, newPage) => {
    fetchProducts(newPage, search, category);
  };

  return (
    <Box sx={{ p: 3 }}>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          value={category}
          displayEmpty
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="">All Categories</MenuItem>
          {CATEGORIES.map((c) => (
            <MenuItem key={c} value={c}>{c}</MenuItem>
          ))}
        </Select>

        <button onClick={handleSearch}>Apply</button>
      </Box>

      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid item xs={12} sm={6} md={3} key={p.id}>
            <Card>
              <Link href={`/dashboard/products/${p.id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={p.thumbnail}
                />
              </Link>
              <CardContent>
                <Typography variant="h6">{p.title}</Typography>
                <Typography>₹ {p.price}</Typography>
                <Typography>⭐ {p.rating}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
