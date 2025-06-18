'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { calculatorCategories } from '@/app/data/calculators';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchSuggestions({ className = '', placeholder = 'Search calculators...' }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    // Get all calculators from all categories
    const allCalculators = calculatorCategories.flatMap(category =>
        category.calculators.map(calculator => ({
            ...calculator,
            categoryName: category.name,
            categoryId: category.id
        }))
    );

    useEffect(() => {
        // Close suggestions when clicking outside
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (value) => {
        setSearchTerm(value);
        if (value.length > 0) {
            const filteredSuggestions = allCalculators.filter(calculator =>
                calculator.name.toLowerCase().includes(value.toLowerCase()) ||
                calculator.description.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (calculator) => {
        setSearchTerm(calculator.name);
        setShowSuggestions(false);
    };

    return (
        <div className={`relative ${className}`} ref={searchRef}>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
                    placeholder={placeholder}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchTerm && (
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setSuggestions([]);
                            setShowSuggestions(false);
                        }}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                    {suggestions.map((calculator) => (
                        <Link
                            key={`${calculator.categoryId}-${calculator.id}`}
                            href={`/categories/${calculator.categoryId}/${calculator.id}`}
                            onClick={() => handleSuggestionClick(calculator)}
                        >
                            <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">{calculator.name}</h4>
                                        <p className="text-xs text-gray-500 mt-1">{calculator.description}</p>
                                    </div>
                                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                        {calculator.categoryName}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* No Results */}
            {showSuggestions && searchTerm && suggestions.length === 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-500">No calculators found matching "{searchTerm}"</p>
                </div>
            )}
        </div>
    );
} 