import { HeroScene } from '@/components/HeroScene';
import { Button } from '@/components/ui/Button';

export default function Hero() {
  return (
    <section id="hero-section" className="relative h-screen overflow-hidden">
      <HeroScene className="absolute inset-0 z-0" />

      {/* Текст внизу */}
      <div className="absolute bottom-16 left-0 right-0 z-10 flex flex-col items-center text-center pointer-events-none">
        <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#0ea5e9] dark:text-[#61dafb] mb-3">
          Frontend Developer
        </p>

        <h1 className="mb-3 text-[var(--foreground)]">Anton Korniev</h1>

        <p className="mb-8 max-w-md opacity-60 text-[var(--foreground)]">
          I build modern interactive web applications using React, Next.js, and
          Three.js.
        </p>

        <div className="flex gap-4 pointer-events-auto">
          <Button variant="primary">Download CV</Button>
          <Button variant="outline">Contact</Button>
        </div>
      </div>
    </section>
  );
}
