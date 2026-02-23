import { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    // Modal State
    const [modalContent, setModalContent] = useState(null); // 'terms' or 'policy' or null

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    const EyeIcon = ({ visible }) => (
        visible ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.644C3.423 7.574 7.253 4.5 12 4.5c4.747 0 8.577 3.074 9.964 7.178.07.207.07.431 0 .639C20.577 16.426 16.747 19.5 12 19.5c-4.747 0-8.577-3.074-9.964-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
        )
    );

    return (
        <>
            <Head title="Register for Clinicare" />

            <style>
                {`
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in-up { 
                        animation: fadeInUp 0.8s ease-out forwards; 
                        opacity: 0; 
                    }
                    .delay-1 { animation-delay: 0.2s; }
                    .no-scrollbar::-webkit-scrollbar { display: none; }
                    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `}
            </style>

            <div className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden no-scrollbar px-4 pt-28 pb-12">
                
                <div className="fixed inset-0 bg-blue-900/70 z-[-1]"></div>

                {/* Logo */}
                <Link href="/" className="absolute top-6 left-6 text-white font-extrabold text-xl md:text-2xl tracking-tight flex items-center gap-2 animate-fade-in-up z-10">
                    <span className="text-blue-300 text-2xl md:text-3xl">✚</span> 
                    <span>CLINICARE</span>
                </Link>

                {/* Register Card */}
                <div className="w-full max-w-2xl p-6 sm:p-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl animate-fade-in-up delay-1">
                    
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                            Create <span className="text-blue-300">Account</span>
                        </h1>
                        <p className="text-blue-50/80 mt-1 font-medium text-sm">Join Clinicare to start booking appointments.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-4 sm:space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-white mb-1.5 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 transition-all duration-300"
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Patient Name"
                                    required
                                />
                                {errors.name && <p className="text-red-300 text-xs mt-1 ml-1">{errors.name}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-white mb-1.5 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 transition-all duration-300"
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="name@example.com"
                                    required
                                />
                                {errors.email && <p className="text-red-300 text-xs mt-1 ml-1">{errors.email}</p>}
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-semibold text-white mb-1.5 ml-1">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={data.password}
                                        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 transition-all duration-300 pr-12"
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
                                        <EyeIcon visible={showPassword} />
                                    </button>
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-semibold text-white mb-1.5 ml-1">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={data.password_confirmation}
                                        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 transition-all duration-300 pr-12"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
                                        <EyeIcon visible={showConfirmPassword} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Terms checkbox */}
                        <div className="flex items-start gap-3 mt-2 px-1">
                            <input
                                id="terms"
                                type="checkbox"
                                checked={data.terms}
                                onChange={(e) => setData('terms', e.target.checked)}
                                className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-400 focus:ring-offset-0 transition-all cursor-pointer"
                                required
                            />
                            <label htmlFor="terms" className="text-xs sm:text-sm text-blue-50/80 leading-tight cursor-pointer select-none">
                                I agree to the <button type="button" onClick={() => setModalContent('terms')} className="text-white font-semibold underline decoration-blue-400/30 underline-offset-2 hover:text-blue-300 transition-colors">Terms of Service</button> and <button type="button" onClick={() => setModalContent('policy')} className="text-white font-semibold underline decoration-blue-400/30 underline-offset-2 hover:text-blue-300 transition-colors">Privacy Policy</button>.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl hover:bg-blue-500 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 tracking-wider"
                        >
                            {processing ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="mt-6 text-center border-t border-white/10 pt-6">
                        <p className="text-sm text-blue-50/70">
                            Already have an account? {' '}
                            <Link href={route('login')} className="text-white font-bold hover:text-blue-300 underline decoration-blue-400/50 underline-offset-4 transition-all">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* MODAL TEMPLATE */}
            {modalContent && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm bg-black/40 animate-fade-in">
                    <div className="bg-slate-900 border border-white/20 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                            <h2 className="text-xl font-bold text-white uppercase tracking-wider">
                                {modalContent === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
                            </h2>
                            <button onClick={() => setModalContent(null)} className="text-white/50 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 max-h-[60vh] overflow-y-auto text-blue-50/70 text-sm leading-relaxed no-scrollbar">
                            <p className="mb-4">Last Updated: February 2026</p>
                            <h3 className="text-white font-semibold mb-2">1. Introduction</h3>
                            <p className="mb-4">Welcome to Clinicare. By using our services, you agree to these terms. Please read them carefully. Our healthcare platform is designed to provide seamless appointment booking and patient management.</p>
                            
                            <h3 className="text-white font-semibold mb-2">2. User Responsibilities</h3>
                            <p className="mb-4">Users are responsible for maintaining the confidentiality of their account information. You agree to provide accurate and complete information when registering for an account.</p>

                            <h3 className="text-white font-semibold mb-2">3. Data Privacy</h3>
                            <p className="mb-4">Your health data is encrypted and handled according to international medical privacy standards. We do not share your personal information with third parties without explicit consent.</p>

                            <h3 className="text-white font-semibold mb-2">4. Limitations</h3>
                            <p>Clinicare is a booking platform and not a substitute for emergency medical services. In case of a life-threatening emergency, please contact your local emergency number immediately.</p>
                        </div>
                        <div className="p-6 border-t border-white/10 text-right bg-white/5">
                            <button 
                                onClick={() => setModalContent(null)}
                                className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all"
                            >
                                Understood
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}