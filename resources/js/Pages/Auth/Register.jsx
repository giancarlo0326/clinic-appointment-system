import { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [notification, setNotification] = useState({ message: '', visible: false });

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            showToast("Please correct the highlighted errors.");
        }
    }, [errors]);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const showToast = (msg) => {
        setNotification({ message: msg, visible: true });
        setTimeout(() => setNotification({ message: '', visible: false }), 5000);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onError: () => showToast("Registration failed. Check your details.")
        });
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
        /* 1. Added pt-24 to ensure the container starts below the absolute logo on small screens.
           2. Used items-center + justify-start md:justify-center to manage vertical flow.
        */
        <div className="relative min-h-screen flex flex-col items-center justify-start md:justify-center overflow-x-hidden px-6 py-12 pt-28 md:pt-12 glass-medical-gradient">
            <Head title="Register" />

            {/* CLINICARE LOGO - UNCHANGED */}
            <Link href="/" className="absolute top-6 left-6 text-white font-extrabold text-xl md:text-2xl tracking-tight flex items-center gap-2 z-20">
                <span className="text-blue-400 text-2xl md:text-3xl">✚</span> 
                <span>CLINICARE</span>
            </Link>

            {/* REGISTER CONTAINER 
                - max-w-[calc(100%-1rem)] ensures it never touches screen edges on mobile
                - md:max-w-2xl gives it the landscape feel on desktop
            */}
            <div className="relative w-full max-w-[360px] xs:max-w-md md:max-w-2xl p-6 md:p-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl z-10 transition-all duration-500">
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                        Create <span className="text-blue-400">Account</span>
                    </h1>
                    <p className="text-blue-50/70 mt-2 text-sm font-medium">Join Clinicare to start booking appointments.</p>
                </div>

                <form onSubmit={submit} className="space-y-5 md:space-y-6">
                    {/* Responsive Grid: 1 col on mobile, 2 col on desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-5">
                        <div className="space-y-1.5">
                            <label className="block text-xs md:text-sm font-semibold text-white ml-1">Full Name</label>
                            <input
                                type="text"
                                value={data.name}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all text-sm"
                                placeholder="Patient Name"
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            {errors.name && <p className="text-red-400 text-[10px] mt-1 ml-1">{errors.name}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs md:text-sm font-semibold text-white ml-1">Email Address</label>
                            <input
                                type="email"
                                value={data.email}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all text-sm"
                                placeholder="name@example.com"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <p className="text-red-400 text-[10px] mt-1 ml-1">{errors.email}</p>}
                        </div>

                        <div className="space-y-1.5 relative">
                            <label className="block text-xs md:text-sm font-semibold text-white ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white pr-12 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all text-sm"
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                                    <EyeIcon visible={showPassword} />
                                </button>
                            </div>
                            {errors.password && <p className="text-red-400 text-[10px] mt-1 ml-1">{errors.password}</p>}
                        </div>

                        <div className="space-y-1.5 relative">
                            <label className="block text-xs md:text-sm font-semibold text-white ml-1">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={data.password_confirmation}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white pr-12 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all text-sm"
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                                    <EyeIcon visible={showConfirmPassword} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 px-1 pt-1">
                        <input
                            id="terms"
                            type="checkbox"
                            checked={data.terms}
                            onChange={(e) => setData('terms', e.target.checked)}
                            className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-blue-600 focus:ring-blue-500"
                            required
                        />
                        <label htmlFor="terms" className="text-[11px] text-blue-50/60 leading-tight">
                            I agree to the <button type="button" onClick={() => setModalContent('terms')} className="text-white font-bold hover:underline">Terms</button> & <button type="button" onClick={() => setModalContent('policy')} className="text-white font-bold hover:underline">Privacy Policy</button>.
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3.5 md:py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl hover:bg-blue-500 hover:shadow-blue-500/20 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 tracking-wider uppercase text-xs md:text-sm"
                    >
                        {processing ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-white/10 pt-6">
                    <p className="text-xs md:text-sm text-blue-50/60">
                        Already have an account? {' '}
                        <Link href={route('login')} className="text-white font-bold hover:text-blue-400 underline decoration-blue-500/50 underline-offset-4 transition-all">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Simple Modal remains unchanged */}
            {modalContent && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 backdrop-blur-md bg-slate-950/40">
                    <div className="bg-slate-900 border border-white/20 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-white uppercase">{modalContent}</h2>
                            <button onClick={() => setModalContent(null)} className="text-white/50 hover:text-white">✕</button>
                        </div>
                        <div className="p-6 text-blue-50/70 text-sm">
                            <p>Data protection and usage policy details go here.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}