'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    success?: string;
    hint?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({
        className = '',
        label,
        error,
        success,
        hint,
        type = 'text',
        leftIcon,
        rightIcon,
        ...props
    }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const [isFocused, setIsFocused] = useState(false);

        const isPassword = type === 'password';
        const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

        const hasError = !!error;
        const hasSuccess = !!success;

        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <motion.label
                        className={`
              block text-sm font-medium transition-colors duration-200
              ${hasError ? 'text-destructive' : hasSuccess ? 'text-success' : 'text-foreground'}
            `}
                        animate={{
                            color: isFocused ? 'var(--primary)' : hasError ? 'var(--destructive)' : 'var(--foreground)'
                        }}
                    >
                        {label}
                    </motion.label>
                )}

                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {leftIcon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        type={inputType}
                        className={`
              w-full h-12 px-4 
              ${leftIcon ? 'pl-11' : ''} 
              ${rightIcon || isPassword ? 'pr-11' : ''}
              bg-white border-2 rounded-xl
              text-foreground placeholder:text-muted-foreground
              transition-all duration-200 ease-out
              focus:outline-none focus:scale-[1.01]
              ${hasError
                                ? 'border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20'
                                : hasSuccess
                                    ? 'border-success focus:border-success focus:ring-2 focus:ring-success/20'
                                    : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                            }
              ${className}
            `}
                        onFocus={(e) => {
                            setIsFocused(true);
                            props.onFocus?.(e);
                        }}
                        onBlur={(e) => {
                            setIsFocused(false);
                            props.onBlur?.(e);
                        }}
                        {...props}
                    />

                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    )}

                    {!isPassword && rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {rightIcon}
                        </div>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {(error || success || hint) && (
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className={`
                flex items-center gap-1.5 text-sm
                ${hasError ? 'text-destructive' : hasSuccess ? 'text-success' : 'text-muted-foreground'}
              `}
                        >
                            {hasError && <AlertCircle className="w-4 h-4" />}
                            {hasSuccess && <CheckCircle className="w-4 h-4" />}
                            {error || success || hint}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };
export type { InputProps };
