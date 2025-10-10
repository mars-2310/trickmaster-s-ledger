"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function DashboardSkeleton() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-black text-neutral-900 dark:text-neutral-100 overflow-hidden">
      
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 70 }}
        transition={{ duration: 0.25 }}
        className="h-screen flex flex-col border-r border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md shadow-sm"
      >
        {/* Topbar */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-200 dark:border-neutral-800">
          {isSidebarOpen && (
            <div className="h-5 w-32 bg-neutral-200 dark:bg-neutral-700 rounded-md animate-pulse" />
          )}
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="p-2 rounded-lg hover:bg-neutral-200/40 dark:hover:bg-neutral-700/40 transition"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Create Ledger Button */}
        <div className="px-4 py-3">
          <div
            className={`${
              isSidebarOpen ? "h-9 w-full" : "h-9 w-9 mx-auto"
            } bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse`}
          />
        </div>

        {/* Ledger list */}
        <div className="flex-1 overflow-y-auto px-3 pb-6 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-lg bg-neutral-200/60 dark:bg-neutral-800/60 animate-pulse ${
                isSidebarOpen ? "h-10 w-full" : "h-10 w-10 mx-auto"
              }`}
            />
          ))}
        </div>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto relative">
        {/* Topbar skeleton */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-20 backdrop-blur-md bg-white/60 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-700 shadow-sm mb-8"
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="h-5 w-40 bg-neutral-200 dark:bg-neutral-700 rounded-md animate-pulse" />
            <div className="flex gap-3">
              <div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-700 rounded-md animate-pulse" />
              <div className="h-8 w-28 bg-neutral-200 dark:bg-neutral-700 rounded-md animate-pulse" />
              <div className="h-8 w-20 bg-neutral-200 dark:bg-neutral-700 rounded-md animate-pulse" />
            </div>
          </div>
        </motion.header>

        {/* Main dashboard placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="h-6 w-40 bg-neutral-200 dark:bg-neutral-700 rounded-md animate-pulse" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-md p-5 shadow-sm"
              >
                <div className="h-5 w-2/3 bg-neutral-200 dark:bg-neutral-700 rounded-md animate-pulse mb-3" />
                <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-700 rounded-md animate-pulse mb-2" />
                <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-700 rounded-md animate-pulse" />
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
