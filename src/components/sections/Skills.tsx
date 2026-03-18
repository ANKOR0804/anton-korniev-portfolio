'use client';

import { cn } from '@/lib/utils';
import { useRef, useEffect, useState } from 'react';
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiThreedotjs, SiTailwindcss, SiSass, SiBootstrap,
  SiGit, SiGithub, SiGitlab, SiWebpack, SiGulp, SiNpm, SiFigma,
  SiNodedotjs, SiWordpress, SiJoomla, SiVite, SiEslint, SiPrettier,
  SiOpenai, SiGooglegemini,
} from 'react-icons/si';
import { TbBrandThreejs } from 'react-icons/tb';
import { FaRobot } from 'react-icons/fa';
import { IconType } from 'react-icons';

type Tag = {
  label: string;
  icon?: IconType;
};

type Category = {
  category: string;
  color: string;        // цвет акцента категории
  borderColor: string;  // бордер тега при hover
  textColor: string;    // текст тега при hover
  tags: Tag[];
};

const SKILLS: Category[] = [
  {
    category: 'Frontend',
    color: 'text-sky-500',
    borderColor: 'hover:border-sky-400 dark:hover:border-sky-500',
    textColor: 'hover:text-sky-600 dark:hover:text-sky-400',
    tags: [
      { label: 'HTML5', icon: SiHtml5 },
      { label: 'CSS3', icon: SiCss },
      { label: 'JavaScript', icon: SiJavascript },
      { label: 'TypeScript', icon: SiTypescript },
      { label: 'React', icon: SiReact },
      { label: 'Next.js', icon: SiNextdotjs },
      { label: 'REST API' },
      { label: 'Responsive Design' },
    ],
  },
  {
    category: '3D & Animation',
    color: 'text-emerald-500',
    borderColor: 'hover:border-emerald-400 dark:hover:border-emerald-500',
    textColor: 'hover:text-emerald-600 dark:hover:text-emerald-400',
    tags: [
      { label: 'Three.js', icon: SiThreedotjs },
      { label: 'React Three Fiber', icon: TbBrandThreejs },
      { label: 'CSS Animations' },
      { label: 'HTML5 Canvas' },
    ],
  },
  {
    category: 'Styling',
    color: 'text-pink-500',
    borderColor: 'hover:border-pink-400 dark:hover:border-pink-500',
    textColor: 'hover:text-pink-600 dark:hover:text-pink-400',
    tags: [
      { label: 'Tailwind CSS', icon: SiTailwindcss },
      { label: 'SCSS', icon: SiSass },
      { label: 'Bootstrap', icon: SiBootstrap },
    ],
  },
  {
    category: 'Tools & Workflow',
    color: 'text-violet-500',
    borderColor: 'hover:border-violet-400 dark:hover:border-violet-500',
    textColor: 'hover:text-violet-600 dark:hover:text-violet-400',
    tags: [
      { label: 'Git', icon: SiGit },
      { label: 'GitHub', icon: SiGithub },
      { label: 'GitLab', icon: SiGitlab },
      { label: 'Vite', icon: SiVite },
      { label: 'Webpack', icon: SiWebpack },
      { label: 'Gulp', icon: SiGulp },
      { label: 'npm', icon: SiNpm },
      { label: 'ESLint', icon: SiEslint },
      { label: 'Prettier', icon: SiPrettier },
      { label: 'Figma', icon: SiFigma },
    ],
  },
  {
    category: 'AI Tools',
    color: 'text-amber-500',
    borderColor: 'hover:border-amber-400 dark:hover:border-amber-500',
    textColor: 'hover:text-amber-600 dark:hover:text-amber-400',
    tags: [
      { label: 'ChatGPT', icon: SiOpenai },
      { label: 'Claude', icon: FaRobot },
      { label: 'Gemini', icon: SiGooglegemini },
      { label: 'GitHub Copilot' },
    ],
  },
  {
    category: 'Other',
    color: 'text-slate-500',
    borderColor: 'hover:border-slate-400 dark:hover:border-slate-500',
    textColor: 'hover:text-slate-600 dark:hover:text-slate-400',
    tags: [
      { label: 'Node.js', icon: SiNodedotjs },
      { label: 'WordPress', icon: SiWordpress },
      { label: 'Joomla', icon: SiJoomla },
      { label: 'OOP' },
      { label: 'MVP' },
    ],
  },
];

const SkillCategory = ({
                         category,
                         color,
                         borderColor,
                         textColor,
                         tags,
                         index,
                       }: Category & { index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-3',
        'transition-all duration-500 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Заголовок категории с акцентным цветом */}
      <p className={cn(
        'text-xs font-medium tracking-widest uppercase',
        color,
      )}>
        {category}
      </p>

      {/* Теги */}
      <div className="flex flex-wrap gap-2">
        {tags.map(({ label, icon: Icon }) => (
          <span
            key={label}
            className={cn(
              'inline-flex items-center gap-1.5',
              'px-3 py-1.5 rounded-lg text-sm font-medium',
              'bg-slate-100 dark:bg-slate-900',
              'border border-slate-200 dark:border-slate-800',
              'text-slate-700 dark:text-slate-300',
              'cursor-default select-none',
              borderColor,
              textColor,
              'transition-colors duration-200',
            )}
          >
            {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export const Skills = () => {
  return (
    <section
      id="skills"
      className={cn(
        'min-h-screen flex items-center',
        'px-6 md:px-16 lg:px-24 py-24',
      )}
    >
      <div className="max-w-6xl mx-auto w-full">

        {/* Заголовок */}
        <div className="mb-16">
          <p className={cn(
            'text-sm font-medium tracking-[0.2em] uppercase mb-3',
            'text-slate-700 dark:text-violet-400',
          )}>
            Skills
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100">
            Tech Stack
          </h2>
        </div>

        {/* Категории */}
        <div className="flex flex-col gap-10">
          {SKILLS.map((item, index) => (
            <SkillCategory key={item.category} {...item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};