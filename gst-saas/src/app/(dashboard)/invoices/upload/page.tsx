'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload,
    FileSpreadsheet,
    FileText,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    Eye,
    Download,
    RefreshCw,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FileUpload } from '@/components/ui/FileUpload';
import Link from 'next/link';

interface ParsedInvoice {
    id: number;
    invoiceNumber: string;
    party: string;
    gstin: string;
    taxableValue: number;
    cgst: number;
    sgst: number;
    igst: number;
    total: number;
    date: string;
    status: 'valid' | 'warning' | 'error';
    message?: string;
}

const mockParsedData: ParsedInvoice[] = [
    { id: 1, invoiceNumber: 'INV-2026-004', party: 'Alpha Textiles', gstin: '27AABCA1234R1ZM', taxableValue: 50000, cgst: 4500, sgst: 4500, igst: 0, total: 59000, date: '2026-01-01', status: 'valid' },
    { id: 2, invoiceNumber: 'INV-2026-005', party: 'Beta Fabrics Pvt Ltd', gstin: '29AABCB5678R1ZM', taxableValue: 75000, cgst: 0, sgst: 0, igst: 13500, total: 88500, date: '2026-01-02', status: 'valid' },
    { id: 3, invoiceNumber: 'INV-2026-006', party: 'Gamma Industries', gstin: '27AABCG9012R1ZM', taxableValue: 120000, cgst: 10800, sgst: 10800, igst: 0, total: 141600, date: '2026-01-02', status: 'warning', message: 'GST rate mismatch: Expected 18%, found 18%' },
    { id: 4, invoiceNumber: 'INV-2026-007', party: 'Delta Chemicals', gstin: 'INVALID_GSTIN', taxableValue: 35000, cgst: 3150, sgst: 3150, igst: 0, total: 41300, date: '2026-01-03', status: 'error', message: 'Invalid GSTIN format' },
];

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};

