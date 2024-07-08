import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Bear Scribes Sign Up",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
