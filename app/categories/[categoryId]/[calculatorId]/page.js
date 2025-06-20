'use client';

import { calculatorCategories } from '../../../data/calculators';
import Calculator from '../../../components/Calculator';
import { notFound } from 'next/navigation';

export default function CalculatorPage({ params }) {
    const { categoryId, calculatorId } = params;

    const category = calculatorCategories.find(cat => cat.id === categoryId);
    if (!category) notFound();

    const calculator = category.calculators.find(calc => calc.id === calculatorId);
    if (!calculator) notFound();

    return (
        <div className="min-h-screen py-5">
            <div className="max-w-9xl mx-auto px-3 sm:px-4 lg:px-6">
                <div className="text-center mb-5">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {calculator.name}
                    </h1>
                    <p className="text-md text-gray-600 max-w-2xl mx-auto">
                        {calculator.description}
                    </p>
                </div>

                <Calculator categoryId={categoryId} calculatorId={calculatorId} />
            </div>
        </div>
    );
} 