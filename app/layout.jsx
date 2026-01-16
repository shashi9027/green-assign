
import MuiProvider from "../lib/Theme";
import AuthProvider from "./providers/AuthProvider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#f3f4f6" }} className="min-h-screen">
        <MuiProvider>
          <AuthProvider>
        
            {children}
          </AuthProvider>
        </MuiProvider>
      </body>
    </html>
  );
}
