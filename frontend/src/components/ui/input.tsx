import React, { InputHTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex-grow bg-transparent border-none focus:ring-0 rounded-l-full px-4 py-2 text-sm",
          "focus:outline-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };