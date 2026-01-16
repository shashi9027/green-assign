"use client";

import { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useAuthStore } from "../../store/authStore";

function SyncAuth() {
  const { data: session, status } = useSession();
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    if (status === "authenticated") {
      setAuth(session);        
    } else if (status === "unauthenticated") {
      clearAuth();
    }
  }, [status, session, setAuth, clearAuth]);

  return null;
}

export default function AuthProvider({ children }) {
  return (
    <SessionProvider>
      <SyncAuth />
      {children}
    </SessionProvider>
  );
}
