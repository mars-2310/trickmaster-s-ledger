"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
  const session = useSession();

  return <div>
    <div className="flex justify-end items-center gap-3">
      <div>
        {session.data?.user && <button className="px-4 py-2 rounded-lg bg-transparent backdrop-blur-sm border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 text-sm font-medium shadow-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition
               focus:outline-none focus:ring-2 focus:ring-neutral-500/25 p-4" onClick={() => signOut()}>Log out</button>}
        {!session.data?.user && <button className="px-5 py-2.5 rounded-xl bg-violet-600/20 dark:bg-violet-600/30 backdrop-blur-md border border-violet-400/20 dark:border-violet-400/30 text-violet-700 dark:text-violet-300 font-semibold shadow-lg hover:bg-violet-600/30 dark:hover:bg-violet-600/40 hover:translate-y-[-1px] transition-transform duration-150
               focus:outline-none focus:ring-2 focus:ring-violet-400/30 focus:ring-offset-0 p-4" onClick={() => signIn()}>Log in</button>}
      </div>
    </div>
  </div>
}