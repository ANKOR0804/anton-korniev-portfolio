'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { MdClose } from 'react-icons/md';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async () => {
    if (!name || !email || !message) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setStatus('idle'), 300);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={cn(
          'fixed left-4 right-4 top-1/2 -translate-y-1/2 z-50',
          'md:left-1/2 md:right-auto md:w-full md:max-w-md md:-translate-x-1/2',
          'bg-white dark:bg-slate-900',
          'border border-slate-200 dark:border-slate-800',
          'rounded-2xl shadow-2xl',
          'p-6',
        )}
      >
        {/* Шапка */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Get in Touch
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              I&#39;ll get back to you as soon as possible.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        {status === 'success' ? (
          <div className="text-center py-8">
            <p className="text-2xl mb-2">✅</p>
            <p className="font-medium text-slate-900 dark:text-slate-100">
              Message sent!
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Thanks, I&#39;ll be in touch soon.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium tracking-wide uppercase text-slate-400 dark:text-slate-500">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className={cn(
                  'px-4 py-2.5 rounded-lg text-sm',
                  'bg-slate-50 dark:bg-slate-800',
                  'border border-slate-200 dark:border-slate-700',
                  'text-slate-900 dark:text-slate-100',
                  'placeholder:text-slate-400 dark:placeholder:text-slate-600',
                  'focus:outline-none focus:border-sky-400 dark:focus:border-sky-500',
                  'transition-colors duration-200',
                )}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium tracking-wide uppercase text-slate-400 dark:text-slate-500">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className={cn(
                  'px-4 py-2.5 rounded-lg text-sm',
                  'bg-slate-50 dark:bg-slate-800',
                  'border border-slate-200 dark:border-slate-700',
                  'text-slate-900 dark:text-slate-100',
                  'placeholder:text-slate-400 dark:placeholder:text-slate-600',
                  'focus:outline-none focus:border-sky-400 dark:focus:border-sky-500',
                  'transition-colors duration-200',
                )}
              />
              {email && !isValidEmail(email) && (
                <p className="text-xs text-red-500">Invalid email address</p>
              )}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium tracking-wide uppercase text-slate-400 dark:text-slate-500">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Anton, I'd like to..."
                rows={4}
                className={cn(
                  'px-4 py-2.5 rounded-lg text-sm resize-none',
                  'bg-slate-50 dark:bg-slate-800',
                  'border border-slate-200 dark:border-slate-700',
                  'text-slate-900 dark:text-slate-100',
                  'placeholder:text-slate-400 dark:placeholder:text-slate-600',
                  'focus:outline-none focus:border-sky-400 dark:focus:border-sky-500',
                  'transition-colors duration-200',
                )}
              />
            </div>

            {/* Error */}
            {status === 'error' && (
              <p className="text-sm text-red-500">
                Something went wrong. Please try again or contact me directly.
              </p>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!name || !email || !message || !isValidEmail(email)}
              className={cn(
                'w-full py-2.5 rounded-lg text-sm font-medium',
                'bg-slate-900 dark:bg-slate-100',
                'text-white dark:text-slate-900',
                'hover:bg-slate-700 dark:hover:bg-slate-300',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-colors duration-200',
              )}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};
