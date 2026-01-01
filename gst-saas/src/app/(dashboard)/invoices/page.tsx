'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Search,
    Filter,
    Download,
    Upload,
    Plus,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    FileSpreadsheet,
    ArrowUpDown,
    Calendar,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Mock data
const invoices = [
    { id: 1, number: 'INV-2026-001', gstin: '27AABCU9603R1ZM', party: 'XYZ Fabrics Pvt Ltd', taxable: 125000, cgst: 9000, sgst: 9000, igst: 0, total: 143000, type: 'sales', date: '2026-01-01', status: 'processed' },
    { id: 2, number: 'PO-2026-012', gstin: '29AABCU9603R1ZM', party: 'ABC Threads Pvt Ltd', taxable: 85000, cgst: 0, sgst: 0, igst: 15300, total: 100300, type: 'purchase', date: '2025-12-31', status: 'processed' },
    { id: 3, number: 'INV-2026-002', gstin: '27AABCU9603R1ZM', party: 'PQR Textiles', taxable: 210000, cgst: 18900, sgst: 18900, igst: 0, total: 247800, type: 'sales', date: '2025-12-30', status: 'processed' },
    { id: 4, number: 'PO-2026-013', gstin: '24AABCU9603R1ZM', party: 'LMN Dyes & Chemicals', taxable: 45000, cgst: 0, sgst: 0, igst: 8100, total: 53100, type: 'purchase', date: '2025-12-29', status: 'pending' },
    { id: 5, number: 'INV-2026-003', gstin: '27AABCU9603R1ZM', party: 'RST Garments', taxable: 78000, cgst: 7020, sgst: 7020, igst: 0, total: 92040, type: 'sales', date: '2025-12-28', status: 'processed' },
    { id: 6, number: 'PO-2026-014', gstin: '33AABCU9603R1ZM', party: 'UVW Raw Materials', taxable: 156000, cgst: 0, sgst: 0, igst: 28080, total: 184080, type: 'purchase', date: '2025-12-27', status: 'error' },
];

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};

