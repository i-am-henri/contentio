"use client";
// Component from https://luxe.guhrodrigues.com/ui/animated-tabs
import { useState } from "react";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type TabsProps = {
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
};

export function Tabs({
  containerClassName,
  activeTabClassName,
  tabClassName,
}: TabsProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const tabs = [
    {
      title: "Product",
    },
    {
      title: "Services",
    },
    {
      title: "About",
    },
  ];

  return (
    <div
      className={cn(
        "relative flex flex-wrap items-center justify-center",
        containerClassName
      )}
    >
      {tabs.map((tab, index) => (
        <button
          key={tab.title}
          onClick={() => setActiveIdx(index)}
          className={cn(
            "group relative z-[1] rounded-full px-4 py-2",
            { "z-0": activeIdx === index },
            tabClassName
          )}
        >
          {activeIdx === index && (
            <motion.div
              layoutId="clicked-button"
              transition={{ duration: 0.2 }}
              className={cn(
                "absolute inset-0 rounded-full bg-white",
                activeTabClassName
              )}
            />
          )}

          <span
            className={cn(
              "relative text-sm block font-medium duration-200",
              activeIdx === index ? "text-black delay-100" : "text-white"
            )}
          >
            {tab.title}
          </span>
        </button>
      ))}
    </div>
  );
}