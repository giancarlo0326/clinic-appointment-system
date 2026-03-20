import { useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import GuestNavbar from '@/Components/GuestNavbar';
import GlassCard from '@/Components/GlassCard';
import PageWrapper from '@/Components/PageWrapper'; 

export default function Login({ status, canResetPassword }) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '', password: '', remember: false,
    });

    useEffect(() => { return () => reset('password'); }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 glass-medical-gradient">
            <Head title="Sign In" />
            <GuestNavbar auth={auth} showAuthLinks={false} />
            <PageWrapper>
                {/* Changed GlassCard to have a white-tinted glass look with a soft shadow */}
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
                            {/* Changed input to be darker/more visible against the light background */}
                            <input 
                                type="email" 
                                value={data.email} 
                                className="w-full px-4 py-3 bg-white/60 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all rounded-xl" 
                                placeholder="patient@email.com" 
                                onChange={(e) => setData('email', e.target.value)} 
                            />
                            {errors.email && <p className="text-red-600 text-xs mt-1 font-medium">{errors.email}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5 ml-1">
                                <label className="block text-sm font-bold text-slate-700">Password</label>
                                {canResetPassword && (
                                    <Link href={route('password.request')} className="text-xs text-blue-600 font-bold hover:text-blue-700">
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <input 
                                type="password" 
                                value={data.password} 
                                className="w-full px-4 py-3 bg-white/60 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all rounded-xl" 
                                placeholder="••••••••" 
                                onChange={(e) => setData('password', e.target.value)} 
                            />
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