import type { Metadata } from "next";

import Header from "@/components/ui/Header";
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
      <body className="bg-white h-screen w-screen flex flex-col">
        <ModalContextProvider>
          <Header />
          {children}
        </ModalContextProvider>
      </body>
    </html>
  );
}
