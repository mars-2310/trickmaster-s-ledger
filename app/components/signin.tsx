"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f10] via-[#121212] to-[#1a1a1c] relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(56,189,248,0.15),transparent_70%)]" />

      {/* Animated floating shapes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-6 bg-black/40 backdrop-blur-lg border border-gray-800 rounded-3xl px-10 py-12 shadow-2xl"
      >
        {/* App Logo */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg"
        >
          <span className="text-2xl font-bold text-white">A</span>
        </motion.div>

        {/* Text */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-semibold text-white"
        >
          Welcome Back
        </motion.h1>
        <p className="text-gray-400 text-sm text-center -mt-2">
          Sign in to continue to your account
        </p>

        {/* Google Sign In */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => signIn("google")}
          className="flex items-center gap-3 bg-white text-gray-800 px-6 py-3 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          <span className="font-medium">Sign in with Google</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
