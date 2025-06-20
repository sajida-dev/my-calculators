import {
    AcademicCapIcon,
    BanknotesIcon,
    HeartIcon,
    CalendarIcon,
    WrenchIcon,
    CalculatorIcon,
    ChartBarIcon,
    BeakerIcon,
    ScaleIcon,
    CurrencyDollarIcon,
    ClockIcon,
    UserGroupIcon,
    HomeIcon,
    TruckIcon,
    GlobeAltIcon,
    SunIcon,
    BoltIcon,
    CubeIcon,
    ChartPieIcon,
    DocumentTextIcon,
    ArrowPathIcon,
    FireIcon,
    BuildingOfficeIcon,
    GiftIcon,
    SparklesIcon,
    CloudIcon,
    TagIcon,
    PaintBrushIcon,
    WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

export const calculatorCategories = [
    {
        id: 'financial',
        name: 'Financial Calculators',
        description: 'Tools for financial planning and calculations',
        icon: 'BanknotesIcon',
        calculators: [
            {
                id: 'car-payoff',
                name: 'Car Payoff Calculator',
                description: 'Calculate your car loan payoff amount, schedule, and total costs including taxes and fees',
                icon: 'TruckIcon',
                supportsGraph: true,
                supportsTable: true,
                inputs: [
                    { id: 'mode', label: 'Calculation Mode', type: 'select', options: ['Total Price', 'Monthly Payment'], required: true, default: 'Monthly Payment' },
                    { id: 'autoPrice', label: 'Auto Price ($)', type: 'number', required: false },
                    { id: 'monthlyPay', label: 'Monthly Pay ($)', type: 'number', required: false },
                    { id: 'loanTerm', label: 'Loan Term (months)', type: 'number', required: true },
                    { id: 'interestRate', label: 'Interest Rate (%)', type: 'number', required: true },
                    { id: 'cashIncentives', label: 'Cash Incentives ($)', type: 'number', required: false },
                    { id: 'downPayment', label: 'Down Payment ($)', type: 'number', required: false },
                    { id: 'tradeIn', label: 'Trade-in Value ($)', type: 'number', required: false },
                    { id: 'tradeInOwed', label: 'Amount Owed on Trade-in ($)', type: 'number', required: false },
                    {
                        id: 'state', label: 'Your State', type: 'select', options: [
                            '-- Select --', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
                        ], required: false
                    },
                    { id: 'salesTax', label: 'Sales Tax (%)', type: 'number', required: false },
                    { id: 'fees', label: 'Title, Registration, and Other Fees ($)', type: 'number', required: false },
                    { id: 'includeTaxesFees', label: 'Include taxes and fees in loan', type: 'checkbox', required: false }
                ],
                calculate: (inputs) => {
                    // Extract and parse all relevant fields
                    const mode = inputs.mode || 'Monthly Payment';
                    const autoPrice = Number(inputs.autoPrice) || 0;
                    const monthlyPay = Number(inputs.monthlyPay) || 0;
                    const loanTerm = Number(inputs.loanTerm) || 0;
                    const interestRate = Number(inputs.interestRate) || 0;
                    const cashIncentives = Number(inputs.cashIncentives) || 0;
                    const downPayment = Number(inputs.downPayment) || 0;
                    const tradeIn = Number(inputs.tradeIn) || 0;
                    const tradeInOwed = Number(inputs.tradeInOwed) || 0;
                    const salesTax = Number(inputs.salesTax) || 0;
                    const fees = Number(inputs.fees) || 0;
                    const includeTaxesFees = !!inputs.includeTaxesFees;

                    // Calculate net trade-in value
                    const netTradeIn = tradeIn - tradeInOwed;

                    // Calculate taxable amount
                    const taxableAmount = autoPrice - netTradeIn - cashIncentives;
                    const taxAmount = salesTax > 0 ? taxableAmount * (salesTax / 100) : 0;

                    // Amount to finance
                    let amountFinanced = 0;
                    if (includeTaxesFees) {
                        amountFinanced = autoPrice - netTradeIn - cashIncentives - downPayment + taxAmount + fees;
                    } else {
                        amountFinanced = autoPrice - netTradeIn - cashIncentives - downPayment;
                    }

                    // Monthly interest rate and number of payments
                    const monthlyRate = interestRate / 100 / 12;
                    const n = loanTerm;

                    let resultSummary = '';
                    let monthlyPayment = 0;
                    let maxAutoPrice = 0;
                    let tableData = [];
                    let graphData = [];
                    let totalInterest = 0;
                    let totalPayment = 0;

                    if (mode === 'Total Price') {
                        // Calculate monthly payment from total price
                        if (monthlyRate > 0) {
                            monthlyPayment = (amountFinanced * monthlyRate * Math.pow(1 + monthlyRate, n)) /
                                (Math.pow(1 + monthlyRate, n) - 1);
                        } else {
                            monthlyPayment = amountFinanced / n;
                        }
                        // Amortization table
                        let balance = amountFinanced;
                        for (let i = 1; i <= n; i++) {
                            const interest = balance * monthlyRate;
                            const principal = monthlyPayment - interest;
                            balance -= principal;
                            totalInterest += interest;
                            totalPayment += monthlyPayment;
                            tableData.push({
                                month: i,
                                payment: monthlyPayment,
                                principal: principal,
                                interest: interest,
                                balance: Math.max(balance, 0)
                            });
                            graphData.push({ month: i, balance: Math.max(balance, 0) });
                        }
                        resultSummary = `Monthly Payment: $${monthlyPayment.toFixed(2)} | Total Interest: $${totalInterest.toFixed(2)} | Total Payment: $${totalPayment.toFixed(2)}`;
                    } else if (mode === 'Monthly Payment') {
                        // Calculate max auto price from monthly payment
                        if (monthlyRate > 0) {
                            amountFinanced = monthlyPay * (1 - Math.pow(1 + monthlyRate, -n)) / monthlyRate;
                        } else {
                            amountFinanced = monthlyPay * n;
                        }
                        // Reverse-calculate auto price
                        let autoPriceCalc = amountFinanced + netTradeIn + cashIncentives + downPayment;
                        if (includeTaxesFees) {
                            autoPriceCalc -= (taxAmount + fees);
                        }
                        maxAutoPrice = autoPriceCalc;
                        // Amortization table
                        let balance = amountFinanced;
                        for (let i = 1; i <= n; i++) {
                            const interest = balance * monthlyRate;
                            const principal = monthlyPay - interest;
                            balance -= principal;
                            totalInterest += interest;
                            totalPayment += monthlyPay;
                            tableData.push({
                                month: i,
                                payment: monthlyPay,
                                principal: principal,
                                interest: interest,
                                balance: Math.max(balance, 0)
                            });
                            graphData.push({ month: i, balance: Math.max(balance, 0) });
                        }
                        resultSummary = `Maximum Auto Price: $${maxAutoPrice.toFixed(2)} | Total Interest: $${totalInterest.toFixed(2)} | Total Payment: $${totalPayment.toFixed(2)}`;
                    } else {
                        resultSummary = 'Calculation not implemented';
                    }

                    return {
                        mainText: resultSummary,
                        tableData,
                        graphData
                    };
                }
            },
            {
                id: 'land-loan',
                name: 'Land Loan Calculator',
                description: 'Calculate land loan payments, interest, and payoff schedule',
                icon: 'HomeIcon',
                supportsGraph: true,
                supportsTable: true,
                inputs: [
                    { id: 'landPrice', label: 'Land Price ($)', type: 'number', required: true },
                    { id: 'downPayment', label: 'Down Payment ($)', type: 'number', required: false },
                    { id: 'loanTerm', label: 'Loan Term (years)', type: 'number', required: true },
                    { id: 'interestRate', label: 'Interest Rate (% APR)', type: 'number', required: true },
                    { id: 'compounding', label: 'Compounding Frequency', type: 'select', options: ['Monthly', 'Quarterly', 'Annually'], required: false, default: 'Monthly' },
                    { id: 'paymentFrequency', label: 'Payment Frequency', type: 'select', options: ['Monthly', 'Quarterly', 'Annually'], required: false, default: 'Monthly' },
                    { id: 'fees', label: 'Title, Registration, and Other Fees ($)', type: 'number', required: false },
                    { id: 'salesTax', label: 'Sales Tax (%)', type: 'number', required: false },
                    { id: 'includeTaxesFees', label: 'Include taxes and fees in loan', type: 'checkbox', required: false }
                ],
                calculate: (inputs) => {
                    const landPrice = Number(inputs.landPrice) || 0;
                    const downPayment = Number(inputs.downPayment) || 0;
                    const loanTermYears = Number(inputs.loanTerm) || 0;
                    const interestRate = Number(inputs.interestRate) || 0;
                    const compounding = inputs.compounding || 'Monthly';
                    const paymentFrequency = inputs.paymentFrequency || 'Monthly';
                    const fees = Number(inputs.fees) || 0;
                    const salesTax = Number(inputs.salesTax) || 0;
                    const includeTaxesFees = !!inputs.includeTaxesFees;

                    // Calculate loan amount
                    let loanAmount = landPrice - downPayment;
                    // Calculate sales tax
                    const taxAmount = salesTax > 0 ? (landPrice - downPayment) * (salesTax / 100) : 0;
                    // Add fees/taxes if included
                    let financedAmount = loanAmount;
                    if (includeTaxesFees) {
                        financedAmount += fees + taxAmount;
                    }

                    // Determine periods per year
                    const freqMap = { 'Monthly': 12, 'Quarterly': 4, 'Annually': 1 };
                    const periodsPerYear = freqMap[paymentFrequency] || 12;
                    const compoundingPerYear = freqMap[compounding] || 12;
                    const n = loanTermYears * periodsPerYear;

                    // Adjust interest rate for compounding/payment frequency
                    let periodicRate = 0;
                    if (compoundingPerYear === periodsPerYear) {
                        periodicRate = interestRate / 100 / periodsPerYear;
                    } else {
                        // Convert APR to effective rate for payment period
                        periodicRate = Math.pow(1 + interestRate / 100 / compoundingPerYear, compoundingPerYear / periodsPerYear) - 1;
                    }

                    // Monthly payment calculation (standard amortization)
                    let payment = 0;
                    if (periodicRate > 0) {
                        payment = (financedAmount * periodicRate * Math.pow(1 + periodicRate, n)) /
                            (Math.pow(1 + periodicRate, n) - 1);
                    } else {
                        payment = financedAmount / n;
                    }

                    // Amortization table
                    let balance = financedAmount;
                    const tableData = [];
                    const graphData = [];
                    let totalInterest = 0;
                    let totalPayment = 0;
                    for (let i = 1; i <= n; i++) {
                        const interest = balance * periodicRate;
                        const principal = payment - interest;
                        balance -= principal;
                        totalInterest += interest;
                        totalPayment += payment;
                        tableData.push({
                            period: i,
                            payment: payment,
                            principal: principal,
                            interest: interest,
                            balance: Math.max(balance, 0)
                        });
                        graphData.push({ period: i, balance: Math.max(balance, 0) });
                    }

                    return {
                        mainText: `Payment per Period: $${payment.toFixed(2)} | Total Interest: $${totalInterest.toFixed(2)} | Total Payment: $${totalPayment.toFixed(2)}`,
                        tableData,
                        graphData
                    };
                }
            },
            {
                id: 'mobile-home-loan',
                name: 'Mobile Home Loan Calculator',
                description: 'Calculate mobile home loan payments, interest, and payoff schedule',
                icon: 'HomeIcon',
                supportsGraph: true,
                supportsTable: true,
                inputs: [
                    { id: 'homePrice', label: 'Home Price ($)', type: 'number', required: true },
                    { id: 'downPayment', label: 'Down Payment ($)', type: 'number', required: false },
                    { id: 'loanTerm', label: 'Loan Term (years)', type: 'number', required: true },
                    { id: 'interestRate', label: 'Interest Rate (% APR)', type: 'number', required: true },
                    { id: 'compounding', label: 'Compounding Frequency', type: 'select', options: ['Monthly', 'Quarterly', 'Annually'], required: false, default: 'Monthly' },
                    { id: 'paymentFrequency', label: 'Payment Frequency', type: 'select', options: ['Monthly', 'Quarterly', 'Annually'], required: false, default: 'Monthly' },
                    { id: 'fees', label: 'Title, Registration, and Other Fees ($)', type: 'number', required: false },
                    { id: 'salesTax', label: 'Sales Tax (%)', type: 'number', required: false },
                    { id: 'includeTaxesFees', label: 'Include taxes and fees in loan', type: 'checkbox', required: false }
                ],
                calculate: (inputs) => {
                    const homePrice = Number(inputs.homePrice) || 0;
                    const downPayment = Number(inputs.downPayment) || 0;
                    const loanTermYears = Number(inputs.loanTerm) || 0;
                    const interestRate = Number(inputs.interestRate) || 0;
                    const compounding = inputs.compounding || 'Monthly';
                    const paymentFrequency = inputs.paymentFrequency || 'Monthly';
                    const fees = Number(inputs.fees) || 0;
                    const salesTax = Number(inputs.salesTax) || 0;
                    const includeTaxesFees = !!inputs.includeTaxesFees;

                    // Calculate loan amount
                    let loanAmount = homePrice - downPayment;
                    // Calculate sales tax
                    const taxAmount = salesTax > 0 ? (homePrice - downPayment) * (salesTax / 100) : 0;
                    // Add fees/taxes if included
                    let financedAmount = loanAmount;
                    if (includeTaxesFees) {
                        financedAmount += fees + taxAmount;
                    }

                    // Determine periods per year
                    const freqMap = { 'Monthly': 12, 'Quarterly': 4, 'Annually': 1 };
                    const periodsPerYear = freqMap[paymentFrequency] || 12;
                    const compoundingPerYear = freqMap[compounding] || 12;
                    const n = loanTermYears * periodsPerYear;

                    // Adjust interest rate for compounding/payment frequency
                    let periodicRate = 0;
                    if (compoundingPerYear === periodsPerYear) {
                        periodicRate = interestRate / 100 / periodsPerYear;
                    } else {
                        // Convert APR to effective rate for payment period
                        periodicRate = Math.pow(1 + interestRate / 100 / compoundingPerYear, compoundingPerYear / periodsPerYear) - 1;
                    }

                    // Payment calculation (standard amortization)
                    let payment = 0;
                    if (periodicRate > 0) {
                        payment = (financedAmount * periodicRate * Math.pow(1 + periodicRate, n)) /
                            (Math.pow(1 + periodicRate, n) - 1);
                    } else {
                        payment = financedAmount / n;
                    }

                    // Amortization table
                    let balance = financedAmount;
                    const tableData = [];
                    const graphData = [];
                    let totalInterest = 0;
                    let totalPayment = 0;
                    for (let i = 1; i <= n; i++) {
                        const interest = balance * periodicRate;
                        const principal = payment - interest;
                        balance -= principal;
                        totalInterest += interest;
                        totalPayment += payment;
                        tableData.push({
                            period: i,
                            payment: payment,
                            principal: principal,
                            interest: interest,
                            balance: Math.max(balance, 0)
                        });
                        graphData.push({ period: i, balance: Math.max(balance, 0) });
                    }

                    return {
                        mainText: `Payment per Period: $${payment.toFixed(2)} | Total Interest: $${totalInterest.toFixed(2)} | Total Payment: $${totalPayment.toFixed(2)}`,
                        tableData,
                        graphData
                    };
                }
            },
            {
                id: 'future-value',
                name: 'Future Value Calculator',
                description: 'Calculate the future value of investments or savings with optional regular contributions',
                icon: 'ChartPieIcon',
                supportsGraph: true,
                supportsTable: true,
                inputs: [
                    { id: 'presentValue', label: 'Present Value ($)', type: 'number', required: true },
                    { id: 'interestRate', label: 'Interest Rate (% APR)', type: 'number', required: true },
                    { id: 'years', label: 'Number of Years', type: 'number', required: true },
                    { id: 'compounding', label: 'Compounding Frequency', type: 'select', options: ['Annually', 'Semi-annually', 'Quarterly', 'Monthly'], required: false, default: 'Annually' },
                    { id: 'payment', label: 'Payment per Period ($)', type: 'number', required: false },
                    { id: 'paymentTiming', label: 'Payment Timing', type: 'select', options: ['End', 'Beginning'], required: false, default: 'End' }
                ],
                calculate: (inputs) => {
                    const presentValue = Number(inputs.presentValue) || 0;
                    const interestRate = Number(inputs.interestRate) || 0;
                    const years = Number(inputs.years) || 0;
                    const compounding = inputs.compounding || 'Annually';
                    const payment = Number(inputs.payment) || 0;
                    const paymentTiming = inputs.paymentTiming || 'End';

                    // Compounding periods per year
                    const freqMap = { 'Annually': 1, 'Semi-annually': 2, 'Quarterly': 4, 'Monthly': 12 };
                    const n = freqMap[compounding] || 1;
                    const totalPeriods = years * n;
                    const r = interestRate / 100 / n;

                    // Future value calculation
                    let fv = presentValue * Math.pow(1 + r, totalPeriods);
                    if (payment > 0) {
                        // If payment at beginning, multiply by (1 + r)
                        const factor = paymentTiming === 'Beginning' ? (1 + r) : 1;
                        fv += payment * factor * (Math.pow(1 + r, totalPeriods) - 1) / r;
                    }

                    // Table and graph data
                    const tableData = [];
                    const graphData = [];
                    let runningValue = presentValue;
                    for (let i = 1; i <= totalPeriods; i++) {
                        if (payment > 0 && paymentTiming === 'Beginning') {
                            runningValue += payment;
                        }
                        runningValue *= (1 + r);
                        if (payment > 0 && paymentTiming === 'End') {
                            runningValue += payment;
                        }
                        tableData.push({
                            period: i,
                            value: runningValue
                        });
                        graphData.push({ period: i, value: runningValue });
                    }

                    return {
                        mainText: `Future Value: $${fv.toFixed(2)}`,
                        tableData,
                        graphData
                    };
                }
            },
            {
                id: 'copart-fee',
                name: 'Copart Fee Calculator',
                description: 'Calculate Copart auction fees and total costs',
                icon: 'TagIcon',
                supportsTable: true,
                inputs: [
                    { id: 'purchasePrice', label: 'Purchase price', type: 'number', required: true },
                    { id: 'licenseType', label: 'License type', type: 'select', options: ['Non-licensed', 'Licensed'], required: true },
                    { id: 'tier', label: 'Tier', type: 'select', options: ['Less', 'More'], required: false, dependsOn: { licenseType: 'Licensed' } },
                    { id: 'vehicleType', label: 'Vehicle type', type: 'select', options: ['Standard', 'Heavy'], required: true },
                    { id: 'titleType', label: 'Title type', type: 'select', options: ['Clean', 'Non-clean'], required: true },
                    { id: 'paymentMethod', label: 'Payment method', type: 'select', options: ['Secured', 'Unsecured', 'Copart-affiliated third party financing'], required: true },
                    { id: 'bidType', label: 'Bid type', type: 'select', options: ['Pre-bid', 'Live'], required: true },
                    { id: 'copartStorageFee', label: 'Copart storage fee', type: 'number', required: false, help: "Storage rates vary by location. Check Copart's locations page and fill in the correct storage fee." },
                    { id: 'latePayment', label: 'Late payment?', type: 'select', options: ['No', 'Yes'], required: true },
                    { id: 'salesTax', label: 'Sales tax (%)', type: 'number', required: false },
                    { id: 'otherGovFees', label: 'Other government fees', type: 'number', required: false, help: 'For all other government charges and fees such as Imposed Transaction, etc.' },
                    { id: 'usingBroker', label: 'Using a broker?', type: 'select', options: ['No', 'Yes'], required: true, help: 'Each state has different licensing requirements' },
                    { id: 'numBrokerFees', label: 'No. of broker fees', type: 'select', options: ['1', '2', '3', '4', '5'], required: false, dependsOn: { usingBroker: 'Yes' }, help: 'Transaction fee, broker fee, documentation fee, etc' },
                    // Broker fee fields (conditionally shown)
                    { id: 'brokerFee1Method', label: 'Broker fee 1 calculation method', type: 'select', options: ['$ Fixed amount', '% of purchase price'], required: false, dependsOn: { usingBroker: 'Yes', numBrokerFees: ['1', '2', '3', '4', '5'] } },
                    { id: 'brokerFee1Amount', label: 'Broker fee 1 amount', type: 'number', required: false, dependsOn: { usingBroker: 'Yes', numBrokerFees: ['1', '2', '3', '4', '5'] } },
                    { id: 'brokerFee2Method', label: 'Broker fee 2 calculation method', type: 'select', options: ['$ Fixed amount', '% of purchase price'], required: false, dependsOn: { usingBroker: 'Yes', numBrokerFees: ['2', '3', '4', '5'] } },
                    { id: 'brokerFee2Amount', label: 'Broker fee 2 amount', type: 'number', required: false, dependsOn: { usingBroker: 'Yes', numBrokerFees: ['2', '3', '4', '5'] } },
                    { id: 'brokerFee3Method', label: 'Broker fee 3 calculation method', type: 'select', options: ['$ Fixed amount', '% of purchase price'], required: false, dependsOn: { usingBroker: 'Yes', numBrokerFees: ['3', '4', '5'] } },
                    { id: 'brokerFee3Amount', label: 'Broker fee 3 amount', type: 'number', required: false, dependsOn: { usingBroker: 'Yes', numBrokerFees: ['3', '4', '5'] } },
                    { id: 'brokerFee4Method', label: 'Broker fee 4 calculation method', type: 'select', options: ['$ Fixed amount', '% of purchase price'], required: false, dependsOn: { usingBroker: 'Yes', numBrokerFees: ['4', '5'] } },
                    { id: 'brokerFee4Amount', label: 'Broker fee 4 amount', type: 'number', required: false, dependsOn: { usingBroker: 'Yes', numBrokerFees: ['4', '5'] } },
                    { id: 'brokerFee5Method', label: 'Broker fee 5 calculation method', type: 'select', options: ['$ Fixed amount', '% of purchase price'], required: false, dependsOn: { usingBroker: 'Yes', numBrokerFees: ['5'] } },
                    { id: 'brokerFee5Amount', label: 'Broker fee 5 amount', type: 'number', required: false, dependsOn: { usingBroker: 'Yes', numBrokerFees: ['5'] } },
                ],
            },
            {
                id: 'cash-back',
                name: 'Cash Back Calculator',
                description: 'Calculate cash back rewards and savings',
                icon: 'CurrencyDollarIcon',
                inputs: [
                    { id: 'purchaseAmount', label: 'Purchase Amount ($)', type: 'number', required: true },
                    { id: 'cashBackRate', label: 'Cash Back Rate (%)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { purchaseAmount, cashBackRate } = inputs;
                    const cashBack = purchaseAmount * (cashBackRate / 100);
                    return `Cash Back Amount: $${cashBack.toFixed(2)}`;
                }
            }
        ]
    },
    {
        id: 'health-fitness',
        name: 'Health & Fitness Calculators',
        description: 'Tools for health and fitness calculations',
        icon: 'HeartIcon',
        calculators: [
            {
                id: 'homa-ir',
                name: 'HOMA-IR Calculator',
                description: 'Calculate insulin resistance using HOMA-IR formula',
                icon: 'BeakerIcon',
                inputs: [
                    { id: 'fastingGlucose', label: 'Fasting Glucose (mg/dL)', type: 'number', required: true },
                    { id: 'fastingInsulin', label: 'Fasting Insulin (µU/mL)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { fastingGlucose, fastingInsulin } = inputs;
                    const homaIR = (fastingGlucose * fastingInsulin) / 405;
                    return `HOMA-IR Score: ${homaIR.toFixed(2)}`;
                }
            },
            {
                id: 'free-water-deficit',
                name: 'Free Water Deficit Calculator',
                description: 'Calculate free water deficit in the body',
                icon: 'BeakerIcon',
                inputs: [
                    { id: 'waterWeight', label: 'Weight (kg)', type: 'number', required: true },
                    { id: 'sodium', label: 'Serum Sodium (mEq/L)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { waterWeight, sodium } = inputs;
                    const waterDeficit = waterWeight * 0.6 * (1 - (140 / sodium));
                    return `Free Water Deficit: ${waterDeficit.toFixed(2)} L`;
                }
            },
            {
                id: 'biking-calorie',
                name: 'Biking Calorie Calculator',
                description: 'Calculate calories burned while biking',
                icon: 'BoltIcon',
                inputs: [
                    { id: 'duration', label: 'Duration (minutes)', type: 'number', required: true },
                    { id: 'bikeWeight', label: 'Weight (kg)', type: 'number', required: true },
                    { id: 'intensity', label: 'Intensity Level', type: 'select', options: ['Light', 'Moderate', 'Vigorous'], required: true }
                ],
                calculate: (inputs) => {
                    const { duration, bikeWeight, intensity } = inputs;
                    const intensityMultiplier = { 'Light': 3, 'Moderate': 6, 'Vigorous': 10 };
                    const calories = duration * bikeWeight * intensityMultiplier[intensity] * 0.0175;
                    return `Calories Burned: ${calories.toFixed(0)} kcal`;
                }
            },
            {
                id: 'bicycle-calorie',
                name: 'Bicycle Calorie Calculator',
                description: 'Calculate calories burned while cycling',
                icon: 'BoltIcon',
                inputs: [
                    { id: 'duration', label: 'Duration (minutes)', type: 'number', required: true },
                    { id: 'bikeWeight', label: 'Weight (kg)', type: 'number', required: true },
                    { id: 'intensity', label: 'Intensity Level', type: 'select', options: ['Light', 'Moderate', 'Vigorous'], required: true }
                ],
                calculate: (inputs) => {
                    const { duration, bikeWeight, intensity } = inputs;
                    const intensityMultiplier = { 'Light': 3, 'Moderate': 6, 'Vigorous': 10 };
                    const calories = duration * bikeWeight * intensityMultiplier[intensity] * 0.0175;
                    return `Calories Burned: ${calories.toFixed(0)} kcal`;
                }
            },
            {
                id: 'starbucks-calorie',
                name: 'Starbucks Calorie Calculator',
                description: 'Calculate calories in Starbucks drinks',
                icon: 'FireIcon',
                inputs: [
                    { id: 'drinkSize', label: 'Drink Size', type: 'select', options: ['Tall', 'Grande', 'Venti'], required: true },
                    { id: 'drinkType', label: 'Drink Type', type: 'select', options: ['Latte', 'Cappuccino', 'Americano'], required: true }
                ],
                calculate: (inputs) => {
                    const { drinkSize, drinkType } = inputs;
                    const calorieMap = {
                        'Tall': { 'Latte': 150, 'Cappuccino': 120, 'Americano': 10 },
                        'Grande': { 'Latte': 190, 'Cappuccino': 150, 'Americano': 15 },
                        'Venti': { 'Latte': 250, 'Cappuccino': 190, 'Americano': 20 }
                    };
                    return `Calories: ${calorieMap[drinkSize][drinkType]} kcal`;
                }
            }
        ]
    },
    {
        id: 'math',
        name: 'Math Calculators',
        description: 'Tools for mathematical calculations',
        icon: 'CalculatorIcon',
        calculators: [
            {
                id: 'quadrilateral-area',
                name: 'Area Calculator for Quadrilateral',
                description: 'Calculate area of quadrilateral shapes',
                icon: 'CubeIcon',
                inputs: [
                    { id: 'length', label: 'Length', type: 'number', required: true },
                    { id: 'width', label: 'Width', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { length, width } = inputs;
                    const quadArea = length * width;
                    return `Area: ${quadArea.toFixed(2)} square units`;
                }
            },
            {
                id: 'yard-area',
                name: 'Yard Area Calculator',
                description: 'Calculate area of yards and outdoor spaces',
                icon: 'HomeIcon',
                inputs: [
                    { id: 'yardLength', label: 'Length (feet)', type: 'number', required: true },
                    { id: 'yardWidth', label: 'Width (feet)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { yardLength, yardWidth } = inputs;
                    const yardArea = yardLength * yardWidth;
                    return `Yard Area: ${yardArea.toFixed(2)} square feet`;
                }
            },
            {
                id: 'power-weight-ratio',
                name: 'Power to Weight Ratio Calculator',
                description: 'Calculate power to weight ratio',
                icon: 'BoltIcon',
                inputs: [
                    { id: 'power', label: 'Power (W)', type: 'number', required: true },
                    { id: 'powerWeight', label: 'Weight (kg)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { power, powerWeight } = inputs;
                    const ratio = power / powerWeight;
                    return `Power to Weight Ratio: ${ratio.toFixed(2)}`;
                }
            }
        ]
    },
    {
        id: 'everyday-life',
        name: 'Everyday Life Calculators',
        description: 'Tools for daily life calculations',
        icon: 'CalendarIcon',
        calculators: [
            // AP score calculator
            // Infinite Campus grade calculator
            // Anniversary calculator
            // Half birthday calculator
            // Snowday calculator
            // Heater BTU calculator
        ]
    },
    {
        id: 'other',
        name: 'Other Calculators',
        description: 'Miscellaneous calculators',
        icon: 'GiftIcon',
        calculators: [
            // Blox Fruits trade calculator
            // Horse color calculator
            // asphalt calculator
        ]
    }
];

export const iconMap = {
    AcademicCapIcon,
    BanknotesIcon,
    HeartIcon,
    CalendarIcon,
    WrenchIcon,
    CalculatorIcon,
    ChartBarIcon,
    BeakerIcon,
    ScaleIcon,
    CurrencyDollarIcon,
    ClockIcon,
    UserGroupIcon,
    HomeIcon,
    TruckIcon,
    GlobeAltIcon,
    SunIcon,
    BoltIcon,
    CubeIcon,
    ChartPieIcon,
    DocumentTextIcon,
    ArrowPathIcon,
    FireIcon,
    BuildingOfficeIcon,
    GiftIcon,
    SparklesIcon,
    CloudIcon,
    TagIcon,
    PaintBrushIcon,
    WrenchScrewdriverIcon
};