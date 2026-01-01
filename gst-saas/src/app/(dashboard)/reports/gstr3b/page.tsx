'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Download,
    FileSpreadsheet,
    FileJson,
    ChevronDown,
    Calculator,
    IndianRupee,
    ArrowRight,
    CheckCircle,
    RefreshCw,
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

// Mock GSTR-3B data
const gstr3bData = {
    outwardSupplies: {
        taxable: {
            taxableValue: 950000,
            igst: 83700,
            cgst: 43650,
            sgst: 43650,
            cess: 0,
        },
        zeroRated: 0,
        exempted: 25000,
        nilRated: 0,
        nonGst: 0,
    },
    inwardSupplies: {
        interState: {
            taxableValue: 285000,
            igst: 51300,
        },
        intraState: {
            taxableValue: 450000,
            cgst: 40500,
            sgst: 40500,
        },
    },
    itcAvailable: {
        imports: { igst: 0, cgst: 0, sgst: 0 },
        importServices: { igst: 0, cgst: 0, sgst: 0 },
        inwardRcm: { igst: 0, cgst: 0, sgst: 0 },
        inwardIsd: { igst: 0, cgst: 0, sgst: 0 },
        allOther: { igst: 51300, cgst: 40500, sgst: 40500 },
    },
    itcReversed: {
        rules: { igst: 0, cgst: 0, sgst: 0 },
        others: { igst: 0, cgst: 0, sgst: 0 },
    },
    netItc: {
        igst: 51300,
        cgst: 40500,
        sgst: 40500,
        total: 132300,
    },
    taxPayable: {
        igst: 83700 - 51300, // 32400
        cgst: 43650 - 40500, // 3150
        sgst: 43650 - 40500, // 3150
        total: 38700,
    },
};

