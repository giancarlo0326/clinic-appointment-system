import { useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import GuestNavbar from '@/Components/GuestNavbar';
import GlassCard from '@/Components/GlassCard'; // Import the new style

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
            <Head title="Log in" />
            
            <GuestNavbar auth={auth} showAuthLinks={false} />

            <GlassCard className="max-w-md mt-20">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                        Welcome <span className="text-blue-400">Back</span>
                    </h1>
                    <p className="text-blue-50/80 mt-2 font-medium">Log in to manage your appointments.</p>
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-400 text-center">{status}</div>}

                <form onSubmit={submit} className="space-y-6">
                    {/* Your existing fields exactly as they were */}
                    <div>
                        <label className="block text-sm font-semibold text-white mb-1.5 ml-1">Email Address</label>
                        <input type="email" value={data.email} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all" placeholder="Enter your email" onChange={(e) => setData('email', e.target.value)} />
                        {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1.5 ml-1">
                            <label className="block text-sm font-semibold text-white">Password</label>
                            {canResetPassword && <Link href={route('password.request')} className="text-xs text-blue-300 hover:text-white">Forgot password?</Link>}
                        </div>
                        <input type="password" value={data.password} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all" placeholder="••••••••" onChange={(e) => setData('password', e.target.value)} />
                    </div>

                    <button type="submit" disabled={processing} className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl hover:bg-blue-500 uppercase text-sm">
                        {processing ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-white/10 pt-6">
                    <p className="text-sm text-blue-50/70">New to Clinicare? <Link href={route('register')} className="text-white font-bold underline">Sign Up</Link></p>
                </div>
            </GlassCard>
        </div>
    );
}