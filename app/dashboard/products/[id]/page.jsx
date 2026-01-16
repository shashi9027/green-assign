"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button, CardMedia } from "@mui/material";
import Link from "next/link";

export default function ProductDetail({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <Box sx={{ p: 3 }}>
      <Link href="/dashboard/products">
        <Button variant="outlined">Back to Products</Button>
      </Link>

      <Typography variant="h4" sx={{ mt: 2 }}>{product.title}</Typography>

      <CardMedia
        component="img"
        height="300"
        image={product.thumbnail}
        sx={{ mt: 2 }}
      />

      <Typography sx={{ mt: 2 }}>{product.description}</Typography>

      <Typography sx={{ mt: 2 }}>Price: ₹ {product.price}</Typography>
      <Typography>Rating: ⭐ {product.rating}</Typography>
      <Typography>Category: {product.category}</Typography>
      <Typography>Stock: {product.stock}</Typography>
    </Box>
  );
}
