export default function AboutPage() {
    return (
        <main className="min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-blue-900 mb-4">About My Calculators</h1>
                <p className="text-gray-700 text-lg mb-8">
                    Welcome to <span className="font-semibold">My Calculators</span>! This website is designed for everyone—students, families, professionals, and anyone who needs quick, easy, and reliable answers. Whether you're planning your budget, checking your health, or just solving a math problem, our calculators are here to help you every day.
                </p>
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-blue-800 mb-2">Why Use My Calculators?</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 max-w-xl">
                        <li>Simple and easy to use—no confusing steps or jargon</li>
                        <li>Helpful for school, work, home, and life</li>
                        <li>Instant answers for your everyday questions</li>
                        <li>Works great on your phone, tablet, or computer</li>
                        <li>Always free and open for everyone</li>
                    </ul>
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-blue-800 mb-2">Terms of Use</h2>
                    <p className="text-gray-700 mb-4">
                        By using My Calculators, you agree to use our tools for personal, non-commercial purposes. We strive to provide accurate results, but all calculations are for informational purposes only. Always double-check important results and consult a professional for critical decisions.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 max-w-xl">
                        <li>Please do not use our calculators for any unlawful or harmful activities.</li>
                        <li>You are welcome to link to any calculator on our site.</li>
                        <li>We may update these terms at any time; please check back for changes.</li>
                    </ul>
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-blue-800 mb-2">Privacy Policy</h2>
                    <p className="text-gray-700 mb-4">
                        Your privacy is important to us. We do not require you to register or provide personal information to use our calculators.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 max-w-xl">
                        <li>We may use cookies to improve your experience and remember your preferences.</li>
                        <li>We do not share your personal information with third parties.</li>
                        <li>We may collect anonymous usage data to help us improve our services.</li>
                        <li>If you have any privacy concerns, please contact us.</li>
                    </ul>
                </div>
                <div className="text-gray-600 mt-8">
                    <p>
                        &copy; {new Date().getFullYear()} My Calculators. Made with care for you and your family.<br />
                        We hope our calculators make your day a little easier!
                    </p>
                </div>
            </div>
        </main>
    );
} 