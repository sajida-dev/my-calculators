import Link from 'next/link';

export default function Logo({ useImage = false }) {
    const logoContent = useImage ? (
        <img
            src="/logo.png"
            alt="My Calculators"
            className="h-8 w-auto"
        />
    ) : (
        <h1 className="text-2xl font-bold text-blue-900">
            My Calculators
        </h1>
    );

    return (
        <Link
            href="/"
            className="hover:opacity-80 transition-opacity"
        >
            {logoContent}
        </Link>
    );
} 