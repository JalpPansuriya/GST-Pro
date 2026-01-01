'use client';

import { ReactNode } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { SidebarProvider, useSidebar } from '@/context/SidebarContext';

interface DashboardLayoutProps {
    children: ReactNode;
}

function DashboardContent({ children }: { children: ReactNode }) {
    const { isCollapsed } = useSidebar();

    return (
        <>
            <Sidebar />
            <Header />
            <main
                className="pt-16 transition-all duration-300"
                style={{ marginLeft: isCollapsed ? 80 : 260 }}
            >
                <div className="p-6">
                    {children}
                </div>
            </main>
        </>
    );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <SidebarProvider>
            <div className="min-h-screen bg-muted/30">
                <DashboardContent>{children}</DashboardContent>
            </div>
        </SidebarProvider>
    );
}

