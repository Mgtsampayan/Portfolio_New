const About: React.FC = () => {
    return (
        <section id="about" className="py-20 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">About Us</h2>
                    <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                        Why Developers Choose GesSain
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
                        GesSain is designed to streamline project management for developers and teams of all sizes.
                    </p>
                </div>

                <div className="mt-20">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        {[
                            {
                                name: 'Efficient Collaboration',
                                description: 'Our platform facilitates seamless communication and collaboration among team members, ensuring everyone stays on the same page throughout the project lifecycle.'
                            },
                            {
                                name: 'Powerful Analytics',
                                description: 'Gain valuable insights into your project\'s progress with our advanced analytics tools, helping you make data-driven decisions and optimize your workflow.'
                            },
                            {
                                name: 'Customizable Workflows',
                                description: 'Tailor GesSain to fit your team\'s unique processes and methodologies, ensuring a perfect fit for your development style.'
                            },
                            {
                                name: 'Seamless Integrations',
                                description: 'Integrate GesSain with your favorite development tools and services, creating a unified ecosystem for your projects.'
                            }
                        ].map((feature) => (
                            <div key={feature.name} className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 dark:bg-indigo-600 text-white">
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">{feature.name}</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    )
}

export default About