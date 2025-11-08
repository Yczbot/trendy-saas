"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string;
        },
        HTMLElement
      >;
    }
  }
}

// Extend React types for custom element
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': any;
    }
  }
}

const TrendyHero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Load Spline viewer script dynamically
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.95/build/spline-viewer.js';
    document.head.appendChild(script);
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] pt-[120px] md:pt-[130px] lg:pt-[160px]"
    >
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0 h-full w-full">
        {mounted && (
          <>
            {/* Primary Spline Viewer */}
            <spline-viewer 
              url="https://prod.spline.design/r-zFPJaO138Rrjgn/scene.splinecode"
              style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            />
            
            {/* Fallback iframe (hidden by default, shows if spline-viewer fails) */}
            <noscript>
              <iframe
                src="https://my.spline.design/humanmachinewithmousefollow-0V3BcZQDuLMnSurNj3Vuqn1L/"
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0, border: 0 }}
              />
            </noscript>
          </>
        )}
      </div>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      <div className="container relative z-10">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4">
            <div
              className="hero-content wow fadeInUp mx-auto max-w-[880px] text-center"
              data-wow-delay=".2s"
            >
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-white">
                  Now Live - Join 10,000+ Users
                </span>
              </div>

              <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-[1.15]">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Trendy
                </span>
                <br />
                The Future of SaaS
              </h1>

              <p className="mx-auto mb-10 max-w-[680px] text-lg font-medium leading-relaxed text-white/90 sm:text-xl">
                Transform your business with cutting-edge AI-powered solutions.
                Streamline workflows, boost productivity, and scale effortlessly.
              </p>

              {/* CTA Buttons */}
              <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="#pricing"
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50"
                >
                  Get Started Free
                  <svg
                    className="transition-transform group-hover:translate-x-1"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M7.5 15L12.5 10L7.5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                <Link
                  href="#demo"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M6.25 5L13.75 10L6.25 15V5Z"
                      fill="currentColor"
                    />
                  </svg>
                  Watch Demo
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-8 text-white/70">
                <div className="flex items-center gap-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10 1L12.5 6.5L18.5 7.5L14.25 11.5L15.5 17.5L10 14.5L4.5 17.5L5.75 11.5L1.5 7.5L7.5 6.5L10 1Z"
                      fill="#FCD34D"
                    />
                  </svg>
                  <span className="text-sm font-medium">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span className="text-sm font-medium">10,000+ Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">Enterprise Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer for 3D content */}
        <div className="h-[400px] md:h-[500px] lg:h-[600px]" />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F172A] to-transparent" />
    </section>
  );
};

export default TrendyHero;
