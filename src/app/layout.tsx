import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import Providers from "./providers";
import LayoutWrapper from "@/components/LayoutWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="!scroll-smooth" lang="en">
      <body>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
