'use client';

import { useState, useEffect } from 'react';
import { calculatorCategories } from '@/app/data/calculators';
import GraphComponent from './GraphComponent';
import TableComponent from './TableComponent';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { getBuyerFee, getVirtualBidFee } from './copartFeeLogic';

export default function Calculator({ categoryId, calculatorId }) {
    const category = calculatorCategories.find(cat => cat.id === categoryId);
    const calculator = category?.calculators.find(calc => calc.id === calculatorId);
    const [inputs, setInputs] = useState({});
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (calculatorId) {
            const key = `calc-usage-${calculatorId}`;
            const count = parseInt(localStorage.getItem(key) || '0', 10) + 1;
            localStorage.setItem(key, count);
        }
    }, [calculatorId]);

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
            const loanAmount = Number(inputs.loanAmount);
            const interestRate = Number(inputs.interestRate);
            const loanTerm = Number(inputs.loanTerm);
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
                return {
                    mainText: `Monthly Payment: $${monthlyPayment.toFixed(2)}`,
                    graphData: null,
                    tableData: null
                };

            case 'land-loan':
                const { landPrice, downPayment, landInterestRate, landTerm } = inputs;
                const landLoanAmount = landPrice - downPayment;
                const landMonthlyRate = landInterestRate / 100 / 12;
                const landMonthlyPayment = (landLoanAmount * landMonthlyRate * Math.pow(1 + landMonthlyRate, landTerm * 12)) /
                    (Math.pow(1 + landMonthlyRate, landTerm * 12) - 1);
                return {
                    mainText: `Monthly Payment: $${landMonthlyPayment.toFixed(2)}`,
                    graphData: null,
                    tableData: null
                };

            case 'mobile-home-loan':
                const { homePrice, homeDownPayment, homeInterestRate, homeTerm } = inputs;
                const homeLoanAmount = homePrice - homeDownPayment;
                const homeMonthlyRate = homeInterestRate / 100 / 12;
                const homeMonthlyPayment = (homeLoanAmount * homeMonthlyRate * Math.pow(1 + homeMonthlyRate, homeTerm * 12)) /
                    (Math.pow(1 + homeMonthlyRate, homeTerm * 12) - 1);
                return {
                    mainText: `Monthly Payment: $${homeMonthlyPayment.toFixed(2)}`,
                    graphData: null,
                    tableData: null
                };

            case 'future-value':
                const { presentValue, futureInterestRate, futureYears } = inputs;
                const futureValue = presentValue * Math.pow(1 + futureInterestRate / 100, futureYears);
                return {
                    mainText: `Future Value: $${futureValue.toFixed(2)}`,
                    graphData: null,
                    tableData: null
                };

            case 'copart-fee': {
                // Extract all inputs
                const {
                    purchasePrice = 0,
                    licenseType = 'Non-licensed',
                    tier = 'Less',
                    vehicleType = 'Standard',
                    titleType = 'Clean',
                    paymentMethod = 'Secured',
                    bidType = 'Pre-bid',
                    copartStorageFee = 0,
                    latePayment = 'No',
                    salesTax = 0,
                    otherGovFees = 0,
                    usingBroker = 'No',
                    numBrokerFees = '1',
                    brokerFee1Method = '$ Fixed amount',
                    brokerFee1Amount = 0,
                    brokerFee2Method = '$ Fixed amount',
                    brokerFee2Amount = 0,
                    brokerFee3Method = '$ Fixed amount',
                    brokerFee3Amount = 0,
                    brokerFee4Method = '$ Fixed amount',
                    brokerFee4Amount = 0,
                    brokerFee5Method = '$ Fixed amount',
                    brokerFee5Amount = 0
                } = inputs;
                const price = Number(purchasePrice) || 0;
                // 1. Copart fee type logic
                let copartFeeType = '';
                if (licenseType === 'Non-licensed') {
                    if (titleType === 'Clean') {
                        if (vehicleType === 'Standard') {
                            copartFeeType = paymentMethod === 'Unsecured' ? 'Nonlicensed-Clean-Standard-Unsecured' : 'Nonlicensed-Clean-Standard-Secured';
                        } else {
                            copartFeeType = paymentMethod === 'Unsecured' ? 'Nonlicensed-Clean-Heavy-Unsecured' : 'Nonlicensed-Clean-Heavy-Secured';
                        }
                    } else {
                        if (vehicleType === 'Standard') {
                            copartFeeType = paymentMethod === 'Unsecured' ? 'Nonlicensed-Nonclean-Standard-Unsecured' : 'Nonlicensed-Nonclean-Standard-Secured';
                        } else {
                            copartFeeType = paymentMethod === 'Unsecured' ? 'Nonlicensed-Nonclean-Heavy-Unsecured' : 'Nonlicensed-Nonclean-Heavy-Secured';
                        }
                    }
                } else {
                    // Licensed
                    if (tier === 'Less') {
                        if (titleType === 'Clean') {
                            if (vehicleType === 'Standard') {
                                copartFeeType = paymentMethod === 'Unsecured' ? 'Licensed-Less-Clean-Standard-Unsecured' : 'Licensed-Less-Clean-Standard-Secured';
                            } else {
                                copartFeeType = paymentMethod === 'Unsecured' ? 'Licensed-Less-Clean-Heavy-Unsecured' : 'Licensed-Less-Clean-Heavy-Secured';
                            }
                        } else {
                            if (vehicleType === 'Standard') {
                                copartFeeType = paymentMethod === 'Unsecured' ? 'Licensed-Less-Nonclean-Standard-Unsecured' : 'Licensed-Less-Nonclean-Standard-Secured';
                            } else {
                                copartFeeType = paymentMethod === 'Unsecured' ? 'Licensed-Less-Nonclean-Heavy-Unsecured' : 'Licensed-Less-Nonclean-Heavy-Secured';
                            }
                        }
                    } else {
                        // More
                        if (titleType === 'Clean') {
                            if (vehicleType === 'Standard') {
                                copartFeeType = paymentMethod === 'Unsecured' ? 'Licensed-More-Clean-Standard-Unsecured' : 'Licensed-More-Clean-Standard-Secured';
                            } else {
                                copartFeeType = paymentMethod === 'Unsecured' ? 'Licensed-More-Clean-Heavy-Unsecured' : 'Licensed-More-Clean-Heavy-Secured';
                            }
                        } else {
                            if (vehicleType === 'Standard') {
                                copartFeeType = paymentMethod === 'Unsecured' ? 'Licensed-More-Nonclean-Standard-Unsecured' : 'Licensed-More-Nonclean-Standard-Secured';
                            } else {
                                copartFeeType = paymentMethod === 'Unsecured' ? 'Licensed-More-Nonclean-Heavy-Unsecured' : 'Licensed-More-Nonclean-Heavy-Secured';
                            }
                        }
                    }
                }
                // 2. Copart buyer fee (full tiered logic)
                const buyerFee = getBuyerFee(copartFeeType, price);
                // 3. Copart virtual bid fee
                const virtualBidFee = getVirtualBidFee(bidType, price);
                // 4. Environmental fee
                const environmentalFee = 10;
                // 5. Gate fee
                const gateFee = 79;
                // 6. Third Party Finance fee
                const thirdPartyFinanceFee = paymentMethod === 'Copart-affiliated third party financing' ? 69 : 0;
                // 7. Late payment fee
                const latePaymentFee = latePayment === 'Yes' ? 50 : 0;
                // 8. Broker fees
                let brokerFee = 0;
                if (usingBroker === 'Yes') {
                    const n = parseInt(numBrokerFees, 10) || 1;
                    for (let i = 1; i <= n; i++) {
                        const method = inputs[`brokerFee${i}Method`] || '$ Fixed amount';
                        const amount = Number(inputs[`brokerFee${i}Amount`]) || 0;
                        if (method === '$ Fixed amount') {
                            brokerFee += amount;
                        } else if (method === '% of purchase price') {
                            brokerFee += price * amount / 100;
                        }
                    }
                }
                // 9. Sales tax (applies to purchase price + all fees)
                const allFeesForTax = price + environmentalFee + buyerFee + virtualBidFee + gateFee + (Number(copartStorageFee) || 0) + thirdPartyFinanceFee + brokerFee + latePaymentFee;
                const salesTaxAmount = salesTax > 0 ? allFeesForTax * (Number(salesTax) / 100) : 0;
                // 10. Total price
                const totalPrice = price + environmentalFee + buyerFee + virtualBidFee + gateFee + (Number(copartStorageFee) || 0) + thirdPartyFinanceFee + brokerFee + latePaymentFee + salesTaxAmount + (Number(otherGovFees) || 0);
                // 11. Result breakdown
                const breakdown = [
                    { label: 'Sale price', value: price },
                    { label: 'Environmental fee', value: environmentalFee },
                    { label: 'Buyer fee', value: buyerFee },
                    { label: 'Virtual bid fee', value: virtualBidFee },
                    { label: 'Gate fee', value: gateFee },
                    { label: 'Storage fee', value: Number(copartStorageFee) || 0 },
                    { label: 'Third party finance fee', value: thirdPartyFinanceFee },
                    { label: 'Total Broker fee', value: brokerFee },
                    { label: 'Late payment fee', value: latePaymentFee },
                    { label: 'Sales tax', value: salesTaxAmount },
                    { label: 'Other government fees', value: Number(otherGovFees) || 0 }
                ];
                return {
                    mainText: `Total price: $${totalPrice.toFixed(2)}`,
                    tableData: breakdown.map(row => ({ Fee: row.label, Amount: `$${row.value.toFixed(2)}` })),
                    graphData: null
                };
            }

            case 'cash-back':
                const { purchaseAmount, cashBackRate } = inputs;
                const cashBack = purchaseAmount * (cashBackRate / 100);
                return {
                    mainText: `Cash Back Amount: $${cashBack.toFixed(2)}`,
                    graphData: null,
                    tableData: null
                };

            // Health & Fitness Calculators
            case 'homa-ir':
                const { fastingGlucose, fastingInsulin } = inputs;
                const homaIR = (fastingGlucose * fastingInsulin) / 405;
                return {
                    mainText: `HOMA-IR Score: ${homaIR.toFixed(2)}`,
                    graphData: null,
                    tableData: null
                };

            case 'free-water-deficit':
                const { waterWeight, sodium } = inputs;
                const waterDeficit = waterWeight * 0.6 * (1 - (140 / sodium));
                return {
                    mainText: `Free Water Deficit: ${waterDeficit.toFixed(2)} L`,
                    graphData: null,
                    tableData: null
                };

            case 'biking-calorie':
            case 'bicycle-calorie':
                const { duration, bikeWeight, intensity } = inputs;
                const calories = duration * bikeWeight * intensity * 0.0175;
                return {
                    mainText: `Calories Burned: ${calories.toFixed(0)} kcal`,
                    graphData: null,
                    tableData: null
                };

            case 'starbucks-calorie':
                const { drinkSize, drinkType } = inputs;
                const calorieMap = {
                    'tall': { 'latte': 150, 'cappuccino': 120, 'americano': 10 },
                    'grande': { 'latte': 190, 'cappuccino': 150, 'americano': 15 },
                    'venti': { 'latte': 250, 'cappuccino': 190, 'americano': 20 }
                };
                return {
                    mainText: `Calories: ${calorieMap[drinkSize][drinkType]} kcal`,
                    graphData: null,
                    tableData: null
                };

            // Math Calculators
            case 'quadrilateral-area':
                const { length, width } = inputs;
                const quadArea = length * width;
                return {
                    mainText: `Area: ${quadArea.toFixed(2)} square units`,
                    graphData: null,
                    tableData: null
                };

            case 'yard-area':
                const { yardLength, yardWidth } = inputs;
                const yardArea = yardLength * yardWidth;
                return {
                    mainText: `Yard Area: ${yardArea.toFixed(2)} square feet`,
                    graphData: null,
                    tableData: null
                };

            case 'power-weight-ratio':
                const { power, powerWeight } = inputs;
                const ratio = power / powerWeight;
                return {
                    mainText: `Power to Weight Ratio: ${ratio.toFixed(2)} W/kg`,
                    graphData: null,
                    tableData: null
                };

            case 'playback-speed':
                const { originalDuration, playbackSpeed } = inputs;
                const newDuration = originalDuration / playbackSpeed;
                return {
                    mainText: `New Duration: ${newDuration.toFixed(2)} minutes`,
                    graphData: null,
                    tableData: null
                };

            // Everyday Life Calculators
            case 'ap-score':
                const { mcScore, frqScore } = inputs;
                const apScore = (mcScore * 0.6) + (frqScore * 0.4);
                return {
                    mainText: `AP Score: ${apScore.toFixed(1)}`,
                    graphData: null,
                    tableData: null
                };

            case 'infinite-campus-grade':
                const { assignments, weights } = inputs;
                const weightedGrade = assignments.reduce((acc, curr, i) => acc + (curr * weights[i]), 0) /
                    weights.reduce((a, b) => a + b, 0);
                return {
                    mainText: `Final Grade: ${weightedGrade.toFixed(2)}%`,
                    graphData: null,
                    tableData: null
                };

            case 'anniversary':
                const { startDate } = inputs;
                const today = new Date();
                const anniversary = new Date(startDate);
                const anniversaryYears = today.getFullYear() - anniversary.getFullYear();
                return {
                    mainText: `Years Together: ${anniversaryYears} years`,
                    graphData: null,
                    tableData: null
                };

            case 'half-birthday':
                const { birthDate } = inputs;
                const halfBirthday = new Date(birthDate);
                halfBirthday.setMonth(halfBirthday.getMonth() + 6);
                return {
                    mainText: `Half Birthday: ${halfBirthday.toLocaleDateString()}`,
                    graphData: null,
                    tableData: null
                };

            case 'snowday':
                const { temperature, precipitation, windSpeed } = inputs;
                const snowProbability = (temperature < 32 && precipitation > 0.1) ?
                    Math.min(100, (32 - temperature) * 10 + (precipitation * 50) + (windSpeed * 5)) : 0;
                return {
                    mainText: `Snow Day Probability: ${snowProbability.toFixed(1)}%`,
                    graphData: null,
                    tableData: null
                };

            case 'heater-btu':
                const { roomSize, insulation, climate } = inputs;
                const btu = roomSize * 20 * (insulation === 'good' ? 0.8 : 1) * (climate === 'cold' ? 1.2 : 1);
                return {
                    mainText: `Required BTU: ${btu.toFixed(0)}`,
                    graphData: null,
                    tableData: null
                };

            // Other Calculators
            case 'blox-fruits-trade':
                const { fruit1, fruit2 } = inputs;
                const fruitValues = {
                    'dragon': 3500000,
                    'leopard': 3000000,
                    'mammoth': 2500000
                };
                const tradeValue = Math.abs(fruitValues[fruit1] - fruitValues[fruit2]);
                return {
                    mainText: `Trade Value Difference: ${tradeValue.toLocaleString()} Beli`,
                    graphData: null,
                    tableData: null
                };

            case 'horse-color':
                const { baseColor, pattern } = inputs;
                return {
                    mainText: `Horse Color: ${baseColor} with ${pattern} pattern`,
                    graphData: null,
                    tableData: null
                };

            case 'asphalt':
                const { asphaltArea, thickness } = inputs;
                const asphaltNeeded = asphaltArea * thickness * 145; // 145 lbs per cubic foot
                return {
                    mainText: `Asphalt Needed: ${asphaltNeeded.toFixed(0)} lbs`,
                    graphData: null,
                    tableData: null
                };

            default:
                return {
                    mainText: 'Calculation not implemented',
                    graphData: null,
                    tableData: null
                };
        }
    };

    const handleCalculate = () => {
        // Determine current mode (if present)
        const mode = inputs.mode || (calculator.inputs.find(i => i.id === 'mode')?.default) || 'Monthly Payment';
        // Define required fields for each mode
        const requiredFieldsByMode = {
            'Total Price': ['autoPrice', 'loanTerm', 'interestRate'],
            'Monthly Payment': ['monthlyPay', 'loanTerm', 'interestRate']
        };
        // Always required fields (from config)
        const alwaysRequired = (calculator.inputs || []).filter(i => i.required && i.id !== 'autoPrice' && i.id !== 'monthlyPay').map(i => i.id);
        // Get required fields for this mode
        const requiredFields = [
            ...(requiredFieldsByMode[mode] || []),
            ...alwaysRequired
        ];
        // Remove duplicates
        const uniqueRequiredFields = Array.from(new Set(requiredFields));
        // Validate required fields
        const missingFields = uniqueRequiredFields.filter(fieldId => {
            const input = calculator.inputs.find(i => i.id === fieldId);
            const value = inputs[fieldId];
            if (!input) return false;
            if (input.type === 'number') {
                return value === undefined || value === '' || isNaN(Number(value)) || Number(value) <= 0;
            }
            if (input.type === 'select') {
                return !value || value === '-- Select --';
            }
            if (input.type === 'checkbox') {
                return false; // checkboxes are never required
            }
            return value === undefined || value === '';
        });
        if (missingFields.length > 0) {
            const missingLabels = missingFields.map(id => {
                const input = calculator.inputs.find(i => i.id === id);
                return input ? input.label : id;
            });
            setError(`Please fill in the following required fields: ${missingLabels.join(', ')}.`);
            setResult(null);
            return;
        }
        setError('');
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
        <div className="max-w-7xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">{calculator.name}</h1>
                <p className="text-gray-600 mb-8">{calculator.description}</p>

                <div className="space-y-6">
                    {/* Input fields in a responsive grid: 2 per row on desktop, 1 per row on mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {calculatorInputs
                            .filter((input) => {
                                // Show/hide fields based on mode
                                if (input.id === 'autoPrice') {
                                    return (inputs.mode || input.default) === 'Total Price';
                                }
                                if (input.id === 'monthlyPay') {
                                    return (inputs.mode || input.default) === 'Monthly Payment';
                                }
                                // Always show mode selector
                                if (input.id === 'mode') return true;
                                // Always show other fields
                                return true;
                            })
                            .map((input) => {
                                // Determine if this is a dollar field
                                const isDollarField = /price|pay|value|amount|fee|owed|incentive/i.test(input.id);
                                return (
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
                                                <option value="" disabled>{`Select ${input.label}`}</option>
                                                {input.options && input.options.map((option) => (
                                                    <option key={option} value={option} className="text-gray-900">
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : input.type === 'checkbox' ? (
                                            <input
                                                type="checkbox"
                                                id={input.id}
                                                checked={!!inputs[input.id]}
                                                onChange={(e) => handleInputChange(input.id, e.target.checked)}
                                                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                        ) : (
                                            <div className="relative">
                                                {isDollarField && (
                                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className='text-black'>$</span>
                                                        {/* <CurrencyDollarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                                                    </span>
                                                )}
                                                <input
                                                    type={input.type}
                                                    id={input.id}
                                                    value={inputs[input.id] || ''}
                                                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                                                    required={input.required}
                                                    placeholder={`Enter ${input.label.toLowerCase()}`}
                                                    className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 ${isDollarField ? 'pl-10' : ''}`}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </div>

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

                    {error && (
                        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded border border-red-200">
                            {error}
                        </div>
                    )}

                    {result !== null && (
                        <div className="mt-8 p-4 rounded-md bg-white border border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">Result</h2>
                            {/* User-friendly summary formatting */}
                            {result.mainText && (
                                <div className="mb-4 space-y-1">
                                    {result.mainText.split('|').map((line, idx) => {
                                        const [label, value] = line.split(':');
                                        return (
                                            <div key={idx}>
                                                <span className="font-semibold text-gray-700">{label.trim()}:</span>
                                                <span className="ml-2 text-gray-900">{value ? value.trim() : ''}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Graph display */}
                            {calculator.supportsGraph && result.graphData && (
                                <div className="mb-6">
                                    <GraphComponent data={result.graphData} />
                                </div>
                            )}

                            {/* Table display with sticky header and scroll */}
                            {calculator.supportsTable && result.tableData && Array.isArray(result.tableData) && result.tableData.length > 0 && (
                                <div className="overflow-x-auto max-h-96">
                                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                                        <thead className="bg-gray-100 sticky top-0 z-10">
                                            <tr>
                                                {Object.keys(result.tableData[0]).map((key) => (
                                                    <th key={key} className="px-4 py-2 font-semibold text-gray-900 text-left whitespace-nowrap">
                                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-100">
                                            {result.tableData.map((row, idx) => (
                                                <tr key={idx}>
                                                    {Object.entries(row).map(([key, val], i) => (
                                                        <td key={i} className="px-4 py-2 whitespace-nowrap text-gray-900">
                                                            {typeof val === 'number' && ['payment', 'principal', 'interest', 'balance'].includes(key)
                                                                ? val.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
                                                                : typeof val === 'number'
                                                                    ? val.toLocaleString(undefined, { maximumFractionDigits: 2 })
                                                                    : val}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 