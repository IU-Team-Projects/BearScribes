import Header from "@/shared/ui/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Bear Scribes Log Ip",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div style={{position:"absolute", left: "80vw", top: "1vw"}}> <Header /> </div>
      {children}
    </>
  );
}
