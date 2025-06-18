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
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Your All-in-One Calculator Hub
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              Access a wide range of calculators for education, finance, health, and more.
            </p>
            <div className="mt-8 max-w-xl mx-auto">
              <SearchSuggestions
                className="w-full"
                placeholder="Search for calculators..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
    </main>
  );
}
