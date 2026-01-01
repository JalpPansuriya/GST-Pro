'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Building2,
    MapPin,
    Phone,
    Mail,
    FileText,
    Edit,
    Plus,
    CheckCircle,
    AlertCircle,
    ExternalLink,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Mock organization data
const organization = {
    id: 1,
    tradeName: 'ABC Textiles',
    legalName: 'ABC Textiles Private Limited',
    gstin: '27AABCU9603R1ZM',
    state: 'Maharashtra',
    address: '123, Industrial Area, Surat, Gujarat - 395002',
    phone: '+91 98765 43210',
    email: 'contact@abctextiles.com',
    businessType: 'Private Limited',
    registrationDate: '2020-04-01',
    status: 'Active',
};

const additionalGstins = [
    { gstin: '24AABCU9603R1ZM', state: 'Gujarat', status: 'Active' },
    { gstin: '29AABCU9603R1ZM', state: 'Karnataka', status: 'Active' },
];

export default function OrganizationPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Organization</h1>
                    <p className="text-muted-foreground mt-1">Manage your business details and GSTINs</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/organization/setup">
                        <Button variant="outline" leftIcon={<Plus className="w-4 h-4" />}>
                            Add GSTIN
                        </Button>
                    </Link>
                    <Button leftIcon={<Edit className="w-4 h-4" />}>
                        Edit Details
                    </Button>
                </div>
            </div>

            {/* Main Organization Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Card className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                    <Building2 className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">{organization.tradeName}</CardTitle>
                                    <CardDescription>{organization.legalName}</CardDescription>
                                </div>
                            </div>
                            <span className="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium flex items-center gap-1">
                                <CheckCircle className="w-4 h-4" />
                                {organization.status}
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">GSTIN (Primary)</p>
                                    <p className="font-mono font-semibold text-lg">{organization.gstin}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Business Type</p>
                                    <p className="font-medium">{organization.businessType}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Registration Date</p>
                                    <p className="font-medium">{organization.registrationDate}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Address</p>
                                        <p className="font-medium">{organization.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">State</p>
                                        <p className="font-medium">{organization.state}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Phone</p>
                                        <p className="font-medium">{organization.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Email</p>
                                        <p className="font-medium">{organization.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Additional GSTINs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Additional GSTINs</CardTitle>
                                <CardDescription>Other registered GSTINs for your organization</CardDescription>
                            </div>
                            <Link href="/organization/setup">
                                <Button variant="outline" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                                    Add New
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {additionalGstins.map((gstin, index) => (
                                <motion.div
                                    key={gstin.gstin}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Building2 className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-mono font-medium">{gstin.gstin}</p>
                                            <p className="text-sm text-muted-foreground">{gstin.state}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="px-2 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
                                            {gstin.status}
                                        </span>
                                        <Button variant="ghost" size="sm">
                                            <ExternalLink className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                <Card hover className="cursor-pointer">
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                <FileText className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-1">GST Certificate</h3>
                            <p className="text-sm text-muted-foreground">Download your GST registration certificate</p>
                        </div>
                    </CardContent>
                </Card>

                <Card hover className="cursor-pointer">
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                                <CheckCircle className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="font-semibold mb-1">Verify GSTIN</h3>
                            <p className="text-sm text-muted-foreground">Verify your GSTIN on GST portal</p>
                        </div>
                    </CardContent>
                </Card>

                <Card hover className="cursor-pointer">
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center mx-auto mb-3">
                                <AlertCircle className="w-6 h-6 text-warning" />
                            </div>
                            <h3 className="font-semibold mb-1">Compliance Check</h3>
                            <p className="text-sm text-muted-foreground">Check your filing compliance status</p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
