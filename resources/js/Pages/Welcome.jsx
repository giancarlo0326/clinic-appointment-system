import { Head, Link } from '@inertiajs/react';
import GuestNavbar from '@/Components/GuestNavbar';
import GlassCard from '@/Components/GlassCard';
import PageWrapper from '@/Components/PageWrapper';
export default function Welcome({ auth }) {
    return (
        <div className="glass-medical-gradient min-h-screen">
            <Head title="Home" />
            <div className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden pt-20 pb-10 px-4">
                <GuestNavbar auth={auth} />
                <PageWrapper className="relative z-10 w-full max-w-6xl flex flex-col items-center justify-center">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-12 items-center text-center lg:text-left">
                        <div className="space-y-5 md:space-y-6 px-2">
                            <span className="inline-block px-4 py-1.5 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-[10px] md:text-xs font-black tracking-widest uppercase">
                                24/7 Premium Medical Care
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                                Advanced Care <br className="hidden md:block" />
                                <span className="text-blue-600">For Your Loved Ones</span>
                            </h1>
                            <p className="text-sm md:text-lg text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                                Clinicare provides world-class healthcare with state-of-the-art technology. Book appointments and manage records seamlessly.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                                <Link
                                    href={route('register')}
                                    className="w-full sm:w-auto bg-blue-600 text-white font-black px-8 py-4 rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:scale-95 text-sm md:text-base uppercase tracking-wider"
                                >
                                    Get Started Now
                                </Link>
                                <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl shadow-sm hover:bg-slate-50 transition-all text-sm md:text-base">
                                    Our Services
                                </button>
                            </div>
                        </div>
                        <GlassCard className="w-full p-5 md:p-8 mt-6 lg:mt-0">
                            <h3 className="text-lg md:text-xl font-black text-slate-900 mb-5">Quick Services</h3>
                            <div className="grid grid-cols-2 gap-3 md:gap-4 text-left">
                                {[
                                    { title: "Primary Care", icon: "🩺" },
                                    { title: "Cardiology", icon: "❤️" },
                                    { title: "Laboratory", icon: "🔬" },
                                    { title: "Emergency", icon: "🚑" }
                                ].map((service, i) => (
                                    <div key={i} className="p-3 md:p-4 bg-white/60 rounded-2xl border border-slate-100 hover:border-blue-400 hover:shadow-md transition-all group cursor-pointer">
                                        <div className="text-xl md:text-2xl mb-1 md:mb-2">{service.icon}</div>
                                        <div className="text-slate-800 text-xs md:text-sm font-bold group-hover:text-blue-600 transition-colors">{service.title}</div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </div>
                </PageWrapper>
                <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-indigo-50/60 rounded-full blur-[100px] pointer-events-none"></div>
            </div>
            <div className="relative z-10 -mt-10 md:-mt-16 px-4">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                    {[
                        { label: "Specialists", value: "50+" },
                        { label: "Patients", value: "10k+" },
                        { label: "Modern Rooms", value: "120" },
                        { label: "Years Exp", value: "15" }
                    ].map((stat, i) => (
                        <GlassCard key={i} className="py-5 md:py-8 text-center">
                            <div className="text-2xl md:text-3xl font-black text-blue-600">{stat.value}</div>
                            <div className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest mt-1">{stat.label}</div>
                        </GlassCard>
                    ))}
                </div>
            </div>
            <section className="py-16 md:py-24 px-4 max-w-6xl mx-auto">
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Why Choose Clinicare?</h2>
                    <p className="text-sm md:text-lg text-slate-500 max-w-2xl mx-auto font-medium">Professional excellence with a compassionate touch.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                    <FeatureItem title="Qualified Doctors" icon="S" desc="Board-certified specialists with international experience." />
                    <FeatureItem title="Emergency 24/7" icon="E" desc="Dedicated trauma response team ready at all times." />
                    <FeatureItem title="Modern Tech" icon="T" desc="Utilizing the latest diagnostic and surgical technology." />
                </div>
            </section>
            <footer className="border-t border-slate-100 py-12 px-6 bg-white/40 backdrop-blur-md text-center md:text-left mt-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <Link href="/" className="group flex items-center gap-2 shrink-0">
                        <div className="text-slate-900 font-black text-xl md:text-2xl tracking-tight flex items-center gap-2">
                            <span className="text-blue-600 text-2xl md:text-3xl transition-transform group-hover:scale-110">✚</span> 
                            <span>CLINICARE</span>
                        </div>
                    </Link>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-xs md:text-sm font-bold text-slate-500">
                        <Link href="#" className="hover:text-blue-600 transition-colors">About Us</Link>
                        <Link href="#" className="hover:text-blue-600 transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-blue-600 transition-colors">Contact</Link>
                    </div>
                    <p className="text-[10px] md:text-xs text-slate-400 font-bold">
                        © 2026 Clinicare. All Rights Reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
function FeatureItem({ title, desc, icon }) {
    return (
        <div className="p-8 md:p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all group">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 md:mb-8 text-2xl font-black italic">
                {icon}
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 group-hover:text-blue-600 transition-colors">{title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm md:text-base font-medium">{desc}</p>
        </div>
    );
}