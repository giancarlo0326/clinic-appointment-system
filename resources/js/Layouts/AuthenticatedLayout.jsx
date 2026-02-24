import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ user, header, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // --- NOTIFICATION LOGIC ---
    const { flash } = usePage().props;
    const [notification, setNotification] = useState({ message: '', visible: false });

    useEffect(() => {
        /**
         * Logic: 
         * 1. If Laravel sends a flash['success'] message, show it.
         * 2. If no flash but it's a new session (tab just opened/login just happened), show welcome.
         * 3. Uses sessionStorage so it resets every time the browser/tab is closed and reopened.
         */
        if (flash?.success) {
            showToast(flash.success);
        } else if (!sessionStorage.getItem('notified_this_session')) {
            showToast(`Welcome back, ${user.name}!`);
            sessionStorage.setItem('notified_this_session', 'true');
        }
    }, [flash]);

    const showToast = (msg) => {
        setNotification({ message: msg, visible: true });
        setTimeout(() => setNotification({ message: '', visible: false }), 5000);
    };

    const navItems = [
        { label: 'Dashboard', href: route('dashboard'), icon: '📊' },
        { label: 'My Appointments', href: '#', icon: '📅' },
        { label: 'Medical Records', href: '#', icon: '📂' },
        { label: 'Profile', href: route('profile.edit'), icon: '👤' },
    ];

    return (
        <div className="min-h-screen glass-medical-gradient text-white">
            
            {/* --- SUCCESS TOASTER --- */}
            {notification.visible && (
                <div className="fixed top-24 right-6 z-[110] w-[calc(100%-3rem)] max-w-md animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/50 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="bg-emerald-500/40 p-1.5 rounded-full text-lg">✅</span>
                            <p className="text-sm font-bold tracking-wide">{notification.message}</p>
                        </div>
                        <button 
                            onClick={() => setNotification({ ...notification, visible: false })} 
                            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* --- TOP NAVBAR --- */}
            <nav className="fixed top-0 left-0 right-0 z-[100] h-20 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>

                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="text-white font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight flex items-center gap-1 sm:gap-2 shrink-0">
                        <span className="text-blue-300 text-xl sm:text-2xl md:text-3xl">✚</span> 
                        <span>CLINICARE</span>
                    </div>
                    </Link>
                </div>

                <div className="hidden md:block">
                    <div className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-mono text-blue-300 uppercase tracking-widest">
                        PATIENT ID: #2026-001
                    </div>
                </div>
            </nav>

            {/* --- SIDEBAR --- */}
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
                            <span className="text-lg">🚪</span>
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
                        <div className="mb-2">
                            {header}
                        </div>
                    )}
                    {children}
                </div>
            </main>
        </div>
    );
}