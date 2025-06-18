'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { calculatorCategories } from '../data/calculators';

export default function SecondaryNav() {
    const pathname = usePathname();

    // Don't show on home page
    if (pathname === '/') return null;

    return (
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex space-x-8 overflow-x-auto py-4">
                    {calculatorCategories.map((category) => {
                        const isActive = pathname.includes(`/categories/${encodeURIComponent(category.id)}`);
                        return (
                            <Link
                                key={category.id}
                                href={`/categories/${encodeURIComponent(category.id)}`}
                                className={`
                                    whitespace-nowrap px-1 py-2 text-sm font-medium
                                    ${isActive
                                        ? 'text-blue-900 border-b-2 border-blue-900'
                                        : 'text-gray-600 hover:text-blue-900 hover:border-b-2 hover:border-blue-900'
                                    }
                                `}
                            >
                                {category.name}
                                <span className="ml-2 text-xs font-medium text-gray-500">
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