export default function GSTR3BPage() {
    const [selectedMonth, setSelectedMonth] = useState('January');
    const [selectedYear, setSelectedYear] = useState('2026');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        setIsGenerating(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsGenerating(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">GSTR-3B Report</h1>
                    <p className="text-muted-foreground mt-1">Monthly GST summary return</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Period Selector */}
                    <div className="flex items-center gap-2 p-1 bg-muted rounded-xl">
                        <div className="relative">
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="h-9 pl-3 pr-8 rounded-lg bg-white border-0 text-sm font-medium appearance-none cursor-pointer"
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
                                className="h-9 pl-3 pr-8 rounded-lg bg-white border-0 text-sm font-medium appearance-none cursor-pointer"
                            >
                                <option value="2026">2026</option>
                                <option value="2025">2025</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        onClick={handleGenerate}
                        isLoading={isGenerating}
                        leftIcon={<RefreshCw className="w-4 h-4" />}
                    >
                        Regenerate
                    </Button>
                </div>
            </div>

            {/* Tax Liability Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-gradient-to-br from-destructive to-destructive/80 rounded-2xl text-white"
                >
                    <p className="text-sm opacity-80">Total Output Tax</p>
                    <p className="text-2xl font-bold mt-1">{formatCurrency(171000)}</p>
                    <p className="text-xs opacity-60 mt-2">CGST + SGST + IGST</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 bg-gradient-to-br from-success to-success/80 rounded-2xl text-white"
                >
                    <p className="text-sm opacity-80">Total ITC Available</p>
                    <p className="text-2xl font-bold mt-1">{formatCurrency(gstr3bData.netItc.total)}</p>
                    <p className="text-xs opacity-60 mt-2">Input Tax Credit</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 bg-gradient-to-br from-warning to-warning/80 rounded-2xl text-white"
                >
                    <p className="text-sm opacity-80">ITC Utilized</p>
                    <p className="text-2xl font-bold mt-1">{formatCurrency(132300)}</p>
                    <p className="text-xs opacity-60 mt-2">Set off against liability</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 bg-gradient-to-br from-primary to-accent rounded-2xl text-white"
                >
                    <p className="text-sm opacity-80">Net Tax Payable</p>
                    <p className="text-2xl font-bold mt-1">{formatCurrency(gstr3bData.taxPayable.total)}</p>
                    <p className="text-xs opacity-60 mt-2">To be paid in cash</p>
                </motion.div>
            </div>

            {/* Table 3.1: Outward Supplies */}
            <Card>
                <CardHeader>
                    <CardTitle>3.1 - Details of Outward Supplies and Inward Supplies on Reverse Charge</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border bg-muted/30">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Nature of Supplies</th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Taxable Value</th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">IGST</th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">CGST</th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">SGST</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-border">
                                    <td className="py-4 px-4 font-medium">(a) Outward taxable supplies (other than zero rated, nil rated and exempted)</td>
                                    <td className="py-4 px-4 text-right">{formatCurrency(gstr3bData.outwardSupplies.taxable.taxableValue)}</td>
                                    <td className="py-4 px-4 text-right">{formatCurrency(gstr3bData.outwardSupplies.taxable.igst)}</td>
                                    <td className="py-4 px-4 text-right">{formatCurrency(gstr3bData.outwardSupplies.taxable.cgst)}</td>
                                    <td className="py-4 px-4 text-right">{formatCurrency(gstr3bData.outwardSupplies.taxable.sgst)}</td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="py-4 px-4 font-medium">(b) Outward taxable supplies (zero rated)</td>
                                    <td className="py-4 px-4 text-right text-muted-foreground">-</td>
                                    <td className="py-4 px-4 text-right text-muted-foreground">-</td>
                                    <td className="py-4 px-4 text-right text-muted-foreground">-</td>
                                    <td className="py-4 px-4 text-right text-muted-foreground">-</td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="py-4 px-4 font-medium">(c) Other outward supplies (Nil rated, Exempted)</td>
                                    <td className="py-4 px-4 text-right">{formatCurrency(gstr3bData.outwardSupplies.exempted)}</td>
                                    <td className="py-4 px-4 text-right text-muted-foreground">-</td>
                                    <td className="py-4 px-4 text-right text-muted-foreground">-</td>
                                    <td className="py-4 px-4 text-right text-muted-foreground">-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Table 4: ITC Available */}
            <Card>
                <CardHeader>
                    <CardTitle>4 - Eligible ITC</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border bg-muted/30">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Details</th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">IGST</th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">CGST</th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">SGST</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-border">
                                    <td className="py-4 px-4 font-medium">(A) ITC Available</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr className="border-b border-border bg-muted/20">
                                    <td className="py-4 px-4 pl-8">(1) Import of goods</td>
                                    <td className="py-4 px-4 text-right text-muted-foreground">-</td>
                                    <td className="py-4 px-4 text-right text-muted-foreground">-</td>
                                    <td className="py-4 px-4 text-right text-muted-foreground">-</td>
                                </tr>
                                <tr className="border-b border-border bg-muted/20">
                                    <td className="py-4 px-4 pl-8">(5) All other ITC</td>
                                    <td className="py-4 px-4 text-right">{formatCurrency(gstr3bData.itcAvailable.allOther.igst)}</td>
                                    <td className="py-4 px-4 text-right">{formatCurrency(gstr3bData.itcAvailable.allOther.cgst)}</td>
                                    <td className="py-4 px-4 text-right">{formatCurrency(gstr3bData.itcAvailable.allOther.sgst)}</td>
                                </tr>
                                <tr className="border-b border-border font-semibold bg-success/5">
                                    <td className="py-4 px-4">(C) Net ITC Available (A) - (B)</td>
                                    <td className="py-4 px-4 text-right text-success">{formatCurrency(gstr3bData.netItc.igst)}</td>
                                    <td className="py-4 px-4 text-right text-success">{formatCurrency(gstr3bData.netItc.cgst)}</td>
                                    <td className="py-4 px-4 text-right text-success">{formatCurrency(gstr3bData.netItc.sgst)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Table 6: Tax Payable */}
            <Card>
                <CardHeader>
                    <CardTitle>6 - Payment of Tax</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border bg-muted/30">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Description</th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">IGST</th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">CGST</th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">SGST</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-border">
                                    <td className="py-4 px-4 font-medium">Tax Payable</td>
                                    <td className="py-4 px-4 text-right">{formatCurrency(83700)}</td>
                                    <td className="py-4 px-4 text-right">{formatCurrency(43650)}</td>
                                    <td className="py-4 px-4 text-right">{formatCurrency(43650)}</td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="py-4 px-4 font-medium">Paid through ITC</td>
                                    <td className="py-4 px-4 text-right text-success">{formatCurrency(51300)}</td>
                                    <td className="py-4 px-4 text-right text-success">{formatCurrency(40500)}</td>
                                    <td className="py-4 px-4 text-right text-success">{formatCurrency(40500)}</td>
                                </tr>
                                <tr className="font-semibold bg-primary/5">
                                    <td className="py-4 px-4">Tax Payable in Cash</td>
                                    <td className="py-4 px-4 text-right text-primary">{formatCurrency(gstr3bData.taxPayable.igst)}</td>
                                    <td className="py-4 px-4 text-right text-primary">{formatCurrency(gstr3bData.taxPayable.cgst)}</td>
                                    <td className="py-4 px-4 text-right text-primary">{formatCurrency(gstr3bData.taxPayable.sgst)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <IndianRupee className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold">Total Tax to be Paid in Cash</p>
                                    <p className="text-sm text-muted-foreground">IGST + CGST + SGST</p>
                                </div>
                            </div>
                            <p className="text-3xl font-bold gradient-text">{formatCurrency(gstr3bData.taxPayable.total)}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Export Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Export GSTR-3B</CardTitle>
                    <CardDescription>Download report in your preferred format</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" size="lg" className="justify-start h-auto p-4" leftIcon={<FileSpreadsheet className="w-5 h-5 text-success" />}>
                            <div className="text-left">
                                <p className="font-semibold">Export to Excel</p>
                                <p className="text-sm text-muted-foreground font-normal">Download as .xlsx file</p>
                            </div>
                        </Button>

                        <Button variant="outline" size="lg" className="justify-start h-auto p-4" leftIcon={<FileJson className="w-5 h-5 text-primary" />}>
                            <div className="text-left">
                                <p className="font-semibold">Export for GST Portal</p>
                                <p className="text-sm text-muted-foreground font-normal">JSON format for filing</p>
                            </div>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
