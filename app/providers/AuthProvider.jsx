"use client";

import { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useAuthStore } from "../../store/authStore";

function SyncAuth() {
  const { data: session } = useSession();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    if (session?.user && session?.accessToken) {
      setAuth(session.user, session.accessToken);
    }
  }, [session, setAuth]);

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