export default function InvoiceUploadPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [uploadType, setUploadType] = useState<'sales' | 'purchase' | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [isParsing, setIsParsing] = useState(false);
    const [parsedData, setParsedData] = useState<ParsedInvoice[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFilesSelected = async (files: File[]) => {
        setUploadedFiles(files);
    };

    const handleParse = async () => {
        setIsParsing(true);
        // Simulate parsing
        await new Promise(resolve => setTimeout(resolve, 2500));
        setParsedData(mockParsedData);
        setIsParsing(false);
        setStep(3);
    };

    const handleProcess = async () => {
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsProcessing(false);
        router.push('/invoices');
    };

    const validCount = parsedData.filter(inv => inv.status === 'valid').length;
    const warningCount = parsedData.filter(inv => inv.status === 'warning').length;
    const errorCount = parsedData.filter(inv => inv.status === 'error').length;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto space-y-6"
        >
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/invoices">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Upload Invoices</h1>
                    <p className="text-muted-foreground mt-1">Import invoices from Excel or PDF files</p>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between px-8">
                {[
                    { num: 1, label: 'Select Type' },
                    { num: 2, label: 'Upload Files' },
                    { num: 3, label: 'Review Data' },
                    { num: 4, label: 'Complete' },
                ].map((s, index) => (
                    <div key={s.num} className="flex items-center">
                        <div className="flex flex-col items-center">
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step > s.num
                                        ? 'bg-success text-white'
                                        : step === s.num
                                            ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                            : 'bg-muted text-muted-foreground'
                                    }`}
                            >
                                {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                            </motion.div>
                            <span className={`mt-2 text-xs font-medium ${step >= s.num ? 'text-foreground' : 'text-muted-foreground'
                                }`}>
                                {s.label}
                            </span>
                        </div>
                        {index < 3 && (
                            <div className={`w-24 h-0.5 mx-2 mt-[-20px] transition-all ${step > s.num ? 'bg-success' : 'bg-muted'
                                }`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
                {/* Step 1: Select Type */}
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <Card className="mt-8">
                            <CardHeader>
                                <CardTitle>What type of invoices are you uploading?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setUploadType('sales')}
                                        className={`p-6 rounded-2xl border-2 text-left transition-all ${uploadType === 'sales'
                                                ? 'border-success bg-success/5'
                                                : 'border-border hover:border-success/50'
                                            }`}
                                    >
                                        <div className={`w-14 h-14 rounded-xl ${uploadType === 'sales' ? 'bg-success' : 'bg-success/10'
                                            } flex items-center justify-center mb-4`}>
                                            <FileSpreadsheet className={`w-7 h-7 ${uploadType === 'sales' ? 'text-white' : 'text-success'
                                                }`} />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-1">Sales Invoices</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Invoices issued to customers (Output GST)
                                        </p>
                                        {uploadType === 'sales' && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute top-4 right-4"
                                            >
                                                <CheckCircle className="w-6 h-6 text-success" />
                                            </motion.div>
                                        )}
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setUploadType('purchase')}
                                        className={`p-6 rounded-2xl border-2 text-left transition-all ${uploadType === 'purchase'
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border hover:border-primary/50'
                                            }`}
                                    >
                                        <div className={`w-14 h-14 rounded-xl ${uploadType === 'purchase' ? 'bg-primary' : 'bg-primary/10'
                                            } flex items-center justify-center mb-4`}>
                                            <FileText className={`w-7 h-7 ${uploadType === 'purchase' ? 'text-white' : 'text-primary'
                                                }`} />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-1">Purchase Invoices</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Invoices received from vendors (Input GST / ITC)
                                        </p>
                                    </motion.button>
                                </div>

                                <div className="flex justify-end mt-6">
                                    <Button
                                        onClick={() => setStep(2)}
                                        disabled={!uploadType}
                                        rightIcon={<ArrowRight className="w-4 h-4" />}
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* Step 2: Upload Files */}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <Card className="mt-8">
                            <CardHeader>
                                <CardTitle>Upload your {uploadType} invoice files</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FileUpload
                                    accept=".xlsx,.xls,.csv,.pdf"
                                    multiple
                                    maxSize={10}
                                    onFilesSelected={handleFilesSelected}
                                />

                                <div className="mt-6 p-4 bg-muted/50 rounded-xl">
                                    <h4 className="font-medium mb-3">Supported File Formats:</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                                                <FileSpreadsheet className="w-5 h-5 text-success" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">Excel (.xlsx, .xls)</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Standard invoice format with headers: Invoice No, Date, GSTIN, Amount, Tax
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                                <FileText className="w-5 h-5 text-accent" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">PDF</p>
                                                <p className="text-xs text-muted-foreground">
                                                    OCR extraction (beta) - Best for scanned invoices
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between mt-6">
                                    <Button variant="outline" onClick={() => setStep(1)}>
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back
                                    </Button>
                                    <Button
                                        onClick={handleParse}
                                        disabled={uploadedFiles.length === 0}
                                        isLoading={isParsing}
                                        rightIcon={<ArrowRight className="w-4 h-4" />}
                                    >
                                        {isParsing ? 'Parsing Invoices...' : 'Parse & Continue'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* Step 3: Review Data */}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <Card className="mt-8">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Review Parsed Data</CardTitle>
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center gap-1 px-3 py-1 bg-success/10 text-success rounded-full text-sm">
                                            <CheckCircle className="w-4 h-4" /> {validCount} Valid
                                        </span>
                                        {warningCount > 0 && (
                                            <span className="flex items-center gap-1 px-3 py-1 bg-warning/10 text-warning rounded-full text-sm">
                                                <AlertCircle className="w-4 h-4" /> {warningCount} Warnings
                                            </span>
                                        )}
                                        {errorCount > 0 && (
                                            <span className="flex items-center gap-1 px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm">
                                                <AlertCircle className="w-4 h-4" /> {errorCount} Errors
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-border">
                                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Invoice</th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Party</th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">GSTIN</th>
                                                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Taxable</th>
                                                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Total Tax</th>
                                                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {parsedData.map((invoice, index) => (
                                                <motion.tr
                                                    key={invoice.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className={`border-b border-border ${invoice.status === 'error' ? 'bg-destructive/5' :
                                                            invoice.status === 'warning' ? 'bg-warning/5' : ''
                                                        }`}
                                                >
                                                    <td className="py-3 px-4">
                                                        {invoice.status === 'valid' && (
                                                            <span className="flex items-center gap-1 text-success">
                                                                <CheckCircle className="w-4 h-4" />
                                                            </span>
                                                        )}
                                                        {invoice.status === 'warning' && (
                                                            <span className="flex items-center gap-1 text-warning" title={invoice.message}>
                                                                <AlertCircle className="w-4 h-4" />
                                                            </span>
                                                        )}
                                                        {invoice.status === 'error' && (
                                                            <span className="flex items-center gap-1 text-destructive" title={invoice.message}>
                                                                <AlertCircle className="w-4 h-4" />
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <p className="font-medium">{invoice.invoiceNumber}</p>
                                                        <p className="text-xs text-muted-foreground">{invoice.date}</p>
                                                    </td>
                                                    <td className="py-3 px-4 text-sm">{invoice.party}</td>
                                                    <td className="py-3 px-4">
                                                        <span className={`font-mono text-sm ${invoice.status === 'error' ? 'text-destructive' : ''
                                                            }`}>
                                                            {invoice.gstin}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-right font-medium">
                                                        {formatCurrency(invoice.taxableValue)}
                                                    </td>
                                                    <td className="py-3 px-4 text-right text-sm text-muted-foreground">
                                                        {formatCurrency(invoice.cgst + invoice.sgst + invoice.igst)}
                                                    </td>
                                                    <td className="py-3 px-4 text-right font-semibold">
                                                        {formatCurrency(invoice.total)}
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {errorCount > 0 && (
                                    <div className="mt-4 p-4 bg-destructive/10 rounded-xl border border-destructive/20">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-medium text-destructive">
                                                    {errorCount} invoice(s) have errors
                                                </p>
                                                <p className="text-sm text-destructive/80">
                                                    These invoices will be skipped during import. You can fix them and re-upload.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between mt-6">
                                    <Button variant="outline" onClick={() => setStep(2)}>
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back
                                    </Button>
                                    <div className="flex gap-3">
                                        <Button variant="outline" leftIcon={<RefreshCw className="w-4 h-4" />}>
                                            Re-parse
                                        </Button>
                                        <Button
                                            onClick={handleProcess}
                                            isLoading={isProcessing}
                                            rightIcon={<CheckCircle className="w-4 h-4" />}
                                        >
                                            {isProcessing ? 'Processing...' : `Import ${validCount + warningCount} Invoices`}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
