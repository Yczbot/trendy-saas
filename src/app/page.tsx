"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string;
        },
        HTMLElement
      >;
    }
  }
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Load Spline viewer script dynamically
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.10.95/build/spline-viewer.js";
    document.head.appendChild(script);

    // Smooth fade-in for content
    const timer = setTimeout(() => {
      setContentVisible(true);
    }, 300);

    // Hide Spline watermark button
    const hideSplineButton = () => {
      const style = document.createElement('style');
      style.textContent = `
        iframe {
          pointer-events: auto !important;
        }
        /* Hide Spline watermark */
        #logo, 
        [class*="logo"],
        [class*="watermark"],
        a[href*="spline"],
        button[class*="spline"] {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }
      `;
      document.head.appendChild(style);
    };
    
    setTimeout(hideSplineButton, 1000);
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      {/* Spline 3D Background - Full Screen with smooth fade-in */}
      <div 
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        {mounted && (
          <iframe
            src="https://my.spline.design/humanmachinewithmousefollow-0V3BcZQDuLMnSurNj3Vuqn1L/"
            width="100%"
            height="100%"
            style={{ 
              border: 0, 
              width: "100%", 
              height: "100%", 
              position: "absolute", 
              top: 0, 
              left: 0,
              pointerEvents: "auto",
              willChange: "transform",
            }}
          />
        )}
      </div>

      {/* Gradient Overlays - smooth transition */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-black/40 transition-all duration-700" />
      
      {/* Content Overlay - Only Get Started Button */}
      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-end px-4 pb-16">
        {/* Get Started Button - Bottom centered with smooth pink glow */}
        <div 
          className={`pointer-events-none transition-all duration-1000 ease-out ${
            contentVisible 
              ? "translate-y-0 opacity-100" 
              : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <Link
            href="/home"
            className="pointer-events-auto group relative block overflow-hidden rounded-full transition-all duration-700 ease-in-out hover:scale-105"
          >
            {/* Animated pink glow - smoother and slower */}
            <div className="pointer-events-none absolute -inset-2 animate-pulse-glow rounded-full bg-pink-500/20 blur-2xl transition-all duration-1000 ease-in-out group-hover:bg-pink-500/40 group-hover:blur-3xl" />
            
            {/* Button */}
            <div className="relative flex items-center gap-3 rounded-full border border-pink-500/20 bg-black/70 px-12 py-5 backdrop-blur-lg transition-all duration-700 ease-in-out group-hover:border-pink-500/50 group-hover:bg-black/50 group-hover:shadow-lg group-hover:shadow-pink-500/20">
              <span className="text-xl font-bold text-white transition-all duration-500 ease-in-out">Get Started</span>
              <svg
                className="transition-all duration-700 ease-in-out group-hover:translate-x-2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>

    </div>
  );
}

