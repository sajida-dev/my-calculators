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
        id: 'education',
        name: 'Education Calculators',
        description: 'Calculators for students and academic purposes',
        icon: 'AcademicCapIcon',
        calculators: [
            {
                id: 'ap-score',
                name: 'AP Score Calculator',
                description: 'Calculate your AP exam scores and potential college credits',
                icon: 'DocumentTextIcon',
                inputs: [
                    {
                        id: 'subject', label: 'AP Subject', type: 'select',
                        options: ['AP Calculus', 'AP Physics', 'AP Chemistry', 'AP Biology'], required: true
                    },
                    { id: 'rawScore', label: 'Raw Score', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    // AP score calculation logic
                    return 'Score calculation coming soon';
                }
            },
            {
                id: 'infinite-campus-grade',
                name: 'Infinite Campus Grade Calculator',
                description: 'Calculate your grades and GPA using Infinite Campus format',
                icon: 'ChartBarIcon',
                inputs: [
                    { id: 'assignments', label: 'Number of Assignments', type: 'number', required: true },
                    { id: 'totalPoints', label: 'Total Points Earned', type: 'number', required: true },
                    { id: 'maxPoints', label: 'Maximum Possible Points', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { totalPoints, maxPoints } = inputs;
                    return (totalPoints / maxPoints) * 100;
                }
            }
        ]
    },
    {
        id: 'financial',
        name: 'Financial Calculators',
        description: 'Calculators for loans, investments, and financial planning',
        icon: 'BanknotesIcon',
        calculators: [
            {
                id: 'future-value',
                name: 'Future Value Calculator',
                description: 'Calculate the future value of investments',
                icon: 'ChartPieIcon',
                inputs: [
                    { id: 'presentValue', label: 'Present Value', type: 'number', required: true },
                    { id: 'interestRate', label: 'Interest Rate (%)', type: 'number', required: true },
                    { id: 'years', label: 'Number of Years', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { presentValue, interestRate, years } = inputs;
                    return presentValue * Math.pow(1 + interestRate / 100, years);
                }
            },
            {
                id: 'land-loan',
                name: 'Land Loan Calculator',
                description: 'Calculate land loan payments and interest',
                icon: 'HomeIcon',
                inputs: [
                    { id: 'loanAmount', label: 'Loan Amount', type: 'number', required: true },
                    { id: 'interestRate', label: 'Interest Rate (%)', type: 'number', required: true },
                    { id: 'term', label: 'Loan Term (years)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { loanAmount, interestRate, term } = inputs;
                    const monthlyRate = interestRate / 100 / 12;
                    const numberOfPayments = term * 12;
                    return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
                }
            },
            {
                id: 'car-payoff',
                name: 'Car Payoff Calculator',
                description: 'Calculate your car loan payoff amount and schedule',
                icon: 'TruckIcon',
                inputs: [
                    { id: 'loanAmount', label: 'Loan Amount', type: 'number', required: true },
                    { id: 'interestRate', label: 'Interest Rate (%)', type: 'number', required: true },
                    { id: 'term', label: 'Loan Term (months)', type: 'number', required: true },
                    { id: 'extraPayment', label: 'Extra Monthly Payment', type: 'number', required: false }
                ],
                calculate: (inputs) => {
                    // Car payoff calculation logic
                    return 'Payoff calculation coming soon';
                }
            }
        ]
    },
    {
        id: 'health',
        name: 'Health & Fitness Calculators',
        description: 'Calculators for health, fitness, and nutrition',
        icon: 'HeartIcon',
        calculators: [
            {
                id: 'bicycle-calorie',
                name: 'Bicycle Calorie Calculator',
                description: 'Calculate calories burned while cycling',
                icon: 'BoltIcon',
                inputs: [
                    { id: 'weight', label: 'Weight (kg)', type: 'number', required: true },
                    { id: 'duration', label: 'Duration (minutes)', type: 'number', required: true },
                    { id: 'speed', label: 'Average Speed (km/h)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { weight, duration, speed } = inputs;
                    return (weight * duration * speed * 0.1).toFixed(2);
                }
            },
            {
                id: 'starbucks-calorie',
                name: 'Starbucks Calorie Calculator',
                description: 'Calculate calories in your Starbucks drinks',
                icon: 'FireIcon',
                inputs: [
                    {
                        id: 'drink', label: 'Drink Type', type: 'select',
                        options: ['Latte', 'Cappuccino', 'Frappuccino', 'Americano'], required: true
                    },
                    {
                        id: 'size', label: 'Size', type: 'select',
                        options: ['Tall', 'Grande', 'Venti'], required: true
                    },
                    {
                        id: 'milk', label: 'Milk Type', type: 'select',
                        options: ['Whole', '2%', 'Non-fat', 'Almond'], required: true
                    }
                ],
                calculate: (inputs) => {
                    // Starbucks calorie calculation logic
                    return 'Calorie calculation coming soon';
                }
            },
            {
                id: 'homa-ir',
                name: 'HOMA-IR Calculator',
                description: 'Calculate insulin resistance using HOMA-IR formula',
                icon: 'BeakerIcon',
                inputs: [
                    { id: 'glucose', label: 'Fasting Glucose (mg/dL)', type: 'number', required: true },
                    { id: 'insulin', label: 'Fasting Insulin (µU/mL)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { glucose, insulin } = inputs;
                    return (glucose * insulin) / 405;
                }
            }
        ]
    },
    {
        id: 'lifestyle',
        name: 'Lifestyle Calculators',
        description: 'Calculators for daily life and special occasions',
        icon: 'CalendarIcon',
        calculators: [
            {
                id: 'anniversary',
                name: 'Anniversary Calculator',
                description: 'Calculate time until or since your anniversary',
                icon: 'GiftIcon',
                inputs: [
                    { id: 'date', label: 'Anniversary Date', type: 'date', required: true }
                ],
                calculate: (inputs) => {
                    const { date } = inputs;
                    const anniversary = new Date(date);
                    const today = new Date();
                    const diffTime = Math.abs(today - anniversary);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays;
                }
            },
            {
                id: 'half-birthday',
                name: 'Half Birthday Calculator',
                description: 'Calculate your half birthday date',
                icon: 'SparklesIcon',
                inputs: [
                    { id: 'birthdate', label: 'Birth Date', type: 'date', required: true }
                ],
                calculate: (inputs) => {
                    const { birthdate } = inputs;
                    const birth = new Date(birthdate);
                    const halfBirthday = new Date(birth);
                    halfBirthday.setMonth(birth.getMonth() + 6);
                    return halfBirthday.toLocaleDateString();
                }
            },
            {
                id: 'snowday',
                name: 'Snow Day Calculator',
                description: 'Calculate probability of a snow day',
                icon: 'CloudIcon',
                inputs: [
                    { id: 'temperature', label: 'Temperature (°F)', type: 'number', required: true },
                    { id: 'snowfall', label: 'Expected Snowfall (inches)', type: 'number', required: true },
                    { id: 'windSpeed', label: 'Wind Speed (mph)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    // Snow day probability calculation logic
                    return 'Probability calculation coming soon';
                }
            }
        ]
    },
    {
        id: 'specialty',
        name: 'Specialty Calculators',
        description: 'Specialized calculators for specific purposes',
        icon: 'WrenchIcon',
        calculators: [
            {
                id: 'copart-fee',
                name: 'Copart Fee Calculator',
                description: 'Calculate Copart auction fees and total costs',
                icon: 'TagIcon',
                inputs: [
                    { id: 'vehiclePrice', label: 'Vehicle Price', type: 'number', required: true },
                    { id: 'buyerFee', label: 'Buyer Fee (%)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { vehiclePrice, buyerFee } = inputs;
                    return vehiclePrice * (1 + buyerFee / 100);
                }
            },
            {
                id: 'horse-color',
                name: 'Horse Color Calculator',
                description: 'Calculate possible foal colors based on parent genetics',
                icon: 'PaintBrushIcon',
                inputs: [
                    {
                        id: 'sireColor', label: 'Sire Color', type: 'select',
                        options: ['Bay', 'Black', 'Chestnut', 'Gray'], required: true
                    },
                    {
                        id: 'damColor', label: 'Dam Color', type: 'select',
                        options: ['Bay', 'Black', 'Chestnut', 'Gray'], required: true
                    }
                ],
                calculate: (inputs) => {
                    // Horse color genetics calculation logic
                    return 'Color probability calculation coming soon';
                }
            },
            {
                id: 'blox-fruits-trade',
                name: 'Blox Fruits Trade Calculator',
                description: 'Calculate fair trade values in Blox Fruits',
                icon: 'ArrowPathIcon',
                inputs: [
                    {
                        id: 'item1', label: 'Your Item', type: 'select',
                        options: ['Fruit', 'Weapon', 'Accessory'], required: true
                    },
                    {
                        id: 'item2', label: 'Their Item', type: 'select',
                        options: ['Fruit', 'Weapon', 'Accessory'], required: true
                    }
                ],
                calculate: (inputs) => {
                    // Blox Fruits trade value calculation logic
                    return 'Trade value calculation coming soon';
                }
            },
            {
                id: 'water-deficit',
                name: 'Free Water Deficit Calculator',
                description: 'Calculate free water deficit in hypernatremia',
                icon: 'BeakerIcon',
                inputs: [
                    { id: 'weight', label: 'Weight (kg)', type: 'number', required: true },
                    { id: 'sodium', label: 'Serum Sodium (mEq/L)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { weight, sodium } = inputs;
                    return (weight * 0.6) * ((sodium / 140) - 1);
                }
            }
        ]
    }
];

export const iconMap = {
    'AcademicCapIcon': AcademicCapIcon,
    'BanknotesIcon': BanknotesIcon,
    'HeartIcon': HeartIcon,
    'CalendarIcon': CalendarIcon,
    'WrenchIcon': WrenchIcon,
    'CalculatorIcon': CalculatorIcon,
    'ChartBarIcon': ChartBarIcon,
    'BeakerIcon': BeakerIcon,
    'ScaleIcon': ScaleIcon,
    'CurrencyDollarIcon': CurrencyDollarIcon,
    'ClockIcon': ClockIcon,
    'UserGroupIcon': UserGroupIcon,
    'HomeIcon': HomeIcon,
    'TruckIcon': TruckIcon,
    'GlobeAltIcon': GlobeAltIcon,
    'SunIcon': SunIcon,
    'BoltIcon': BoltIcon,
    'CubeIcon': CubeIcon,
    'ChartPieIcon': ChartPieIcon,
    'DocumentTextIcon': DocumentTextIcon,
    'ArrowPathIcon': ArrowPathIcon,
    'FireIcon': FireIcon,
    'BuildingOfficeIcon': BuildingOfficeIcon,
    'GiftIcon': GiftIcon,
    'SparklesIcon': SparklesIcon,
    'CloudIcon': CloudIcon,
    'TagIcon': TagIcon,
    'PaintBrushIcon': PaintBrushIcon,
    'WrenchScrewdriverIcon': WrenchScrewdriverIcon
};
