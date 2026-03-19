'use client';

import { cn } from '@/lib/utils';
import { useRef, useEffect, useState } from 'react';

const EXPERIENCE = [
  {
    company: 'NamariTech',
    role: 'Front-end Developer',
    period: 'Sep 2022 – Sep 2025',
    accent: 'border-violet-400 dark:border-violet-500',
    stack: ['React', 'TypeScript', 'Styled Components', 'SCSS', 'Git'],
    bullets: [
      { text: 'Built ', highlight: null },
      { text: '100+', highlight: true },
      {
        text: ' SPA applications using React, contributing to a shared component library tailored to design system needs',
        highlight: null,
      },
    ],
    bulletsFull: [
      'Built 100+ SPA applications using React, contributing to a shared component library tailored to design system needs',
      'Developed reusable global components adopted across multiple projects',
      'Initiated refactoring of updated components to improve code quality and maintainability',
      'Ensured cross-browser compatibility and responsive behaviour across all delivered applications',
    ],
  },
  {
    company: 'SendPulse',
    role: 'Front-end Developer',
    period: 'Dec 2020 – Aug 2022',
    accent: 'border-sky-400 dark:border-sky-500',
    stack: ['JavaScript', 'CSS', 'Joomla', 'GitLab'],
    bulletsFull: [
      'Maintained and evolved a large-scale Joomla website with 10+ pages and numerous redesign iterations',
      'Optimised images and codebase resulting in improved mobile load speed',
      'Contributed to SEO improvements that increased organic visibility',
    ],
  },
  {
    company: 'Nextepper',
    role: 'Front-end Developer',
    period: 'Aug 2019 – May 2020',
    accent: 'border-emerald-400 dark:border-emerald-500',
    stack: ['JavaScript', 'CSS', 'WordPress'],
    bulletsFull: [
      'Sole front-end developer responsible for 2–3 projects simultaneously, from layout to delivery',
      'Built front-end solutions ahead of back-end availability, then refactored to integrate with API when it became available',
      'Delivered fully responsive interfaces independently without a team',
    ],
  },
  {
    company: 'ToryArt',
    role: 'Front-end Developer',
    period: 'Apr 2019 – Jul 2019',
    accent: 'border-rose-400 dark:border-rose-500',
    stack: ['WordPress', 'CSS'],
    bulletsFull: [
      'Developed WordPress websites for two clients — a local florist business and a business partner',
      'Handled full project lifecycle from layout to deployment',
    ],
  },
];

// Подсвечиваем числа в тексте буллета
const HighlightedBullet = ({ text }: { text: string }) => {
  const parts = text.split(/(\d+\+?)/g);
  return (
    <>
      {parts.map((part, i) =>
        /\d+\+?/.test(part) ? (
          <span
            key={i}
            className="font-semibold text-sky-500 dark:text-sky-400"
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
};

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
            'border-l-2',
            item.accent,
            'hover:border-slate-300 dark:hover:border-slate-700',
            'transition-colors duration-200',
          )}
        >
          {/* Период */}
          <p className="text-xs font-medium tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-3">
            {item.period}
          </p>

          {/* Компания и роль */}
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
            {item.company}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            {item.role}
          </p>

          {/* Буллеты */}
          <ul className="flex flex-col gap-2 mb-4">
            {item.bulletsFull.map((bullet) => (
              <li
                key={bullet}
                className="inline-block items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
              >
                <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-600 shrink-0" />
                <HighlightedBullet text={bullet} />
              </li>
            ))}
          </ul>

          {/* Теги стека */}
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200 dark:border-slate-800">
            {item.stack.map((tag) => (
              <span
                key={tag}
                className={cn(
                  'px-2 py-0.5 rounded-md text-xs font-medium',
                  'bg-slate-100 dark:bg-slate-800',
                  'text-slate-500 dark:text-slate-400',
                )}
              >
                {tag}
              </span>
            ))}
          </div>
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
    <section id="experience" className="min-h-screen flex items-center py-24">
      <div className="container mx-auto px-6 md:px-16">
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
          <div
            className="absolute left-1/2 -translate-x-1/2 w-px hidden md:block bg-slate-300 dark:bg-slate-100"
            style={{ top: '6px', bottom: '6px' }}
          />
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
