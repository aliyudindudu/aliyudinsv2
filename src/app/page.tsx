"use client";

import { useState } from "react";
import { Preloader } from "@/components/shared/Preloader";
import { Navbar } from "@/components/shared/Navbar";
import { Cursor } from "@/components/ui/Cursor";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/shared/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Preloader onComplete={() => setIsLoading(false)} />

      <div style={{ visibility: isLoading ? "hidden" : "visible" }}>
        <Cursor />
        <Navbar />
        <SmoothScroll>
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
          </main>
        </SmoothScroll>
      </div>
    </>
  );
}


