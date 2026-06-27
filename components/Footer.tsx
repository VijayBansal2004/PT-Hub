"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";

const navLinks = [
  { href: "#", label: "Features" },
  { href: "#", label: "Blog" },
  { href: "#", label: "About" },
  { href: "#", label: "Contact" },
  { href: "#", label: "Licence" },
  { href: "#", label: "Privacy" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 transition-colors duration-300 w-full font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 py-8">
          <div className="flex items-center justify-between">
            {/* Logo brand */}
            <div className="flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-pink-500 to-indigo-600 text-white shadow-sm">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-md font-bold tracking-tight text-transparent">
                AURA
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              <a
                aria-label="X (Twitter)"
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer border border-zinc-200/30 dark:border-zinc-800/30"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                aria-label="Github"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer border border-zinc-200/30 dark:border-zinc-800/30"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="flex flex-wrap gap-4 font-medium text-zinc-500 dark:text-zinc-400 text-sm md:gap-6">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Footer bottom details */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200/30 dark:border-zinc-800/30 py-6 text-zinc-400 dark:text-zinc-500 text-xs">
          <p>&copy; {new Date().getFullYear()} AURA. All rights reserved.</p>

          <p className="inline-flex items-center gap-1.5">
            <span>Built by</span>
            <a
              aria-label="x/twitter profile"
              className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition-all"
              href="https://x.com/shabanhr"
              rel="noreferrer"
              target="_blank"
            >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="shaban"
              className="size-4.5 rounded-full ring-1 ring-zinc-200/50"
              height="18"
              src="https://github.com/shabanhr.png"
              width="18"
            />
              <span className="font-semibold">Shaban</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
