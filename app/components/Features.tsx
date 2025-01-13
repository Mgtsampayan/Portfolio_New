import Image from 'next/image';
import Link from 'next/link';

const features = [
    {
        name: 'Accounting Website',
        description: 'A comprehensive accounting solution designed for businesses and individuals to effectively manage their finances and seamlessly handle transactions with partners worldwide',
        image: '/images/AccountingWebsite.png',
        link: 'https://accountingswebsite.vercel.app/',
    },
    {
        name: 'Olivarez College Portal',
        description: 'An educational portal for Olivarez College students and staff, with upgraded UI and UX, optimized for mobile devices to achieve approximately 40% mobilization.',
        image: '/images/OlivarezCollegePortal.png',
        link: 'https://olivarezcollege.vercel.app/',
    },
    {
        name: 'Under Development Project',
        description: 'An innovative new project currently in development: a Chat LLM powered by Gemini. Stay tuned for updates!',
        image: '/images/ChatWithGemini.png',
        link: 'https://chat-using-gemini.vercel.app/',
    },
    {
        name: 'Development is on Progress',
        description: 'Inventory Management Dashboard',
        image: '/images/UnderMaintenances.jpg',
        link: '#',
    },
];

const Features: React.FC = () => {
    return (
        <section id="features" className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
                        Projects
                    </h2>
                    <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                        My Featured Work
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
                        Explore my portfolio of successful projects and ongoing developments.
                    </p>
                </div>

                <div className="mt-20">
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="group relative">
                                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white dark:bg-gray-800 group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                    <Image
                                        src={feature.image}
                                        alt={feature.name}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                                    <Link href={feature.link} target="_blank" rel="noopener noreferrer">
                                        <span className="absolute inset-0" />
                                        {feature.name}
                                    </Link>
                                </h3>
                                <p className="text-base font-semibold text-gray-900 dark:text-white">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
