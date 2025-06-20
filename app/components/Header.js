'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    CalculatorIcon,
    XMarkIcon,
    HomeIcon,
    Squares2X2Icon,
    InformationCircleIcon
} from '@heroicons/react/24/outline';
import SearchSuggestions from './SearchSuggestions';
import { useState, useEffect } from 'react';

export default function Header() {
    const pathname = usePathname();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const currentYear = new Date().getFullYear();

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isDrawerOpen]);

    const isActive = (path) => {
        return pathname === path ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600';
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <>
            <header className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <div className="flex items-center">
                                <CalculatorIcon className="h-8 w-8 text-blue-600" />
                                <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:inline">
                                    My Calculators
                                </span>
                            </div>
                        </Link>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link href="/" className={`${isActive('/')} transition-colors duration-200 flex items-center gap-2`}>
                                <HomeIcon className="h-5 w-5" />
                                <span>Home</span>
                            </Link>
                            <Link href="/categories" className={`${isActive('/categories')} transition-colors duration-200 flex items-center gap-2`}>
                                <Squares2X2Icon className="h-5 w-5" />
                                <span>Categories</span>
                            </Link>
                            <Link href="/about" className={`${isActive('/about')} transition-colors duration-200 flex items-center gap-2`}>
                                <InformationCircleIcon className="h-5 w-5" />
                                <span>About</span>
                            </Link>
                        </nav>

                        {/* Search (desktop only) */}
                        <div className="hidden md:block relative max-w-xs w-full mx-4">
                            <SearchSuggestions className="w-full" placeholder="Search calculators..." />
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleDrawer}
                            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Open menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer */}
            <div
                className={`fixed inset-0 z-50 transform transition-all duration-300 ease-in-out md:hidden ${isDrawerOpen ? 'visible' : 'invisible'
                    }`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-gray-900 transition-opacity duration-300 ${isDrawerOpen ? 'opacity-80' : 'opacity-0'
                        }`}
                    onClick={toggleDrawer}
                ></div>

                {/* Drawer Content */}
                <div
                    className={`absolute left-0 top-0 bottom-0 w-74 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <Link href="/" className="flex items-center" onClick={toggleDrawer}>
                            <div className="flex items-center">
                                <CalculatorIcon className="h-8 w-8 text-blue-600" />
                                <span className="ml-2 text-xl font-bold text-gray-900">
                                    My Calculators
                                </span>
                            </div>
                        </Link>
                        <button
                            onClick={toggleDrawer}
                            className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Drawer Navigation */}
                    <nav className="p-4">
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="/"
                                    className={`block py-2 ${isActive('/')} transition-colors duration-200 flex items-center gap-3`}
                                    onClick={toggleDrawer}
                                >
                                    <HomeIcon className="h-5 w-5" />
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/categories"
                                    className={`block py-2 ${isActive('/categories')} transition-colors duration-200 flex items-center gap-3`}
                                    onClick={toggleDrawer}
                                >
                                    <Squares2X2Icon className="h-5 w-5" />
                                    <span>Categories</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className={`block py-2 ${isActive('/about')} transition-colors duration-200 flex items-center gap-3`}
                                    onClick={toggleDrawer}
                                >
                                    <InformationCircleIcon className="h-5 w-5" />
                                    <span>About</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Copyright Notice */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
                        <p className="text-sm text-gray-600 text-center">
                            © {currentYear} My Calculators. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
} 