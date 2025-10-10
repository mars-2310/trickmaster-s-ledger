"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSkeleton from "../components/dashboardSkeleton";
import { motion } from "framer-motion";
import DashboardSidebar from "../components/DashboardSidebar";
import { Plus } from "lucide-react";

type DashboardLedger = {
  id: string;
  name: string;
  description?: string | null;
  category?: string | null;
  updatedAt?: string;
  ownerId?: string;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [ledgers, setLedgers] = useState<DashboardLedger[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createDescription, setCreateDescription] = useState("");
  const [createCategory, setCreateCategory] = useState("");

  const fetchedOnce = useRef(false);

  const fetchLedgers = async () => {
    try {
      const res = await fetch("/api/ledgers", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setLedgers(data);
      }
    } catch (err) {
      console.error("Failed to fetch ledgers:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && !fetchedOnce.current) {
      fetchedOnce.current = true;
      fetchLedgers();
    }
  }, [status]);

  async function handleCreateLedger(e: React.FormEvent) {
    e.preventDefault();
    if (!createName.trim()) return;

    const res = await fetch("/api/ledgers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: createName,
        description: createDescription,
        category: createCategory,
      }),
    });

    if (res.ok) {
      await fetchLedgers();
      setShowModal(false);
      setCreateName("");
      setCreateDescription("");
      setCreateCategory("");
    }
  }

  if (status === "loading" || isLoading) return <DashboardSkeleton />;

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-black text-neutral-900 dark:text-neutral-100">
      {/* Sidebar */}
      <DashboardSidebar ledgers={ledgers} setShowModal={setShowModal} />

      {/* Main Section */}
      <div className="flex-1 overflow-y-auto p-8 relative">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back, {session?.user?.name?.split(" ")[0] || "Explorer"} 👋
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Your recent sparks are here.
          </p>
        </div>

        {/* Stylish Ledger Slider */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
            {ledgers.map((ledger) => (
              <motion.div
                key={ledger.id}
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="flex-shrink-0 relative w-44 h-48 bg-white/60 dark:bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-neutral-700 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden snap-center"
              >
                {/* Gradient header zone */}
                <div className="h-12 bg-gradient-to-r from-indigo-400/20 to-purple-500/20 dark:from-indigo-950/40 dark:to-purple-950/40 relative">
                  <div className="absolute bottom-[-14px] left-4 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md">
                    {ledger.name.charAt(0).toUpperCase()}
                  </div>
                </div>

                {/* Ledger details */}
                <div className="flex flex-col justify-between px-4 pb-3 pt-6">
                  <h2 className="text-sm font-semibold leading-tight line-clamp-2 mb-1 text-neutral-800 dark:text-neutral-100">
                    {ledger.name}
                  </h2>
                  {ledger.category && (
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400 italic mb-1">
                      {ledger.category}
                    </span>
                  )}
                  <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-700 dark:to-purple-800 flex items-center justify-center text-[10px] font-medium text-neutral-700 dark:text-neutral-100">
                      {session?.user?.name?.charAt(0) || "M"}
                    </div>
                    <span>
                      {ledger.updatedAt
                        ? new Date(ledger.updatedAt).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                          })
                        : "No date"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Create Spark Card */}
            <motion.div
              whileHover={{ y: -6, scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              onClick={() => setShowModal(true)}
              className="flex-shrink-0 w-44 h-48 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white cursor-pointer shadow-lg hover:shadow-2xl transition-all snap-center"
            >
              <Plus className="w-7 h-7 mb-2" />
              <span className="text-sm font-medium tracking-wide">Create Spark</span>
            </motion.div>
          </div>

          {/* Fade edges for smoothness */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-blue-50 via-blue-50/60 to-transparent dark:from-neutral-900 dark:via-neutral-950/80 dark:to-transparent"></div>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-purple-100 via-purple-100/60 to-transparent dark:from-black dark:via-neutral-950/80 dark:to-transparent"></div>
        </div>
      </div>

      {/* Modal for Creating New Spark */}
      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 w-full max-w-md shadow-2xl"
          >
            <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
              Create new Spark
            </h3>
            <form onSubmit={handleCreateLedger} className="grid gap-3">
              <input
                value={createName}
                onChange={(e) => setCreateName(e.target.value)}
                placeholder="Spark name"
                className="w-full rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
              />
              <input
                value={createCategory}
                onChange={(e) => setCreateCategory(e.target.value)}
                placeholder="Category (optional)"
                className="w-full rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
              />
              <textarea
                value={createDescription}
                onChange={(e) => setCreateDescription(e.target.value)}
                placeholder="Description (optional)"
                className="w-full rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 px-3 py-2 text-sm min-h-24 outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-md transition text-sm"
                >
                  Create
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
