export default function GlassCard({ children, className = "" }) {
    return (
        <div className={`
            w-full p-8 
            /* Higher opacity so it doesn't wash out */
            bg-white/70 
            backdrop-blur-2xl 
            /* Solid shimmer border */
            border border-white 
            /* Multi-layer shadow: one for depth, one for the soft blue medical glow */
            shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05),0_20px_50px_-10px_rgba(59,130,246,0.15)] 
            rounded-[2.5rem]
            z-10 
            transition-all 
            duration-300
            ${className}
        `}>
            {children}
        </div>
    );
}