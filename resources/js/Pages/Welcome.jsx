import { Head, Link } from '@inertiajs/react';
import GuestNavbar from '@/Components/GuestNavbar';
import GlassCard from '@/Components/GlassCard';
import PageWrapper from '@/Components/PageWrapper';

export default function Welcome({ auth }) {
    return (
        <div className="bg-[#050b1a] min-h-screen">
            <Head title="Welcome to Clinicare" />
            <div className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden pt-20 pb-10 px-4">
                <GuestNavbar auth={auth} />
                <PageWrapper className="relative z-10 w-full max-w-6xl flex flex-col items-center justify-center">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-12 items-center text-center lg:text-left">
                        <div className="space-y-5 md:space-y-6 px-2">
                            <span className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-[10px] md:text-xs font-bold tracking-widest uppercase">
                                24/7 Premium Medical Care
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                                Advanced Care <br className="hidden md:block" />
                                <span className="text-blue-400">For Your Loved Ones</span>
                            </h1>
                            <p className="text-sm md:text-lg text-blue-50/80 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                                Clinicare provides world-class healthcare with state-of-the-art technology. Book appointments and manage records seamlessly.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                                <Link
                                    href={route('register')}
                                    className="w-full sm:w-auto bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all active:scale-95 text-sm md:text-base"
                                >
                                    Get Started Now
                                </Link>
                                <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-sm md:text-base">
                                    Our Services
                                </button>
                            </div>
                        </div>
                        <GlassCard className="w-full p-5 md:p-8 border-white/10 mt-6 lg:mt-0">
                            <h3 className="text-lg md:text-xl font-bold text-white mb-5">Quick Services</h3>
                            <div className="grid grid-cols-2 gap-3 md:gap-4 text-left">
                                {[
                                    { title: "Primary Care", icon: "🩺" },
                                    { title: "Cardiology", icon: "❤️" },
                                    { title: "Laboratory", icon: "🔬" },
                                    { title: "Emergency", icon: "🚑" }
                                ].map((service, i) => (
                                    <div key={i} className="p-3 md:p-4 bg-white/5 rounded-xl border border-white/5 hover:border-blue-400/50 transition-colors group cursor-pointer">
                                        <div className="text-xl md:text-2xl mb-1 md:mb-2">{service.icon}</div>
                                        <div className="text-white text-xs md:text-sm font-semibold group-hover:text-blue-300 transition-colors">{service.title}</div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </div>
                </PageWrapper>
            </div>
            <div className="relative z-10 -mt-10 md:-mt-16 px-4">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {[
                        { label: "Specialists", value: "50+" },
                        { label: "Patients", value: "10k+" },
                        { label: "Modern Rooms", value: "120" },
                        { label: "Years Exp", value: "15" }
                    ].map((stat, i) => (
                        <GlassCard key={i} className="py-4 md:py-6 text-center border-white/5">
                            <div className="text-xl md:text-2xl font-black text-blue-400">{stat.value}</div>
                            <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{stat.label}</div>
                        </GlassCard>
                    ))}
                </div>
            </div>
            <section className="py-16 md:py-24 px-4 max-w-6xl mx-auto">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">Why Choose Clinicare?</h2>
                    <p className="text-sm md:text-base text-blue-50/60 max-w-2xl mx-auto font-medium">Professional excellence with a compassionate touch.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <FeatureItem title="Qualified Doctors" icon="S" desc="Board-certified specialists with international experience." />
                    <FeatureItem title="Emergency 24/7" icon="E" desc="Dedicated trauma response team ready at all times." />
                    <FeatureItem title="Modern Tech" icon="T" desc="Utilizing the latest diagnostic and surgical technology." />
                </div>
            </section>
            <footer className="border-t border-white/10 py-10 px-6 bg-black/20 text-center md:text-left">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-white font-black text-2xl tracking-tighter">
                        CLINI<span className="text-blue-500">CARE</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[11px] md:text-sm font-semibold text-blue-50/50">
                        <Link href="#" className="hover:text-white transition-colors">About Us</Link>
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                    <p className="text-[10px] text-blue-50/30 font-medium">
                        © 2024 Clinicare. All Rights Reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

function FeatureItem({ title, desc, icon }) {
    return (
        <div className="p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600/20 rounded-xl md:rounded-2xl flex items-center justify-center text-blue-400 mb-4 md:mb-6 text-xl font-bold italic">
                {icon}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{title}</h3>
            <p className="text-blue-50/50 leading-relaxed text-xs md:text-sm">{desc}</p>
        </div>
    );
}