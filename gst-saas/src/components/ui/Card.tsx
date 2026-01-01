'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    glass?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

interface CardTitleProps {
    children: ReactNode;
    className?: string;
}

interface CardDescriptionProps {
    children: ReactNode;
    className?: string;
}

interface CardContentProps {
    children: ReactNode;
    className?: string;
}

interface CardFooterProps {
    children: ReactNode;
    className?: string;
}

const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
};

const Card = ({
    children,
    className = '',
    hover = false,
    glass = false,
    padding = 'md'
}: CardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={hover ? { y: -4, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' } : {}}
            className={`
        rounded-2xl border border-border
        ${glass ? 'bg-white/80 backdrop-blur-xl' : 'bg-card'}
        shadow-sm
        transition-all duration-300 ease-out
        ${paddingStyles[padding]}
        ${className}
      `}
        >
            {children}
        </motion.div>
    );
};

const CardHeader = ({ children, className = '' }: CardHeaderProps) => {
    return (
        <div className={`space-y-1.5 ${className}`}>
            {children}
        </div>
    );
};

const CardTitle = ({ children, className = '' }: CardTitleProps) => {
    return (
        <h3 className={`text-xl font-semibold text-card-foreground leading-tight ${className}`}>
            {children}
        </h3>
    );
};

const CardDescription = ({ children, className = '' }: CardDescriptionProps) => {
    return (
        <p className={`text-sm text-muted-foreground ${className}`}>
            {children}
        </p>
    );
};

const CardContent = ({ children, className = '' }: CardContentProps) => {
    return (
        <div className={`pt-4 ${className}`}>
            {children}
        </div>
    );
};

const CardFooter = ({ children, className = '' }: CardFooterProps) => {
    return (
        <div className={`flex items-center pt-4 ${className}`}>
            {children}
        </div>
    );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
