import { Head, Link } from '@inertiajs/react';
import GuestNavbar from '@/Components/GuestNavbar';
import GlassCard from '@/Components/GlassCard';
import PageWrapper from '@/Components/PageWrapper';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to Clinicare" />

            <div className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden">
                
                <div 
                    className="absolute inset-0 bg-cover bg-center z-[-2]" 
                    style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/031/691/404/non_2x/ideal-healthcare-background-with-surrealist-blurry-hospital-scene-ai-generative-free-photo.jpg')" }}
                ></div>

                <div className="absolute inset-0 bg-blue-900/70 z-[-1]"></div>

                <GuestNavbar auth={auth} />

                <PageWrapper className="relative z-10 w-full max-w-5xl px-4 md:px-6 flex flex-col items-center justify-center mt-20 mb-10">
                    
                    <GlassCard className="p-8 sm:p-12 md:p-16 text-center max-w-3xl">
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
                    </GlassCard>
                </PageWrapper>
            </div>
        </>
    );
}