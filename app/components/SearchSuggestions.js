'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { calculatorCategories } from '@/app/data/calculators';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Portal from './Portal';
import { useRouter } from 'next/navigation';

export default function SearchSuggestions({ className = '', placeholder = 'Search calculators...' }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);
    const inputRef = useRef(null);
    const router = useRouter();

    // Get all calculators from all categories
    const allCalculators = calculatorCategories.flatMap(category =>
        category.calculators.map(calculator => ({
            ...calculator,
            categoryName: category.name,
            categoryId: category.id
        }))
    );

    // Calculate dropdown position
    const [dropdownStyle, setDropdownStyle] = useState({});
    useEffect(() => {
        if (showSuggestions && inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect();
            setDropdownStyle({
                position: 'absolute',
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
                zIndex: 9999
            });
        }
    }, [showSuggestions]);

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
        alert('Clicked!');
        console.log('handle suggestion click', calculator)
        setSearchTerm(calculator.name);
        setShowSuggestions(false);
        const url = `/categories/${calculator.categoryId}/${calculator.id}`;
        // window.location.href = url;
    };

    return (
        <div className={`relative ${className}`} ref={searchRef}>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    ref={inputRef}
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
                <Portal>
                    <div style={dropdownStyle} className="bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                        {suggestions.map((calculator) => (
                            <button
                                key={`${calculator.categoryId}-${calculator.id}`}
                                type="button"
                                onClick={() => handleSuggestionClick(calculator)}
                                className="w-full text-left"
                            >
                                <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150">
                                    <div className="flex items-center justify-between">
                                        <div className='text-left'>
                                            <h4 className="text-sm font-medium text-gray-900">{calculator.name}</h4>
                                        </div>
                                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                            {calculator.categoryName}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </Portal>
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