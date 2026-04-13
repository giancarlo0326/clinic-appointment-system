import { Head, useForm, usePage, Link } from '@inertiajs/react';
import GuestNavbar from '@/Components/GuestNavbar';
import GlassCard from '@/Components/GlassCard';
import PageWrapper from '@/Components/PageWrapper';
import '../../../css/forgot-password/forgot-password.css'; 

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
        <div className="forgot-password-container">
            <Head title="Forgot Password" />
            <GuestNavbar auth={auth} showAuthLinks={false} />
            <PageWrapper>
                <GlassCard className="forgot-password-card">
                    <div className="forgot-password-header">
                        <h1 className="forgot-password-title">
                            Reset <span className="highlight">Password</span>
                        </h1>
                        <p className="forgot-password-subtitle">
                            Forgot your password? No problem. We'll email you a reset link to get you back into your account.
                        </p>
                    </div>

                    {status && (
                        <div className="status-toast">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="forgot-password-form">
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                className="form-input"
                                placeholder="patient@email.com"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && (
                                <p className="error-text">{errors.email}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="submit-button"
                        >
                            {processing ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>

                    <div className="forgot-password-footer">
                        <p className="footer-text">
                            Back to <Link href={route('login')} className="signin-link">Sign In</Link>
                        </p>
                    </div>
                </GlassCard>
            </PageWrapper>
        </div>
    );
}