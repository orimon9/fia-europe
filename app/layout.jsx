import "./globals.css";

export const metadata = {
  title: "FIA Europe Network — Immigration, Golden Visa & Real Estate",
  description:
    "FIA Europe Network: end-to-end Immigration, Golden Visa, Accounting, and Real Estate Investment services across Europe. Track your visa application in real time.",
  manifest: "/manifest.json",
  themeColor: "#1a6b3a",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "FIA Europe" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
