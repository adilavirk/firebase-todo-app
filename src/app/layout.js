// RootLayout.js
import "@/app/style/globals.css";
import { AuthUserProvider } from "./(firebase)/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthUserProvider>
          <ToastContainer />
          {children}
        </AuthUserProvider>
      </body>
    </html>
  );
}
