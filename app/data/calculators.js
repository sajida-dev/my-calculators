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
                calculate: (inputs) => {
                    const price = Number(inputs.purchasePrice) || 0;
                    const licenseType = inputs.licenseType || 'Non-licensed';
                    const tier = inputs.tier || 'Less';
                    const vehicleType = inputs.vehicleType || 'Standard';
                    const titleType = inputs.titleType || 'Clean';
                    const paymentMethod = inputs.paymentMethod || 'Secured';
                    const bidType = inputs.bidType || 'Pre-bid';
                    const copartStorageFee = Number(inputs.copartStorageFee) || 0;
                    const latePayment = inputs.latePayment === 'Yes';
                    const salesTax = Number(inputs.salesTax) || 0;
                    const otherGovFees = Number(inputs.otherGovFees) || 0;
                    const usingBroker = inputs.usingBroker === 'Yes';
                    const numBrokerFees = inputs.numBrokerFees || '1';
                    const brokerFee = usingBroker ? Number(inputs.brokerFee1Amount) || 0 : 0;

                    // Calculate fees based on license type and tier
                    const licenseFee = licenseType === 'Licensed' ? 100 : 0;
                    const tierFee = licenseType === 'Licensed' ? (tier === 'More' ? 50 : 0) : 0;

                    // Calculate fees based on vehicle type and title type
                    const vehicleFee = vehicleType === 'Heavy' ? 50 : 0;
                    const titleFee = titleType === 'Non-clean' ? 50 : 0;

                    // Calculate fees based on payment method
                    const paymentFee = paymentMethod === 'Unsecured' ? 50 : 0;

                    // Calculate fees based on bid type
                    const bidFee = bidType === 'Live' ? 50 : 0;

                    // Calculate fees based on storage fee
                    const storageFee = copartStorageFee > 0 ? copartStorageFee : 0;

                    // Calculate fees based on late payment
                    const latePaymentFee = latePayment ? 50 : 0;

                    // Calculate sales tax
                    const salesTaxAmount = salesTax > 0 ? price * (salesTax / 100) : 0;

                    // Calculate total fees
                    const totalFees = licenseFee + tierFee + vehicleFee + titleFee + paymentFee + bidFee + storageFee + latePaymentFee + brokerFee + otherGovFees;

                    // Calculate total price
                    const totalPrice = price + totalFees + salesTaxAmount;

                    // Calculate environmental fee
                    const environmentalFee = price * 0.05;

                    // Calculate third party finance fee
                    const thirdPartyFinanceFee = price * 0.03;

                    // Calculate virtual bid fee
                    const virtualBidFee = price * 0.02;

                    // Calculate gate fee
                    const gateFee = price * 0.01;

                    // 11. Result breakdown
                    const breakdown = [
                        { label: 'Sale price', value: price },
                        { label: 'Environmental fee', value: environmentalFee },
                        { label: 'Buyer fee', value: brokerFee },
                        { label: 'Virtual bid fee', value: virtualBidFee },
                        { label: 'Gate fee', value: gateFee },
                        { label: 'Storage fee', value: Number(copartStorageFee) || 0 },
                        { label: 'Third party finance fee', value: thirdPartyFinanceFee },
                        { label: 'Total Broker fee', value: brokerFee },
                        { label: 'Late payment fee', value: latePaymentFee },
                        { label: 'Sales tax', value: salesTaxAmount },
                        { label: 'Other government fees', value: Number(otherGovFees) || 0 }
                    ];
                    const pieLabels = breakdown.map(row => row.label);
                    const pieData = breakdown.map(row => row.value);
                    const graphData = {
                        type: 'pie',
                        labels: pieLabels,
                        datasets: [
                            { label: 'Fee Breakdown', data: pieData }
                        ]
                    };
                    return {
                        mainText: `Total price: $${totalPrice.toFixed(2)}`,
                        tableData: breakdown.map(row => ({ Fee: row.label, Amount: `$${row.value.toFixed(2)}` })),
                        graphData
                    };
                }
            },
            {
                id: 'cash-back',
                name: 'Cash Back vs. Low Interest Calculator',
                description: 'Compare which is better: a cash back rebate or a low interest rate offer on your car purchase.',
                icon: 'CurrencyDollarIcon',
                supportsTable: true,
                inputs: [
                    { id: 'autoPrice', label: 'Auto Price ($)', type: 'number', required: true },
                    { id: 'cashBackAmount', label: 'Cash Back Amount ($)', type: 'number', required: true },
                    { id: 'interestRateHigh', label: 'Interest Rate (High) %', type: 'number', required: true },
                    { id: 'interestRateLow', label: 'Interest Rate (Low) %', type: 'number', required: true },
                    { id: 'loanTerm', label: 'Loan Term (months)', type: 'number', required: true },
                    { id: 'downPayment', label: 'Down Payment ($)', type: 'number', required: false },
                    { id: 'tradeInValue', label: 'Trade-in Value ($)', type: 'number', required: false },
                    { id: 'salesTax', label: 'Sales Tax (%)', type: 'number', required: false },
                    { id: 'otherFees', label: 'Title, Registration, and Other Fees ($)', type: 'number', required: false },
                    { id: 'includeFeesInLoan', label: 'Include All Fees in Loan?', type: 'checkbox', required: false },
                ],
                calculate: (inputs) => {
                    const parse = (v) => Number(v) || 0;
                    const autoPrice = parse(inputs.autoPrice);
                    const cashBackAmount = parse(inputs.cashBackAmount);
                    const interestRateHigh = parse(inputs.interestRateHigh);
                    const interestRateLow = parse(inputs.interestRateLow);
                    const loanTerm = parse(inputs.loanTerm);
                    const downPayment = parse(inputs.downPayment);
                    const tradeInValue = parse(inputs.tradeInValue);
                    const salesTaxRate = parse(inputs.salesTax);
                    const otherFees = parse(inputs.otherFees);
                    const includeFeesInLoan = !!inputs.includeFeesInLoan;

                    // Helper: monthly payment formula
                    function monthlyPayment(P, r, n) {
                        if (r === 0) return P / n;
                        const monthlyRate = r / 100 / 12;
                        return (P * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
                    }

                    // Common values
                    const netPrice = autoPrice - tradeInValue;
                    const salesTax = salesTaxRate > 0 ? netPrice * (salesTaxRate / 100) : 0;
                    const upfrontPayment = downPayment + tradeInValue;
                    const totalFees = otherFees;

                    // --- Cash Back Offer ---
                    let loanAmountCashBack = netPrice - downPayment - cashBackAmount;
                    if (includeFeesInLoan) loanAmountCashBack += salesTax + totalFees;
                    const monthlyPayCashBack = monthlyPayment(loanAmountCashBack, interestRateHigh, loanTerm);
                    const totalLoanPaymentsCashBack = monthlyPayCashBack * loanTerm;
                    const totalLoanInterestCashBack = totalLoanPaymentsCashBack - loanAmountCashBack;
                    const totalCostCashBack = autoPrice + salesTax + totalFees + totalLoanInterestCashBack;

                    // --- Low Interest Offer ---
                    let loanAmountLow = netPrice - downPayment;
                    if (includeFeesInLoan) loanAmountLow += salesTax + totalFees;
                    const monthlyPayLow = monthlyPayment(loanAmountLow, interestRateLow, loanTerm);
                    const totalLoanPaymentsLow = monthlyPayLow * loanTerm;
                    const totalLoanInterestLow = totalLoanPaymentsLow - loanAmountLow;
                    const totalCostLow = autoPrice + salesTax + totalFees + totalLoanInterestLow;

                    // --- Which is better? ---
                    let better = '';
                    if (totalCostLow < totalCostCashBack) {
                        better = 'The Low Interest Rate Offer is Better!';
                    } else if (totalCostLow > totalCostCashBack) {
                        better = 'The Cash Back Offer is Better!';
                    } else {
                        better = 'Both offers result in the same total cost.';
                    }

                    // --- Table Data ---
                    const tableData = [
                        {
                            'Offer': 'Cash Back',
                            'Loan Amount': `$${loanAmountCashBack.toFixed(2)}`,
                            'Monthly Pay': `$${monthlyPayCashBack.toFixed(2)}`,
                            'Total Loan Interest': `$${totalLoanInterestCashBack.toFixed(2)}`,
                            'Total Cost': `$${totalCostCashBack.toFixed(2)}`
                        },
                        {
                            'Offer': 'Low Interest',
                            'Loan Amount': `$${loanAmountLow.toFixed(2)}`,
                            'Monthly Pay': `$${monthlyPayLow.toFixed(2)}`,
                            'Total Loan Interest': `$${totalLoanInterestLow.toFixed(2)}`,
                            'Total Cost': `$${totalCostLow.toFixed(2)}`
                        }
                    ];

                    // Pie chart for cash back vs. total spend
                    const pieLabels = ['Cash Back', 'Total Cost (after cash back)'];
                    const pieData = [cashBackAmount, totalCostCashBack - cashBackAmount];
                    const graphData = {
                        type: 'pie',
                        labels: pieLabels,
                        datasets: [
                            { label: 'Cash Back Breakdown', data: pieData }
                        ]
                    };

                    return {
                        mainText: better,
                        tableData,
                        graphData
                    };
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
                supportsTable: true,
                inputs: [
                    { id: 'fastingGlucose', label: 'Fasting Glucose (mg/dL)', type: 'number', required: true },
                    { id: 'fastingInsulin', label: 'Fasting Insulin (µU/mL)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { fastingGlucose, fastingInsulin } = inputs;
                    const glucose = Number(fastingGlucose) || 0;
                    const insulin = Number(fastingInsulin) || 0;
                    const homaIR = glucose * insulin / 405;
                    const ranges = [
                        { min: -Infinity, max: 1.0, label: 'Insulin Sensitive' },
                        { min: 1.0, max: 3.0, label: 'Normal' },
                        { min: 3.0, max: 5.0, label: 'Early Insulin Resistance' },
                        { min: 5.0, max: Infinity, label: 'Significant Insulin Resistance' }
                    ];
                    let userRange = ranges.find(r => homaIR >= r.min && homaIR < r.max);
                    const tableData = ranges.map(r => ({
                        'HOMA-IR Score': r.max === Infinity ? `≥${r.min.toFixed(1)}` : `${r.min === -Infinity ? '<' : ''}${r.max.toFixed(1)}`,
                        'Interpretation': r.label,
                        'Your Result': userRange === r ? '⬅️' : ''
                    }));
                    const graphData = {
                        type: 'bar',
                        labels: ranges.map(r => r.label).concat('Your Value'),
                        datasets: [
                            { label: 'HOMA-IR', data: [0.8, 2.0, 4.0, 6.0, homaIR] }
                        ]
                    };
                    const explanation = 'HOMA-IR (Homeostatic Model Assessment of Insulin Resistance) estimates insulin resistance. Higher values suggest greater insulin resistance, which is a risk factor for metabolic syndrome and type 2 diabetes.';
                    return {
                        mainText: `HOMA-IR Score: ${homaIR.toFixed(2)}\n${explanation}`,
                        tableData,
                        graphData
                    };
                }
            },
            {
                id: 'free-water-deficit',
                name: 'Free Water Deficit Calculator',
                description: 'Calculate free water deficit in the body (hypernatremia correction)',
                icon: 'BeakerIcon',
                supportsTable: true,
                inputs: [
                    { id: 'waterWeight', label: 'Weight (kg)', type: 'number', required: true },
                    { id: 'sodium', label: 'Serum Sodium (mEq/L)', type: 'number', required: true },
                    { id: 'targetSodium', label: 'Target Sodium (mEq/L)', type: 'number', required: true, default: 140 },
                    { id: 'tbwFactor', label: 'Total Body Water Factor', type: 'select', options: ['0.6 (Adult male, default)', '0.5 (Adult female/elderly)', '0.7 (Children)'], required: true, default: '0.6 (Adult male, default)' }
                ],
                calculate: (inputs) => {
                    const weight = Number(inputs.waterWeight) || 0;
                    const na = Number(inputs.sodium) || 0;
                    const targetNa = Number(inputs.targetSodium) || 140;
                    let tbwFactor = 0.6;
                    if (inputs.tbwFactor && typeof inputs.tbwFactor === 'string') {
                        if (inputs.tbwFactor.startsWith('0.5')) tbwFactor = 0.5;
                        else if (inputs.tbwFactor.startsWith('0.7')) tbwFactor = 0.7;
                    }
                    const deficit = weight * tbwFactor * ((na / targetNa) - 1);
                    const ranges = [
                        { min: -Infinity, max: 0.5, label: 'Minimal/No deficit' },
                        { min: 0.5, max: 2.0, label: 'Mild to moderate deficit (monitor/replace)' },
                        { min: 2.0, max: Infinity, label: 'Significant deficit (consider urgent replacement)' }
                    ];
                    let userRange = ranges.find(r => deficit >= r.min && deficit < r.max);
                    const tableData = ranges.map(r => ({
                        'Free Water Deficit (L)': r.max === Infinity ? `>${r.min}` : `${r.min === -Infinity ? '<' : ''}${r.max}`,
                        'Interpretation / Suggested Action': r.label,
                        'Your Result': userRange === r ? '⬅️' : ''
                    }));
                    const graphData = {
                        type: 'bar',
                        labels: ranges.map(r => r.label).concat('Your Value'),
                        datasets: [
                            { label: 'Deficit (L)', data: [0.25, 1.0, 2.5, deficit] }
                        ]
                    };
                    const explanation = `Free water deficit estimates the volume of water needed to correct hypernatremia to a target sodium level.\n\nFormula: Deficit = Weight × TBW Factor × ((Serum Na / Target Na) - 1)\n- TBW Factor: 0.6 (adult male, default), 0.5 (adult female/elderly), 0.7 (children)\n\nDisclaimer: Calculations must be re-checked and should not be used alone to guide patient care, nor should they substitute for clinical judgment. See clinical guidelines for details.\nReference: https://www.mdcalc.com/calc/113/free-water-deficit-hypernatremia`;
                    return {
                        mainText: `Free Water Deficit: ${deficit.toFixed(2)} L\n${explanation}`,
                        tableData,
                        graphData
                    };
                }
            },
            {
                id: 'biking-calorie',
                name: 'Biking Calorie Calculator',
                description: 'Estimate calories burned while biking using MET values',
                icon: 'BoltIcon',
                supportsTable: true,
                inputs: [
                    { id: 'weight', label: 'Weight (kg)', type: 'number', required: true },
                    { id: 'duration', label: 'Duration (minutes)', type: 'number', required: true },
                    {
                        id: 'intensity', label: 'Intensity / Speed', type: 'select', required: true, options: [
                            'Leisurely (<16 km/h / <10 mph)',
                            'Moderate (16–19 km/h / 10–12 mph)',
                            'Vigorous (19–22 km/h / 12–14 mph)',
                            'Racing (>22 km/h / >14 mph)'
                        ]
                    }
                ],
                calculate: (inputs) => {
                    const weight = Number(inputs.weight) || 0;
                    const duration = Number(inputs.duration) || 0;
                    const intensity = inputs.intensity || '';
                    const metTable = {
                        'Leisurely (<16 km/h / <10 mph)': 4.0,
                        'Moderate (16–19 km/h / 10–12 mph)': 6.0,
                        'Vigorous (19–22 km/h / 12–14 mph)': 8.0,
                        'Racing (>22 km/h / >14 mph)': 10.0
                    };
                    const met = metTable[intensity] || 0;
                    const hours = duration / 60;
                    const calories = met * weight * hours;
                    const caloriesPerHour = met * weight;
                    const tableData = Object.entries(metTable).map(([label, value]) => ({
                        'Intensity / Speed': label,
                        'MET Value': value,
                        'Selected': label === intensity ? '⬅️' : ''
                    }));
                    const graphData = {
                        type: 'bar',
                        labels: Object.keys(metTable),
                        datasets: [
                            { label: 'Calories per Hour', data: Object.values(metTable).map(metVal => metVal * weight) }
                        ]
                    };
                    const explanation = `Calories burned = MET × Weight (kg) × Duration (hours)\nMET (Metabolic Equivalent of Task) is a standardized measure of exercise intensity.\nActual calories burned may vary based on age, fitness, terrain, and other factors.\nReference: https://www.calculator.net/calories-burned-calculator.html, https://runbundle.com/tools/cycling/cycling-calorie-calculator, https://www.omnicalculator.com/sports/calories-burned-biking#google_vignette`;
                    return {
                        mainText: `Calories Burned: ${calories.toFixed(0)} kcal\nCalories per hour: ${caloriesPerHour.toFixed(0)} kcal\n${explanation}`,
                        tableData,
                        graphData
                    };
                }
            },
            {
                id: 'bicycle-calorie',
                name: 'Bicycle Calorie Calculator',
                description: 'Estimate calories burned while cycling using MET values',
                icon: 'BoltIcon',
                supportsTable: true,
                inputs: [
                    { id: 'weight', label: 'Weight (kg)', type: 'number', required: true },
                    { id: 'duration', label: 'Duration (minutes)', type: 'number', required: true },
                    {
                        id: 'intensity', label: 'Intensity / Speed', type: 'select', required: true, options: [
                            'Leisurely (<16 km/h / <10 mph)',
                            'Moderate (16–19 km/h / 10–12 mph)',
                            'Vigorous (19–22 km/h / 12–14 mph)',
                            'Racing (>22 km/h / >14 mph)'
                        ]
                    }
                ],
                calculate: (inputs) => {
                    const weight = Number(inputs.weight) || 0;
                    const duration = Number(inputs.duration) || 0;
                    const intensity = inputs.intensity || '';
                    const metTable = {
                        'Leisurely (<16 km/h / <10 mph)': 4.0,
                        'Moderate (16–19 km/h / 10–12 mph)': 6.0,
                        'Vigorous (19–22 km/h / 12–14 mph)': 8.0,
                        'Racing (>22 km/h / >14 mph)': 10.0
                    };
                    const met = metTable[intensity] || 0;
                    const hours = duration / 60;
                    const calories = met * weight * hours;
                    const caloriesPerHour = met * weight;
                    const tableData = Object.entries(metTable).map(([label, value]) => ({
                        'Intensity / Speed': label,
                        'MET Value': value,
                        'Selected': label === intensity ? '⬅️' : ''
                    }));
                    const graphData = {
                        type: 'bar',
                        labels: Object.keys(metTable),
                        datasets: [
                            { label: 'Calories per Hour', data: Object.values(metTable).map(metVal => metVal * weight) }
                        ]
                    };
                    const explanation = `Calories burned = MET × Weight (kg) × Duration (hours)\nMET (Metabolic Equivalent of Task) is a standardized measure of exercise intensity.\nActual calories burned may vary based on age, fitness, terrain, and other factors.\nReference: https://www.calculator.net/calories-burned-calculator.html, https://runbundle.com/tools/cycling/cycling-calorie-calculator, https://www.omnicalculator.com/sports/calories-burned-biking#google_vignette`;
                    return {
                        mainText: `Calories Burned: ${calories.toFixed(0)} kcal\nCalories per hour: ${caloriesPerHour.toFixed(0)} kcal\n${explanation}`,
                        tableData,
                        graphData
                    };
                }
            },
            {
                id: 'starbucks-calorie',
                name: 'Starbucks Calorie Calculator',
                description: 'Calculate calories in Starbucks drinks',
                icon: 'FireIcon',
                supportsTable: true,
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
                    const calories = calorieMap[drinkSize]?.[drinkType] || 0;
                    const tableData = [];
                    Object.entries(calorieMap).forEach(([size, drinks]) => {
                        Object.entries(drinks).forEach(([type, cal]) => {
                            tableData.push({
                                'Drink Size': size,
                                'Drink Type': type,
                                'Calories': cal,
                                'Selected': (size === drinkSize && type === drinkType) ? '⬅️' : ''
                            });
                        });
                    });
                    const graphData = {
                        type: 'bar',
                        labels: tableData.map(row => `${row['Drink Size']} ${row['Drink Type']}`),
                        datasets: [
                            { label: 'Calories', data: tableData.map(row => row['Calories']) }
                        ]
                    };
                    const explanation = `Calories are approximate and based on standard recipes from Starbucks. Customizations (milk, syrups, etc.) will change the calorie count. Always check with Starbucks for the most accurate and up-to-date information. This calculator is for informational purposes only and should not be used as a substitute for professional dietary advice.`;
                    return {
                        mainText: `Calories: ${calories} kcal\n${explanation}`,
                        tableData,
                        graphData
                    };
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
                description: 'Calculate area of quadrilateral shapes (rectangle, square, parallelogram, rhombus, trapezoid)',
                icon: 'CubeIcon',
                supportsTable: true,
                inputs: [
                    { id: 'shape', label: 'Shape', type: 'select', required: true, options: ['Rectangle', 'Square', 'Parallelogram', 'Rhombus', 'Trapezoid'] },
                    { id: 'length', label: 'Length (a)', type: 'number', required: false },
                    { id: 'width', label: 'Width (b)', type: 'number', required: false },
                    { id: 'height', label: 'Height (h)', type: 'number', required: false },
                    { id: 'base1', label: 'Base 1 (a)', type: 'number', required: false },
                    { id: 'base2', label: 'Base 2 (b)', type: 'number', required: false },
                    { id: 'diagonal1', label: 'Diagonal 1 (d1)', type: 'number', required: false },
                    { id: 'diagonal2', label: 'Diagonal 2 (d2)', type: 'number', required: false },
                    { id: 'angle', label: 'Angle (degrees, for rhombus)', type: 'number', required: false }
                ],
                calculate: (inputs) => {
                    const shape = inputs.shape;
                    let area = 0;
                    let formula = '';
                    if (shape === 'Rectangle') {
                        const a = Number(inputs.length) || 0;
                        const b = Number(inputs.width) || 0;
                        area = a * b;
                        formula = 'Area = a × b';
                    } else if (shape === 'Square') {
                        const a = Number(inputs.length) || 0;
                        area = a * a;
                        formula = 'Area = a²';
                    } else if (shape === 'Parallelogram') {
                        const b = Number(inputs.base1) || 0;
                        const h = Number(inputs.height) || 0;
                        area = b * h;
                        formula = 'Area = base × height';
                    } else if (shape === 'Rhombus') {
                        const d1 = Number(inputs.diagonal1) || 0;
                        const d2 = Number(inputs.diagonal2) || 0;
                        area = (d1 * d2) / 2;
                        formula = 'Area = (d1 × d2) / 2';
                    } else if (shape === 'Trapezoid') {
                        const a = Number(inputs.base1) || 0;
                        const b = Number(inputs.base2) || 0;
                        const h = Number(inputs.height) || 0;
                        area = ((a + b) / 2) * h;
                        formula = 'Area = ((a + b) / 2) × h';
                    }
                    const tableData = [
                        { 'Shape': 'Rectangle', 'Formula': 'a × b', 'Description': 'Opposite sides equal, all angles 90°' },
                        { 'Shape': 'Square', 'Formula': 'a²', 'Description': 'All sides equal, all angles 90°' },
                        { 'Shape': 'Parallelogram', 'Formula': 'base × height', 'Description': 'Opposite sides equal, opposite angles equal' },
                        { 'Shape': 'Rhombus', 'Formula': '(d1 × d2) / 2', 'Description': 'All sides equal, opposite angles equal' },
                        { 'Shape': 'Trapezoid', 'Formula': '((a + b) / 2) × h', 'Description': 'One pair of parallel sides' }
                    ].map(row => ({ ...row, 'Selected': row.Shape === shape ? '⬅️' : '' }));
                    const graphData = {
                        type: 'bar',
                        labels: tableData.map(row => row.Shape).concat('Your Area'),
                        datasets: [
                            { label: 'Area (sq units)', data: [20, 25, 30, 15, 18, area] }
                        ]
                    };
                    const explanation = 'This calculator estimates the area of common quadrilaterals using standard formulas. Please double-check your inputs and results. For competition or academic use, always verify with trusted sources. This tool is for educational purposes and should not be used as the sole reference for critical calculations.';
                    return {
                        mainText: `Area: ${area.toFixed(2)} square units\nFormula used: ${formula}\n${explanation}`,
                        tableData,
                        graphData
                    };
                }
            },
            {
                id: 'yard-area',
                name: 'Yard Area Calculator',
                description: 'Calculate area of yards and outdoor spaces (rectangular or circular, feet or meters)',
                icon: 'HomeIcon',
                supportsTable: true,
                inputs: [
                    { id: 'shape', label: 'Yard Shape', type: 'select', required: true, options: ['Rectangle', 'Circle'] },
                    { id: 'unit', label: 'Unit', type: 'select', required: true, options: ['Feet', 'Meters'], default: 'Feet' },
                    { id: 'yardLength', label: 'Length (for rectangle)', type: 'number', required: false },
                    { id: 'yardWidth', label: 'Width (for rectangle)', type: 'number', required: false },
                    { id: 'yardRadius', label: 'Radius (for circle)', type: 'number', required: false }
                ],
                calculate: (inputs) => {
                    const shape = inputs.shape;
                    const unit = inputs.unit || 'Feet';
                    let area = 0;
                    let formula = '';
                    let unitLabel = unit === 'Feet' ? 'square feet' : 'square meters';
                    if (shape === 'Rectangle') {
                        const length = Number(inputs.yardLength) || 0;
                        const width = Number(inputs.yardWidth) || 0;
                        area = length * width;
                        formula = 'Area = length × width';
                    } else if (shape === 'Circle') {
                        const r = Number(inputs.yardRadius) || 0;
                        area = Math.PI * r * r;
                        formula = 'Area = π × radius²';
                    }
                    const tableData = [
                        { 'Shape': 'Rectangle', 'Example Size': '20 × 30', 'Area (sq ft)': 600, 'Area (sq m)': (600 * 0.092903).toFixed(2) },
                        { 'Shape': 'Rectangle', 'Example Size': '40 × 50', 'Area (sq ft)': 2000, 'Area (sq m)': (2000 * 0.092903).toFixed(2) },
                        { 'Shape': 'Circle', 'Example Size': 'Radius 10', 'Area (sq ft)': (Math.PI * 10 * 10).toFixed(2), 'Area (sq m)': (Math.PI * 10 * 10 * 0.092903).toFixed(2) },
                        { 'Shape': 'Circle', 'Example Size': 'Radius 20', 'Area (sq ft)': (Math.PI * 20 * 20).toFixed(2), 'Area (sq m)': (Math.PI * 20 * 20 * 0.092903).toFixed(2) }
                    ].map(row => ({ ...row, 'Selected': (row.Shape === shape) ? '⬅️' : '' }));
                    const graphData = {
                        type: 'bar',
                        labels: tableData.map(row => row['Example Size']).concat('Your Yard'),
                        datasets: [
                            { label: `Area (${unitLabel})`, data: tableData.map(row => Number(unit === 'Feet' ? row['Area (sq ft)'] : row['Area (sq m)'])).concat(area) }
                        ]
                    };
                    const explanation = 'This calculator estimates the area of rectangular or circular yards in feet or meters. Please double-check your inputs and results. For landscaping or construction, always verify with a professional. This tool is for educational purposes.';
                    return {
                        mainText: `Yard Area: ${area.toFixed(2)} ${unitLabel}\nFormula used: ${formula}\n${explanation}`,
                        tableData,
                        graphData
                    };
                }
            },
            {
                id: 'power-weight-ratio',
                name: 'Power to Weight Ratio Calculator',
                description: 'Calculate power to weight ratio (W/kg) and compare with common values',
                icon: 'BoltIcon',
                supportsTable: true,
                inputs: [
                    { id: 'power', label: 'Power (W)', type: 'number', required: true },
                    { id: 'powerWeight', label: 'Weight (kg)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const power = Number(inputs.power) || 0;
                    const weight = Number(inputs.powerWeight) || 0;
                    const ratio = weight > 0 ? power / weight : 0;
                    const tableData = [
                        { 'Example': 'Tour de France cyclist (peak sprint)', 'PWR (W/kg)': (1500 / 75).toFixed(2) },
                        { 'Example': 'Elite cyclist (1 hour)', 'PWR (W/kg)': (400 / 70).toFixed(2) },
                        { 'Example': 'Average cyclist', 'PWR (W/kg)': (200 / 75).toFixed(2) },
                        { 'Example': 'Sports car', 'PWR (W/kg)': (300000 / 1500).toFixed(2) },
                        { 'Example': 'Electric scooter', 'PWR (W/kg)': (350 / 15).toFixed(2) }
                    ];
                    const labels = tableData.map(row => row.Example).concat('Your Value');
                    const data = tableData.map(row => Number(row['PWR (W/kg)'])).concat(ratio);
                    const graphData = {
                        type: 'bar',
                        labels,
                        datasets: [
                            { label: 'PWR (W/kg)', data }
                        ]
                    };
                    const explanation = 'Power to weight ratio (PWR) is a key metric in cycling, motorsports, and engineering. Higher values indicate better acceleration and climbing ability. This calculator is for educational purposes. Always verify with trusted sources for competition or engineering use.';
                    return {
                        mainText: `Power to Weight Ratio: ${ratio.toFixed(2)} W/kg\n${explanation}`,
                        tableData: tableData.concat([{ 'Example': 'Your Value', 'PWR (W/kg)': ratio.toFixed(2), 'Selected': '⬅️' }]),
                        graphData
                    };
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
            {
                id: 'ap-score',
                name: 'AP Score Calculator',
                description: 'Estimate your AP exam score based on MCQ and FRQ sections',
                icon: 'AcademicCapIcon',
                supportsTable: false,
                inputs: [
                    { id: 'mcScore', label: 'MCQ Score', type: 'number', required: true },
                    { id: 'frqScore', label: 'FRQ Score', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const mc = Number(inputs.mcScore) || 0;
                    const frq = Number(inputs.frqScore) || 0;
                    const total = mc * 0.6 + frq * 0.4;
                    // Histogram for score distribution (sample data)
                    const bins = [1, 2, 3, 4, 5];
                    const distribution = [5, 15, 40, 30, 10]; // sample: % of students per score
                    const userBin = Math.max(1, Math.min(5, Math.round(total / 20))); // crude mapping
                    const graphData = {
                        type: 'bar',
                        labels: bins.map(b => `Score ${b}`),
                        datasets: [
                            { label: 'Distribution (%)', data: distribution },
                            { label: 'Your Score', data: bins.map(b => b === userBin ? 100 : 0) }
                        ]
                    };
                    const explanation = 'This calculator estimates your AP exam score based on typical MCQ and FRQ weightings. Actual scoring may vary by subject and year. Always check official College Board resources.';
                    return { mainText: `Estimated AP Score: ${total.toFixed(1)}\n${explanation}`, graphData };
                }
            },
            {
                id: 'infinite-campus-grade',
                name: 'Infinite Campus Grade Calculator',
                description: 'Calculate your weighted grade from assignments and weights',
                icon: 'ChartBarIcon',
                supportsTable: true,
                inputs: [
                    { id: 'assignments', label: 'Assignment Scores (comma separated)', type: 'text', required: true },
                    { id: 'weights', label: 'Assignment Weights (comma separated)', type: 'text', required: true }
                ],
                calculate: (inputs) => {
                    const scores = (inputs.assignments || '').split(',').map(Number);
                    const weights = (inputs.weights || '').split(',').map(Number);
                    const total = scores.reduce((acc, s, i) => acc + s * (weights[i] || 0), 0);
                    const weightSum = weights.reduce((a, b) => a + b, 0) || 1;
                    const grade = total / weightSum;
                    const tableData = scores.map((score, i) => ({
                        'Assignment': i + 1,
                        'Score': score,
                        'Weight': weights[i] || 0,
                        'Weighted Score': ((score * (weights[i] || 0))).toFixed(2)
                    }));
                    const graphData = {
                        type: 'bar',
                        labels: tableData.map(row => `A${row.Assignment}`),
                        datasets: [
                            { label: 'Weighted Score', data: tableData.map(row => Number(row['Weighted Score'])) }
                        ]
                    };
                    const explanation = 'This calculator estimates your weighted grade based on assignment scores and weights. Double-check your entries and consult your teacher or school portal for official grades.';
                    return { mainText: `Weighted Grade: ${grade.toFixed(2)}%\n${explanation}`, tableData, graphData };
                }
            },
            {
                id: 'anniversary',
                name: 'Anniversary Calculator',
                description: 'Calculate years together from a start date',
                icon: 'HeartIcon',
                supportsTable: false,
                inputs: [
                    { id: 'startDate', label: 'Start Date', type: 'date', required: true }
                ],
                calculate: (inputs) => {
                    const start = new Date(inputs.startDate);
                    const today = new Date();
                    let years = today.getFullYear() - start.getFullYear();
                    if (
                        today.getMonth() < start.getMonth() ||
                        (today.getMonth() === start.getMonth() && today.getDate() < start.getDate())
                    ) {
                        years--;
                    }
                    const explanation = 'This calculator finds the number of full years since your chosen start date. For special occasions, always double-check the date.';
                    return { mainText: `Years Together: ${years}\n${explanation}` };
                }
            },
            {
                id: 'half-birthday',
                name: 'Half Birthday Calculator',
                description: 'Find your next half birthday from your birth date',
                icon: 'CakeIcon',
                supportsTable: false,
                inputs: [
                    { id: 'birthDate', label: 'Birth Date', type: 'date', required: true }
                ],
                calculate: (inputs) => {
                    const birth = new Date(inputs.birthDate);
                    const halfBirthday = new Date(birth);
                    halfBirthday.setMonth(halfBirthday.getMonth() + 6);
                    const explanation = 'This calculator adds 6 months to your birth date to find your next half birthday. Always check the result for leap years or special cases.';
                    return { mainText: `Half Birthday: ${halfBirthday.toLocaleDateString()}\n${explanation}` };
                }
            },
            {
                id: 'snowday',
                name: 'Snowday Calculator',
                description: 'Estimate the probability of a snow day based on weather',
                icon: 'CloudIcon',
                supportsTable: false,
                inputs: [
                    { id: 'temperature', label: 'Temperature (°F)', type: 'number', required: true },
                    { id: 'precipitation', label: 'Precipitation (inches)', type: 'number', required: true },
                    { id: 'windSpeed', label: 'Wind Speed (mph)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const t = Number(inputs.temperature) || 0;
                    const p = Number(inputs.precipitation) || 0;
                    const w = Number(inputs.windSpeed) || 0;
                    const prob = (t < 32 && p > 0.1) ? Math.min(100, (32 - t) * 10 + p * 50 + w * 5) : 0;
                    const explanation = 'This calculator gives a rough estimate of snow day probability based on weather. Actual school closures depend on many factors. For fun and planning only!';
                    return { mainText: `Snow Day Probability: ${prob.toFixed(1)}%\n${explanation}` };
                }
            },
            {
                id: 'heater-btu',
                name: 'Heater BTU Calculator',
                description: 'Estimate required BTU for heating a room',
                icon: 'FireIcon',
                supportsTable: true,
                inputs: [
                    { id: 'roomSize', label: 'Room Size (sq ft)', type: 'number', required: true },
                    { id: 'insulation', label: 'Insulation Quality', type: 'select', options: ['Good', 'Poor'], required: true },
                    { id: 'climate', label: 'Climate', type: 'select', options: ['Mild', 'Cold'], required: true }
                ],
                calculate: (inputs) => {
                    const size = Number(inputs.roomSize) || 0;
                    const insulation = inputs.insulation === 'Good' ? 0.8 : 1;
                    const climate = inputs.climate === 'Cold' ? 1.2 : 1;
                    const btu = size * 20 * insulation * climate;
                    const tableData = [
                        { 'Room Size (sq ft)': 100, 'BTU (Mild)': 1600, 'BTU (Cold)': 1920 },
                        { 'Room Size (sq ft)': 250, 'BTU (Mild)': 4000, 'BTU (Cold)': 4800 },
                        { 'Room Size (sq ft)': 500, 'BTU (Mild)': 8000, 'BTU (Cold)': 9600 },
                        { 'Room Size (sq ft)': 1000, 'BTU (Mild)': 16000, 'BTU (Cold)': 19200 }
                    ];
                    const graphData = {
                        type: 'bar',
                        labels: tableData.map(row => `${row['Room Size (sq ft)']} sq ft`).concat('Your Room'),
                        datasets: [
                            { label: 'BTU (Mild)', data: tableData.map(row => row['BTU (Mild)']).concat(inputs.climate === 'Mild' ? btu : null) },
                            { label: 'BTU (Cold)', data: tableData.map(row => row['BTU (Cold)']).concat(inputs.climate === 'Cold' ? btu : null) }
                        ]
                    };
                    const explanation = 'This calculator estimates the BTU needed to heat a room based on size, insulation, and climate. Always consult a professional for large or complex spaces.';
                    return { mainText: `Required BTU: ${btu.toFixed(0)}\n${explanation}`, tableData, graphData };
                }
            }
        ]
    },
    {
        id: 'other',
        name: 'Other Calculators',
        description: 'Miscellaneous calculators',
        icon: 'GiftIcon',
        calculators: [
            {
                id: 'blox-fruits-trade',
                name: 'Blox Fruits Trade Calculator',
                description: 'Compare trade values for Blox Fruits game',
                icon: 'GiftIcon',
                supportsTable: false,
                inputs: [
                    { id: 'fruit1', label: 'Fruit 1', type: 'text', required: true },
                    { id: 'fruit2', label: 'Fruit 2', type: 'text', required: true }
                ],
                calculate: (inputs) => {
                    // Placeholder: In real use, lookup fruit values
                    const explanation = 'This calculator is for fun and helps compare two Blox Fruits by name. For real trade values, consult a current trading guide or community resource.';
                    return { mainText: `Trade Value Difference: (lookup not implemented)\n${explanation}` };
                }
            },
            {
                id: 'horse-color',
                name: 'Horse Color Calculator',
                description: 'Determine horse color based on genetics',
                icon: 'PaintBrushIcon',
                supportsTable: false,
                inputs: [
                    { id: 'baseColor', label: 'Base Color', type: 'text', required: true },
                    { id: 'pattern', label: 'Pattern', type: 'text', required: true }
                ],
                calculate: (inputs) => {
                    const explanation = 'This calculator combines base color and pattern for a fun horse color result. For genetic accuracy, consult a horse genetics resource.';
                    return { mainText: `Horse Color: ${inputs.baseColor} with ${inputs.pattern} pattern\n${explanation}` };
                }
            },
            {
                id: 'asphalt',
                name: 'Asphalt Calculator',
                description: 'Estimate asphalt needed for paving',
                icon: 'TruckIcon',
                supportsTable: true,
                inputs: [
                    { id: 'asphaltArea', label: 'Area (sq ft)', type: 'number', required: true },
                    { id: 'thickness', label: 'Thickness (ft)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const area = Number(inputs.asphaltArea) || 0;
                    const thickness = Number(inputs.thickness) || 0;
                    const asphaltNeeded = area * thickness * 145; // 145 lbs per cubic foot
                    const tableData = [
                        { 'Area (sq ft)': 100, 'Thickness (ft)': 0.1, 'Asphalt Needed (lbs)': (100 * 0.1 * 145).toFixed(0) },
                        { 'Area (sq ft)': 500, 'Thickness (ft)': 0.15, 'Asphalt Needed (lbs)': (500 * 0.15 * 145).toFixed(0) },
                        { 'Area (sq ft)': 1000, 'Thickness (ft)': 0.2, 'Asphalt Needed (lbs)': (1000 * 0.2 * 145).toFixed(0) }
                    ];
                    const graphData = {
                        type: 'bar',
                        labels: tableData.map(row => `${row['Area (sq ft)']} sq ft`).concat('Your Project'),
                        datasets: [
                            { label: 'Asphalt Needed (lbs)', data: tableData.map(row => Number(row['Asphalt Needed (lbs)'])).concat(asphaltNeeded) }
                        ]
                    };
                    const explanation = 'This calculator estimates the amount of asphalt needed for a given area and thickness. For construction, always consult a professional and local regulations.';
                    return { mainText: `Asphalt Needed: ${asphaltNeeded.toFixed(0)} lbs\n${explanation}`, tableData, graphData };
                }
            }
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

export function getCalculator(id) {
    return calculatorCategories.find(category => category.calculators.some(c => c.id === id));
}

export function getCalculatorById(id) {
    return calculatorCategories.flatMap(category => category.calculators).find(c => c.id === id);
}

export function getCalculatorCategory(id) {
    return calculatorCategories.find(category => category.calculators.some(c => c.id === id));
}

export function getCalculatorCategoryById(id) {
    return calculatorCategories.find(category => category.calculators.some(c => c.id === id));
}