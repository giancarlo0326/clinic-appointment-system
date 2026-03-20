import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ user, header, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { flash } = usePage().props;
    const [notification, setNotification] = useState({ message: '', visible: false });

    useEffect(() => {
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
        /* Global text color set to Slate-900 for high contrast */
        <div className="min-h-screen glass-medical-gradient text-slate-900 font-sans selection:bg-blue-100">
            
            {/* --- TOASTER (Refreshed for Light Theme) --- */}
            {notification.visible && (
                <div className="fixed top-24 right-6 z-[110] w-[calc(100%-3rem)] max-w-md animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="bg-white/90 backdrop-blur-2xl border border-emerald-200 text-emerald-900 p-4 rounded-3xl shadow-2xl shadow-emerald-200/40 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="bg-emerald-100 p-2 rounded-2xl text-lg">✅</span>
                            <p className="text-sm font-bold tracking-tight">{notification.message}</p>
                        </div>
                        <button onClick={() => setNotification({ ...notification, visible: false })} className="text-slate-400 hover:text-slate-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor font-bold">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* --- TOP NAVBAR --- */}
            <nav className="fixed top-0 left-0 right-0 z-[100] h-20 bg-white/40 backdrop-blur-xl border-b border-white/60 px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2.5 bg-white border border-slate-200 rounded-2xl text-slate-600 shadow-sm">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>

                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="text-slate-900 font-black text-xl md:text-2xl tracking-tighter flex items-center gap-2">
                            <span className="text-blue-600 text-2xl drop-shadow-[0_0_8px_rgba(37,99,235,0.3)]">✚</span> 
                            <span>CLINICARE</span>
                        </div>
                    </Link>
                </div>

                <div className="hidden md:block">
                    <div className="bg-blue-50 border border-blue-100 px-4 py-2 rounded-2xl text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
                        PATIENT ID: #2026-001
                    </div>
                </div>
            </nav>

            {/* --- SIDEBAR --- */}
            <aside className={`
                fixed top-20 left-0 z-[90] w-72 h-[calc(100vh-5rem)]
                bg-white/20 backdrop-blur-3xl border-r border-white/40
                transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 flex flex-col h-full justify-between">
                    <nav className="space-y-3">
                        {navItems.map((item) => {
                            const active = route().current(item.href);
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`
                                        flex items-center gap-4 px-5 py-4 rounded-3xl font-black transition-all duration-300
                                        ${active 
                                            ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 translate-x-1' 
                                            : 'text-slate-500 hover:bg-white/60 hover:text-blue-600 hover:translate-x-1'}
                                    `}
                                >
                                    <span className={`text-xl ${active ? 'opacity-100' : 'opacity-70'}`}>{item.icon}</span>
                                    <span className="text-xs uppercase tracking-widest">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="pt-6 border-t border-slate-200/60">
                        <Link
                            method="post"
                            href={route('logout')}
                            as="button"
                            className="w-full flex items-center gap-4 px-5 py-4 rounded-3xl font-black text-red-500 hover:bg-red-50 transition-all text-xs uppercase tracking-widest"
                        >
                            <span className="text-xl">🚪</span>
                            Logout
                        </Link>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className={`
                min-h-screen pt-24 transition-all duration-500
                lg:ml-72 px-6 sm:px-10 pb-12
            `}>
                <div className="max-w-6xl mx-auto">
                    {header && (
                        <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            {/* Header font fixed to deep slate */}
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                                {header}
                            </h2>
                            <div className="h-1.5 w-12 bg-blue-600 rounded-full mt-3"></div>
                        </div>
                    )}
                    <div className="animate-in fade-in zoom-in-95 duration-500">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}