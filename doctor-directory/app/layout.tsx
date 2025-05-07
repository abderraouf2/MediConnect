// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers"; // <- Client wrapper

export const metadata: Metadata = {
  title: "MEDICONNECT",
  icons: {
    icon: "/images/logo.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
