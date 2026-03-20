import { useEffect, useState } from 'react'; // Added useState
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import GuestNavbar from '@/Components/GuestNavbar';
import GlassCard from '@/Components/GlassCard';
import PageWrapper from '@/Components/PageWrapper'; 
export default function Login({ status, canResetPassword }) {
    const { auth } = usePage().props;
    const [showPassword, setShowPassword] = useState(false); // Added state
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '', password: '', remember: false,
    });
    useEffect(() => { return () => reset('password'); }, []);
    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
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
            <Head title="Sign In" />
            <GuestNavbar auth={auth} showAuthLinks={false} />
            <PageWrapper>
                <GlassCard className="max-w-md mt-20 bg-white/40 border-white shadow-xl shadow-blue-900/5 backdrop-blur-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Welcome <span className="text-blue-600">Back</span>
                        </h1>
                        <p className="text-slate-600 mt-2 font-medium">to clinicare, log in to your account to manage appointments.</p>
                    </div>
                    {status && <div className="mb-4 font-semibold text-sm text-emerald-600 text-center">{status}</div>}
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Email Address</label>
                            <input 
                                type="email" 
                                value={data.email} 
                                className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all rounded-xl shadow-sm" 
                                placeholder="patient@email.com" 
                                onChange={(e) => setData('email', e.target.value)} 
                            />
                            {errors.email && <p className="text-red-600 text-xs mt-1 font-medium">{errors.email}</p>}
                        </div>
                        <div className="relative">
                            <div className="flex justify-between items-center mb-1.5 ml-1">
                                <label className="block text-sm font-bold text-slate-700">Password</label>
                                {canResetPassword && (
                                    <Link href={route('password.request')} className="text-xs text-blue-600 font-bold hover:text-blue-700">
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    value={data.password} 
                                    className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 pr-12 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all rounded-xl shadow-sm" 
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
                            {errors.password && <p className="text-red-600 text-xs mt-1 font-medium">{errors.password}</p>}
                        </div>
                        <button 
                            type="submit" 
                            disabled={processing} 
                            className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 uppercase text-sm transition-all active:scale-[0.98]"
                        >
                            {processing ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                    <div className="mt-8 text-center border-t border-slate-200 pt-6">
                        <p className="text-sm text-slate-500 font-medium">
                            New to Clinicare? <Link href={route('register')} className="text-blue-600 font-black underline">Sign Up</Link>
                        </p>
                    </div>
                </GlassCard>
            </PageWrapper>
        </div>
    );
}