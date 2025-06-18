import Link from 'next/link';

export default function CategoryCard({ category, Icon }) {
    return (
        <Link
            href={`/categories/${encodeURIComponent(category.id)}`}
            className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
        >
            {/* Top border with navy blue glow */}
            <div className="h-1 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-lg shadow-blue-900/20"></div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center mb-4">
                    {Icon && (
                        <div className="w-10 h-10 text-blue-900 group-hover:text-blue-800 transition-colors duration-300">
                            <Icon className="w-full h-full" />
                        </div>
                    )}
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors ml-3">
                        {category.name}
                    </h2>
                </div>
                <p className="text-gray-600 mb-4 flex-grow">{category.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    {category.calculators && category.calculators.length > 0 && (
                        <span className="text-sm text-blue-900 font-medium">
                            {category.calculators.length} {category.calculators.length === 1 ? 'calculator' : 'calculators'}
                        </span>
                    )}
                    <span className="text-sm text-blue-600 font-medium group-hover:text-blue-700">
                        View all →
                    </span>
                </div>
            </div>
        </Link>
    );
} 