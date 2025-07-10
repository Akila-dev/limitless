import "./globals.css";

import { Logo } from "@/components";

export const metadata = {
  title: "Limitless",
  description: "Official Limitless Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
        <Logo />
      </body>
    </html>
  );
}
