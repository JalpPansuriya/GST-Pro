'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, User, Building2, ArrowRight, Phone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const signupSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
    organizationName: z.string().min(2, 'Organization name is required'),
    acceptTerms: z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms and conditions',
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

type SignupFormData = z.infer<typeof signupSchema>;

const getPasswordStrength = (password: string): { score: number; label: string; color: string } => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { score, label: 'Weak', color: 'bg-destructive' };
    if (score <= 3) return { score, label: 'Medium', color: 'bg-warning' };
    return { score, label: 'Strong', color: 'bg-success' };
};

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        trigger,
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        mode: 'onChange',
    });

    const password = watch('password', '');
    const passwordStrength = getPasswordStrength(password);

    const onSubmit = async (data: SignupFormData) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log('Signup data:', data);
        setIsLoading(false);
        router.push('/organization/setup');
    };

    const nextStep = async () => {
        const fieldsToValidate = step === 1
            ? ['fullName', 'email', 'phone'] as const
            : ['password', 'confirmPassword'] as const;

        const isValid = await trigger(fieldsToValidate);
        if (isValid) setStep(step + 1);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Form */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background"
            >
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                <span className="text-white text-xl font-bold">G</span>
                            </div>
                            <span className="text-2xl font-bold gradient-text">GST Pro</span>
                        </Link>
                    </motion.div>

                    {/* Progress Steps */}
                    <div className="flex items-center gap-2 mb-8">
                        {[1, 2, 3].map((s) => (
                            <motion.div
                                key={s}
                                className="flex items-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: s * 0.1 }}
                            >
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${step > s
                                            ? 'bg-success text-white'
                                            : step === s
                                                ? 'bg-primary text-white'
                                                : 'bg-muted text-muted-foreground'
                                        }`}
                                >
                                    {step > s ? <CheckCircle className="w-4 h-4" /> : s}
                                </div>
                                {s < 3 && (
                                    <div
                                        className={`w-16 h-1 mx-2 rounded transition-all duration-300 ${step > s ? 'bg-success' : 'bg-muted'
                                            }`}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-foreground mb-2">
                            {step === 1 && 'Create your account'}
                            {step === 2 && 'Set your password'}
                            {step === 3 && 'Organization details'}
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            {step === 1 && 'Start your GST compliance journey today'}
                            {step === 2 && 'Choose a strong password to secure your account'}
                            {step === 3 && 'Tell us about your business'}
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* Step 1: Personal Info */}
                            {step === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-5"
                                >
                                    <Input
                                        label="Full name"
                                        placeholder="John Doe"
                                        leftIcon={<User className="w-5 h-5" />}
                                        error={errors.fullName?.message}
                                        {...register('fullName')}
                                    />
                                    <Input
                                        label="Email address"
                                        type="email"
                                        placeholder="you@company.com"
                                        leftIcon={<Mail className="w-5 h-5" />}
                                        error={errors.email?.message}
                                        {...register('email')}
                                    />
                                    <Input
                                        label="Phone number"
                                        type="tel"
                                        placeholder="9876543210"
                                        leftIcon={<Phone className="w-5 h-5" />}
                                        error={errors.phone?.message}
                                        {...register('phone')}
                                    />
                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        className="w-full"
                                        size="lg"
                                        rightIcon={<ArrowRight className="w-5 h-5" />}
                                    >
                                        Continue
                                    </Button>
                                </motion.div>
                            )}

                            {/* Step 2: Password */}
                            {step === 2 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-5"
                                >
                                    <div>
                                        <Input
                                            label="Password"
                                            type="password"
                                            placeholder="Create a strong password"
                                            leftIcon={<Lock className="w-5 h-5" />}
                                            error={errors.password?.message}
                                            {...register('password')}
                                        />
                                        {password && (
                                            <div className="mt-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                                        <motion.div
                                                            className={`h-full ${passwordStrength.color}`}
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                                                            transition={{ duration: 0.3 }}
                                                        />
                                                    </div>
                                                    <span className={`text-xs font-medium ${passwordStrength.label === 'Weak' ? 'text-destructive' :
                                                            passwordStrength.label === 'Medium' ? 'text-warning' : 'text-success'
                                                        }`}>
                                                        {passwordStrength.label}
                                                    </span>
                                                </div>
                                                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                                                    <li className={password.length >= 8 ? 'text-success' : ''}>
                                                        ✓ At least 8 characters
                                                    </li>
                                                    <li className={/[A-Z]/.test(password) ? 'text-success' : ''}>
                                                        ✓ One uppercase letter
                                                    </li>
                                                    <li className={/[0-9]/.test(password) ? 'text-success' : ''}>
                                                        ✓ One number
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <Input
                                        label="Confirm password"
                                        type="password"
                                        placeholder="Confirm your password"
                                        leftIcon={<Lock className="w-5 h-5" />}
                                        error={errors.confirmPassword?.message}
                                        {...register('confirmPassword')}
                                    />
                                    <div className="flex gap-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setStep(1)}
                                            className="w-full"
                                            size="lg"
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            className="w-full"
                                            size="lg"
                                            rightIcon={<ArrowRight className="w-5 h-5" />}
                                        >
                                            Continue
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: Organization */}
                            {step === 3 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-5"
                                >
                                    <Input
                                        label="Organization name"
                                        placeholder="ABC Textiles Pvt. Ltd."
                                        leftIcon={<Building2 className="w-5 h-5" />}
                                        error={errors.organizationName?.message}
                                        {...register('organizationName')}
                                    />

                                    <div className="bg-muted/50 rounded-xl p-4 border border-border">
                                        <p className="text-sm text-muted-foreground mb-3">
                                            You'll be able to add your GSTIN and complete organization setup after registration.
                                        </p>
                                        <ul className="text-sm space-y-2">
                                            <li className="flex items-center gap-2 text-muted-foreground">
                                                <CheckCircle className="w-4 h-4 text-success" />
                                                Add multiple GSTINs
                                            </li>
                                            <li className="flex items-center gap-2 text-muted-foreground">
                                                <CheckCircle className="w-4 h-4 text-success" />
                                                Invite team members
                                            </li>
                                            <li className="flex items-center gap-2 text-muted-foreground">
                                                <CheckCircle className="w-4 h-4 text-success" />
                                                Assign CA access
                                            </li>
                                        </ul>
                                    </div>

                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 mt-1 rounded border-border text-primary focus:ring-primary"
                                            {...register('acceptTerms')}
                                        />
                                        <span className="text-sm text-muted-foreground">
                                            I agree to the{' '}
                                            <Link href="/terms" className="text-primary hover:text-primary/80">
                                                Terms of Service
                                            </Link>{' '}
                                            and{' '}
                                            <Link href="/privacy" className="text-primary hover:text-primary/80">
                                                Privacy Policy
                                            </Link>
                                        </span>
                                    </label>
                                    {errors.acceptTerms && (
                                        <p className="text-sm text-destructive">{errors.acceptTerms.message}</p>
                                    )}

                                    <div className="flex gap-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setStep(2)}
                                            className="w-full"
                                            size="lg"
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            size="lg"
                                            isLoading={isLoading}
                                            rightIcon={<ArrowRight className="w-5 h-5" />}
                                        >
                                            Create account
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </form>

                        <p className="text-center text-sm text-muted-foreground mt-8">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Side - Branding */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-accent via-accent/90 to-primary relative overflow-hidden"
            >
                {/* Decorative Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 flex flex-col justify-center px-16 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold mb-6">
                            Join thousands of Indian businesses
                        </h2>
                        <p className="text-xl text-white/80 mb-8">
                            GST Pro is trusted by textile traders, embroidery units, and small businesses across India.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { value: '10K+', label: 'Businesses' },
                                { value: '₹500Cr+', label: 'GST Computed' },
                                { value: '99.9%', label: 'Accuracy' },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className="text-center"
                                >
                                    <p className="text-3xl font-bold">{stat.value}</p>
                                    <p className="text-sm text-white/70">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
