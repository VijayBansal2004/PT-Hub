"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, X } from "lucide-react";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.714-1.465L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.863-9.854.001-2.634-1.024-5.11-2.885-6.974-1.862-1.864-4.337-2.89-6.974-2.891-5.441 0-9.866 4.419-9.869 9.856-.001 1.957.51 3.867 1.481 5.568l-.963 3.516 3.606-.945zm11.517-5.32c-.313-.156-1.854-.915-2.131-1.016-.277-.1-.478-.15-.678.15-.2.3-.777.98-.952 1.18-.176.2-.351.226-.665.07-1.129-.567-1.923-1.002-2.694-2.32-.176-.3-.176-.556-.062-.733.103-.16.226-.351.338-.476.113-.125.15-.213.226-.363.076-.15.038-.282-.019-.382-.056-.1-.478-1.15-.654-1.575-.172-.414-.34-.358-.478-.365-.122-.006-.262-.007-.402-.007-.14 0-.368.053-.56.263-.193.21-.738.72-.738 1.758s.755 2.039.86 2.182c.105.143 1.485 2.267 3.598 3.178 1.134.489 1.637.56 2.222.474.379-.056 1.854-.758 2.115-1.458.263-.7.263-1.3.185-1.428-.077-.128-.277-.208-.59-.364z"/>
  </svg>
);

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const demoCallNumber = "+1 (555) 0198";
  const demoWhatsAppNumber = "+1 (555) 0199";

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 font-sans select-none">
      {/* Expandable Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2.5 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-zinc-200/50 shadow-xl w-60 origin-bottom-right"
          >
            <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase px-1">
              Contact Us
            </span>

            {/* Call Option */}
            <a
              href={`tel:${demoCallNumber.replace(/\s+/g, "")}`}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-blue-50 text-zinc-700 hover:text-blue-600 transition-colors cursor-pointer group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 group-hover:scale-105 transition-transform">
                <Phone className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold leading-tight">Call Support</span>
                <span className="text-[11px] text-zinc-400 mt-0.5">
                  {demoCallNumber}
                </span>
              </div>
            </a>

            {/* WhatsApp Option */}
            <a
              href={`https://wa.me/${demoWhatsAppNumber.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-blue-50 text-zinc-700 hover:text-blue-600 transition-colors cursor-pointer group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 group-hover:scale-105 transition-transform">
                <WhatsAppIcon className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold leading-tight">WhatsApp Us</span>
                <span className="text-[11px] text-zinc-400 mt-0.5">
                  {demoWhatsAppNumber}
                </span>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact options"
        className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg cursor-pointer transition-all duration-300 active:scale-95 ${
          isOpen
            ? "bg-zinc-800 hover:bg-zinc-700 shadow-zinc-800/20"
            : "bg-blue-600 hover:bg-blue-500 shadow-blue-600/30 hover:scale-115"
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-0.5"
            >
              <MessageCircle className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
