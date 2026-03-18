'use client';

import { cn } from '@/lib/utils';
import { useRef, useEffect, useState } from 'react';

const EXPERIENCE = [
  {
    company: 'NamariTech',
    role: 'Front-end Developer',
    period: 'Sep 2022 – Sep 2025',
    bullets: [
      'Created React templates for web applications',
      'Developed reusable component libraries',
      'Improved UI/UX across multiple projects',
    ],
  },
  {
    company: 'SendPulse',
    role: 'Front-end Developer',
    period: 'Dec 2020 – Aug 2022',
    bullets: [
      'Responsive HTML/CSS layout',
      'Improved and maintained existing web pages',
      'CSS styling and JS scripting',
      'Building and maintaining websites on Joomla',
    ],
  },
  {
    company: 'Nextepper',
    role: 'Front-end Developer',
    period: 'Aug 2019 – May 2020',
    bullets: [
      'Responsive HTML/CSS layout',
      'Improving and maintaining existing web pages',
      'CSS styling and JS scripting',
      'Building and maintaining websites on WordPress',
    ],
  },
  {
    company: 'ToryArt',
    role: 'Front-end Developer',
    period: 'Apr 2019 – Jul 2019',
    bullets: ['Responsive HTML/CSS layout', 'Creating WordPress websites'],
  },
];

const ExperienceCard = ({
  item,
  index,
}: {
  item: (typeof EXPERIENCE)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0"
    >
      {/* Точка на линии */}
      <div
        className={cn(
          'absolute left-1/2 top-0 -translate-x-1/2',
          'hidden md:block z-10',
          'w-3 h-3 rounded-full',
          'bg-white dark:bg-slate-950',
          'ring-2 ring-slate-300 dark:ring-slate-600',
          'transition-all duration-500',
          visible ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
        )}
      />

      {/* Карточка */}
      <div
        className={cn(
          isLeft ? 'md:col-start-1 md:pr-12' : 'md:col-start-2 md:pl-12',
          'transition-all duration-500 ease-out',
          visible
            ? 'opacity-100 translate-x-0'
            : isLeft
              ? 'opacity-0 -translate-x-8'
              : 'opacity-0 translate-x-8',
        )}
      >
        <div
          className={cn(
            'p-6 rounded-2xl',
            'bg-slate-50 dark:bg-slate-900',
            'border border-slate-200 dark:border-slate-800',
            'hover:border-slate-300 dark:hover:border-slate-700',
            'transition-colors duration-200',
          )}
        >
          <p className="text-xs font-medium tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-3">
            {item.period}
          </p>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
            {item.company}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            {item.role}
          </p>
          <ul className="flex flex-col gap-2">
            {item.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
              >
                <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-600 shrink-0" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const Experience = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [fillHeight, setFillHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = timelineRef.current;
      if (!el) return;

      const { top, height } = el.getBoundingClientRect();
      const windowH = window.innerHeight;

      const start = windowH * 0.5;
      const progress = Math.min(Math.max((start - top) / height, 0), 1);

      setFillHeight(progress * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="experience"
      className={cn(
        'min-h-screen flex items-center',
        'px-6 md:px-16 lg:px-24 py-24',
      )}
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Заголовок */}
        <div className="mb-16">
          <p
            className={cn(
              'text-sm font-medium tracking-[0.2em] uppercase mb-3',
              'text-slate-700 dark:text-violet-400',
            )}
          >
            Experience
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100">
            Work History
          </h2>
        </div>

        {/* Таймлайн */}
        <div ref={timelineRef} className="relative">
          {/* Фоновая линия — 6px отступ сверху и снизу = половина размера точки (w-3 = 12px) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-px hidden md:block bg-slate-300 dark:bg-slate-100"
            style={{ top: '6px', bottom: '6px' }}
          />

          {/* Заполняющаяся линия */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-px hidden md:block bg-sky-500 dark:bg-sky-400"
            style={{ top: '6px', height: `calc(${fillHeight}% - 6px)` }}
          />

          <div className="flex flex-col gap-12">
            {EXPERIENCE.map((item, index) => (
              <ExperienceCard key={item.company} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
