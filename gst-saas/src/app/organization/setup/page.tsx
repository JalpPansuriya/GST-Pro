'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Building2,
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    MapPin,
    FileText,
    Users,
    Shield
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';

const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

const organizationSchema = z.object({
    gstin: z.string().regex(gstinRegex, 'Please enter a valid GSTIN (e.g., 27AABCU9603R1ZM)'),
    tradeName: z.string().min(2, 'Trade name is required'),
    legalName: z.string().min(2, 'Legal name is required'),
    address: z.string().min(10, 'Please enter complete address'),
    state: z.string().min(2, 'State is required'),
    pincode: z.string().regex(/^[1-9][0-9]{5}$/, 'Please enter a valid 6-digit pincode'),
    businessType: z.enum(['proprietorship', 'partnership', 'private_limited', 'llp', 'other']),
    role: z.enum(['owner', 'ca', 'accountant']),
});

type OrganizationFormData = z.infer<typeof organizationSchema>;

const businessTypes = [
    { value: 'proprietorship', label: 'Proprietorship', icon: '👤' },
    { value: 'partnership', label: 'Partnership', icon: '🤝' },
    { value: 'private_limited', label: 'Private Limited', icon: '🏢' },
    { value: 'llp', label: 'LLP', icon: '📋' },
    { value: 'other', label: 'Other', icon: '📦' },
];

const roles = [
    { value: 'owner', label: 'Business Owner', description: 'Full access to all features', icon: Shield },
    { value: 'ca', label: 'Chartered Accountant', description: 'View & file returns', icon: FileText },
    { value: 'accountant', label: 'Accountant', description: 'Manage invoices', icon: Users },
];

const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir',
];

