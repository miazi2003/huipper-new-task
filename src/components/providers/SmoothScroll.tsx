"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll({ children }: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.1,
      syncTouch: false,
      anchors: true,
      autoRaf: false,
    });

    const updateScrollTrigger = () => ScrollTrigger.update();
    const tick = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", updateScrollTrigger);
      lenis.destroy();
    };
  }, []);

  return children;
}
