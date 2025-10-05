"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
  const session = useSession();

  return <div>
    <div className="flex justify-end  ">
      <div>
        {session.data?.user && <button className="px-4 py-2 rounded-lg bg-transparent backdrop-blur-sm border border-gray-700/40 text-gray-100 text-sm font-medium shadow-sm hover:bg-white/4 transition
               focus:outline-none focus:ring-2 focus:ring-gray-500/25 p-4" onClick={() => signOut()}>Log out</button>}
        {!session.data?.user && <button className="px-5 py-2.5 rounded-xl bg-indigo-600/20 backdrop-blur-md border border-indigo-400/10 text-indigo-100 font-semibold shadow-lg hover:bg-indigo-600/30 hover:translate-y-[-1px] transition-transform duration-150
               focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:ring-offset-0 p-4" onClick={() => signIn()}>Log in</button>}
      </div>
    </div>
  </div>
}