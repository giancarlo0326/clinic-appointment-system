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
        {
            label: 'Dashboard',
            href: route('dashboard'),
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-3a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z" />
                </svg>
            ),
        },
        {
            label: 'Appointment',
            href: '#',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            label: 'Doctors',
            href: '#',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            label: 'Departments',
            href: '#',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
        },
        {
            label: 'Medical Records',
            href: '#',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
        {
            label: 'Profile',
            href: route('profile.edit'),
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
        },
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Sora:wght@400;600;700;800&display=swap');

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                :root {
                    --coral: #F07167;
                    --coral-light: #FDDDD9;
                    --coral-soft: #FEF0EE;
                    --salmon: #F4A261;
                    --white: #FFFFFF;
                    --gray-50: #F9FAFB;
                    --gray-100: #F3F4F6;
                    --gray-200: #E5E7EB;
                    --gray-400: #9CA3AF;
                    --gray-500: #6B7280;
                    --gray-700: #374151;
                    --gray-900: #111827;
                    --sidebar-width: 240px;
                    --topbar-height: 68px;
                    --font-heading: 'Sora', sans-serif;
                    --font-body: 'DM Sans', sans-serif;
                }

                body {
                    font-family: var(--font-body);
                    background-color: #F5F6FA;
                    color: var(--gray-900);
                }

                /* ── Toast ── */
                .toast {
                    position: fixed;
                    top: calc(var(--topbar-height) + 16px);
                    right: 20px;
                    z-index: 200;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: #fff;
                    border: 1.5px solid #d1fae5;
                    border-radius: 14px;
                    padding: 12px 16px;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
                    font-size: 13.5px;
                    font-weight: 600;
                    color: #065f46;
                    animation: slideIn 0.4s cubic-bezier(.22,1,.36,1);
                    max-width: 340px;
                }
                .toast-icon {
                    width: 32px; height: 32px;
                    background: #d1fae5;
                    border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 15px; flex-shrink: 0;
                }
                .toast-close {
                    margin-left: auto;
                    background: none; border: none;
                    cursor: pointer;
                    color: var(--gray-400);
                    padding: 2px;
                    border-radius: 6px;
                    display: flex; align-items: center;
                    transition: color 0.2s;
                }
                .toast-close:hover { color: var(--gray-700); }

                /* ── Topbar ── */
                .topbar {
                    position: fixed;
                    top: 0; left: 0; right: 0;
                    height: var(--topbar-height);
                    background: var(--white);
                    border-bottom: 1px solid var(--gray-200);
                    z-index: 100;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 24px;
                }
                .topbar-logo {
                    display: flex; align-items: center; gap: 8px;
                    text-decoration: none;
                    font-family: var(--font-heading);
                    font-weight: 800;
                    font-size: 20px;
                    color: var(--gray-900);
                    letter-spacing: -0.5px;
                }
                .topbar-logo span.dot { color: var(--coral); }

                .topbar-search {
                    flex: 1;
                    max-width: 320px;
                    margin: 0 24px;
                    position: relative;
                }
                .topbar-search input {
                    width: 100%;
                    background: var(--gray-50);
                    border: 1.5px solid var(--gray-200);
                    border-radius: 10px;
                    padding: 9px 14px 9px 38px;
                    font-size: 13.5px;
                    color: var(--gray-700);
                    font-family: var(--font-body);
                    outline: none;
                    transition: border-color 0.2s;
                }
                .topbar-search input:focus { border-color: var(--coral); }
                .topbar-search svg {
                    position: absolute;
                    left: 11px; top: 50%;
                    transform: translateY(-50%);
                    color: var(--gray-400);
                }

                .topbar-actions {
                    display: flex; align-items: center; gap: 12px;
                }
                .topbar-icon-btn {
                    position: relative;
                    width: 38px; height: 38px;
                    border-radius: 10px;
                    background: var(--gray-50);
                    border: 1.5px solid var(--gray-200);
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                    color: var(--gray-500);
                    transition: all 0.2s;
                }
                .topbar-icon-btn:hover { background: var(--coral-soft); border-color: var(--coral-light); color: var(--coral); }
                .badge {
                    position: absolute; top: -4px; right: -4px;
                    width: 17px; height: 17px;
                    background: var(--coral);
                    border-radius: 50%;
                    font-size: 9px; font-weight: 700; color: #fff;
                    display: flex; align-items: center; justify-content: center;
                    border: 2px solid #fff;
                }
                .topbar-avatar {
                    width: 38px; height: 38px;
                    border-radius: 10px;
                    background: var(--coral-light);
                    display: flex; align-items: center; justify-content: center;
                    font-family: var(--font-heading);
                    font-weight: 700;
                    font-size: 14px;
                    color: var(--coral);
                    cursor: pointer;
                    border: 2px solid var(--coral-light);
                    position: relative;
                }
                .avatar-online {
                    position: absolute; bottom: -2px; right: -2px;
                    width: 10px; height: 10px;
                    background: #10b981;
                    border-radius: 50%; border: 2px solid #fff;
                }
                .hamburger {
                    display: none;
                    width: 38px; height: 38px;
                    border-radius: 10px;
                    background: var(--gray-50);
                    border: 1.5px solid var(--gray-200);
                    align-items: center; justify-content: center;
                    cursor: pointer; color: var(--gray-700);
                }

                /* ── Sidebar ── */
                .sidebar {
                    position: fixed;
                    top: var(--topbar-height);
                    left: 0;
                    width: var(--sidebar-width);
                    height: calc(100vh - var(--topbar-height));
                    background: var(--white);
                    border-right: 1px solid var(--gray-200);
                    z-index: 90;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 20px 14px;
                    transition: transform 0.3s cubic-bezier(.22,1,.36,1);
                }
                .sidebar-section-label {
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--gray-400);
                    padding: 0 8px;
                    margin-bottom: 8px;
                    margin-top: 16px;
                }
                .sidebar-section-label:first-child { margin-top: 0; }

                .nav-link {
                    display: flex;
                    align-items: center;
                    gap: 11px;
                    padding: 10px 12px;
                    border-radius: 10px;
                    font-size: 13.5px;
                    font-weight: 500;
                    color: var(--gray-500);
                    text-decoration: none;
                    transition: all 0.2s;
                    margin-bottom: 2px;
                    cursor: pointer;
                }
                .nav-link:hover {
                    background: var(--coral-soft);
                    color: var(--coral);
                }
                .nav-link.active {
                    background: var(--coral);
                    color: #fff;
                    font-weight: 600;
                    box-shadow: 0 4px 14px rgba(240,113,103,0.35);
                }
                .nav-link .nav-icon {
                    width: 36px; height: 36px;
                    border-radius: 9px;
                    display: flex; align-items: center; justify-content: center;
                    background: transparent;
                    flex-shrink: 0;
                    transition: background 0.2s;
                }
                .nav-link.active .nav-icon {
                    background: rgba(255,255,255,0.18);
                }
                .nav-link:hover:not(.active) .nav-icon {
                    background: var(--coral-light);
                }

                /* Sidebar user card */
                .sidebar-user-card {
                    background: var(--coral-soft);
                    border: 1.5px solid var(--coral-light);
                    border-radius: 12px;
                    padding: 12px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 16px;
                }
                .sidebar-user-avatar {
                    width: 38px; height: 38px;
                    border-radius: 9px;
                    background: var(--coral-light);
                    display: flex; align-items: center; justify-content: center;
                    font-family: var(--font-heading);
                    font-weight: 700; font-size: 14px;
                    color: var(--coral);
                    flex-shrink: 0;
                }
                .sidebar-user-name {
                    font-size: 13px; font-weight: 700;
                    color: var(--gray-900);
                    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                }
                .sidebar-user-role {
                    font-size: 11px; color: var(--gray-400); font-weight: 500;
                }

                /* Logout */
                .logout-btn {
                    display: flex;
                    align-items: center;
                    gap: 11px;
                    width: 100%;
                    padding: 10px 12px;
                    border-radius: 10px;
                    font-size: 13.5px;
                    font-weight: 600;
                    color: var(--coral);
                    background: none;
                    border: none;
                    cursor: pointer;
                    text-decoration: none;
                    transition: background 0.2s;
                    font-family: var(--font-body);
                }
                .logout-btn:hover { background: #fff1f0; }
                .logout-icon {
                    width: 36px; height: 36px;
                    border-radius: 9px;
                    background: #ffe4e1;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                }

                /* ── Main ── */
                .main-content {
                    padding-top: calc(var(--topbar-height) + 28px);
                    margin-left: var(--sidebar-width);
                    padding-left: 28px;
                    padding-right: 28px;
                    padding-bottom: 40px;
                    min-height: 100vh;
                }
                .page-header { margin-bottom: 28px; }
                .page-title {
                    font-family: var(--font-heading);
                    font-size: 26px;
                    font-weight: 800;
                    color: var(--gray-900);
                    letter-spacing: -0.5px;
                }
                .page-title-underline {
                    width: 36px; height: 3.5px;
                    background: var(--coral);
                    border-radius: 99px;
                    margin-top: 8px;
                }

                /* Overlay for mobile */
                .sidebar-overlay {
                    display: none;
                    position: fixed; inset: 0;
                    background: rgba(0,0,0,0.3);
                    z-index: 80;
                    backdrop-filter: blur(2px);
                }

                /* ── Responsive ── */
                @media (max-width: 1024px) {
                    .topbar-search { display: none; }
                    .hamburger { display: flex; }
                    .sidebar { transform: translateX(-100%); }
                    .sidebar.open { transform: translateX(0); }
                    .sidebar-overlay.open { display: block; }
                    .main-content { margin-left: 0; }
                }
                @media (max-width: 640px) {
                    .main-content { padding-left: 16px; padding-right: 16px; }
                    .page-title { font-size: 22px; }
                }

                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>

            {/* Toast Notification */}
            {notification.visible && (
                <div className="toast">
                    <div className="toast-icon">✅</div>
                    <span>{notification.message}</span>
                    <button className="toast-close" onClick={() => setNotification({ ...notification, visible: false })}>
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
                            <rect width="28" height="28" rx="8" fill="#F07167"/>
                            <path d="M14 7v14M7 14h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                        <span>Clini<span className="dot">Care</span></span>
                    </Link>
                </div>

                <div className="topbar-search">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
                    </svg>
                    <input type="text" placeholder="Search patients, doctors..." />
                </div>

                <div className="topbar-actions">
                    <button className="topbar-icon-btn">
                        <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
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
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
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