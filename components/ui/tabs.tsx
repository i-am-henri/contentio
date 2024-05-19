"use client";
// Component from https://luxe.guhrodrigues.com/ui/animated-tabs
import { useState } from "react";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
type Tab = {
  name: string,
  content: React.ReactNode,

}
type TabsProps = {
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  tabs: Tab[]
};

export function Tabs({
  containerClassName,
  activeTabClassName,
  tabClassName,
  tabs
}: TabsProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);


  return (
    <div
      className={cn(
        "relative flex flex-wrap items-start justify-start flex-col",
        containerClassName
      )}
    >
      <div className="flex mb-2">
        {tabs.map((tab, index) => (
          <button
            key={tab.name}
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
              {tab.name}
            </span>
          </button>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full" key={activeIdx}>
        {
          tabs[activeIdx].content
        }
      </motion.div>
    </div>
  );
}