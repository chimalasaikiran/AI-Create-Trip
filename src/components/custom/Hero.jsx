"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { Link } from "react-router-dom"; 
import { Button } from "@/components/ui/button"; 


export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <div className="text-center mx-auto max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-5xl px-4 md:text-5xl lg:text-5xl font-bold text-neutral-700 dark:text-white leading-relaxed lg:leading-snug text-center mx-auto"
        >
          Plan Your Dream Journey with{" "}
          <Highlight className="text-black dark:text-white">
            AI Trip Planner
          </Highlight>{" "}
          — Smart, Fast & Effortless.
        </motion.h1>

        <Link to="/create-trip">
      <Button className='rounded-full py-4 mt-6 h-[40px] w-[140px] text-[18px] cursor-pointer'>Get Started</Button>
        </Link>
      </div>
    </HeroHighlight>
  );
}
