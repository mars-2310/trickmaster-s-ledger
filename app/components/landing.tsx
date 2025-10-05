import React from "react";
import { Appbar } from "./Appbar";
import { Redirect } from "./Redirect";

// Muzer Landing Page — Minimalist, Classy, Dark Theme (React + Tailwind)
// Drop into a React project with Tailwind configured.

export default function MuzerLanding() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 antialiased font-sans">
      {/* Container */}
      <Appbar/>
      <Redirect/>
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Navbar */}
        <header className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 text-gray-100 no-underline">
            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-800 bg-gradient-to-br from-gray-800 to-gray-700">
              <span className="font-semibold">MZ</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium">Muzer</div>
              <div className="text-xs text-gray-400">shared listening</div>
            </div>
          </a>

          <nav className="flex items-center gap-6">
            <a href="#how" className="text-sm text-gray-400 hover:text-gray-100">How it works</a>
            <a href="#features" className="text-sm text-gray-400 hover:text-gray-100">Features</a>
            <a href="#" className="ml-4 px-3 py-2 border border-gray-800 rounded-md text-sm hover:bg-gray-800">Get early access</a>
          </nav>
        </header>

        {/* Hero */}
        <main className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight">Music the room agrees on.</h1>
            <p className="mt-4 text-gray-300 max-w-lg">Create a stream, invite the room, and let listeners vote for the next track. Minimal setup, elevated experience.</p>

            <div className="mt-8 flex items-center gap-3">
              <a href="#" className="inline-block px-5 py-3 rounded-md bg-indigo-600 text-white text-sm font-medium shadow">Create a stream</a>
              <a href="#preview" className="text-sm text-gray-400 hover:text-gray-200">See demo</a>
            </div>

            <ul className="mt-8 text-sm text-gray-400 space-y-3">
              <li>• Invite with a link or QR</li>
              <li>• Live voting — no interruptions</li>
              <li>• Private rooms or public lobbies</li>
            </ul>
          </div>

          {/* Dark minimal mock preview */}
          <div>
            <div className="rounded-xl border border-gray-800 shadow-lg p-6 bg-gradient-to-br from-gray-850 via-gray-800 to-gray-900">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400 uppercase">Live</div>
                  <div className="mt-1 text-lg font-semibold">Room — Terrace</div>
                </div>
                <div className="text-sm text-gray-400">4 listeners</div>
              </div>

              <div className="mt-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-md bg-gray-800 grid place-items-center">♪</div>
                  <div className="flex-1">
                    <div className="font-medium">Soft Parade</div>
                    <div className="text-xs text-gray-400">A. Rivers • 3 votes</div>
                  </div>
                </div>

                <ol className="mt-4 space-y-3 text-sm text-gray-200">
                  <li className="flex items-center justify-between p-3 rounded-md bg-gray-800 border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-sm bg-gray-900 grid place-items-center text-xs text-gray-400">1</div>
                      <div>
                        <div className="font-medium">Night Bloom</div>
                        <div className="text-xs text-gray-400">E. Lane</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">2 votes</div>
                  </li>

                  <li className="flex items-center justify-between p-3 rounded-md bg-gray-800 border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-sm bg-gray-900 grid place-items-center text-xs text-gray-400">2</div>
                      <div>
                        <div className="font-medium">Late Light</div>
                        <div className="text-xs text-gray-400">M. Vale</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">1 vote</div>
                  </li>
                </ol>

                <div className="mt-5 flex items-center justify-between">
                  <div className="text-xs text-gray-400">Add songs • Vote live</div>
                  <a href="#" className="px-3 py-2 text-sm border border-gray-700 rounded-md hover:bg-gray-800">Join</a>
                </div>
              </div>
            </div>

            <div className="mt-6 text-xs text-gray-500">A focused listening experience — curated by people in the room.</div>
          </div>
        </main>

        {/* Features */}
        <section id="features" className="mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <SmallCard title="Instant rooms" desc="Create and share in one click." />
            <SmallCard title="Real-time voting" desc="Fair ordering by votes and time." />
            <SmallCard title="Private by default" desc="Invite-only rooms keep it intimate." />
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mt-14 max-w-2xl">
          <h3 className="text-lg font-semibold">How it works</h3>
          <ol className="mt-3 text-gray-400 space-y-3 text-sm">
            <li><strong>Create</strong> — start a room and set privacy.</li>
            <li><strong>Invite</strong> — send the link or show a QR.</li>
            <li><strong>Vote</strong> — listeners vote; the queue updates.</li>
          </ol>
        </section>

        {/* CTA */}
        <section id="preview" className="mt-14 py-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-lg font-semibold">Ready to let the room decide?</div>
              <div className="text-sm text-gray-400 mt-1">Start a stream and enjoy music together — effortlessly.</div>
            </div>
            <form className="flex items-center gap-3">
              <input aria-label="email" type="email" placeholder="your email" className="px-3 py-2 border border-gray-800 rounded-md text-sm bg-gray-900 text-gray-100" />
              <button className="px-4 py-2 rounded-md bg-indigo-600 text-sm font-medium">Get early access</button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-xs text-gray-500">© {new Date().getFullYear()} Muzer — minimal shared listening</footer>
      </div>
    </div>
  );
}

function SmallCard({ title, desc }:{title:string, desc:string}){
  return (
    <div className="p-4 bg-gray-800 rounded-md border border-gray-700">
      <div className="font-medium text-sm">{title}</div>
      <div className="text-xs text-gray-400 mt-1">{desc}</div>
    </div>
  );
}
