import MuiProvider from "../components/theme";
import AuthProvider from "./providers/AuthProvider";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MuiProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </MuiProvider>
      </body>
    </html>
  );
}
