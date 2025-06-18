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

    const calculateResult = () => {
        // Use the calculate function from the data if it exists
        if (calculator.calculate) {
            return calculator.calculate(inputs);
        }

        // Fallback to hardcoded calculations
        switch (calculatorId) {
            // Financial Calculators
            case 'car-payoff':
                const { loanAmount, interestRate, loanTerm } = inputs;
                const monthlyRate = interestRate / 100 / 12;
                const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm * 12)) /
                    (Math.pow(1 + monthlyRate, loanTerm * 12) - 1);
                return `Monthly Payment: $${monthlyPayment.toFixed(2)}`;

            case 'land-loan':
                const { landPrice, downPayment, landInterestRate, landTerm } = inputs;
                const landLoanAmount = landPrice - downPayment;
                const landMonthlyRate = landInterestRate / 100 / 12;
                const landMonthlyPayment = (landLoanAmount * landMonthlyRate * Math.pow(1 + landMonthlyRate, landTerm * 12)) /
                    (Math.pow(1 + landMonthlyRate, landTerm * 12) - 1);
                return `Monthly Payment: $${landMonthlyPayment.toFixed(2)}`;

            case 'mobile-home-loan':
                const { homePrice, homeDownPayment, homeInterestRate, homeTerm } = inputs;
                const homeLoanAmount = homePrice - homeDownPayment;
                const homeMonthlyRate = homeInterestRate / 100 / 12;
                const homeMonthlyPayment = (homeLoanAmount * homeMonthlyRate * Math.pow(1 + homeMonthlyRate, homeTerm * 12)) /
                    (Math.pow(1 + homeMonthlyRate, homeTerm * 12) - 1);
                return `Monthly Payment: $${homeMonthlyPayment.toFixed(2)}`;

            case 'future-value':
                const { presentValue, futureInterestRate, futureYears } = inputs;
                const futureValue = presentValue * Math.pow(1 + futureInterestRate / 100, futureYears);
                return `Future Value: $${futureValue.toFixed(2)}`;

            case 'copart-fee':
                const { bidAmount, buyerFee, gatePass } = inputs;
                const totalFee = Number(bidAmount) + Number(buyerFee) + Number(gatePass);
                return `Total Cost: $${totalFee.toFixed(2)}`;

            case 'cash-back':
                const { purchaseAmount, cashBackRate } = inputs;
                const cashBack = purchaseAmount * (cashBackRate / 100);
                return `Cash Back Amount: $${cashBack.toFixed(2)}`;

            // Health & Fitness Calculators
            case 'homa-ir':
                const { fastingGlucose, fastingInsulin } = inputs;
                const homaIR = (fastingGlucose * fastingInsulin) / 405;
                return `HOMA-IR Score: ${homaIR.toFixed(2)}`;

            case 'free-water-deficit':
                const { waterWeight, sodium } = inputs;
                const waterDeficit = waterWeight * 0.6 * (1 - (140 / sodium));
                return `Free Water Deficit: ${waterDeficit.toFixed(2)} L`;

            case 'biking-calorie':
            case 'bicycle-calorie':
                const { duration, bikeWeight, intensity } = inputs;
                const calories = duration * bikeWeight * intensity * 0.0175;
                return `Calories Burned: ${calories.toFixed(0)} kcal`;

            case 'starbucks-calorie':
                const { drinkSize, drinkType } = inputs;
                const calorieMap = {
                    'tall': { 'latte': 150, 'cappuccino': 120, 'americano': 10 },
                    'grande': { 'latte': 190, 'cappuccino': 150, 'americano': 15 },
                    'venti': { 'latte': 250, 'cappuccino': 190, 'americano': 20 }
                };
                return `Calories: ${calorieMap[drinkSize][drinkType]} kcal`;

            // Math Calculators
            case 'quadrilateral-area':
                const { length, width } = inputs;
                const quadArea = length * width;
                return `Area: ${quadArea.toFixed(2)} square units`;

            case 'yard-area':
                const { yardLength, yardWidth } = inputs;
                const yardArea = yardLength * yardWidth;
                return `Yard Area: ${yardArea.toFixed(2)} square feet`;

            case 'power-weight-ratio':
                const { power, powerWeight } = inputs;
                const ratio = power / powerWeight;
                return `Power to Weight Ratio: ${ratio.toFixed(2)} W/kg`;

            case 'playback-speed':
                const { originalDuration, playbackSpeed } = inputs;
                const newDuration = originalDuration / playbackSpeed;
                return `New Duration: ${newDuration.toFixed(2)} minutes`;

            // Everyday Life Calculators
            case 'ap-score':
                const { mcScore, frqScore } = inputs;
                const apScore = (mcScore * 0.6) + (frqScore * 0.4);
                return `AP Score: ${apScore.toFixed(1)}`;

            case 'infinite-campus-grade':
                const { assignments, weights } = inputs;
                const weightedGrade = assignments.reduce((acc, curr, i) => acc + (curr * weights[i]), 0) /
                    weights.reduce((a, b) => a + b, 0);
                return `Final Grade: ${weightedGrade.toFixed(2)}%`;

            case 'anniversary':
                const { startDate } = inputs;
                const today = new Date();
                const anniversary = new Date(startDate);
                const anniversaryYears = today.getFullYear() - anniversary.getFullYear();
                return `Years Together: ${anniversaryYears} years`;

            case 'half-birthday':
                const { birthDate } = inputs;
                const halfBirthday = new Date(birthDate);
                halfBirthday.setMonth(halfBirthday.getMonth() + 6);
                return `Half Birthday: ${halfBirthday.toLocaleDateString()}`;

            case 'snowday':
                const { temperature, precipitation, windSpeed } = inputs;
                const snowProbability = (temperature < 32 && precipitation > 0.1) ?
                    Math.min(100, (32 - temperature) * 10 + (precipitation * 50) + (windSpeed * 5)) : 0;
                return `Snow Day Probability: ${snowProbability.toFixed(1)}%`;

            case 'heater-btu':
                const { roomSize, insulation, climate } = inputs;
                const btu = roomSize * 20 * (insulation === 'good' ? 0.8 : 1) * (climate === 'cold' ? 1.2 : 1);
                return `Required BTU: ${btu.toFixed(0)}`;

            // Other Calculators
            case 'blox-fruits-trade':
                const { fruit1, fruit2 } = inputs;
                const fruitValues = {
                    'dragon': 3500000,
                    'leopard': 3000000,
                    'mammoth': 2500000
                };
                const tradeValue = Math.abs(fruitValues[fruit1] - fruitValues[fruit2]);
                return `Trade Value Difference: ${tradeValue.toLocaleString()} Beli`;

            case 'horse-color':
                const { baseColor, pattern } = inputs;
                return `Horse Color: ${baseColor} with ${pattern} pattern`;

            case 'asphalt':
                const { asphaltArea, thickness } = inputs;
                const asphaltNeeded = asphaltArea * thickness * 145; // 145 lbs per cubic foot
                return `Asphalt Needed: ${asphaltNeeded.toFixed(0)} lbs`;

            default:
                return 'Calculation not implemented';
        }
    };

    const handleCalculate = () => {
        const calculatedResult = calculateResult();
        setResult(calculatedResult);
    };

    const handleReset = () => {
        setInputs({});
        setResult(null);
    };

    // Get inputs from the calculator data or use default inputs
    const calculatorInputs = calculator.inputs || [];

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">{calculator.name}</h1>
                <p className="text-gray-600 mb-8">{calculator.description}</p>

                <div className="space-y-6">
                    {calculatorInputs.map((input) => (
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
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md bg-white text-gray-900"
                                >
                                    <option value="">Select {input.label}</option>
                                    {input.options && input.options.map((option) => (
                                        <option key={option} value={option} className="text-gray-900">
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