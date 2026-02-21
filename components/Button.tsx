import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'rounded-2xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-velora-primary to-velora-secondary text-white shadow-lg hover:shadow-xl hover:from-velora-secondary hover:to-velora-accent dark:from-velora-primary/90 dark:to-velora-secondary/90',
    outline:
      'border-2 border-velora-primary text-velora-primary hover:bg-velora-primary hover:text-white dark:border-velora-secondary dark:text-velora-secondary dark:hover:bg-velora-secondary/20',
    danger:
      'bg-red-400 text-white shadow-lg hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-700',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
