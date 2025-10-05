import Image from "next/image";
import Link from "next/link";
import ParticleField from "./components/ParticleField";
import { Appbar } from "./components/Appbar";
import { Redirect } from "./components/Redirect";


function Header(){
  return (
    <header className="sticky top-0 z-30 w-full h-16 md:h-20 backdrop-blur supports-[backdrop-filter]:bg-[color-mix(in_oklab,var(--background)_80%,transparent)] border-b border-violet-500/20">
      <div className="mx-auto max-w-6xl px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src='/icons/logo.png' alt="Notes logo" width={36} height={36} className="rounded-sm" />
          <span className="text-lg font-semibold tracking-tight">NotesApp</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="opacity-80 hover:opacity-100 hover:text-violet-300 transition">Features</a>
          <a href="#faq" className="opacity-80 hover:opacity-100 hover:text-violet-300 transition">FAQ</a>
          <a href="#contact" className="opacity-80 hover:opacity-100 hover:text-violet-300 transition">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <Appbar />
          <Redirect />
        </div>
      </div>
    </header>
  );
}

function Hero(){
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_40rem_at_50%_-10%,rgba(124,58,237,0.18),transparent)]" />
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs">
          <span className="h-2 w-2 rounded-full bg-violet-400" />
          <span>Fast. Minimal. Secure.</span>
        </div>
        <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight">
          Capture your ideas without friction
        </h1>
        <p className="mt-4 text-base md:text-lg opacity-80 mx-auto max-w-2xl">
          A focused notes app for thinkers and builders. Organize, search, and sync
          your notes across devices with a beautiful dark UI by default.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="#get-started" className="px-4 py-2.5 rounded-md bg-violet-500 text-white hover:bg-violet-400 transition font-medium">
            Create your first note
          </Link>
          <Link href="#features" className="px-4 py-2.5 rounded-md border border-violet-500/30 text-violet-300 hover:border-violet-500/50 hover:text-violet-200 transition">
            Explore features
          </Link>
        </div>
      </div>
    </section>
  );
}

function Features(){
  const features = [
    {
      title: "Lightning search",
      desc: "Find anything instantly with typo tolerance and smart filters.",
      icon: "🔎",
    },
    {
      title: "Markdown first",
      desc: "Write naturally with shortcuts, code blocks, and checklists.",
      icon: "✍️",
    },
    {
      title: "Offline ready",
      desc: "Keep working without internet. Sync resumes automatically.",
      icon: "📶",
    },
    {
      title: "Tags & folders",
      desc: "Organize your knowledge with flexible structure that scales.",
      icon: "🏷️",
    },
    {
      title: "End‑to‑end encryption",
      desc: "Your notes are yours. Sensitive data stays private.",
      icon: "🔐",
    },
    {
      title: "Dark by default",
      desc: "A calm interface that’s easy on your eyes, day or night.",
      icon: "🌙",
    },
  ];
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border border-violet-500/15 bg-black/30 p-5 hover:border-violet-500/40 transition">
            <div className="text-2xl">
              <span aria-hidden>{f.icon}</span>
            </div>
            <h3 className="mt-3 text-lg font-medium">{f.title}</h3>
            <p className="mt-1 text-sm opacity-80">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA(){
  return (
    <section id="get-started" className="mx-auto max-w-6xl px-4 pb-16 md:pb-24">
      <div className="rounded-2xl border border-violet-500/20 bg-[linear-gradient(180deg,rgba(124,58,237,0.12),rgba(255,255,255,0.02))] p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Ready to take better notes?</h2>
        <p className="mt-2 opacity-80">Start free. No credit card required.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="#" className="px-4 py-2.5 rounded-md border border-violet-500/30 text-violet-300 hover:border-violet-500/50 hover:text-violet-200 transition">Live demo</Link>
        </div>
      </div>
    </section>
  );
}

function Footer(){
  return (
    <footer id="contact" className="border-t border-violet-500/20">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 opacity-80">
          <Image src='/icons/logo.png' alt="Notes logo" width={20} height={20} className="rounded-sm" />
          <span className="text-sm">© {new Date().getFullYear()}NotesApp</span>
        </div>
        <div className="flex items-center gap-4 text-sm opacity-80">
          <a href="#" className="hover:opacity-100 hover:text-violet-300">Privacy</a>
          <a href="#" className="hover:opacity-100 hover:text-violet-300">Terms</a>
          <a href="#" className="hover:opacity-100 hover:text-violet-300">Support</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[--background] text-[--foreground]">
      <DynamicBackground />
      <ParticleField />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function DynamicBackground(){
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="bg-blob blob1" />
      <div className="bg-blob blob2" />
      <div className="bg-blob blob3" />
      <div className="grid-overlay" />
      <div className="noise" />
    </div>
  );
}

// styles moved to globals.css