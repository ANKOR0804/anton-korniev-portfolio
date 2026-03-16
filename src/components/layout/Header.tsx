'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { NAV_LINKS } from '@/lib/nav';
import { cn } from '@/lib/utils';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => setIsMenuOpen(false);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'px-6 py-4 flex items-center justify-between',
        'transition-all duration-300',
        isScrolled && 'backdrop-blur-md border-b border-[var(--foreground)]/10',
        isScrolled && 'bg-[var(--background)]/80',
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className="text-sm font-semibold tracking-widest uppercase opacity-80 hover:opacity-100 transition-opacity"
      >
        Anton Korniev
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'text-sm font-medium tracking-wide',
              'opacity-60 hover:opacity-100',
              'transition-opacity duration-200',
            )}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Right side: ThemeToggle + burger */}
      <div className="flex items-center gap-4">
        <ThemeToggle />

        {/* Burger — mobile only */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              'block w-5 h-px bg-current transition-all duration-300',
              isMenuOpen && 'translate-y-2 rotate-45',
            )}
          />
          <span
            className={cn(
              'block w-5 h-px bg-current transition-all duration-300',
              isMenuOpen && 'opacity-0',
            )}
          />
          <span
            className={cn(
              'block w-5 h-px bg-current transition-all duration-300',
              isMenuOpen && '-translate-y-2 -rotate-45',
            )}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'absolute top-full left-0 right-0 md:hidden',
          'flex flex-col gap-1 px-6 py-4',
          'backdrop-blur-md border-b border-[var(--foreground)]/10',
          'bg-[var(--background)]/90',
          'transition-all duration-300 overflow-hidden',
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            onClick={handleNavClick}
            className={cn(
              'py-2 text-sm font-medium tracking-wide',
              'opacity-70 hover:opacity-100',
              'transition-opacity duration-200',
            )}
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
};