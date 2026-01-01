'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    HelpCircle,
    Book,
    MessageCircle,
    Video,
    FileText,
    Search,
    ChevronRight,
    ChevronDown,
    ExternalLink,
    Mail,
    Phone,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const faqs = [
    {
        question: 'How do I upload invoices?',
        answer: 'You can upload invoices by going to the Upload page from the sidebar. We support Excel (.xlsx, .xls) and PDF formats. Simply drag and drop your files or click to browse.',
    },
    {
        question: 'How is GST calculated automatically?',
        answer: 'Once you upload your invoices, our system extracts the invoice details including taxable value and tax amounts. It categorizes them as sales (output) or purchases (input) and calculates CGST, SGST, and IGST automatically.',
    },
    {
        question: 'What reports can I generate?',
        answer: 'You can generate GSTR-1 (outward supplies), GSTR-3B (monthly summary), and ITC Summary reports. These can be exported in Excel format or JSON format compatible with the GST portal.',
    },
    {
        question: 'How do I add multiple GSTINs?',
        answer: 'Go to Organization > Add GSTIN. You can add multiple GSTINs for different states. Each GSTIN will have its own set of invoices and reports.',
    },
    {
        question: 'Is my data secure?',
        answer: 'Yes! We use bank-grade encryption (AES-256) to protect your data. All communications are encrypted using TLS. We never share your data with third parties.',
    },
];

const resources = [
    { title: 'Getting Started Guide', icon: Book, description: 'Learn the basics of GST Pro' },
    { title: 'Video Tutorials', icon: Video, description: 'Step-by-step video guides' },
    { title: 'Documentation', icon: FileText, description: 'Detailed technical documentation' },
    { title: 'GST Guidelines', icon: ExternalLink, description: 'Official GST portal resources' },
];

export default function HelpPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4"
                >
                    <HelpCircle className="w-8 h-8 text-white" />
                </motion.div>
                <h1 className="text-3xl font-bold text-foreground">How can we help?</h1>
                <p className="text-muted-foreground mt-2">Search our knowledge base or browse FAQs below</p>

                {/* Search */}
                <div className="relative mt-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search for help..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/20 text-lg outline-none transition-all"
                    />
                </div>
            </div>

            {/* Quick Resources */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {resources.map((resource, index) => {
                    const Icon = resource.icon;
                    return (
                        <motion.div
                            key={resource.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card hover className="cursor-pointer h-full">
                                <CardContent className="pt-6 text-center">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold mb-1">{resource.title}</h3>
                                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* FAQs */}
            <Card>
                <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Quick answers to common questions</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {filteredFaqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="border border-border rounded-xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                                >
                                    <span className="font-medium">{faq.question}</span>
                                    <motion.div
                                        animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                    </motion.div>
                                </button>
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: expandedFaq === index ? 'auto' : 0,
                                        opacity: expandedFaq === index ? 1 : 0,
                                    }}
                                    className="overflow-hidden"
                                >
                                    <p className="px-4 pb-4 text-muted-foreground">{faq.answer}</p>
                                </motion.div>
                            </motion.div>
                        ))}

                        {filteredFaqs.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground">No FAQs found matching your search</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-success/5">
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                <MessageCircle className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Still need help?</h3>
                                <p className="text-muted-foreground">Our support team is here to assist you</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Button variant="outline" leftIcon={<Mail className="w-4 h-4" />}>
                                Email Support
                            </Button>
                            <Button leftIcon={<Phone className="w-4 h-4" />}>
                                Call Us
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
