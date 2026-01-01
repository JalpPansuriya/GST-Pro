'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Download,
    FileSpreadsheet,
    FileJson,
    Calendar,
    ChevronDown,
    CheckCircle,
    AlertCircle,
    Eye,
    RefreshCw,
    ArrowUpRight,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// Mock B2B data
const b2bData = [
    { gstin: '27AABCU9603R1ZM', name: 'XYZ Fabrics Pvt Ltd', invoices: 5, taxableValue: 485000, cgst: 43650, sgst: 43650, igst: 0 },
    { gstin: '29AABCB5678R1ZM', name: 'Beta Fabrics Pvt Ltd', invoices: 3, taxableValue: 285000, cgst: 0, sgst: 0, igst: 51300 },
    { gstin: '24AABCG9012R1ZM', name: 'Gamma Industries', invoices: 2, taxableValue: 180000, cgst: 0, sgst: 0, igst: 32400 },
];

// Mock B2C data
const b2cData = [
    { rateSlabs: '5%', taxableValue: 125000, cgst: 3125, sgst: 3125, total: 131250 },
    { rateSlabs: '12%', taxableValue: 85000, cgst: 5100, sgst: 5100, total: 95200 },
    { rateSlabs: '18%', taxableValue: 350000, cgst: 31500, sgst: 31500, total: 413000 },
];

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};

export default function GSTR1Page() {
    const [selectedMonth, setSelectedMonth] = useState('January');
    const [selectedYear, setSelectedYear] = useState('2026');
    const [activeTab, setActiveTab] = useState<'b2b' | 'b2c' | 'cdnr' | 'exp'>('b2b');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        setIsGenerating(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsGenerating(false);
    };

    const tabs = [
        { key: 'b2b', label: 'B2B Invoices', count: 10 },
        { key: 'b2c', label: 'B2C Summary', count: 3 },
        { key: 'cdnr', label: 'Credit/Debit Notes', count: 2 },
        { key: 'exp', label: 'Exports', count: 0 },
    ];

    const totals = {
        taxableValue: 950000,
        cgst: 83375,
        sgst: 83375,
        igst: 83700,
        totalTax: 250450,
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
                    <h1 className="text-3xl font-bold text-foreground">GSTR-1 Report</h1>
                    <p className="text-muted-foreground mt-1">Outward supplies summary for GST filing</p>
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

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                    { label: 'Taxable Value', value: totals.taxableValue, color: 'foreground' },
                    { label: 'CGST', value: totals.cgst, color: 'primary' },
                    { label: 'SGST', value: totals.sgst, color: 'accent' },
                    { label: 'IGST', value: totals.igst, color: 'success' },
                    { label: 'Total Tax', value: totals.totalTax, color: 'warning' },
                ].map((item, index) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-white rounded-2xl border border-border"
                    >
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className={`text-xl font-bold mt-1 text-${item.color}`}>
                            {formatCurrency(item.value)}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Main Content */}
            <Card>
                {/* Tabs */}
                <div className="border-b border-border">
                    <div className="flex items-center">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                                className={`relative px-6 py-4 text-sm font-medium transition-colors ${activeTab === tab.key
                                        ? 'text-primary'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {tab.label}
                                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === tab.key
                                        ? 'bg-primary/10 text-primary'
                                        : 'bg-muted text-muted-foreground'
                                    }`}>
                                    {tab.count}
                                </span>
                                {activeTab === tab.key && (
                                    <motion.div
                                        layoutId="gstr1Tab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <CardContent className="pt-6">
                    {/* B2B Table */}
                    {activeTab === 'b2b' && (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">GSTIN</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Party Name</th>
                                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Invoices</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Taxable Value</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">CGST</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">SGST</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">IGST</th>
                                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {b2bData.map((row, index) => (
                                        <motion.tr
                                            key={row.gstin}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-b border-border hover:bg-muted/30"
                                        >
                                            <td className="py-4 px-4 font-mono text-sm">{row.gstin}</td>
                                            <td className="py-4 px-4 font-medium">{row.name}</td>
                                            <td className="py-4 px-4 text-center">{row.invoices}</td>
                                            <td className="py-4 px-4 text-right">{formatCurrency(row.taxableValue)}</td>
                                            <td className="py-4 px-4 text-right text-muted-foreground">
                                                {row.cgst > 0 ? formatCurrency(row.cgst) : '-'}
                                            </td>
                                            <td className="py-4 px-4 text-right text-muted-foreground">
                                                {row.sgst > 0 ? formatCurrency(row.sgst) : '-'}
                                            </td>
                                            <td className="py-4 px-4 text-right text-muted-foreground">
                                                {row.igst > 0 ? formatCurrency(row.igst) : '-'}
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="bg-muted/50 font-semibold">
                                        <td className="py-4 px-4" colSpan={2}>Total</td>
                                        <td className="py-4 px-4 text-center">10</td>
                                        <td className="py-4 px-4 text-right">{formatCurrency(950000)}</td>
                                        <td className="py-4 px-4 text-right">{formatCurrency(43650)}</td>
                                        <td className="py-4 px-4 text-right">{formatCurrency(43650)}</td>
                                        <td className="py-4 px-4 text-right">{formatCurrency(83700)}</td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    )}

                    {/* B2C Summary */}
                    {activeTab === 'b2c' && (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Rate Slab</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Taxable Value</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">CGST</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">SGST</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {b2cData.map((row, index) => (
                                        <motion.tr
                                            key={row.rateSlabs}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-b border-border hover:bg-muted/30"
                                        >
                                            <td className="py-4 px-4 font-medium">{row.rateSlabs}</td>
                                            <td className="py-4 px-4 text-right">{formatCurrency(row.taxableValue)}</td>
                                            <td className="py-4 px-4 text-right text-muted-foreground">{formatCurrency(row.cgst)}</td>
                                            <td className="py-4 px-4 text-right text-muted-foreground">{formatCurrency(row.sgst)}</td>
                                            <td className="py-4 px-4 text-right font-semibold">{formatCurrency(row.total)}</td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Empty State for other tabs */}
                    {(activeTab === 'cdnr' || activeTab === 'exp') && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                                <FileSpreadsheet className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <p className="text-lg font-medium">No data available</p>
                            <p className="text-muted-foreground">
                                {activeTab === 'cdnr'
                                    ? 'No credit/debit notes found for this period'
                                    : 'No export invoices found for this period'}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Export Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Export GSTR-1</CardTitle>
                    <CardDescription>Download report in your preferred format</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-6 rounded-2xl border-2 border-border hover:border-success/50 bg-white text-left transition-all group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center group-hover:bg-success group-hover:text-white transition-colors">
                                    <FileSpreadsheet className="w-6 h-6 text-success group-hover:text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold mb-1">Export to Excel</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Download as .xlsx file with all tables
                                    </p>
                                </div>
                                <Download className="w-5 h-5 text-muted-foreground group-hover:text-success" />
                            </div>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-6 rounded-2xl border-2 border-border hover:border-primary/50 bg-white text-left transition-all group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                    <FileJson className="w-6 h-6 text-primary group-hover:text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold mb-1">Export for GST Portal</h3>
                                    <p className="text-sm text-muted-foreground">
                                        JSON format compatible with GST portal
                                    </p>
                                </div>
                                <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                            </div>
                        </motion.button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
