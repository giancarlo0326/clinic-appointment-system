import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function AuthenticatedLayout({ user, header, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        { label: 'Dashboard', href: route('dashboard')},
        { label: 'My Appointments', href: '#'},
        { label: 'Medical Records', href: '#'},
        { label: 'Profile', href: route('profile.edit')},
    ];

    return (
        <div className="min-h-screen glass-medical-gradient text-white">
            {/* --- TOP NAVBAR --- */}
            <nav className="fixed top-0 left-0 right-0 z-[100] h-20 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Hamburger Button (Mobile Only) */}
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>

                    {/* Branding - Visible & Responsive */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-500 transition-colors">
                            <span className="text-white text-xl font-bold leading-none">✚</span>
                        </div>
                        <span className="font-extrabold text-xl tracking-tighter sm:text-2xl">CLINICARE</span>
                    </Link>
                </div>

                {/* Patient ID Badge - Responsive hiding */}
                <div className="hidden md:block">
                    <div className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-mono text-blue-300">
                        PATIENT ID: #2026-001
                    </div>
                </div>
            </nav>

            {/* --- SIDEBAR --- */}
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[80] lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside className={`
                fixed top-20 left-0 z-[90] w-64 h-[calc(100vh-5rem)]
                bg-slate-900/50 backdrop-blur-2xl border-r border-white/10
                transition-all duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-4 flex flex-col h-full">
                    <nav className="flex-1 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all
                                    ${route().current(item.href) 
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                                        : 'text-white/60 hover:bg-white/10 hover:text-white'}
                                `}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span className="text-sm uppercase tracking-wide">{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="pt-4 border-t border-white/10">
                        <Link
                            method="post"
                            href={route('logout')}
                            as="button"
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-red-400 hover:bg-red-500/10 transition-all text-sm uppercase tracking-wide"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className={`
                min-h-screen pt-24 transition-all duration-300
                lg:ml-64 px-4 sm:px-8 pb-10
            `}>
                <div className="max-w-7xl mx-auto space-y-6">
                    {header && (
                        <div className="mb-8">
                            {header}
                        </div>
                    )}
                    {children}
                </div>
            </main>
        </div>
    );
}