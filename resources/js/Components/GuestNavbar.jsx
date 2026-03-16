// resources/js/Components/GuestNavbar.jsx
import { Link } from '@inertiajs/react';

export default function GuestNavbar({ auth, showAuthLinks = true }) {
    return (
        <header className="absolute top-0 w-full p-4 md:p-6 flex justify-between items-center z-20 animate-fade-in-up">
            <Link href="/" className="group flex items-center gap-2 shrink-0">
                <div className="text-white font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight flex items-center gap-1 sm:gap-2">
                    <span className="text-blue-300 text-xl sm:text-2xl md:text-3xl transition-transform group-hover:scale-110">✚</span> 
                    <span>CLINICARE</span>
                </div>
            </Link>
            
            {/* Only render the nav links if showAuthLinks is true */}
            {showAuthLinks && (
                <nav className="flex gap-2 sm:gap-4 items-center ml-2">
                    {auth?.user ? (
                        <Link href={route('dashboard')} className="text-white hover:text-blue-200 transition font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-white hover:text-blue-200 transition font-semibold text-xs sm:text-sm md:text-base px-1 whitespace-nowrap">
                                Sign In
                            </Link>
                            <Link href={route('register')} className="bg-white text-blue-700 px-3 py-1.5 sm:px-6 sm:py-2 rounded-full font-bold hover:bg-blue-50 transition shadow-lg text-xs sm:text-sm md:text-base whitespace-nowrap">
                                Sign Up
                            </Link>
                        </>
                    )}
                </nav>
            )}
        </header>
    );
}