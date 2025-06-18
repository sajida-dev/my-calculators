import { calculatorCategories } from '../data/calculators';
import CategoryCard from '../components/CategoryCard';
import {
    AcademicCapIcon,
    BanknotesIcon,
    HeartIcon,
    CalendarIcon,
    WrenchIcon
} from '@heroicons/react/24/outline';

const iconMap = {
    'AcademicCapIcon': AcademicCapIcon,
    'BanknotesIcon': BanknotesIcon,
    'HeartIcon': HeartIcon,
    'CalendarIcon': CalendarIcon,
    'WrenchIcon': WrenchIcon
};

export default function CategoriesPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Calculator Categories
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Browse our collection of calculators by category
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {calculatorCategories.map((category) => {
                        const Icon = iconMap[category.icon];
                        return (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                Icon={Icon}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
} 