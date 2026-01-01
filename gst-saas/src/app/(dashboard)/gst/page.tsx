'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Calculator,
    TrendingUp,
    TrendingDown,
    IndianRupee,
    ChevronDown,
    ArrowUpRight,
    ArrowDownRight,
    RefreshCw,
    Download,
    Calendar,
    PieChart,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

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

// Mock data
const gstData = {
    output: {
        total: 245680,
        cgst: 98272,
        sgst: 98272,
        igst: 49136,
        invoiceCount: 45,
    },
    input: {
        total: 189420,
        cgst: 75768,
        sgst: 75768,
        igst: 37884,
        invoiceCount: 32,
    },
    netPayable: 56260,
    previousMonth: {
        netPayable: 58000,
    },
};

const rateWiseBreakdown = [
    { rate: '5%', taxableValue: 125000, outputTax: 6250, inputTax: 4500, net: 1750 },
    { rate: '12%', taxableValue: 350000, outputTax: 42000, inputTax: 35000, net: 7000 },
    { rate: '18%', taxableValue: 850000, outputTax: 153000, inputTax: 120000, net: 33000 },
    { rate: '28%', taxableValue: 180000, outputTax: 50400, inputTax: 35920, net: 14480 },
];

export default function GSTSummaryPage() {
    const [selectedMonth, setSelectedMonth] = useState('January');
    const [selectedYear, setSelectedYear] = useState('2026');
    const [isCalculating, setIsCalculating] = useState(false);

    const handleRecalculate = async () => {
        setIsCalculating(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsCalculating(false);
    };

    const netChange = ((gstData.netPayable - gstData.previousMonth.netPayable) / gstData.previousMonth.netPayable) * 100;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">GST Summary</h1>
                    <p className="text-muted-foreground mt-1">Monthly GST calculation and liability overview</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Period Selector */}
                    <div className="flex items-center gap-2 p-1 bg-muted rounded-xl">
                        <div className="relative">
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="h-9 pl-3 pr-8 rounded-lg bg-white border-0 text-sm font-medium appearance-none cursor-pointer focus:ring-2 focus:ring-primary/20"
                            >
                                {months.map((month) => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>
                        <div className="relative">
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="h-9 pl-3 pr-8 rounded-lg bg-white border-0 text-sm font-medium appearance-none cursor-pointer focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="2026">2026</option>
                                <option value="2025">2025</option>
                                <option value="2024">2024</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        onClick={handleRecalculate}
                        isLoading={isCalculating}
                        leftIcon={<RefreshCw className="w-4 h-4" />}
                    >
                        Recalculate
                    </Button>

                    <Button leftIcon={<Download className="w-4 h-4" />}>
                        Export
                    </Button>
                </div>
            </div>

            {/* Main Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Output GST */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="relative overflow-hidden bg-gradient-to-br from-destructive/5 to-transparent border-destructive/20">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Output GST (Sales)</CardTitle>
                                <div className="p-2 bg-destructive/10 rounded-lg">
                                    <TrendingUp className="w-5 h-5 text-destructive" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-foreground">{formatCurrency(gstData.output.total)}</p>
                            <p className="text-sm text-muted-foreground mt-1">{gstData.output.invoiceCount} invoices</p>
                            <div className="flex items-center gap-1 mt-3 text-sm">
                                <ArrowUpRight className="w-4 h-4 text-success" />
                                <span className="text-success font-medium">+12.5%</span>
                                <span className="text-muted-foreground">vs last month</span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Input GST */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="relative overflow-hidden bg-gradient-to-br from-success/5 to-transparent border-success/20">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-success/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Input GST (Purchases)</CardTitle>
                                <div className="p-2 bg-success/10 rounded-lg">
                                    <TrendingDown className="w-5 h-5 text-success" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-foreground">{formatCurrency(gstData.input.total)}</p>
                            <p className="text-sm text-muted-foreground mt-1">{gstData.input.invoiceCount} invoices</p>
                            <div className="flex items-center gap-1 mt-3 text-sm">
                                <ArrowUpRight className="w-4 h-4 text-success" />
                                <span className="text-success font-medium">+8.2%</span>
                                <span className="text-muted-foreground">vs last month</span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Net Payable */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent text-white">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium text-white/80">Net GST Payable</CardTitle>
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <IndianRupee className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{formatCurrency(gstData.netPayable)}</p>
                            <p className="text-sm text-white/70 mt-1">Output - Input</p>
                            <div className="flex items-center gap-1 mt-3 text-sm">
                                {netChange < 0 ? (
                                    <>
                                        <ArrowDownRight className="w-4 h-4 text-green-300" />
                                        <span className="text-green-300 font-medium">{netChange.toFixed(1)}%</span>
                                    </>
                                ) : (
                                    <>
                                        <ArrowUpRight className="w-4 h-4 text-red-300" />
                                        <span className="text-red-300 font-medium">+{netChange.toFixed(1)}%</span>
                                    </>
                                )}
                                <span className="text-white/70">vs last month</span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Tax Type Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Output Tax Breakdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Output Tax Breakdown</CardTitle>
                            <CardDescription>Tax collected on sales</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-primary" />
                                        <span className="font-medium">CGST</span>
                                    </div>
                                    <span className="font-semibold">{formatCurrency(gstData.output.cgst)}</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-accent" />
                                        <span className="font-medium">SGST</span>
                                    </div>
                                    <span className="font-semibold">{formatCurrency(gstData.output.sgst)}</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-success" />
                                        <span className="font-medium">IGST</span>
                                    </div>
                                    <span className="font-semibold">{formatCurrency(gstData.output.igst)}</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-xl border border-destructive/20">
                                    <span className="font-semibold">Total Output Tax</span>
                                    <span className="font-bold text-destructive">{formatCurrency(gstData.output.total)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Input Tax Breakdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Input Tax Breakdown (ITC)</CardTitle>
                            <CardDescription>Tax credit on purchases</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-primary" />
                                        <span className="font-medium">CGST</span>
                                    </div>
                                    <span className="font-semibold">{formatCurrency(gstData.input.cgst)}</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-accent" />
                                        <span className="font-medium">SGST</span>
                                    </div>
                                    <span className="font-semibold">{formatCurrency(gstData.input.sgst)}</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-success" />
                                        <span className="font-medium">IGST</span>
                                    </div>
                                    <span className="font-semibold">{formatCurrency(gstData.input.igst)}</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-success/10 rounded-xl border border-success/20">
                                    <span className="font-semibold">Total Input Tax (ITC)</span>
                                    <span className="font-bold text-success">{formatCurrency(gstData.input.total)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Rate-wise Breakdown */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Rate-wise Tax Breakdown</CardTitle>
                                <CardDescription>GST computation by tax rate slab</CardDescription>
                            </div>
                            <PieChart className="w-5 h-5 text-muted-foreground" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">GST Rate</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Taxable Value</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Output Tax</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Input Tax (ITC)</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Net Tax</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rateWiseBreakdown.map((row, index) => (
                                        <motion.tr
                                            key={row.rate}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.1 * index }}
                                            className="border-b border-border hover:bg-muted/30"
                                        >
                                            <td className="py-4 px-4">
                                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                                                    {row.rate}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-right font-medium">{formatCurrency(row.taxableValue)}</td>
                                            <td className="py-4 px-4 text-right text-destructive">{formatCurrency(row.outputTax)}</td>
                                            <td className="py-4 px-4 text-right text-success">{formatCurrency(row.inputTax)}</td>
                                            <td className="py-4 px-4 text-right font-semibold">{formatCurrency(row.net)}</td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="bg-muted/50 font-semibold">
                                        <td className="py-4 px-4">Total</td>
                                        <td className="py-4 px-4 text-right">{formatCurrency(1505000)}</td>
                                        <td className="py-4 px-4 text-right text-destructive">{formatCurrency(251650)}</td>
                                        <td className="py-4 px-4 text-right text-success">{formatCurrency(195420)}</td>
                                        <td className="py-4 px-4 text-right gradient-text">{formatCurrency(56230)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Liability Summary */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
            >
                <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-success/5">
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                    <Calculator className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Net GST Liability for {selectedMonth} {selectedYear}</p>
                                    <p className="text-4xl font-bold gradient-text">{formatCurrency(gstData.netPayable)}</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button variant="outline" leftIcon={<Calendar className="w-4 h-4" />}>
                                    View History
                                </Button>
                                <Button leftIcon={<IndianRupee className="w-4 h-4" />}>
                                    Pay Now
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
