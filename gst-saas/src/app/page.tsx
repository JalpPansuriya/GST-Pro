'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  FileSpreadsheet,
  Calculator,
  Shield,
  Upload,
  Zap,
  Users,
  BarChart3,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const features = [
  {
    icon: Upload,
    title: 'Easy Invoice Upload',
    description: 'Upload Excel or PDF invoices with drag-and-drop. Automatic data extraction.',
  },
  {
    icon: Calculator,
    title: 'Auto GST Calculation',
    description: 'Automatic computation of CGST, SGST, IGST from your invoices.',
  },
  {
    icon: FileSpreadsheet,
    title: 'GSTR-1 & GSTR-3B',
    description: 'Generate GST portal-ready reports with one click.',
  },
  {
    icon: BarChart3,
    title: 'ITC Tracking',
    description: 'Track Input Tax Credit with vendor-wise breakdown.',
  },
  {
    icon: Shield,
    title: 'Secure & Compliant',
    description: 'Bank-grade security with complete data privacy.',
  },
  {
    icon: Users,
    title: 'Multi-GSTIN Support',
    description: 'Manage multiple businesses from a single dashboard.',
  },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: '₹499',
    period: '/month',
    description: 'Perfect for small businesses',
    features: ['1 GSTIN', '100 invoices/month', 'GSTR-1 & GSTR-3B', 'Excel export', 'Email support'],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    price: '₹1,499',
    period: '/month',
    description: 'For growing businesses',
    features: ['5 GSTINs', 'Unlimited invoices', 'All reports', 'JSON export for portal', 'Priority support', 'CA access'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations',
    features: ['Unlimited GSTINs', 'API access', 'Custom integrations', 'Dedicated support', 'On-premise option'],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="font-bold text-xl gradient-text">GST Pro</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Simplify Your GST Compliance
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                GST Filing Made{' '}
                <span className="gradient-text">Simple</span>{' '}
                for Indian Businesses
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                Upload invoices, calculate GST automatically, and generate GSTR-1 & GSTR-3B reports.
                Built for textile traders, embroidery units, and small businesses.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Link href="/signup">
                  <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg">
                    View Demo
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  14-day free trial
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />

              {/* Dashboard Preview Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl border border-border p-6 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <div className="w-3 h-3 rounded-full bg-success" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                    <div>
                      <p className="text-sm text-muted-foreground">Net GST Payable</p>
                      <p className="text-2xl font-bold gradient-text">₹56,260</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Calculator className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-success/5 rounded-xl text-center">
                      <p className="text-xs text-muted-foreground">CGST</p>
                      <p className="font-semibold">₹22,504</p>
                    </div>
                    <div className="p-3 bg-accent/5 rounded-xl text-center">
                      <p className="text-xs text-muted-foreground">SGST</p>
                      <p className="font-semibold">₹22,504</p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-xl text-center">
                      <p className="text-xs text-muted-foreground">IGST</p>
                      <p className="font-semibold">₹11,252</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Everything You Need for GST Compliance</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed specifically for Indian businesses to manage GST effortlessly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-white rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Three simple steps to GST compliance</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Upload Invoices', description: 'Upload your purchase and sales invoices in Excel or PDF format', icon: Upload },
              { step: '02', title: 'Auto Calculate', description: 'Our system automatically computes GST with CGST, SGST, IGST breakdown', icon: Calculator },
              { step: '03', title: 'Generate Reports', description: 'Download GSTR-1, GSTR-3B in Excel or JSON format for GST portal', icon: FileSpreadsheet },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="text-center">
                    <div className="relative inline-block mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-foreground text-white flex items-center justify-center text-sm font-bold">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">Choose the plan that fits your business</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-3xl ${plan.popular
                    ? 'bg-gradient-to-br from-primary to-accent text-white scale-105'
                    : 'bg-white border border-border'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-warning text-warning-foreground text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className={plan.popular ? 'text-white/80' : 'text-muted-foreground'}>{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={plan.popular ? 'text-white/80' : 'text-muted-foreground'}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className={`w-5 h-5 ${plan.popular ? 'text-white' : 'text-success'}`} />
                      <span className={plan.popular ? 'text-white/90' : ''}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? 'secondary' : 'primary'}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Simplify Your GST?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of Indian businesses using GST Pro for hassle-free compliance.
            </p>
            <Link href="/signup">
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Start Your Free Trial
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="font-bold text-lg gradient-text">GST Pro</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Simplifying GST compliance for Indian businesses since 2024.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 GST Pro. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Made with ❤️ in India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
