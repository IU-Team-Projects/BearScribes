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
  return <>{children}</>;
}
