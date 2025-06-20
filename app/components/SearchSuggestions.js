'use client';

import { useState, useRef, useEffect } from 'react';
import { calculatorCategories } from '@/app/data/calculators';
import { useRouter } from 'next/navigation';
import './SearchSuggestions.css';

export default function SearchSuggestions({ className = '', placeholder = 'Search calculators...' }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);
    const router = useRouter();

    // Flatten all calculators
    const allCalculators = calculatorCategories.flatMap(category =>
        category.calculators.map(calculator => ({
            ...calculator,
            categoryName: category.name,
            categoryId: category.id
        }))
    );

    // Filtered suggestions
    const suggestions = searchTerm
        ? allCalculators.filter(calc =>
            calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            calc.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((prev) => (prev + 1) % suggestions.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            e.preventDefault();
            selectSuggestion(suggestions[activeIndex]);
        }
    };

    // Handle suggestion selection
    const selectSuggestion = (calculator) => {
        setSearchTerm(calculator.name);
        setShowSuggestions(false);
        setActiveIndex(-1);
        router.push(`/categories/${calculator.categoryId}/${calculator.id}`);
    };

    // Hide suggestions on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSuggestions(false);
                setActiveIndex(-1);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`suggestions-container ${className}`} ref={inputRef}>
            <input
                type="text"
                value={searchTerm}
                onChange={e => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                    setActiveIndex(-1);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="suggestions-input"
                autoComplete="off"
            />
            {showSuggestions && suggestions.length > 0 && (
                <div className="suggestions-dropdown">
                    {suggestions.map((calculator, idx) => (
                        <div
                            key={`${calculator.categoryId}-${calculator.id}`}
                            onClick={() => selectSuggestion(calculator)}
                            onMouseEnter={() => setActiveIndex(idx)}
                            className={`suggestion-item${idx === activeIndex ? ' active' : ''}`}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div className="suggestion-title">{calculator.name}</div>
                                </div>
                                <span className="suggestion-category">{calculator.categoryName}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {showSuggestions && searchTerm && suggestions.length === 0 && (
                <div className="suggestions-dropdown" style={{ padding: 12 }}>
                    <div style={{ fontSize: 14, color: '#888' }}>
                        No calculators found matching "{searchTerm}"
                    </div>
                </div>
            )}
        </div>
    );
}