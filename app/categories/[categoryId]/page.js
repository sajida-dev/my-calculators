import { calculatorCategories, iconMap } from '@/app/data/calculators';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function CategoryPage({ params }) {
    const category = calculatorCategories.find(cat => cat.id === params.categoryId);

    if (!category) {
        notFound();
    }

    const CategoryIcon = iconMap[category.icon] || DefaultIcon;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 max-w-5xl mx-auto"> */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-8">
                    <div className="flex flex-col items-center text-center mb-4">
                        {CategoryIcon && (
                            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                                <CategoryIcon className="h-10 w-10 text-blue-600" />
                            </div>
                        )}
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
                        <p className="text-gray-600">{category.description}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                    {category.calculators.map((calculator) => {
                        const CalculatorIcon = iconMap[calculator.icon];
                        return (
                            <Link
                                key={calculator.id}
                                href={`/categories/${category.id}/${calculator.id}`}
                                className="block"
                            >
                                <div className="bg-white rounded-lg shadow-md hover:shadow-md transition-shadow duration-200 p-6">
                                    <div className="flex flex-col items-center text-center h-40 ">
                                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                                            {CalculatorIcon && (
                                                <CalculatorIcon className="h-8 w-8 text-blue-600" />
                                            )}
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{calculator.name}</h3>
                                        <p className="text-gray-600 line-clamp-3">{calculator.description}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* </div> */}
        </div>
    );
} 