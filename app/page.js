import { calculatorCategories } from './data/calculators';
import {
  AcademicCapIcon,
  BanknotesIcon,
  HeartIcon,
  CalendarIcon,
  WrenchIcon
} from '@heroicons/react/24/outline';
import SearchSuggestions from './components/SearchSuggestions';
import CategoryCard from './components/CategoryCard';
import RecommendationSidebar from './components/RecommendationSidebar';

const iconMap = {
  'AcademicCapIcon': AcademicCapIcon,
  'BanknotesIcon': BanknotesIcon,
  'HeartIcon': HeartIcon,
  'CalendarIcon': CalendarIcon,
  'WrenchIcon': WrenchIcon
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 text-center ">
          <h2 className="text-2xl font-bold text-blue-900 mb-2 ">Explore All Calculator Categories</h2>
          <p className="text-gray-600  max-w-2xl mx-auto lg:mx-0">Find the perfect calculator for your needs—finance, health, math, and more. Browse by category below.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
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
    </main>
  );
}
