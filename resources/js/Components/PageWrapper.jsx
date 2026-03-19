// resources/js/Components/PageWrapper.jsx
export default function PageWrapper({ children, className = "" }) {
    return (
        <div className={`animate-fade-in-up transition-all duration-700 ${className}`}>
            {children}
        </div>
    );
}