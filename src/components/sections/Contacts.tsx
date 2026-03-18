'use client';

import { cn } from '@/lib/utils';
import { SiTelegram, SiWhatsapp, SiGmail } from 'react-icons/si';
import { FaBriefcase } from 'react-icons/fa';

const CONTACTS = [
  {
    label: 'Email',
    value: 'anton.kornevvv@gmail.com',
    href: 'mailto:anton.kornevvv@gmail.com',
    icon: SiGmail,
    color:
      'hover:border-red-400 dark:hover:border-red-500 hover:text-red-600 dark:hover:text-red-400',
    iconColor: 'text-red-500',
  },
  {
    label: 'Telegram',
    value: '@anton_korniev',
    href: 'https://t.me/+380637923777',
    icon: SiTelegram,
    color:
      'hover:border-sky-400 dark:hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400',
    iconColor: 'text-sky-500',
  },
  {
    label: 'WhatsApp',
    value: '+380 63 792 37 77',
    href: 'https://wa.me/380637923777',
    icon: SiWhatsapp,
    color:
      'hover:border-emerald-400 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400',
    iconColor: 'text-emerald-500',
  },
  {
    label: 'Djinni',
    value: 'djinni.co/anton-korniev',
    href: 'https://djinni.co/q/a22bea5f42/',
    icon: FaBriefcase,
    color:
      'hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400',
    iconColor: 'text-violet-500',
  },
];

export const Contacts = () => {
  return (
    <section
      id="contacts"
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
            Contacts
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Get in Touch
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-md">
            Open to new opportunities. Feel free to reach out via any channel
            below.
          </p>
        </div>

        {/* Контакты */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
          {CONTACTS.map(
            ({ label, value, href, icon: Icon, color, iconColor }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center gap-3',
                  'px-5 py-4 rounded-2xl',
                  'bg-slate-50 dark:bg-slate-900',
                  'border border-slate-200 dark:border-slate-800',
                  'text-slate-700 dark:text-slate-300',
                  'transition-all duration-200',
                  'group',
                  color,
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5 shrink-0 transition-colors duration-200',
                    iconColor,
                  )}
                />
                <div className="flex flex-col">
                  <span className="text-xs font-medium tracking-widest uppercase text-slate-400 dark:text-slate-500">
                    {label}
                  </span>
                  <span className="text-sm font-medium">{value}</span>
                </div>
              </a>
            ),
          )}
        </div>
      </div>
    </section>
  );
};
