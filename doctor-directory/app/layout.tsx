// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers/providers"; // <- Client wrapper
import LenisScrollProvider from "./providers/lenisProvider";

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
        <LenisScrollProvider>
          <Providers>{children}</Providers>
        </LenisScrollProvider>
      </body>
    </html>
  );
}
