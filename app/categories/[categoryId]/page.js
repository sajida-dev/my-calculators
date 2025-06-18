import { calculatorCategories, iconMap } from '@/app/data/calculators';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function CategoryPage({ params }) {
    const category = calculatorCategories.find(cat => cat.id === params.categoryId);

    if (!category) {
        notFound();
    }

    const CategoryIcon = iconMap[category.icon];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    {CategoryIcon && (
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                            <CategoryIcon className="h-6 w-6 text-blue-600" />
                        </div>
                    )}
                    <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
                </div>
                <p className="text-gray-600">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.calculators.map((calculator) => {
                    const CalculatorIcon = iconMap[calculator.icon];
                    return (
                        <Link
                            key={calculator.id}
                            href={`/categories/${category.id}/${calculator.id}`}
                            className="block"
                        >
                            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                                        {CalculatorIcon && (
                                            <CalculatorIcon className="h-8 w-8 text-blue-600" />
                                        )}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{calculator.name}</h3>
                                    <p className="text-gray-600">{calculator.description}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
} 