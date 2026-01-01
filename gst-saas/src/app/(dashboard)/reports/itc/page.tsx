'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Download,
    FileSpreadsheet,
    ChevronDown,
    Search,
    TrendingUp,
    TrendingDown,
    CheckCircle,
    AlertCircle,
    Eye,
    Filter,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};

// Mock ITC data
const itcSummary = {
    totalItc: 189420,
    eligibleItc: 178650,
    blockedItc: 10770,
    utilized: 132300,
    balance: 46350,
};

const vendorWiseItc = [
    { id: 1, gstin: '29AABCB5678R1ZM', name: 'Beta Fabrics Pvt Ltd', invoices: 12, itcClaimed: 51300, status: 'matched', matchScore: 100 },
    { id: 2, gstin: '27AABCU9603R1ZM', name: 'XYZ Fabrics Pvt Ltd', invoices: 8, itcClaimed: 43650, status: 'matched', matchScore: 100 },
    { id: 3, gstin: '24AABCG9012R1ZM', name: 'Gamma Industries', invoices: 5, itcClaimed: 32400, status: 'partial', matchScore: 85 },
    { id: 4, gstin: '33AABCD1234R1ZM', name: 'Delta Chemicals Ltd', invoices: 3, itcClaimed: 28080, status: 'matched', matchScore: 100 },
    { id: 5, gstin: '27AABCE5678R1ZM', name: 'Epsilon Traders', invoices: 2, itcClaimed: 15300, status: 'mismatch', matchScore: 60 },
    { id: 6, gstin: '29AABCF9012R1ZM', name: 'Zeta Suppliers', invoices: 4, itcClaimed: 18690, status: 'pending', matchScore: 0 },
];

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export default function ITCSummaryPage() {
    const [selectedMonth, setSelectedMonth] = useState('January');
    const [selectedYear, setSelectedYear] = useState('2026');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredVendors = vendorWiseItc.filter(vendor => {
        if (statusFilter !== 'all' && vendor.status !== statusFilter) return false;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return vendor.name.toLowerCase().includes(query) || vendor.gstin.toLowerCase().includes(query);
        }
        return true;
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">ITC Summary</h1>
                    <p className="text-muted-foreground mt-1">Input Tax Credit analysis and vendor-wise breakdown</p>
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

                    <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
                        Export
                    </Button>
                </div>
            </div>

            {/* ITC Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-gradient-to-br from-primary to-primary/80 rounded-2xl text-white"
                >
                    <p className="text-sm opacity-80">Total ITC</p>
                    <p className="text-2xl font-bold mt-1">{formatCurrency(itcSummary.totalItc)}</p>
                    <div className="flex items-center gap-1 mt-2 text-sm opacity-80">
                        <TrendingUp className="w-4 h-4" />
                        <span>+12.5% vs last month</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-5 bg-white rounded-2xl border border-border"
                >
                    <p className="text-sm text-muted-foreground">Eligible ITC</p>
                    <p className="text-2xl font-bold mt-1 text-success">{formatCurrency(itcSummary.eligibleItc)}</p>
                    <p className="text-xs text-muted-foreground mt-2">94.3% of total</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-5 bg-white rounded-2xl border border-border"
                >
                    <p className="text-sm text-muted-foreground">Blocked ITC</p>
                    <p className="text-2xl font-bold mt-1 text-destructive">{formatCurrency(itcSummary.blockedItc)}</p>
                    <p className="text-xs text-muted-foreground mt-2">5.7% of total</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-5 bg-white rounded-2xl border border-border"
                >
                    <p className="text-sm text-muted-foreground">ITC Utilized</p>
                    <p className="text-2xl font-bold mt-1 text-accent">{formatCurrency(itcSummary.utilized)}</p>
                    <p className="text-xs text-muted-foreground mt-2">Against output tax</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-5 bg-gradient-to-br from-success to-success/80 rounded-2xl text-white"
                >
                    <p className="text-sm opacity-80">ITC Balance</p>
                    <p className="text-2xl font-bold mt-1">{formatCurrency(itcSummary.balance)}</p>
                    <p className="text-xs opacity-80 mt-2">Carry forward</p>
                </motion.div>
            </div>

            {/* ITC Breakdown by Tax Type */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'CGST ITC', value: 75768, eligible: 71500, blocked: 4268 },
                    { label: 'SGST ITC', value: 75768, eligible: 71500, blocked: 4268 },
                    { label: 'IGST ITC', value: 37884, eligible: 35650, blocked: 2234 },
                ].map((item, index) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold">{item.label}</h3>
                                    <span className="text-xl font-bold">{formatCurrency(item.value)}</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Eligible</span>
                                        <span className="text-success font-medium">{formatCurrency(item.eligible)}</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(item.eligible / item.value) * 100}%` }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="h-full bg-success rounded-full"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Blocked</span>
                                        <span className="text-destructive font-medium">{formatCurrency(item.blocked)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Vendor-wise ITC */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Vendor-wise ITC Breakdown</CardTitle>
                            <CardDescription>ITC claimed from each vendor with matching status</CardDescription>
                        </div>
                    </div>
                </CardHeader>

                {/* Filters */}
                <div className="px-6 pb-4 border-b border-border">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search by vendor name or GSTIN..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted/50 border border-transparent focus:border-primary focus:bg-white text-sm outline-none transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-muted-foreground" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="h-10 px-3 rounded-xl bg-muted/50 border border-transparent text-sm focus:border-primary focus:bg-white outline-none transition-all"
                            >
                                <option value="all">All Status</option>
                                <option value="matched">Matched</option>
                                <option value="partial">Partial Match</option>
                                <option value="mismatch">Mismatch</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                    </div>
                </div>

                <CardContent className="pt-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Vendor</th>
                                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">GSTIN</th>
                                    <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">Invoices</th>
                                    <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">ITC Claimed</th>
                                    <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">Match Status</th>
                                    <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">Match Score</th>
                                    <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVendors.map((vendor, index) => (
                                    <motion.tr
                                        key={vendor.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b border-border hover:bg-muted/30 transition-colors"
                                    >
                                        <td className="py-4 px-4 font-medium">{vendor.name}</td>
                                        <td className="py-4 px-4 font-mono text-sm">{vendor.gstin}</td>
                                        <td className="py-4 px-4 text-center">{vendor.invoices}</td>
                                        <td className="py-4 px-4 text-right font-semibold">{formatCurrency(vendor.itcClaimed)}</td>
                                        <td className="py-4 px-4 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${vendor.status === 'matched' ? 'bg-success/10 text-success' :
                                                    vendor.status === 'partial' ? 'bg-warning/10 text-warning' :
                                                        vendor.status === 'mismatch' ? 'bg-destructive/10 text-destructive' :
                                                            'bg-muted text-muted-foreground'
                                                }`}>
                                                {vendor.status === 'matched' && <CheckCircle className="w-3 h-3" />}
                                                {vendor.status === 'partial' && <AlertCircle className="w-3 h-3" />}
                                                {vendor.status === 'mismatch' && <AlertCircle className="w-3 h-3" />}
                                                {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${vendor.matchScore >= 90 ? 'bg-success' :
                                                                vendor.matchScore >= 70 ? 'bg-warning' :
                                                                    vendor.matchScore > 0 ? 'bg-destructive' :
                                                                        'bg-muted'
                                                            }`}
                                                        style={{ width: `${vendor.matchScore}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm text-muted-foreground">{vendor.matchScore}%</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <Button variant="ghost" size="sm">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredVendors.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No vendors found matching your criteria</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* ITC Reconciliation Status */}
            <Card>
                <CardHeader>
                    <CardTitle>ITC Reconciliation Status</CardTitle>
                    <CardDescription>Comparison with GSTR-2A/2B data from GST portal</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-success/5 rounded-2xl border border-success/20">
                            <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
                            <p className="text-3xl font-bold text-success">78%</p>
                            <p className="text-sm text-muted-foreground mt-1">Fully Matched</p>
                            <p className="text-lg font-semibold mt-2">{formatCurrency(147687)}</p>
                        </div>
                        <div className="text-center p-6 bg-warning/5 rounded-2xl border border-warning/20">
                            <AlertCircle className="w-12 h-12 text-warning mx-auto mb-3" />
                            <p className="text-3xl font-bold text-warning">15%</p>
                            <p className="text-sm text-muted-foreground mt-1">Partial Match</p>
                            <p className="text-lg font-semibold mt-2">{formatCurrency(28413)}</p>
                        </div>
                        <div className="text-center p-6 bg-destructive/5 rounded-2xl border border-destructive/20">
                            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-3" />
                            <p className="text-3xl font-bold text-destructive">7%</p>
                            <p className="text-sm text-muted-foreground mt-1">Mismatch / Not Found</p>
                            <p className="text-lg font-semibold mt-2">{formatCurrency(13320)}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
