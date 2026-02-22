import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="glass-medical-gradient flex items-center justify-center min-h-screen py-12 px-4">
            <Head title="Clinic Registration" />

            {/* Landscape Glassmorphic Container */}
            <div className="w-full max-w-4xl p-8 md:p-12 bg-white/20 backdrop-blur-xl border border-white/30 rounded-[3rem] shadow-2xl">
                
                <div className="flex flex-col md:flex-row gap-12">
                    
                    {/* Left Side: Branding/Welcome (Landscape feature) */}
                    <div className="md:w-1/3 flex flex-col justify-center text-center md:text-left border-b md:border-b-0 md:border-r border-white/20 pb-8 md:pb-0 md:pr-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/30 rounded-full mb-6 shadow-inner mx-auto md:mx-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight leading-tight">Clinic Appointment</h1>
                        <p className="text-white/80 mt-4 text-lg font-medium">Create your account to start booking.</p>
                    </div>

                    {/* Right Side: The Form */}
                    <div className="md:w-2/3">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Two-Column Grid for Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name Field */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-white mb-1.5 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-300"
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter your full name"
                                        required
                                    />
                                    {errors.name && <p className="text-red-200 text-xs mt-1.5 ml-1 font-medium">{errors.name}</p>}
                                </div>

                                {/* Email Field */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-white mb-1.5 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-300"
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="email@example.com"
                                        required
                                    />
                                    {errors.email && <p className="text-red-200 text-xs mt-1.5 ml-1 font-medium">{errors.email}</p>}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-white mb-1.5 ml-1">Password</label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-300"
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                    {errors.password && <p className="text-red-200 text-xs mt-1.5 ml-1 font-medium">{errors.password}</p>}
                                </div>

                                {/* Confirm Password Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-white mb-1.5 ml-1">Confirm Password</label>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-300"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                    {errors.password_confirmation && <p className="text-red-200 text-xs mt-1.5 ml-1 font-medium">{errors.password_confirmation}</p>}
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                                <Link 
                                    href={route('login')} 
                                    className="text-white text-sm font-bold hover:underline decoration-2 underline-offset-4 transition-all order-2 md:order-1"
                                >
                                    Already have an account? Sign In
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full md:w-auto px-12 py-4 bg-white text-clinic-secondary font-bold rounded-2xl shadow-xl hover:bg-opacity-90 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 uppercase tracking-wider text-sm order-1 md:order-2"
                                >
                                    {processing ? 'Processing...' : 'Sign Up'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}