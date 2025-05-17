import { Check } from 'lucide-react'

const plans = [
    {
        name: 'Starter',
        price: 'Contact',
        description: 'Perfect for small teams and startups',
        features: [
            'Up to 5 team members',
            'Basic project management',
            '5GB storage',
            'Email support'
        ],
    },
    {
        name: 'Professional',
        price: '₱',
        description: 'Great for growing teams',
        features: [
            'Up to 20 team members',
            'Advanced project management',
            'Unlimited storage',
            'Priority email support',
            'API access'
        ],
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'For large-scale operations',
        features: [
            'Unlimited team members',
            'Custom features',
            'Dedicated account manager',
            '24/7 phone support',
            'On-premise deployment option'
        ],
    },
]

const Pricing: React.FC = () => {
    return (
        <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="sm:text-center">
                    <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">Pricing</h2>
                    <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                        Choose the right plan for your team
                    </p>
                    <p className="mt-4 text-xl text-gray-500 dark:text-gray-300 max-w-3xl mx-auto">
                        We offer flexible pricing options to suit teams of all sizes. All plans come with a 14-day free trial.
                    </p>
                </div>

                <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
                    {plans.map((plan) => (
                        <div key={plan.name} className="relative p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm flex flex-col">
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                                <p className="mt-4 flex items-baseline text-gray-900 dark:text-white">
                                    <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                                    {plan.price !== 'Custom' && <span className="ml-1 text-xl font-semibold">/month</span>}
                                </p>
                                <p className="mt-6 text-gray-500 dark:text-gray-300">{plan.description}</p>

                                <ul role="list" className="mt-6 space-y-6">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex">
                                            <Check className="flex-shrink-0 w-6 h-6 text-indigo-500 dark:text-indigo-400" aria-hidden="true" />
                                            <span className="ml-3 text-gray-500 dark:text-gray-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <a
                                href="#contact"
                                className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                                    plan.name === 'Professional'
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
                                        : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-gray-700 dark:text-indigo-400 dark:hover:bg-gray-600'
                                }`}
                            >
                                {plan.name === 'Enterprise' ? 'Contact Me' : 'Start your trial'}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Pricing

