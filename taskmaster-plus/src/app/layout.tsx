import type { Metadata } from "next";

import { ModalContextProvider } from "@/contexts/ModalContext";

import "./globals.css";

export const metadata: Metadata = {
  title: "TaskMaster+",
  description: "Master your tasks."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white h-screen w-screen">
        <ModalContextProvider>{children}</ModalContextProvider>
      </body>
    </html>
  );
}
