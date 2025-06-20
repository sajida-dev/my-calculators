'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { calculatorCategories } from '../data/calculators';

export default function SecondaryNav() {
    const pathname = usePathname();

    // Don't show on home page
    if (pathname === '/') return null;

    return (
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 border-b border-blue-900 shadow-md sticky top-16 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex space-x-8 overflow-x-auto py-4">
                    {calculatorCategories.map((category) => {
                        const isActive = pathname.includes(`/categories/${encodeURIComponent(category.id)}`);
                        return (
                            <Link
                                key={category.id}
                                href={`/categories/${encodeURIComponent(category.id)}`}
                                className={`
                                    whitespace-nowrap px-1 py-2 text-sm font-medium transition-colors duration-300 border-b-2
                                    ${isActive
                                        ? 'text-blue-100 border-blue-200 drop-shadow-[0_0_10px_rgba(191,219,254,0.8)] shadow-blue-200/80'
                                        : 'text-blue-200 border-transparent hover:text-white hover:border-white'
                                    }
                                `}
                            >
                                {category.name}
                                <span className="ml-2 text-xs font-medium text-blue-200">
                                    ({category.calculators.length})
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
} 