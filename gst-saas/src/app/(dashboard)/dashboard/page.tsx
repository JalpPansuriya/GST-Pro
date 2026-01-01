'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    ArrowDownRight,
    FileText,
    Upload,
    Calculator,
    Calendar,
    ChevronDown,
    IndianRupee,
    AlertCircle,
    CheckCircle,
    Clock,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

// Mock data
const gstSummary = {
    outputGst: 245680,
    inputGst: 189420,
    netPayable: 56260,
    cgst: { output: 98272, input: 75768 },
    sgst: { output: 98272, input: 75768 },
    igst: { output: 49136, input: 37884 },
};

const recentInvoices = [
    { id: 1, number: 'INV-2026-001', party: 'XYZ Fabrics', amount: 125000, gst: 22500, type: 'sales', date: '2026-01-01' },
    { id: 2, number: 'PO-2026-012', party: 'ABC Threads Pvt Ltd', amount: 85000, gst: 15300, type: 'purchase', date: '2025-12-31' },
    { id: 3, number: 'INV-2026-002', party: 'PQR Textiles', amount: 210000, gst: 37800, type: 'sales', date: '2025-12-30' },
    { id: 4, number: 'PO-2026-013', party: 'LMN Dyes', amount: 45000, gst: 8100, type: 'purchase', date: '2025-12-29' },
];

const complianceStatus = [
    { label: 'GSTR-1 (Dec 2025)', status: 'filed', dueDate: 'Jan 11, 2026' },
    { label: 'GSTR-3B (Dec 2025)', status: 'pending', dueDate: 'Jan 20, 2026' },
    { label: 'GSTR-1 (Jan 2026)', status: 'upcoming', dueDate: 'Feb 11, 2026' },
];

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};

const AnimatedNumber = ({ value }: { value: number }) => {
    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {formatCurrency(value)}
        </motion.span>
    );
};

