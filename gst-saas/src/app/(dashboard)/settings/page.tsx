'use client';

import { motion } from 'framer-motion';
import {
    Settings,
    User,
    Bell,
    Shield,
    Palette,
    Globe,
    CreditCard,
    ChevronRight,
    Moon,
    Sun,
    Mail,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/context/ThemeContext';

const settingsSections = [
    {
        title: 'Account',
        description: 'Manage your personal information',
        icon: User,
        items: [
            { label: 'Profile', description: 'Update your name, email, and photo' },
            { label: 'Password', description: 'Change your password' },
            { label: 'Two-Factor Auth', description: 'Add an extra layer of security' },
        ],
    },
    {
        title: 'Notifications',
        description: 'Configure how you receive updates',
        icon: Bell,
        items: [
            { label: 'Email Notifications', description: 'Get email alerts for important events' },
            { label: 'Due Date Reminders', description: 'Reminders before GST filing deadlines' },
            { label: 'Weekly Reports', description: 'Receive weekly summary reports' },
        ],
    },
    {
        title: 'Security',
        description: 'Protect your account',
        icon: Shield,
        items: [
            { label: 'Active Sessions', description: 'Manage your logged in devices' },
            { label: 'API Keys', description: 'Manage API access tokens' },
            { label: 'Audit Log', description: 'View account activity history' },
        ],
    },
    {
        title: 'Billing',
        description: 'Manage your subscription',
        icon: CreditCard,
        items: [
            { label: 'Current Plan', description: 'Professional - ₹1,499/month' },
            { label: 'Payment Method', description: 'Update your payment details' },
            { label: 'Invoices', description: 'View and download billing history' },
        ],
    },
];

export default function SettingsPage() {
    const { theme, toggleTheme } = useTheme();
    const darkMode = theme === 'dark';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
            </div>

            {/* Quick Preferences */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Palette className="w-5 h-5 text-primary" />
                        <div>
                            <CardTitle>Preferences</CardTitle>
                            <CardDescription>Customize your experience</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                            <div className="flex items-center gap-3">
                                {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                                <div>
                                    <p className="font-medium">Dark Mode</p>
                                    <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleTheme}
                                className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-primary' : 'bg-muted'}`}
                            >
                                <motion.div
                                    animate={{ x: darkMode ? 24 : 2 }}
                                    className="w-5 h-5 bg-white rounded-full shadow"
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Globe className="w-5 h-5" />
                                <div>
                                    <p className="font-medium">Language</p>
                                    <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                                </div>
                            </div>
                            <select className="h-9 px-3 rounded-lg bg-white border border-border text-sm">
                                <option>English</option>
                                <option>हिंदी</option>
                                <option>ગુજરાતી</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5" />
                                <div>
                                    <p className="font-medium">Email Digest</p>
                                    <p className="text-sm text-muted-foreground">How often to receive email updates</p>
                                </div>
                            </div>
                            <select className="h-9 px-3 rounded-lg bg-white border border-border text-sm">
                                <option>Daily</option>
                                <option>Weekly</option>
                                <option>Monthly</option>
                                <option>Never</option>
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Settings Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {settingsSections.map((section, index) => {
                    const Icon = section.icon;
                    return (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <Icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle>{section.title}</CardTitle>
                                            <CardDescription>{section.description}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {section.items.map((item) => (
                                            <button
                                                key={item.label}
                                                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors text-left"
                                            >
                                                <div>
                                                    <p className="font-medium">{item.label}</p>
                                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                            </button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Danger Zone */}
            <Card className="border-destructive/50">
                <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <CardDescription>Irreversible and destructive actions</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Delete Account</p>
                            <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                        </div>
                        <Button variant="destructive">Delete Account</Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
