'use client';

import { useState } from 'react';
import { calculatorCategories } from '@/app/data/calculators';

export default function Calculator({ categoryId, calculatorId }) {
    const category = calculatorCategories.find(cat => cat.id === categoryId);
    const calculator = category?.calculators.find(calc => calc.id === calculatorId);
    const [inputs, setInputs] = useState({});
    const [result, setResult] = useState(null);

    if (!calculator) {
        return <div>Calculator not found</div>;
    }

    const handleInputChange = (id, value) => {
        setInputs(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleCalculate = () => {
        const calculatedResult = calculator.calculate(inputs);
        setResult(calculatedResult);
    };

    const handleReset = () => {
        setInputs({});
        setResult(null);
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">{calculator.name}</h1>
                <p className="text-gray-600 mb-8">{calculator.description}</p>

                <div className="space-y-6">
                    {calculator.inputs.map((input) => (
                        <div key={input.id} className="space-y-2">
                            <label
                                htmlFor={input.id}
                                className="block text-sm font-medium text-gray-700"
                            >
                                {input.label}
                                {input.required && <span className="text-red-500 ml-1">*</span>}
                            </label>

                            {input.type === 'select' ? (
                                <select
                                    id={input.id}
                                    value={inputs[input.id] || ''}
                                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                                    required={input.required}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md bg-white"
                                >
                                    <option value="">Select {input.label}</option>
                                    {input.options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={input.type}
                                    id={input.id}
                                    value={inputs[input.id] || ''}
                                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                                    required={input.required}
                                    placeholder={`Enter ${input.label.toLowerCase()}`}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                                />
                            )}
                        </div>
                    ))}

                    <div className="flex space-x-4 pt-4">
                        <button
                            onClick={handleCalculate}
                            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            Calculate
                        </button>
                        <button
                            onClick={handleReset}
                            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                        >
                            Reset
                        </button>
                    </div>

                    {result !== null && (
                        <div className="mt-8 p-4 bg-blue-50 rounded-md">
                            <h2 className="text-lg font-semibold text-blue-900 mb-2">Result</h2>
                            <p className="text-blue-800 text-xl">{result}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 