import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonAsButton = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button';
  href?: never;
};

type ButtonAsAnchor = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: 'a';
  href: string;
};

type ButtonProps = (ButtonAsButton | ButtonAsAnchor) & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  as: Tag = 'button',
  ...props
}: ButtonProps) => {
  return (
    <Tag
      className={cn(
        'inline-flex items-center justify-center font-medium tracking-wide',
        'rounded-lg transition-opacity duration-200 hover:opacity-80',
        'disabled:opacity-40 disabled:cursor-not-allowed',

        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-6 py-3 text-sm',
        size === 'lg' && 'px-8 py-4 text-base',

        variant === 'primary' &&
          'bg-[var(--foreground)] text-[var(--background)]',
        variant === 'outline' &&
          'border border-[var(--foreground)]/30 hover:border-[var(--foreground)]/60',

        className,
      )}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement> &
        React.AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {children}
    </Tag>
  );
};
