import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import '../../css/layouts/authenticated.css';

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
        {
            label: 'Dashboard',
            href: route('dashboard'),
            icon: (
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-3a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z" />
                </svg>
            ),
        },
        {
            label: 'Appointment',
            href: '#',
            icon: (
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            label: 'Doctors',
            href: '#',
            icon: (
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            label: 'Departments',
            href: '#',
            icon: (
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
        },
        {
            label: 'Medical Records',
            href: '#',
            icon: (
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
        {
            label: 'Profile',
            href: route('profile.edit'),
            icon: (
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
        },
    ];

    return (
        <>
            {/* Toast Notification */}
            {notification.visible && (
                <div className="toast">
                    <div className="toast-icon">✅</div>
                    <span>{notification.message}</span>
                    <button
                        className="toast-close"
                        onClick={() => setNotification({ ...notification, visible: false })}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Topbar */}
            <header className="topbar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button className="hamburger" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                    <Link href="/" className="topbar-logo">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <rect width="28" height="28" rx="8" fill="#F07167" />
                            <path d="M14 7v14M7 14h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                        <span>Clini<span className="dot">Care</span></span>
                    </Link>
                </div>

                <div className="topbar-search">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                    </svg>
                    <input type="text" placeholder="Search patients, doctors..." />
                </div>

                <div className="topbar-actions">
                    <button className="topbar-icon-btn">
                        <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="badge">3</span>
                    </button>
                    <div className="topbar-avatar">
                        {user?.name?.[0]?.toUpperCase() ?? 'U'}
                        <span className="avatar-online"></span>
                    </div>
                </div>
            </header>

            {/* Sidebar Overlay (mobile) */}
            <div
                className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div>
                    {/* User Card */}
                    <div className="sidebar-user-card">
                        <div className="sidebar-user-avatar">
                            {user?.name?.[0]?.toUpperCase() ?? 'U'}
                        </div>
                        <div style={{ minWidth: 0 }}>
                            <div className="sidebar-user-name">{user?.name ?? 'Patient'}</div>
                            <div className="sidebar-user-role">Patient · #2026-001</div>
                        </div>
                    </div>

                    <div className="sidebar-section-label">Main Menu</div>

                    <nav>
                        {navItems.map((item) => {
                            const active = typeof route === 'function' && route().current()
                                ? route().current(item.href)
                                : false;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`nav-link ${active ? 'active' : ''}`}
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <span className="nav-icon">{item.icon}</span>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div>
                    <Link
                        method="post"
                        href={route('logout')}
                        as="button"
                        className="logout-btn"
                    >
                        <span className="logout-icon">
                            <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </span>
                        Log Out
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {header && (
                        <div className="page-header">
                            <h2 className="page-title">{header}</h2>
                            <div className="page-title-underline" />
                        </div>
                    )}
                    {children}
                </div>
            </main>
        </>
    );
}