export default function InvoicesPage() {
    const [activeTab, setActiveTab] = useState<'all' | 'sales' | 'purchase'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedInvoices, setSelectedInvoices] = useState<number[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    const filteredInvoices = invoices.filter(inv => {
        if (activeTab !== 'all' && inv.type !== activeTab) return false;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                inv.number.toLowerCase().includes(query) ||
                inv.party.toLowerCase().includes(query) ||
                inv.gstin.toLowerCase().includes(query)
            );
        }
        return true;
    });

    const toggleSelectAll = () => {
        if (selectedInvoices.length === filteredInvoices.length) {
            setSelectedInvoices([]);
        } else {
            setSelectedInvoices(filteredInvoices.map(inv => inv.id));
        }
    };

    const toggleSelect = (id: number) => {
        setSelectedInvoices(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const tabs = [
        { key: 'all', label: 'All Invoices', count: invoices.length },
        { key: 'sales', label: 'Sales', count: invoices.filter(i => i.type === 'sales').length },
        { key: 'purchase', label: 'Purchase', count: invoices.filter(i => i.type === 'purchase').length },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Invoices</h1>
                    <p className="text-muted-foreground mt-1">Manage your purchase and sales invoices</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
                        Export
                    </Button>
                    <Link href="/invoices/upload">
                        <Button leftIcon={<Upload className="w-4 h-4" />}>
                            Upload Invoices
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Invoices', value: invoices.length, color: 'primary' },
                    { label: 'Sales Invoices', value: invoices.filter(i => i.type === 'sales').length, color: 'success' },
                    { label: 'Purchase Invoices', value: invoices.filter(i => i.type === 'purchase').length, color: 'accent' },
                    { label: 'Pending Review', value: invoices.filter(i => i.status === 'pending').length, color: 'warning' },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-2xl bg-${stat.color}/5 border border-${stat.color}/20`}
                    >
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Main Content */}
            <Card>
                {/* Tabs */}
                <div className="border-b border-border">
                    <div className="flex items-center gap-1 px-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key as 'all' | 'sales' | 'purchase')}
                                className={`relative px-4 py-4 text-sm font-medium transition-colors ${activeTab === tab.key
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
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Toolbar */}
                <div className="p-4 border-b border-border bg-muted/30">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search by invoice number, party, GSTIN..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-border text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                />
                            </div>

                            {/* Filters */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowFilters(!showFilters)}
                                leftIcon={<Filter className="w-4 h-4" />}
                            >
                                Filters
                            </Button>

                            {/* Date Range */}
                            <Button
                                variant="outline"
                                size="sm"
                                leftIcon={<Calendar className="w-4 h-4" />}
                            >
                                Date Range
                            </Button>
                        </div>

                        {/* Bulk Actions */}
                        <AnimatePresence>
                            {selectedInvoices.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="flex items-center gap-2"
                                >
                                    <span className="text-sm text-muted-foreground">
                                        {selectedInvoices.length} selected
                                    </span>
                                    <Button variant="outline" size="sm">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Extended Filters */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="pt-4 overflow-hidden"
                            >
                                <div className="flex items-center gap-4 flex-wrap">
                                    <select className="h-9 px-3 rounded-lg bg-white border border-border text-sm">
                                        <option value="">GST Rate</option>
                                        <option value="5">5%</option>
                                        <option value="12">12%</option>
                                        <option value="18">18%</option>
                                        <option value="28">28%</option>
                                    </select>
                                    <select className="h-9 px-3 rounded-lg bg-white border border-border text-sm">
                                        <option value="">Status</option>
                                        <option value="processed">Processed</option>
                                        <option value="pending">Pending</option>
                                        <option value="error">Error</option>
                                    </select>
                                    <Button variant="ghost" size="sm">Clear Filters</Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-muted/30">
                                <th className="w-12 px-4 py-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 rounded border-border"
                                    />
                                </th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                                    <button className="flex items-center gap-1 hover:text-foreground">
                                        Invoice <ArrowUpDown className="w-3 h-3" />
                                    </button>
                                </th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">GSTIN</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Party</th>
                                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Taxable</th>
                                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">CGST</th>
                                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">SGST</th>
                                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">IGST</th>
                                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Total</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                                <th className="w-12 px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInvoices.map((invoice, index) => (
                                <motion.tr
                                    key={invoice.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`border-b border-border hover:bg-muted/30 transition-colors ${selectedInvoices.includes(invoice.id) ? 'bg-primary/5' : ''
                                        }`}
                                >
                                    <td className="px-4 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedInvoices.includes(invoice.id)}
                                            onChange={() => toggleSelect(invoice.id)}
                                            className="w-4 h-4 rounded border-border"
                                        />
                                    </td>
                                    <td className="px-4 py-4">
                                        <div>
                                            <p className="font-medium">{invoice.number}</p>
                                            <p className="text-xs text-muted-foreground">{invoice.date}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="font-mono text-sm">{invoice.gstin}</span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <p className="text-sm">{invoice.party}</p>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${invoice.type === 'sales'
                                                ? 'bg-success/10 text-success'
                                                : 'bg-primary/10 text-primary'
                                            }`}>
                                            {invoice.type}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-right font-medium">{formatCurrency(invoice.taxable)}</td>
                                    <td className="px-4 py-4 text-right text-sm text-muted-foreground">
                                        {invoice.cgst > 0 ? formatCurrency(invoice.cgst) : '-'}
                                    </td>
                                    <td className="px-4 py-4 text-right text-sm text-muted-foreground">
                                        {invoice.sgst > 0 ? formatCurrency(invoice.sgst) : '-'}
                                    </td>
                                    <td className="px-4 py-4 text-right text-sm text-muted-foreground">
                                        {invoice.igst > 0 ? formatCurrency(invoice.igst) : '-'}
                                    </td>
                                    <td className="px-4 py-4 text-right font-semibold">{formatCurrency(invoice.total)}</td>
                                    <td className="px-4 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${invoice.status === 'processed'
                                                ? 'bg-success/10 text-success'
                                                : invoice.status === 'pending'
                                                    ? 'bg-warning/10 text-warning'
                                                    : 'bg-destructive/10 text-destructive'
                                            }`}>
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="relative group">
                                            <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                                                <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                            </button>
                                            <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                                                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-t-xl">
                                                    <Eye className="w-4 h-4" /> View
                                                </button>
                                                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted">
                                                    <Edit className="w-4 h-4" /> Edit
                                                </button>
                                                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted text-destructive rounded-b-xl">
                                                    <Trash2 className="w-4 h-4" /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-border flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Showing <span className="font-medium">1-{filteredInvoices.length}</span> of <span className="font-medium">{invoices.length}</span> invoices
                    </p>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" disabled>
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="bg-primary text-white">1</Button>
                        <Button variant="outline" size="sm">2</Button>
                        <Button variant="outline" size="sm">3</Button>
                        <Button variant="outline" size="sm">
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
