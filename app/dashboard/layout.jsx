"use client";
import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // Map routes to tab index
  const routeToTab = {
    "/dashboard/users": 0,
    "/dashboard/products": 1,

  };

  const tabToRoute = {
    0: "/dashboard/users",
    1: "/dashboard/products",
  };

  let currentTab = 0;

  if (pathname.startsWith("/dashboard/products")) {
    currentTab = 1;
  } else if (pathname.startsWith("/dashboard/users")) {
    currentTab = 0;
  }

  const handleChange = (event, newValue) => {
    router.push(tabToRoute[newValue]);
  };

  return (
    <SessionProvider>
      <Box sx={{ width: "100%" }}>
        <AppBar position="static">
          <Tabs
            value={currentTab}
            onChange={handleChange}
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                fontWeight: "bold",
                color: "black", // passive tab
              },
              "& .Mui-selected": {
                color: "white !important", // active tab
                fontWeight: "bold",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "white", // underline for active tab
              },
            }}
          >
            <Tab label="Users" />
            <Tab label="Products" />
          </Tabs>

        </AppBar>

        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
    </SessionProvider>
  );
}
