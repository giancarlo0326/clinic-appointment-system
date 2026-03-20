import { useEffect, useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import GuestNavbar from '@/Components/GuestNavbar';
import GlassCard from '@/Components/GlassCard';
import PageWrapper from '@/Components/PageWrapper'; 

export default function Register() {
    const { auth } = usePage().props;
    const [showPassword, setShowPassword] = useState(false);
    const [notification, setNotification] = useState({ message: '', visible: false });

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', password: '', terms: false,
    });

    useEffect(() => {
        if (Object.keys(errors).length > 0) showToast("Please correct the highlighted errors.");
    }, [errors]);

    useEffect(() => {
        return () => reset('password');
    }, []);

    const showToast = (msg) => {
        setNotification({ message: msg, visible: true });
        setTimeout(() => setNotification({ message: '', visible: false }), 5000);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), { onError: () => showToast("Registration failed.") });
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
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 glass-medical-gradient">
            <Head title="Sign Up" />
            <GuestNavbar auth={auth} showAuthLinks={false} />
            
            <PageWrapper>
                <GlassCard className="w-full max-w-md mt-20">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                            Create <span className="text-blue-600">Account</span>
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Join Clinicare to manage your health and appointments.</p>
                    </div>

                    {notification.visible && (
                        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 text-sm font-bold text-center animate-fade-in-up">
                            {notification.message}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Full Name</label>
                            <input 
                                type="text" 
                                value={data.name} 
                                className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all rounded-2xl shadow-sm text-sm" 
                                placeholder="Patient Name" 
                                onChange={(e) => setData('name', e.target.value)} 
                            />
                            {errors.name && <p className="text-red-600 text-xs mt-2 font-semibold ml-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Email Address</label>
                            <input 
                                type="email" 
                                value={data.email} 
                                className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all rounded-2xl shadow-sm text-sm" 
                                placeholder="patient@email.com" 
                                onChange={(e) => setData('email', e.target.value)} 
                            />
                            {errors.email && <p className="text-red-600 text-xs mt-2 font-semibold ml-1">{errors.email}</p>}
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Password</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    value={data.password} 
                                    className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 pr-12 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all rounded-2xl shadow-sm text-sm" 
                                    placeholder="••••••••" 
                                    onChange={(e) => setData('password', e.target.value)} 
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)} 
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                                >
                                    <EyeIcon visible={showPassword} />
                                </button>
                            </div>
                            {errors.password && <p className="text-red-600 text-xs mt-2 font-semibold ml-1">{errors.password}</p>}
                        </div>

                        <button 
                            type="submit" 
                            disabled={processing} 
                            className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 disabled:opacity-50 tracking-widest uppercase text-sm mt-2"
                        >
                            {processing ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-slate-100 pt-6">
                        <p className="text-sm text-slate-500 font-medium">
                            Already have an account? <Link href={route('login')} className="text-blue-600 font-black hover:underline">Sign in</Link>
                        </p>
                    </div>
                </GlassCard>
            </PageWrapper>

            {/* Background elements for visual depth on white theme */}
            <div className="absolute top-[-10%] right-[-5%] w-[450px] h-[450px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[450px] h-[450px] bg-indigo-50/50 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        </div>
    );
}