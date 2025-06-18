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
                description: 'Calculate your car loan payoff amount and schedule',
                icon: 'TruckIcon',
                inputs: [
                    { id: 'loanAmount', label: 'Loan Amount ($)', type: 'number', required: true },
                    { id: 'interestRate', label: 'Interest Rate (%)', type: 'number', required: true },
                    { id: 'loanTerm', label: 'Loan Term (years)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { loanAmount, interestRate, loanTerm } = inputs;
                    const monthlyRate = interestRate / 100 / 12;
                    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm * 12)) /
                        (Math.pow(1 + monthlyRate, loanTerm * 12) - 1);
                    return `Monthly Payment: $${monthlyPayment.toFixed(2)}`;
                }
            },
            {
                id: 'land-loan',
                name: 'Land Loan Calculator',
                description: 'Calculate land loan payments and interest',
                icon: 'HomeIcon',
                inputs: [
                    { id: 'landPrice', label: 'Land Price ($)', type: 'number', required: true },
                    { id: 'downPayment', label: 'Down Payment ($)', type: 'number', required: true },
                    { id: 'landInterestRate', label: 'Interest Rate (%)', type: 'number', required: true },
                    { id: 'landTerm', label: 'Loan Term (years)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { landPrice, downPayment, landInterestRate, landTerm } = inputs;
                    const landLoanAmount = landPrice - downPayment;
                    const landMonthlyRate = landInterestRate / 100 / 12;
                    const landMonthlyPayment = (landLoanAmount * landMonthlyRate * Math.pow(1 + landMonthlyRate, landTerm * 12)) /
                        (Math.pow(1 + landMonthlyRate, landTerm * 12) - 1);
                    return `Monthly Payment: $${landMonthlyPayment.toFixed(2)}`;
                }
            },
            {
                id: 'mobile-home-loan',
                name: 'Mobile Home Loan Calculator',
                description: 'Calculate mobile home loan payments and terms',
                icon: 'HomeIcon',
                inputs: [
                    { id: 'homePrice', label: 'Home Price ($)', type: 'number', required: true },
                    { id: 'homeDownPayment', label: 'Down Payment ($)', type: 'number', required: true },
                    { id: 'homeInterestRate', label: 'Interest Rate (%)', type: 'number', required: true },
                    { id: 'homeTerm', label: 'Loan Term (years)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { homePrice, homeDownPayment, homeInterestRate, homeTerm } = inputs;
                    const homeLoanAmount = homePrice - homeDownPayment;
                    const homeMonthlyRate = homeInterestRate / 100 / 12;
                    const homeMonthlyPayment = (homeLoanAmount * homeMonthlyRate * Math.pow(1 + homeMonthlyRate, homeTerm * 12)) /
                        (Math.pow(1 + homeMonthlyRate, homeTerm * 12) - 1);
                    return `Monthly Payment: $${homeMonthlyPayment.toFixed(2)}`;
                }
            },
            {
                id: 'future-value',
                name: 'Future Value Calculator',
                description: 'Calculate the future value of investments',
                icon: 'ChartPieIcon',
                inputs: [
                    { id: 'presentValue', label: 'Present Value ($)', type: 'number', required: true },
                    { id: 'futureInterestRate', label: 'Interest Rate (%)', type: 'number', required: true },
                    { id: 'futureYears', label: 'Number of Years', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { presentValue, futureInterestRate, futureYears } = inputs;
                    const futureValue = presentValue * Math.pow(1 + futureInterestRate / 100, futureYears);
                    return `Future Value: $${futureValue.toFixed(2)}`;
                }
            },
            {
                id: 'copart-fee',
                name: 'Copart Fee Calculator',
                description: 'Calculate Copart auction fees and total costs',
                icon: 'TagIcon',
                inputs: [
                    { id: 'bidAmount', label: 'Bid Amount ($)', type: 'number', required: true },
                    { id: 'buyerFee', label: 'Buyer Fee ($)', type: 'number', required: true },
                    { id: 'gatePass', label: 'Gate Pass ($)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { bidAmount, buyerFee, gatePass } = inputs;
                    const totalFee = Number(bidAmount) + Number(buyerFee) + Number(gatePass);
                    return `Total Cost: $${totalFee.toFixed(2)}`;
                }
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
                    return `Power to Weight Ratio: ${ratio.toFixed(2)} W/kg`;
                }
            },
            {
                id: 'playback-speed',
                name: 'Playback Speed Calculator',
                description: 'Calculate video and audio playback speeds',
                icon: 'ClockIcon',
                inputs: [
                    { id: 'originalDuration', label: 'Original Duration (minutes)', type: 'number', required: true },
                    { id: 'playbackSpeed', label: 'Playback Speed (x)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { originalDuration, playbackSpeed } = inputs;
                    const newDuration = originalDuration / playbackSpeed;
                    return `New Duration: ${newDuration.toFixed(2)} minutes`;
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
                description: 'Calculate AP exam scores and predictions',
                icon: 'DocumentTextIcon',
                inputs: [
                    { id: 'mcScore', label: 'Multiple Choice Score (%)', type: 'number', required: true },
                    { id: 'frqScore', label: 'Free Response Score (%)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { mcScore, frqScore } = inputs;
                    const apScore = (mcScore * 0.6) + (frqScore * 0.4);
                    return `AP Score: ${apScore.toFixed(1)}`;
                }
            },
            {
                id: 'infinite-campus-grade',
                name: 'Infinite Campus Grade Calculator',
                description: 'Calculate grades using Infinite Campus system',
                icon: 'ChartBarIcon',
                inputs: [
                    { id: 'assignments', label: 'Number of Assignments', type: 'number', required: true },
                    { id: 'weights', label: 'Weight per Assignment (%)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { assignments, weights } = inputs;
                    const weightedGrade = assignments * weights;
                    return `Final Grade: ${weightedGrade.toFixed(2)}%`;
                }
            },
            {
                id: 'anniversary',
                name: 'Anniversary Calculator',
                description: 'Calculate anniversary dates and milestones',
                icon: 'GiftIcon',
                inputs: [
                    { id: 'startDate', label: 'Start Date', type: 'date', required: true }
                ],
                calculate: (inputs) => {
                    const { startDate } = inputs;
                    const today = new Date();
                    const anniversary = new Date(startDate);
                    const anniversaryYears = today.getFullYear() - anniversary.getFullYear();
                    return `Years Together: ${anniversaryYears} years`;
                }
            },
            {
                id: 'half-birthday',
                name: 'Half Birthday Calculator',
                description: 'Calculate half birthday dates',
                icon: 'SparklesIcon',
                inputs: [
                    { id: 'birthDate', label: 'Birth Date', type: 'date', required: true }
                ],
                calculate: (inputs) => {
                    const { birthDate } = inputs;
                    const halfBirthday = new Date(birthDate);
                    halfBirthday.setMonth(halfBirthday.getMonth() + 6);
                    return `Half Birthday: ${halfBirthday.toLocaleDateString()}`;
                }
            },
            {
                id: 'snowday',
                name: 'Snowday Calculator',
                description: 'Calculate probability of snow days',
                icon: 'CloudIcon',
                inputs: [
                    { id: 'temperature', label: 'Temperature (°F)', type: 'number', required: true },
                    { id: 'precipitation', label: 'Precipitation (inches)', type: 'number', required: true },
                    { id: 'windSpeed', label: 'Wind Speed (mph)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { temperature, precipitation, windSpeed } = inputs;
                    const snowProbability = (temperature < 32 && precipitation > 0.1) ?
                        Math.min(100, (32 - temperature) * 10 + (precipitation * 50) + (windSpeed * 5)) : 0;
                    return `Snow Day Probability: ${snowProbability.toFixed(1)}%`;
                }
            },
            {
                id: 'heater-btu',
                name: 'Heater BTU Calculator',
                description: 'Calculate required BTU for heating spaces',
                icon: 'FireIcon',
                inputs: [
                    { id: 'roomSize', label: 'Room Size (sq ft)', type: 'number', required: true },
                    { id: 'insulation', label: 'Insulation Quality', type: 'select', options: ['Poor', 'Average', 'Good'], required: true },
                    { id: 'climate', label: 'Climate', type: 'select', options: ['Mild', 'Moderate', 'Cold'], required: true }
                ],
                calculate: (inputs) => {
                    const { roomSize, insulation, climate } = inputs;
                    const insulationMultiplier = { 'Poor': 1.2, 'Average': 1.0, 'Good': 0.8 };
                    const climateMultiplier = { 'Mild': 0.8, 'Moderate': 1.0, 'Cold': 1.2 };
                    const btu = roomSize * 20 * insulationMultiplier[insulation] * climateMultiplier[climate];
                    return `Required BTU: ${btu.toFixed(0)}`;
                }
            }
        ]
    },
    {
        id: 'other',
        name: 'Other Calculators',
        description: 'Miscellaneous calculation tools',
        icon: 'WrenchIcon',
        calculators: [
            {
                id: 'blox-fruits-trade',
                name: 'Blox Fruits Trade Calculator',
                description: 'Calculate Blox Fruits trading values',
                icon: 'ArrowPathIcon',
                inputs: [
                    { id: 'fruit1', label: 'Your Fruit', type: 'select', options: ['Dragon', 'Leopard', 'Mammoth'], required: true },
                    { id: 'fruit2', label: 'Their Fruit', type: 'select', options: ['Dragon', 'Leopard', 'Mammoth'], required: true }
                ],
                calculate: (inputs) => {
                    const { fruit1, fruit2 } = inputs;
                    const fruitValues = {
                        'Dragon': 3500000,
                        'Leopard': 3000000,
                        'Mammoth': 2500000
                    };
                    const tradeValue = Math.abs(fruitValues[fruit1] - fruitValues[fruit2]);
                    return `Trade Value Difference: ${tradeValue.toLocaleString()} Beli`;
                }
            },
            {
                id: 'horse-color',
                name: 'Horse Color Calculator',
                description: 'Calculate horse color genetics',
                icon: 'PaintBrushIcon',
                inputs: [
                    { id: 'baseColor', label: 'Base Color', type: 'select', options: ['Bay', 'Black', 'Chestnut', 'Gray'], required: true },
                    { id: 'pattern', label: 'Pattern', type: 'select', options: ['Solid', 'Tobiano', 'Overo', 'Appaloosa'], required: true }
                ],
                calculate: (inputs) => {
                    const { baseColor, pattern } = inputs;
                    return `Horse Color: ${baseColor} with ${pattern} pattern`;
                }
            },
            {
                id: 'asphalt',
                name: 'Asphalt Calculator',
                description: 'Calculate asphalt requirements for projects',
                icon: 'BuildingOfficeIcon',
                inputs: [
                    { id: 'asphaltArea', label: 'Area (sq ft)', type: 'number', required: true },
                    { id: 'thickness', label: 'Thickness (inches)', type: 'number', required: true }
                ],
                calculate: (inputs) => {
                    const { asphaltArea, thickness } = inputs;
                    const asphaltNeeded = asphaltArea * thickness * 145; // 145 lbs per cubic foot
                    return `Asphalt Needed: ${asphaltNeeded.toFixed(0)} lbs`;
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
