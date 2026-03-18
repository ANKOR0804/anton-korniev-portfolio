'use client'

import { useState } from 'react';
import { HeroScene } from '@/components/HeroScene';
import { Button } from '@/components/ui/Button';
import { ContactModal } from '@/components/ui/ContactModal';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="hero-section" className="relative h-screen overflow-hidden">
      <HeroScene className="absolute inset-0 z-0" />
      {/* Текст внизу */}
      <div className="absolute bottom-16 left-0 right-0 z-10 flex flex-col items-center text-center pointer-events-none">
        <p className="font-medium tracking-[0.2em] uppercase text-slate-700 dark:text-purple-400 mb-3">
          Frontend Developer
        </p>

        <h1 className="mb-3 text-[var(--foreground)] dark:text-slate-100 dark:[text-shadow:0_2px_20px_rgba(0,0,0,1)]">
          Anton Korniev
        </h1>

        <p className="mb-8 max-w-md opacity-60 text-[var(--foreground)] dark:text-slate-100 dark:opacity-100 dark:[text-shadow:0_1px_12px_rgba(0,0,0,1)]">
          I build modern interactive web applications using React, Next.js, and
          Three.js.
        </p>

        <div className="flex gap-4 pointer-events-auto">
          <Button
            as="a"
            href="/cv.pdf"
            download="Anton_Korniev_CV.pdf"
            variant="primary"
          >
            Download CV
          </Button>
          <Button
            variant="outline"
            className="backdrop-blur-sm"
            onClick={() => setIsModalOpen(true)}
          >
            Contact
          </Button>
        </div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
