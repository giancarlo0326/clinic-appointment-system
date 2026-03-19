import { Head, useForm, usePage, Link } from '@inertiajs/react';
import GuestNavbar from '@/Components/GuestNavbar';
import GlassCard from '@/Components/GlassCard';
import PageWrapper from '@/Components/PageWrapper';

export default function ForgotPassword({ status }) {
    const { auth } = usePage().props;
    
    // Only tracking email here
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 glass-medical-gradient">
            <Head title="Forgot Password" />
            <GuestNavbar auth={auth} showAuthLinks={false} />

            <PageWrapper>
                <GlassCard className="w-full max-w-md mt-20">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">
                            Reset <span className="text-blue-400">Password</span>
                        </h1>
                        <p className="text-blue-50/80 mt-2 font-medium">
                            Forgot your password? We will email you a password reset link.
                        </p>
                    </div>

                    {/* Success Message from Laravel Session */}
                    {status && (
                        <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-medium text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-white mb-1.5 ml-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                                placeholder="patient@email.com"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && (
                                <p className="text-red-300 text-xs mt-1 ml-1">{errors.email}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl hover:bg-blue-500 transition-all active:scale-[0.98] disabled:opacity-50 uppercase text-sm tracking-wider"
                        >
                            {processing ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-white/10 pt-6">
                        <p className="text-sm text-blue-50/70">Back to <Link href={route('login')} className="text-white font-bold underline">Sign In</Link></p>
                    </div>
                </GlassCard>
            </PageWrapper>

            {/* Background Decorations */}
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        </div>
    );
}