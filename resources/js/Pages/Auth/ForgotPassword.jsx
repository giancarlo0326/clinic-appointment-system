import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-start md:justify-center overflow-x-hidden px-6 py-12 pt-28 md:pt-12 glass-medical-gradient">
            <Head title="Forgot Password" />

            {/* Logo - Anchored exactly like your other pages */}
            <div className="absolute top-6 left-6 text-white font-extrabold text-xl md:text-2xl tracking-tight flex items-center gap-2 z-20">
                <span className="text-blue-400 text-2xl md:text-3xl">✚</span> 
                <span>CLINICARE</span>
            </div>

            {/* Main Glass Container */}
            <div className="relative w-full max-w-[360px] xs:max-w-md md:max-w-lg p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl z-10 transition-all duration-500">
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                        Reset <span className="text-blue-400">Password</span>
                    </h1>
                    <p className="text-blue-50/70 mt-3 text-sm leading-relaxed">
                        Enter registered email and we will send a link for password recovery.
                    </p>
                </div>

                {/* Success Status Message */}
                {status && (
                    <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-sm font-medium text-center animate-pulse">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-1.5">
                        <label className="block text-xs md:text-sm font-semibold text-white ml-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all text-sm"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-red-400 text-[10px] mt-1 ml-1 font-medium">{errors.email}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3.5 md:py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl hover:bg-blue-500 hover:shadow-blue-500/20 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 tracking-wider uppercase text-xs md:text-sm"
                    >
                        {processing ? 'Sending Link...' : 'Send Link'}
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-white/10 pt-6">
                    <a href={route('login')} className="text-xs md:text-sm text-blue-50/60 hover:text-white transition-colors">
                        Back to <span className="font-bold underline underline-offset-4 decoration-blue-500/50">Sign In</span>
                    </a>
                </div>
            </div>

            {/* Background Glows to match Dashboard */}
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        </div>
    );
}