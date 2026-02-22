import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
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

    return (
        /* The Healthcare Gradient Background */
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 px-4">
            <Head title="Clinic Login" />

            {/* Glassmorphic Container: Uses backdrop-blur and semi-transparent white */}
            <div className="w-full max-w-md p-8 bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl">
                
                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/30 rounded-full mb-4 shadow-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Clinic Reservation System</h1>
                    <p className="text-cyan-50 mt-2 font-medium">Log in to your account.</p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-semibold text-white mb-1.5 ml-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-300"
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="name@example.com"
                            autoComplete="username"
                        />
                        {errors.email && <p className="text-red-100 text-xs mt-1.5 ml-1 font-medium">{errors.email}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-semibold text-white mb-1.5 ml-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-300"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                            autoComplete="current-password"
                        />
                        {errors.password && <p className="text-red-100 text-xs mt-1.5 ml-1 font-medium">{errors.password}</p>}
                    </div>

                    {/* Remember Me Toggle */}
                    <div className="flex items-center justify-between px-1">
                        <label className="flex items-center cursor-pointer group">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-4 h-4 rounded border-white/30 bg-white/10 text-indigo-600 focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer"
                            />
                            <span className="ml-2 text-sm text-white group-hover:text-cyan-50 transition-colors">Remember me</span>
                        </label>
                    </div>

                    {/* Action Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-4 bg-white text-indigo-700 font-bold rounded-2xl shadow-xl hover:bg-cyan-50 hover:shadow-cyan-200/50 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
                    >
                        {processing ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Authenticating...
                            </span>
                        ) : 'Sign In'}
                    </button>
                </form>

                {/* Footer Link */}
                <div className="mt-10 text-center">
                    <p className="text-sm text-cyan-50">
                        Don't have an account yet? {' '}
                        <Link 
                            href={route('register')} 
                            className="text-white font-bold hover:underline decoration-2 underline-offset-4 transition-all"
                        >
                            Register Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}