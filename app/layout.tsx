import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const workSans = localFont({
  variable: "--font-work-sans",
  src: [
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: "900",
      style: "normal"
    },
    {
      path: "./fonts/WorkSans-ExtraBold.ttf",
      weight: "800",
      style: "normal"
    },
    {
      path: "./fonts/WorkSans-Bold.ttf",
      weight: "700",
      style: "normal"
    },
    {
      path: "./fonts/WorkSans-SemiBold.ttf",
      weight: "600",
      style: "normal"
    },
    {
      path: "./fonts/WorkSans-Medium.ttf",
      weight: "500",
      style: "normal"
    },
    {
      path: "./fonts/WorkSans-Regular.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "./fonts/WorkSans-Light.ttf",
      weight: "300",
      style: "normal"
    },
    {
      path: "./fonts/WorkSans-ExtraLight.ttf",
      weight: "200",
      style: "normal"
    },
    {
      path: "./fonts/WorkSans-Thin.ttf",
      weight: "100",
      style: "normal"
    }
  ]
})
export const metadata: Metadata = {
  title: "Blog App with Next.js",
  description: "Pitch Vote and Grow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