export default function OrganizationSetupPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isValidatingGstin, setIsValidatingGstin] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        trigger,
    } = useForm<OrganizationFormData>({
        resolver: zodResolver(organizationSchema),
        defaultValues: {
            businessType: 'proprietorship',
            role: 'owner',
        },
    });

    const gstin = watch('gstin');
    const selectedBusinessType = watch('businessType');
    const selectedRole = watch('role');

    const validateGstin = async () => {
        const isValid = await trigger('gstin');
        if (isValid && gstin) {
            setIsValidatingGstin(true);
            // Simulate API call to validate GSTIN
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Auto-fill some fields based on GSTIN
            const stateCode = gstin.substring(0, 2);
            const stateIndex = parseInt(stateCode) - 1;
            if (stateIndex >= 0 && stateIndex < indianStates.length) {
                setValue('state', indianStates[stateIndex] || '');
            }

            setIsValidatingGstin(false);
            setStep(2);
        }
    };

    const onSubmit = async (data: OrganizationFormData) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Organization data:', data);
        setIsLoading(false);
        router.push('/dashboard');
    };

    const totalSteps = 4;

    return (
        <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
            {/* Header */}
            <header className="border-b border-border bg-white/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <span className="text-white font-bold">G</span>
                        </div>
                        <span className="font-bold text-lg gradient-text">GST Pro</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Step {step} of {totalSteps}</span>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-6 py-12">
                {/* Progress */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                        {[1, 2, 3, 4].map((s) => (
                            <div key={s} className="flex items-center">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: s * 0.1 }}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${step > s
                                            ? 'bg-success text-white'
                                            : step === s
                                                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                                : 'bg-muted text-muted-foreground'
                                        }`}
                                >
                                    {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                                </motion.div>
                                {s < 4 && (
                                    <div className="flex-1 mx-2">
                                        <div className={`h-1 rounded transition-all duration-500 ${step > s ? 'bg-success' : 'bg-muted'
                                            }`} style={{ width: '60px' }} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>GSTIN</span>
                        <span>Business Details</span>
                        <span>Business Type</span>
                        <span>Your Role</span>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {/* Step 1: GSTIN */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center mb-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200 }}
                                    className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4"
                                >
                                    <Building2 className="w-10 h-10 text-primary" />
                                </motion.div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">
                                    Enter your GSTIN
                                </h1>
                                <p className="text-muted-foreground">
                                    We'll automatically fetch your business details from GST portal
                                </p>
                            </div>

                            <Card className="shadow-xl">
                                <CardContent className="pt-6">
                                    <div className="space-y-6">
                                        <Input
                                            label="GSTIN (GST Identification Number)"
                                            placeholder="27AABCU9603R1ZM"
                                            error={errors.gstin?.message}
                                            hint="15-character alphanumeric code"
                                            className="text-lg uppercase tracking-wider"
                                            {...register('gstin', {
                                                onChange: (e) => {
                                                    e.target.value = e.target.value.toUpperCase();
                                                }
                                            })}
                                        />

                                        <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                                            <p className="text-sm font-medium">GSTIN Format:</p>
                                            <div className="flex flex-wrap gap-1 text-xs font-mono">
                                                <span className="bg-primary/10 text-primary px-2 py-1 rounded">27</span>
                                                <span className="text-muted-foreground">(State)</span>
                                                <span className="bg-accent/10 text-accent px-2 py-1 rounded">AABCU</span>
                                                <span className="text-muted-foreground">(PAN)</span>
                                                <span className="bg-success/10 text-success px-2 py-1 rounded">9603</span>
                                                <span className="bg-warning/10 text-warning px-2 py-1 rounded">R1ZM</span>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={validateGstin}
                                            className="w-full"
                                            size="lg"
                                            isLoading={isValidatingGstin}
                                            rightIcon={<ArrowRight className="w-5 h-5" />}
                                        >
                                            {isValidatingGstin ? 'Validating GSTIN...' : 'Validate & Continue'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Step 2: Business Details */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center mb-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-20 h-20 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4"
                                >
                                    <MapPin className="w-10 h-10 text-success" />
                                </motion.div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">
                                    Verify Business Details
                                </h1>
                                <p className="text-muted-foreground">
                                    Confirm or update your business information
                                </p>
                            </div>

                            <Card className="shadow-xl">
                                <CardContent className="pt-6">
                                    <form className="space-y-5">
                                        <Input
                                            label="Trade Name"
                                            placeholder="ABC Textiles"
                                            error={errors.tradeName?.message}
                                            {...register('tradeName')}
                                        />
                                        <Input
                                            label="Legal Name"
                                            placeholder="ABC Textiles Pvt. Ltd."
                                            error={errors.legalName?.message}
                                            {...register('legalName')}
                                        />
                                        <Input
                                            label="Registered Address"
                                            placeholder="123, Industrial Area, Mumbai"
                                            error={errors.address?.message}
                                            {...register('address')}
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1.5">State</label>
                                                <select
                                                    className="w-full h-12 px-4 rounded-xl border-2 border-border bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                                    {...register('state')}
                                                >
                                                    <option value="">Select State</option>
                                                    {indianStates.map(state => (
                                                        <option key={state} value={state}>{state}</option>
                                                    ))}
                                                </select>
                                                {errors.state && (
                                                    <p className="text-sm text-destructive mt-1">{errors.state.message}</p>
                                                )}
                                            </div>
                                            <Input
                                                label="Pincode"
                                                placeholder="400001"
                                                error={errors.pincode?.message}
                                                {...register('pincode')}
                                            />
                                        </div>

                                        <div className="flex gap-3 pt-4">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setStep(1)}
                                                className="w-full"
                                                size="lg"
                                                leftIcon={<ArrowLeft className="w-5 h-5" />}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={async () => {
                                                    const isValid = await trigger(['tradeName', 'legalName', 'address', 'state', 'pincode']);
                                                    if (isValid) setStep(3);
                                                }}
                                                className="w-full"
                                                size="lg"
                                                rightIcon={<ArrowRight className="w-5 h-5" />}
                                            >
                                                Continue
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Step 3: Business Type */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center mb-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4"
                                >
                                    <FileText className="w-10 h-10 text-accent" />
                                </motion.div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">
                                    Business Type
                                </h1>
                                <p className="text-muted-foreground">
                                    Select your business constitution type
                                </p>
                            </div>

                            <div className="space-y-3 mb-8">
                                {businessTypes.map((type, index) => (
                                    <motion.div
                                        key={type.value}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <label
                                            className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${selectedBusinessType === type.value
                                                    ? 'border-primary bg-primary/5 shadow-lg'
                                                    : 'border-border hover:border-primary/50 bg-white'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                value={type.value}
                                                className="hidden"
                                                {...register('businessType')}
                                            />
                                            <span className="text-2xl">{type.icon}</span>
                                            <span className="font-medium flex-1">{type.label}</span>
                                            {selectedBusinessType === type.value && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                >
                                                    <CheckCircle className="w-5 h-5 text-primary" />
                                                </motion.div>
                                            )}
                                        </label>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setStep(2)}
                                    className="w-full"
                                    size="lg"
                                    leftIcon={<ArrowLeft className="w-5 h-5" />}
                                >
                                    Back
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setStep(4)}
                                    className="w-full"
                                    size="lg"
                                    rightIcon={<ArrowRight className="w-5 h-5" />}
                                >
                                    Continue
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4: Your Role */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center mb-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-20 h-20 rounded-2xl bg-warning/10 flex items-center justify-center mx-auto mb-4"
                                >
                                    <Users className="w-10 h-10 text-warning" />
                                </motion.div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">
                                    Your Role
                                </h1>
                                <p className="text-muted-foreground">
                                    Select your role in this organization
                                </p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-3 mb-8">
                                    {roles.map((role, index) => {
                                        const Icon = role.icon;
                                        return (
                                            <motion.div
                                                key={role.value}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <label
                                                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${selectedRole === role.value
                                                            ? 'border-primary bg-primary/5 shadow-lg'
                                                            : 'border-border hover:border-primary/50 bg-white'
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        value={role.value}
                                                        className="hidden"
                                                        {...register('role')}
                                                    />
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedRole === role.value ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                                                        }`}>
                                                        <Icon className="w-6 h-6" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-semibold">{role.label}</p>
                                                        <p className="text-sm text-muted-foreground">{role.description}</p>
                                                    </div>
                                                    {selectedRole === role.value && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                        >
                                                            <CheckCircle className="w-5 h-5 text-primary" />
                                                        </motion.div>
                                                    )}
                                                </label>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setStep(3)}
                                        className="w-full"
                                        size="lg"
                                        leftIcon={<ArrowLeft className="w-5 h-5" />}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        size="lg"
                                        isLoading={isLoading}
                                        rightIcon={<CheckCircle className="w-5 h-5" />}
                                    >
                                        Complete Setup
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
