"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  if (isLandingPage) {
    // Landing page: NO header, NO footer
    return <>{children}</>;
  }

  // All other pages: WITH header and footer
  return (
    <div className="isolate">
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
    </div>
  );
}
