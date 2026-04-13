import { useEffect, useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import GuestNavbar from '@/Components/GuestNavbar';
import GlassCard from '@/Components/GlassCard';
import PageWrapper from '@/Components/PageWrapper';
import '../../../css/login/login.css';export default function Login({ status, canResetPassword }) {
    const { auth } = usePage().props;
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '', password: '', remember: false,
    });

    useEffect(() => {
        return () => reset('password');
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    const EyeIcon = ({ visible }) => (
        visible ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon-size">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon-size">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.644C3.423 7.574 7.253 4.5 12 4.5c4.747 0 8.577 3.074 9.964 7.178.07.207.07.431 0 .639C20.577 16.426 16.747 19.5 12 19.5c-4.747 0-8.577-3.074-9.964-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
        )
    );

    return (
        <div className="login-container">
            <Head title="Sign In" />
            <GuestNavbar auth={auth} showAuthLinks={false} />
            <PageWrapper>
                <GlassCard className="login-card">
                    <div className="login-header">
                        <h1 className="login-title">
                            Welcome <span className="highlight">Back</span>
                        </h1>
                        <p className="login-subtitle">to clinicare, log in to your account to manage appointments.</p>
                    </div>

                    {status && <div className="status-message">{status}</div>}

                    <form onSubmit={submit} className="login-form">
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input 
                                type="email" 
                                value={data.email} 
                                className="form-input" 
                                placeholder="patient@email.com" 
                                onChange={(e) => setData('email', e.target.value)} 
                            />
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </div>

                        <div className="form-group">
                            <div className="label-row">
                                <label className="form-label">Password</label>
                                {canResetPassword && (
                                    <Link href={route('password.request')} className="forgot-link">
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <div className="password-wrapper">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    value={data.password} 
                                    className="form-input password-input" 
                                    placeholder="••••••••" 
                                    onChange={(e) => setData('password', e.target.value)} 
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)} 
                                    className="toggle-password"
                                >
                                    <EyeIcon visible={showPassword} />
                                </button>
                            </div>
                            {errors.password && <p className="error-text">{errors.password}</p>}
                        </div>

                        <button 
                            type="submit" 
                            disabled={processing} 
                            className="login-button"
                        >
                            {processing ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p className="footer-text">
                            New to Clinicare? <Link href={route('register')} className="signup-link">Sign Up</Link>
                        </p>
                    </div>
                </GlassCard>
            </PageWrapper>
        </div>
    );
}