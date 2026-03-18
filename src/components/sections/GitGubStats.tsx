'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { SiGithub } from 'react-icons/si';

type GitHubData = {
  avatar: string;
  name: string;
  bio: string;
  repos: number;
  followers: number;
  following: number;
  topLanguages: { name: string; count: number }[];
};

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  HTML: 'bg-orange-500',
  CSS: 'bg-purple-500',
  SCSS: 'bg-pink-500',
  Python: 'bg-green-500',
  Vue: 'bg-emerald-500',
  Shell: 'bg-slate-500',
};

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <div
    className={cn(
      'flex flex-col items-center gap-1 p-4 rounded-xl',
      'bg-slate-100 dark:bg-slate-800',
      'border border-slate-200 dark:border-slate-700',
    )}
  >
    <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
      {value}
    </span>
    <span className="text-xs font-medium tracking-widest uppercase text-slate-400 dark:text-slate-500">
      {label}
    </span>
  </div>
);

export const GitHubStats = () => {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/github')
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const maxCount = data?.topLanguages[0]?.count ?? 1;

  return (
    <section id="github" className="flex items-center py-24">
      <div className="container mx-auto px-6 md:px-16">
        {/* Заголовок */}
        <div className="mb-16">
          <p
            className={cn(
              'text-sm font-medium tracking-[0.2em] uppercase mb-3',
              'text-slate-700 dark:text-violet-400',
            )}
          >
            GitHub
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100">
            GitHub Stats
          </h2>
        </div>

        {loading && (
          <div className="text-slate-400 dark:text-slate-500 text-sm">
            Loading...
          </div>
        )}

        {error && (
          <div className="text-red-400 text-sm">
            Failed to load GitHub data.
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Левая колонка — профиль + статы */}
            <div className="flex flex-col gap-6">
              {/* Профиль */}
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.avatar}
                  alt={data.name}
                  className="w-16 h-16 rounded-full ring-2 ring-slate-200 dark:ring-slate-700"
                />
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100">
                    {data.name}
                  </p>
                  {data.bio && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      {data.bio}
                    </p>
                  )}
                  <a
                    href="https://github.com/ANKOR0804"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors mt-1"
                  >
                    <SiGithub className="w-3.5 h-3.5" />
                    ANKOR0804
                  </a>
                </div>
              </div>

              {/* Статы */}
              <div className="grid grid-cols-3 gap-3">
                <StatCard label="Repos" value={data.repos} />
                <StatCard label="Followers" value={data.followers} />
                <StatCard label="Following" value={data.following} />
              </div>
            </div>

            {/* Правая колонка — языки */}
            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium tracking-widest uppercase text-slate-400 dark:text-slate-500">
                Top Languages
              </p>
              <div className="flex flex-col gap-3">
                {data.topLanguages.map(({ name, count }) => (
                  <div key={name} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {name}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        {count} repos
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className={cn(
                          'h-1.5 rounded-full transition-all duration-700',
                          LANGUAGE_COLORS[name] ?? 'bg-slate-400',
                        )}
                        style={{ width: `${(count / maxCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
