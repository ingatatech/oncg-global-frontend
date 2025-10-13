import { Inter } from "next/font/google";
import "./globals.css";

import LayoutShell from "@/components/LayoutShell";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "ONCG Global Holdings | Insight, Innovation & Impact Across Africa",
  description:
    "ONCG Global Holdings is a multidisciplinary consulting and research firm empowering organizations across Africa through data-driven insights, strategic advisory, technology solutions, and capacity building. We deliver sustainable impact in audit, tax, business consulting, socio-economic research, IT, and analytics.",
  keywords: [
    "ONCG Global",
    "ON Consulting Group",
    "Business Consulting",
    "Data Analytics",
    "Socio-Economic Research",
    "Audit and Assurance",
    "Tax Advisory",
    "IT Solutions",
    "Capacity Building",
    "Leadership Development",
    "Africa Consulting Firm",
  ],
  authors: [{ name: "ONCG Global Holdings" }],
  openGraph: {
    title: "ONCG Global Holdings | Insight, Innovation & Impact Across Africa",
    description:
      "Partnering with governments, private institutions, and development agencies to drive innovation and sustainable growth through data and expertise.",
    url: "https://oncgglobal.com",
    siteName: "ONCG Global Holdings",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "ONCG Global Holdings - Consulting and Research",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  metadataBase: new URL("https://oncgglobal.com"),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
				<link rel="apple-touch-icon" type="image/png" href="/images/logo.png" />
				<link rel="icon" type="image/png" href="/images/logo.png" />
			</head>
      <body className={`${inter.variable} antialiased`}>
        	<Toaster position="top-right" />
        		<LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
