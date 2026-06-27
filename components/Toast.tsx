"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string | null;
}

export default function Toast({ message }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-zinc-900 dark:bg-white px-4 py-3 text-sm font-semibold text-white dark:text-zinc-950 shadow-2xl border border-zinc-800 dark:border-zinc-200 font-sans">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
