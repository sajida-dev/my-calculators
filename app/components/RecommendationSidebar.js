"use client";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { calculatorCategories } from '../data/calculators';
import { useEffect, useState } from 'react';

// For now, use a static list of popular calculators (simulate API response)
const POPULAR_CALCULATORS = [
    { id: 'car-payoff', categoryId: 'financial' },
    { id: 'future-value', categoryId: 'financial' },
    { id: 'homa-ir', categoryId: 'health-fitness' },
    { id: 'quadrilateral-area', categoryId: 'math' },
    { id: 'ap-score', categoryId: 'everyday-life' },
];

export default function RecommendationSidebar() {
    const pathname = usePathname();
    const [popularCalculators, setPopularCalculators] = useState([]);
    const [categoryCalculators, setCategoryCalculators] = useState([]);
    const [title, setTitle] = useState('Popular Calculators');

    useEffect(() => {
        // Simulate fetching from API: map static list to calculator data
        const allCalculators = calculatorCategories.flatMap(cat =>
            cat.calculators.map(calc => ({ ...calc, categoryId: cat.id, categoryName: cat.name }))
        );
        const popular = POPULAR_CALCULATORS.map(pop =>
            allCalculators.find(calc => calc.id === pop.id && calc.categoryId === pop.categoryId)
        ).filter(Boolean);
        setPopularCalculators(popular);
    }, [pathname]);

    useEffect(() => {
        // If on a calculator page, show other calculators from the same category
        const match = pathname.match(/categories\/([^/]+)\/([^/]+)/);
        if (match) {
            const categoryId = match[1];
            const calculatorId = match[2];
            const category = calculatorCategories.find(cat => cat.id === categoryId);
            if (category) {
                setTitle(`More in ${category.name}`);
                setCategoryCalculators(
                    category.calculators
                        .filter(calc => calc.id !== calculatorId)
                        .map(calc => ({ ...calc, categoryId: category.id, categoryName: category.name }))
                );
                return;
            }
        }
        setTitle('Popular Calculators');
        setCategoryCalculators([]);
    }, [pathname]);

    const recommendations = categoryCalculators.length > 0 ? categoryCalculators : popularCalculators;

    return (
        <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0 m-5 ">
            <div className="sticky top-24 bg-white rounded-xl shadow-lg p-6 border border-blue-100">
                <h2 className="text-xl font-semibold text-blue-900 mb-4 text-center">{title}</h2>
                <div className="space-y-4">
                    {recommendations.map(calc => (
                        <Link
                            key={calc.id}
                            href={`/categories/${calc.categoryId}/${calc.id}`}
                            className="group block bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors border border-transparent hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <div className="flex items-center mb-1">
                                <h3 className="text-base font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                                    {calc.name}
                                </h3>
                            </div>
                            <span className="inline-block text-xs text-blue-700 bg-white px-2 py-0.5 rounded font-medium">
                                {calc.categoryName}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
} 