export default function DashboardPage() {
    const [selectedMonth, setSelectedMonth] = useState('January');
    const [selectedYear, setSelectedYear] = useState('2026');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
            },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            {/* Page Header */}
            <motion.div variants={itemVariants} className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">GST Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Overview of your GST compliance status</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Month Selector */}
                    <div className="relative">
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="h-10 pl-4 pr-10 rounded-xl bg-white border border-border text-sm font-medium appearance-none cursor-pointer focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        >
                            {months.map((month) => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>

                    {/* Year Selector */}
                    <div className="relative">
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="h-10 pl-4 pr-10 rounded-xl bg-white border border-border text-sm font-medium appearance-none cursor-pointer focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        >
                            <option value="2026">2026</option>
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/invoices/upload">
                    <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-4 bg-gradient-to-br from-primary to-primary/80 rounded-2xl text-white cursor-pointer shadow-lg shadow-primary/20"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                                <Upload className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-semibold">Upload Invoices</p>
                                <p className="text-sm text-white/80">Excel or PDF format</p>
                            </div>
                        </div>
                    </motion.div>
                </Link>

                <Link href="/gst">
                    <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-4 bg-gradient-to-br from-accent to-accent/80 rounded-2xl text-white cursor-pointer shadow-lg shadow-accent/20"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                                <Calculator className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-semibold">Calculate GST</p>
                                <p className="text-sm text-white/80">Monthly computation</p>
                            </div>
                        </div>
                    </motion.div>
                </Link>

                <Link href="/reports/gstr1">
                    <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-4 bg-gradient-to-br from-success to-success/80 rounded-2xl text-white cursor-pointer shadow-lg shadow-success/20"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-semibold">Generate Reports</p>
                                <p className="text-sm text-white/80">GSTR-1, GSTR-3B</p>
                            </div>
                        </div>
                    </motion.div>
                </Link>
            </motion.div>

            {/* GST Summary Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Output GST */}
                <Card hover className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-destructive/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Output GST (Sales)</CardTitle>
                            <div className="p-2 bg-destructive/10 rounded-lg">
                                <TrendingUp className="w-4 h-4 text-destructive" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">
                            <AnimatedNumber value={gstSummary.outputGst} />
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-sm">
                            <ArrowUpRight className="w-4 h-4 text-success" />
                            <span className="text-success font-medium">12.5%</span>
                            <span className="text-muted-foreground">vs last month</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Input GST */}
                <Card hover className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-success/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Input GST (Purchases)</CardTitle>
                            <div className="p-2 bg-success/10 rounded-lg">
                                <TrendingDown className="w-4 h-4 text-success" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">
                            <AnimatedNumber value={gstSummary.inputGst} />
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-sm">
                            <ArrowUpRight className="w-4 h-4 text-success" />
                            <span className="text-success font-medium">8.2%</span>
                            <span className="text-muted-foreground">vs last month</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Net Payable */}
                <Card hover className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Net GST Payable</CardTitle>
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <IndianRupee className="w-4 h-4 text-primary" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold gradient-text">
                            <AnimatedNumber value={gstSummary.netPayable} />
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-sm">
                            <ArrowDownRight className="w-4 h-4 text-destructive" />
                            <span className="text-destructive font-medium">3.1%</span>
                            <span className="text-muted-foreground">vs last month</span>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Tax Breakdown & Compliance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Tax Breakdown */}
                <motion.div variants={itemVariants}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Tax Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* CGST */}
                                <div className="p-4 bg-muted/50 rounded-xl">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="font-medium">CGST</span>
                                        <span className="text-sm text-muted-foreground">Central GST</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Output</p>
                                            <p className="font-semibold text-destructive">{formatCurrency(gstSummary.cgst.output)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Input (ITC)</p>
                                            <p className="font-semibold text-success">{formatCurrency(gstSummary.cgst.input)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* SGST */}
                                <div className="p-4 bg-muted/50 rounded-xl">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="font-medium">SGST</span>
                                        <span className="text-sm text-muted-foreground">State GST</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Output</p>
                                            <p className="font-semibold text-destructive">{formatCurrency(gstSummary.sgst.output)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Input (ITC)</p>
                                            <p className="font-semibold text-success">{formatCurrency(gstSummary.sgst.input)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* IGST */}
                                <div className="p-4 bg-muted/50 rounded-xl">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="font-medium">IGST</span>
                                        <span className="text-sm text-muted-foreground">Integrated GST</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Output</p>
                                            <p className="font-semibold text-destructive">{formatCurrency(gstSummary.igst.output)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Input (ITC)</p>
                                            <p className="font-semibold text-success">{formatCurrency(gstSummary.igst.input)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Compliance Status */}
                <motion.div variants={itemVariants}>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Compliance Status</CardTitle>
                                <Calendar className="w-5 h-5 text-muted-foreground" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {complianceStatus.map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${item.status === 'filed' ? 'bg-success/10' :
                                                    item.status === 'pending' ? 'bg-warning/10' :
                                                        'bg-muted'
                                                }`}>
                                                {item.status === 'filed' ? (
                                                    <CheckCircle className="w-5 h-5 text-success" />
                                                ) : item.status === 'pending' ? (
                                                    <AlertCircle className="w-5 h-5 text-warning" />
                                                ) : (
                                                    <Clock className="w-5 h-5 text-muted-foreground" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium">{item.label}</p>
                                                <p className="text-sm text-muted-foreground">Due: {item.dueDate}</p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'filed' ? 'bg-success/10 text-success' :
                                                item.status === 'pending' ? 'bg-warning/10 text-warning' :
                                                    'bg-muted text-muted-foreground'
                                            }`}>
                                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            <Button variant="outline" className="w-full mt-4">
                                View Filing Calendar
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Recent Invoices */}
            <motion.div variants={itemVariants}>
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Recent Invoices</CardTitle>
                            <Link href="/invoices">
                                <Button variant="ghost" size="sm">
                                    View All
                                    <ArrowUpRight className="w-4 h-4 ml-1" />
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Invoice</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Party</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">GST</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentInvoices.map((invoice, index) => (
                                        <motion.tr
                                            key={invoice.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="border-b border-border hover:bg-muted/50 transition-colors"
                                        >
                                            <td className="py-4 px-4">
                                                <span className="font-medium">{invoice.number}</span>
                                            </td>
                                            <td className="py-4 px-4 text-muted-foreground">{invoice.party}</td>
                                            <td className="py-4 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${invoice.type === 'sales'
                                                        ? 'bg-success/10 text-success'
                                                        : 'bg-primary/10 text-primary'
                                                    }`}>
                                                    {invoice.type === 'sales' ? 'Sales' : 'Purchase'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-right font-medium">{formatCurrency(invoice.amount)}</td>
                                            <td className="py-4 px-4 text-right text-muted-foreground">{formatCurrency(invoice.gst)}</td>
                                            <td className="py-4 px-4 text-muted-foreground">{invoice.date}</td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
