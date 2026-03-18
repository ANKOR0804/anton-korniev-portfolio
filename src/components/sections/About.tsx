'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export const About = () => {
  return (
    <section
      id="about"
      className={cn(
        'min-h-screen flex items-center',
        'px-6 md:px-16 lg:px-24 py-24',
      )}
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Фото */}
        <div className="flex justify-center md:justify-start">
          <div
            className={cn(
              'relative w-64 h-80 lg:w-80 lg:h-96',
              'rounded-2xl overflow-hidden',
              'ring-1 ring-slate-200 dark:ring-slate-700',
              'shadow-xl dark:shadow-slate-900/50',
            )}
          >
            <Image
              src="/images/photo.jpg"
              alt="Anton Korniev"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Текст */}
        <div className="flex flex-col gap-6">
          {/* Заголовок */}
          <div>
            <p
              className={cn(
                'text-sm font-medium tracking-[0.2em] uppercase mb-3',
                'text-slate-700 dark:text-violet-400',
              )}
            >
              About me
            </p>
            <h2
              className={cn(
                'text-3xl lg:text-4xl font-bold',
                'text-slate-900 dark:text-slate-100',
              )}
            >
              Who I am
            </h2>
          </div>

          {/* Описание */}
          <div className="flex flex-col gap-4">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              I&#39;m a front-end developer with 5+ years of hands-on experience
              building modern web applications. My background in System
              Engineering from Kyiv Polytechnic Institute gave me a strong
              technical foundation that I apply every day in my work.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              I&#39;m detail-oriented and passionate about writing clean,
              maintainable code. I enjoy working with React, Next.js, and
              Three.js — and I&#39;m always exploring new technologies to stay
              sharp.
            </p>
          </div>

          {/* Образование */}
          <div
            className={cn(
              'flex flex-col gap-2 pt-2',
              'border-t border-slate-200 dark:border-slate-800',
            )}
          >
            <p className="text-xs font-medium tracking-widest uppercase text-slate-400 dark:text-slate-500 mt-4">
              Education
            </p>
            <p className="text-slate-900 dark:text-slate-100 font-medium">
              National Technical University of Ukraine
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Kyiv Polytechnic Institute · System Engineering · 2015 – 2019
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
