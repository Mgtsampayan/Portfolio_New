import Image from 'next/image'
import Link from 'next/link'

const Hero: React.FC = () => {
    return (
        <section className="relative bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden pt-20">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">Effective Management of</span>{' '}
                                <span className="block text-indigo-600 dark:text-indigo-400 xl:inline">Large Projects</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                Streamline your project management with GesSain. Our platform helps you manage scope, budget, resources, and timelines effectively.
                            </p>
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <div className="rounded-md shadow">
                                    <Link
                                        href="#"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out"
                                    >
                                        Get started
                                    </Link>
                                </div>
                                <div className="mt-3 sm:mt-0 sm:ml-3">
                                    <Link
                                        href="#"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-200 dark:bg-indigo-800 dark:hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out"
                                    >
                                        Learn more
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            {/* <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 relative overflow-hidden"> Added relative for positioning */}
                <div className="absolute inset-0 bg-[#your_light_blue_hex] opacity-5 mix-blend-mode-soft-light" aria-hidden="true"> {/* Subtle overlay */}
                <Image
                    src="/images/freelancer.png"
                    alt="Sample project management illustration"
                    width={1920}
                    height={1080}
                    className="h-56 min-w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                    priority
                />
                </div>
            {/* </div> */}
        </section>
    )
}

export default Hero