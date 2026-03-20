import { Head, useForm, usePage, Link } from '@inertiajs/react';
import GuestNavbar from '@/Components/GuestNavbar';
import GlassCard from '@/Components/GlassCard';
import PageWrapper from '@/Components/PageWrapper';
export default function ForgotPassword({ status }) {
    const { auth } = usePage().props;
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
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                            Reset <span className="text-blue-600">Password</span>
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">
                            Forgot your password? No problem. We'll email you a reset link to get you back into your account.
                        </p>
                    </div>
                    {status && (
                        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-bold text-center animate-fade-in-up">
                            {status}
                        </div>
                    )}
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full px-5 py-4 bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all rounded-2xl shadow-sm text-sm"
                                placeholder="patient@email.com"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && (
                                <p className="text-red-600 text-xs mt-2 font-semibold ml-1">{errors.email}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-50 uppercase text-sm tracking-widest"
                        >
                            {processing ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                    <div className="mt-8 text-center border-t border-slate-100 pt-6">
                        <p className="text-sm text-slate-500 font-medium">
                            Back to <Link href={route('login')} className="text-blue-600 font-black hover:underline">Sign In</Link>
                        </p>
                    </div>
                </GlassCard>
            </PageWrapper>
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        </div>
    );
}