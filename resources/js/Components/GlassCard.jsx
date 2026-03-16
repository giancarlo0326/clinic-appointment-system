// resources/js/Components/GlassCard.jsx
export default function GlassCard({ children, className = "" }) {
    return (
        <div className={`w-full p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl z-10 ${className}`}>
            {children}
        </div>
    );
}