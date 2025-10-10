"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import DashboardSidebar from "../../../components/DashboardSidebar";

export default function LedgerPage() {
  const { id } = useParams();
  const router = useRouter();

  // Dummy canvas thumbnails
  const dummyThumbnails = [
    { id: "spark-1", name: "Canvas 1" },
    { id: "spark-2", name: "Canvas 2" },
    { id: "spark-3", name: "Canvas 3" },
    { id: "spark-4", name: "Canvas 4" },
  ];

  const handleNewSpark = () => {
    // For now, navigate to a placeholder spark route
    router.push(`/spark/new`);
  };

  const handleOpenSpark = (sparkId: string) => {
    router.push(`/spark/${sparkId}`);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      

      {/* Main content */}
      <div className="flex-1 flex flex-col p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Ledger: {id}</h1>
          <button
            onClick={handleNewSpark}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            <Plus size={18} />
            New Spark
          </button>
        </div>

        {/* Canvas thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {dummyThumbnails.map((thumb) => (
            <motion.div
              key={thumb.id}
              onClick={() => handleOpenSpark(thumb.id)}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer rounded-xl border bg-white dark:bg-gray-800 p-3 shadow hover:shadow-lg transition"
            >
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2 flex items-center justify-center text-gray-500">
                {/* Placeholder thumbnail */}
                <span>Thumbnail</span>
              </div>
              <div className="text-sm font-medium truncate">{thumb.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
