import { Head, Link } from '@inertiajs/react';
import GuestNavbar from '@/Components/GuestNavbar'; // Make sure this path matches your folder structure

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to Clinicare" />

            <div className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden">
                
                {/* 1. Static Background Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center z-[-2]" 
                    style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/031/691/404/non_2x/ideal-healthcare-background-with-surrealist-blurry-hospital-scene-ai-generative-free-photo.jpg')" }}
                ></div>

                {/* Dark Blue Overlay */}
                <div className="absolute inset-0 bg-blue-900/70 z-[-1]"></div>

                {/* Navbar Component */}
                <GuestNavbar auth={auth} />

                {/* 3. Main Content */}
                <main className="relative z-10 w-full max-w-5xl px-4 md:px-6 flex flex-col items-center justify-center mt-20 mb-10">
                    
                    {/* Hero Card */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 sm:p-12 md:p-16 rounded-3xl shadow-2xl text-center w-full max-w-3xl animate-fade-in-up delay-1">
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 md:mb-6 drop-shadow-md tracking-tight leading-tight">
                            Your Health, <span className="text-blue-300">Our Wealth.</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-blue-50 mb-8 md:mb-10 max-w-xl mx-auto drop-shadow-sm leading-relaxed">
                            Book your next clinic appointment in seconds. Manage your medical history securely in one place.
                        </p>
                        
                        <Link
                            href={route('register')}
                            className="inline-block bg-blue-600 text-white text-base md:text-lg font-bold px-8 py-3 md:px-10 md:py-4 rounded-full shadow-xl hover:bg-blue-500 hover:scale-105 transition-all duration-300 active:scale-95"
                        >
                            Book an Appointment
                        </Link>
                    </div>

                    {/* 4. Trust Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-12 md:mt-16 w-full max-w-4xl">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-6 rounded-2xl flex items-center gap-4 text-white shadow-lg animate-fade-in-up delay-2 hover:bg-white/20 transition-all duration-300 hover:translate-y-[-5px]">
                            <div className="text-3xl md:text-4xl shrink-0">📅</div>
                            <div>
                                <h3 className="font-bold text-sm md:text-lg">24/7 Booking</h3>
                                <p className="text-[10px] md:text-sm text-blue-100">Schedule at your convenience.</p>
                            </div>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-6 rounded-2xl flex items-center gap-4 text-white shadow-lg animate-fade-in-up delay-2 hover:bg-white/20 transition-all duration-300 hover:translate-y-[-5px]">
                            <div className="text-3xl md:text-4xl shrink-0">🩺</div>
                            <div>
                                <h3 className="font-bold text-sm md:text-lg">Top Specialists</h3>
                                <p className="text-[10px] md:text-sm text-blue-100">Expert, compassionate care.</p>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-6 rounded-2xl flex items-center gap-4 text-white shadow-lg sm:col-span-2 md:col-span-1 animate-fade-in-up delay-3 hover:bg-white/20 transition-all duration-300 hover:translate-y-[-5px]">
                            <div className="text-3xl md:text-4xl shrink-0">🔒</div>
                            <div>
                                <h3 className="font-bold text-sm md:text-lg">Secure Records</h3>
                                <p className="text-[10px] md:text-sm text-blue-100">100% private and encrypted.</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}