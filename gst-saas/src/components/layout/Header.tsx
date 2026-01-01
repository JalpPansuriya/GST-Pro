'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell,
    Search,
    ChevronDown,
    LogOut,
    User,
    Settings,
    Building2,
} from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';

const Header = () => {
    const { isCollapsed } = useSidebar();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        { id: 1, title: 'GSTR-1 Due', message: 'File your GSTR-1 before Jan 11', time: '2h ago', unread: true },
        { id: 2, title: 'Invoice Uploaded', message: '23 invoices processed successfully', time: '5h ago', unread: true },
        { id: 3, title: 'ITC Mismatch', message: '2 vendors have ITC discrepancies', time: '1d ago', unread: false },
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <header
            className="h-16 bg-card/80 backdrop-blur-xl border-b border-border fixed top-0 right-0 z-40 flex items-center justify-between px-6 transition-all duration-300"
            style={{ left: isCollapsed ? 80 : 260 }}
        >
            {/* Search */}
            <div className="flex items-center gap-4 flex-1 max-w-xl">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search invoices, reports..."
                        className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted/50 border border-transparent focus:border-primary focus:bg-white transition-all duration-200 text-sm outline-none"
                    />
                    <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs bg-muted rounded text-muted-foreground">
                        ⌘K
                    </kbd>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
                {/* Current Period */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-lg">
                    <span className="text-sm text-muted-foreground">Period:</span>
                    <span className="text-sm font-medium">Jan 2026</span>
                </div>

                {/* Notifications */}
                <div className="relative">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2 rounded-xl hover:bg-muted transition-colors"
                    >
                        <Bell className="w-5 h-5 text-muted-foreground" />
                        {unreadCount > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center"
                            >
                                {unreadCount}
                            </motion.span>
                        )}
                    </motion.button>

                    <AnimatePresence>
                        {showNotifications && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowNotifications(false)}
                                />
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 top-full mt-2 w-80 bg-card rounded-2xl shadow-xl border border-border overflow-hidden z-50"
                                >
                                    <div className="p-4 border-b border-border">
                                        <h3 className="font-semibold">Notifications</h3>
                                    </div>
                                    <div className="max-h-80 overflow-y-auto">
                                        {notifications.map((notification) => (
                                            <motion.div
                                                key={notification.id}
                                                whileHover={{ backgroundColor: 'var(--muted)' }}
                                                className={`p-4 border-b border-border cursor-pointer ${notification.unread ? 'bg-primary/5' : ''}`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    {notification.unread && (
                                                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                                    )}
                                                    <div className={notification.unread ? '' : 'ml-5'}>
                                                        <p className="font-medium text-sm">{notification.title}</p>
                                                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                                                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="p-3 border-t border-border">
                                        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium">
                                            View all notifications
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                {/* User Menu */}
                <div className="relative">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-3 p-2 pr-3 rounded-xl hover:bg-muted transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">JD</span>
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-medium">John Doe</p>
                            <p className="text-xs text-muted-foreground">ABC Textiles</p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </motion.button>

                    <AnimatePresence>
                        {showUserMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowUserMenu(false)}
                                />
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 top-full mt-2 w-56 bg-card rounded-2xl shadow-xl border border-border overflow-hidden z-50"
                                >
                                    <div className="p-4 border-b border-border">
                                        <p className="font-medium">John Doe</p>
                                        <p className="text-sm text-muted-foreground">john@abctextiles.com</p>
                                    </div>
                                    <div className="p-2">
                                        <motion.button
                                            whileHover={{ x: 4 }}
                                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left transition-colors"
                                        >
                                            <User className="w-4 h-4" />
                                            <span className="text-sm">Profile</span>
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ x: 4 }}
                                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left transition-colors"
                                        >
                                            <Building2 className="w-4 h-4" />
                                            <span className="text-sm">Organization</span>
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ x: 4 }}
                                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left transition-colors"
                                        >
                                            <Settings className="w-4 h-4" />
                                            <span className="text-sm">Settings</span>
                                        </motion.button>
                                    </div>
                                    <div className="p-2 border-t border-border">
                                        <motion.button
                                            whileHover={{ x: 4 }}
                                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/10 text-destructive text-left transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span className="text-sm">Log out</span>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export { Header };
