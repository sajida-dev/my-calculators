import SearchSuggestions from './SearchSuggestions';

export default function Hero() {
    return (
        // Hero Section
        <div className="relative bg-gradient-to-r from-[#0a174e] via-[#1a237e] to-[#0a174e] overflow-hidden ">
            {/* Animated glowing floating shape */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-900 opacity-40 rounded-full blur-2xl animate-pulse z-0 shadow-[0_0_60px_20px_rgba(10,23,78,0.7)]" />
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl transition-colors duration-300 hover:text-blue-200 drop-shadow-[0_0_20px_rgba(30,64,175,0.8)] shadow-blue-400/80">
                        Your All-in-One Calculator Hub
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100 drop-shadow-[0_0_10px_rgba(30,64,175,0.7)] sm:text-2xl transition-colors duration-300 hover:text-blue-200">
                        Access a wide range of calculators for education, finance, health, and more.
                    </p>
                    <div className="relative mt-8 max-w-xl mx-auto">
                        <SearchSuggestions
                            className="w-full"
                            placeholder="Search for calculators..."
                        />
                    </div>
                </div>
            </div>
        </div >
    );
}