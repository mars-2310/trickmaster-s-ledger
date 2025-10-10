"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  Plus,
  MoreVertical,
  Trash2,
  Edit3,
  Share2,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";

type DashboardLedger = {
  id: string;
  name: string;
  description?: string | null;
  category?: string | null;
};

interface SidebarProps {
  ledgers: DashboardLedger[];
  setShowModal: (value: boolean) => void;
  onDeleteLedger?: (id: string) => void;
  onRenameLedger?: (id: string) => void;
  onShareLedger?: (id: string) => void;
}

export default function DashboardSidebar({
  ledgers,
  setShowModal,
  onDeleteLedger,
  onRenameLedger,
  onShareLedger,
}: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // ✅ Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(null);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <motion.aside
      animate={{ width: sidebarOpen ? 280 : 64 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="h-full border-r border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md flex flex-col relative group"
    >
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
        {sidebarOpen ? (
          <div className="flex items-center gap-2">
            <Image
              src="/icons/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="rounded"
            />
          </div>
        ) : (
          <button
            onClick={() => setSidebarOpen(true)}
            className="mx-auto p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* New Ledger Button */}
      {sidebarOpen && (
        <div className="px-3 py-3 border-b border-neutral-200 dark:border-neutral-800">
          <motion.button
            whileHover={{ scale: 1.03 }}
            onClick={() => setShowModal(true)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-md text-sm font-medium shadow hover:shadow-lg transition"
          >
            <Plus className="w-4 h-4" />
            New Ledger
          </motion.button>
        </div>
      )}

      {/* Ledger List */}
      {sidebarOpen && (
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1 relative">
          {ledgers.length === 0 ? (
            <p className="text-sm text-neutral-500 px-2">
              No ledgers yet. Create one!
            </p>
          ) : (
            ledgers.map((l) => (
              <motion.div
                key={l.id}
                whileHover={{ backgroundColor: "rgba(99,102,241,0.08)" }}
                className="relative flex items-center justify-between px-3 py-2 rounded-md text-sm text-neutral-700 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition group"
              >
                {/* Ledger Name + Category */}
                <div
                  onClick={() => router.push(`/ledgers/${l.id}`)}
                  className="flex-1 truncate cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <span className="truncate">{l.name}</span>
                    {l.category && (
                      <span className="text-xs text-neutral-500 ml-2 truncate">
                        {l.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* 3-Dot Menu Button */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(menuOpen === l.id ? null : l.id);
                    }}
                    className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
                    title="More actions"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {/* Context Menu */}
                  <AnimatePresence>
                    {menuOpen === l.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-8 z-20 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg py-1 w-40"
                      >
                        <button
                          onClick={() => {
                            setMenuOpen(null);
                            if (onRenameLedger) onRenameLedger(l.id);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                        >
                          <Edit3 className="w-4 h-4" />
                          Rename
                        </button>

                        <button
                          onClick={() => {
                            setMenuOpen(null);
                            if (onShareLedger) onShareLedger(l.id);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                        >
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>

                        <div className="border-t border-neutral-200 dark:border-neutral-800 my-1" />

                        <button
                          onClick={() => {
                            setMenuOpen(null);
                            if (onDeleteLedger) onDeleteLedger(l.id);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Bottom Section */}
      <div className="px-3 py-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        {sidebarOpen ? (
          <>
            <button
              onClick={() => signOut()}
              className="text-sm flex items-center gap-2 px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </>
        ) : (
          <div className="w-full flex flex-col items-center space-y-2">
            <button
              onClick={() => signOut()}
              className="w-full flex items-center justify-center p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
