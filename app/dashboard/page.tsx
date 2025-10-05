"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-violet-500 mx-auto"></div>
          <p className="mt-4 text-violet-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[--background] text-[--foreground]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-violet-300 mt-2">
              {session.user?.name || session.user?.email}
            </p>
          </div>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 rounded-md border border-violet-500/30 text-violet-300 hover:border-violet-500/50 hover:text-violet-200 transition"
          >
            Logout
          </button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-violet-500/15 bg-black/30 p-6">
            <h3 className="text-lg font-medium mb-2">Your Ledgers</h3>
            <p className="text-sm opacity-80 mb-4">Manage your note collections</p>
            <button className="px-3 py-2 rounded-md bg-violet-500 text-white hover:bg-violet-400 transition text-sm">
              Create Ledger
            </button>
          </div>
          
          <div className="rounded-xl border border-violet-500/15 bg-black/30 p-6">
            <h3 className="text-lg font-medium mb-2">Recent Sparks</h3>
            <p className="text-sm opacity-80 mb-4">Your latest ideas and notes</p>
            <button className="px-3 py-2 rounded-md border border-violet-500/30 text-violet-300 hover:border-violet-500/50 hover:text-violet-200 transition text-sm">
              View All
            </button>
          </div>
          
          <div className="rounded-xl border border-violet-500/15 bg-black/30 p-6">
            <h3 className="text-lg font-medium mb-2">Quick Actions</h3>
            <p className="text-sm opacity-80 mb-4">Start creating content</p>
            <button className="px-3 py-2 rounded-md bg-violet-500 text-white hover:bg-violet-400 transition text-sm">
              New Spark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}