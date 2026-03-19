'use client';

import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useIsMounted } from '@/hooks/useIsMounted';

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) return <div className="w-[52px] h-7" />;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={cn(
        'group relative inline-flex items-center gap-2.5 cursor-pointer select-none',
      )}
    >
      <span
        className={cn(
          'text-[13px] font-medium tracking-wide min-w-[30px]',
          'opacity-70 transition-opacity duration-200 group-hover:opacity-100',
        )}
      >
        {isDark ? 'Dark' : 'Light'}
      </span>

      <div
        className={cn(
          'relative w-[52px] h-7 rounded-full',
          'transition-colors duration-300 ease-in-out',
          'shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]',
          isDark ? 'bg-slate-200' : 'bg-slate-800',
        )}
      >
        <div
          className={cn(
            'absolute top-[3px] w-[22px] h-[22px] rounded-full',
            'flex items-center justify-center text-xs',
            'shadow-[0_1px_4px_rgba(0,0,0,0.25)]',
            'transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
            isDark ? 'left-[27px] bg-slate-800' : 'left-[3px] bg-slate-50',
          )}
        >
          {isDark ? '🌙' : '☀️'}
        </div>
      </div>
    </button>
  );
};
