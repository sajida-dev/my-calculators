'use client'
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Basic', href: '/basic' },
    { name: 'Scientific', href: '/scientific' },
    { name: 'Financial', href: '/financial' },
    { name: 'About', href: '/about' },
];

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-gray-600 hover:text-blue-900 px-3 py-2 text-sm font-medium transition-colors"
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
                <button
                    type="button"
                    className="text-gray-600 hover:text-blue-900"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <Bars3Icon className="h-6 w-6" />
                </button>
            </div>

            {/* Mobile Navigation Drawer */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-25"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                            <button
                                type="button"
                                className="text-gray-600 hover:text-blue-900"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="px-4 py-6">
                            <nav className="flex flex-col space-y-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-gray-600 hover:text-blue-900 px-3 py-2 text-base font-medium transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
} 