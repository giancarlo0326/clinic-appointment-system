import { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

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
        <>
            <Head title="Login to Clinicare" />

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

            {/* Same Layout Logic as Register.jsx */}
            <div className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden no-scrollbar px-4 pt-28 pb-12">

                {/* Overlay Fixed */}
                <div className="fixed inset-0 bg-blue-900/70 z-[-1]"></div>

                {/* Logo - Consistent Placement */}
                <Link href="/" className="absolute top-6 left-6 text-white font-extrabold text-xl md:text-2xl tracking-tight flex items-center gap-2 animate-fade-in-up z-10">
                    <span className="text-blue-300 text-2xl md:text-3xl">✚</span> 
                    <span>CLINICARE</span>
                </Link>

                {/* Login Card */}
                <div className="w-full max-w-md p-8 sm:p-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl animate-fade-in-up delay-1">
                    
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                            Welcome <span className="text-blue-300">Back</span>
                        </h1>
                        <p className="text-blue-50/80 mt-2 font-medium text-sm">Log in to manage your appointments.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-white mb-1.5 ml-1">Email Address</label>
                            <input
                                type="email"
                                value={data.email}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 transition-all duration-300"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="name@example.com"
                                required
                                autoComplete="username"
                            />
                            {errors.email && <p className="text-red-300 text-xs mt-1.5 ml-1">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-white mb-1.5 ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 transition-all duration-300 pr-12"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                                >
                                    <EyeIcon visible={showPassword} />
                                </button>
                            </div>
                            {errors.password && <p className="text-red-300 text-xs mt-1.5 ml-1">{errors.password}</p>}
                        </div>

                        {/* Remember Me Toggle */}
                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-4 h-4 rounded border-white/30 bg-white/10 text-blue-500 focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer"
                                />
                                <span className="ml-2 text-sm text-white/90 group-hover:text-white transition-colors font-medium">Remember me</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl hover:bg-blue-500 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 tracking-wider"
                        >
                            {processing ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Authenticating...
                                </span>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-white/10 pt-6">
                        <p className="text-sm text-blue-50/70">
                            New to Clinicare? {' '}
                            <Link 
                                href={route('register')} 
                                className="text-white font-bold hover:text-blue-300 underline decoration-blue-400/50 underline-offset-4 transition-all"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}