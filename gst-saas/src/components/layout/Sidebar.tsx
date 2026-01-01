'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from '@/context/SidebarContext';
import {
    LayoutDashboard,
    FileText,
    Upload,
    Calculator,
    FileSpreadsheet,
    Building2,
    ChevronLeft,
    ChevronRight,
    Settings,
    HelpCircle,
    Receipt,
} from 'lucide-react';

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: string;
}

const mainNavItems: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Invoices', href: '/invoices', icon: <FileText className="w-5 h-5" /> },
    { label: 'Upload', href: '/invoices/upload', icon: <Upload className="w-5 h-5" /> },
    { label: 'GST Summary', href: '/gst', icon: <Calculator className="w-5 h-5" /> },
];

const reportNavItems: NavItem[] = [
    { label: 'GSTR-1', href: '/reports/gstr1', icon: <FileSpreadsheet className="w-5 h-5" /> },
    { label: 'GSTR-3B', href: '/reports/gstr3b', icon: <Receipt className="w-5 h-5" /> },
    { label: 'ITC Summary', href: '/reports/itc', icon: <Calculator className="w-5 h-5" /> },
];

const bottomNavItems: NavItem[] = [
    { label: 'Organization', href: '/organization', icon: <Building2 className="w-5 h-5" /> },
    { label: 'Settings', href: '/settings', icon: <Settings className="w-5 h-5" /> },
    { label: 'Help', href: '/help', icon: <HelpCircle className="w-5 h-5" /> },
];

const Sidebar = () => {
    const { isCollapsed, toggleCollapsed } = useSidebar();
    const pathname = usePathname();

    const NavLink = ({ item }: { item: NavItem }) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

        return (
            <Link href={item.href}>
                <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
            flex items-center gap-3 px-3 py-2.5 rounded-xl
            transition-all duration-200 cursor-pointer
            ${isActive
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }
          `}
                >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                className="font-medium overflow-hidden whitespace-nowrap"
                            >
                                {item.label}
                            </motion.span>
                        )}
                    </AnimatePresence>
                    {item.badge && !isCollapsed && (
                        <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
                            {item.badge}
                        </span>
                    )}
                </motion.div>
            </Link>
        );
    };

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? 80 : 260 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-0 h-screen bg-card border-r border-border flex flex-col z-50"
        >
            {/* Logo */}
            <div className="h-16 flex items-center px-4 border-b border-border">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <motion.div
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                        whileHover={{ rotate: 5, scale: 1.05 }}
                    >
                        <span className="text-white font-bold text-lg">G</span>
                    </motion.div>
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                            >
                                <span className="font-bold text-lg gradient-text">GST Pro</span>
                                <p className="text-xs text-muted-foreground">Compliance Made Easy</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Link>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
                <div className="space-y-1">
                    {!isCollapsed && (
                        <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Main
                        </p>
                    )}
                    {mainNavItems.map((item) => (
                        <NavLink key={item.href} item={item} />
                    ))}
                </div>

                <div className="space-y-1">
                    {!isCollapsed && (
                        <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Reports
                        </p>
                    )}
                    {reportNavItems.map((item) => (
                        <NavLink key={item.href} item={item} />
                    ))}
                </div>
            </nav>

            {/* Bottom Navigation */}
            <div className="border-t border-border px-3 py-4 space-y-1">
                {bottomNavItems.map((item) => (
                    <NavLink key={item.href} item={item} />
                ))}
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={toggleCollapsed}
                className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
                {isCollapsed ? (
                    <ChevronRight className="w-4 h-4" />
                ) : (
                    <ChevronLeft className="w-4 h-4" />
                )}
            </button>
        </motion.aside>
    );
};

export { Sidebar };
