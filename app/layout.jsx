import localFont from "next/font/local";
import "./globals.css";

// Poppins is the font used in the OutgrowLK logo.
const body = localFont({
  src: [
    { path: "./fonts/poppins-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "OutgrowLK – Websites and ads for Sri Lankan businesses",
  description: "OutgrowLK designs and builds websites for Sri Lankan businesses, then runs the Meta and Google ads that bring customers to them.",
};

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${body.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js");try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t||\"dark\"}catch(e){document.documentElement.dataset.theme=\"dark\"}' }} /></head>
      <body>{children}</body>
    </html>
  );
}
