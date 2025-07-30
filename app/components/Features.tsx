'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

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
        description: 'Inventory Management Dashboard with AWS',
        image: '/images/Maintainance.png',
        link: '#',
    },
    {
        name: 'UNDER DEVELOPMENT DEADLINE SEPTEMBER 2025',
        description: 'Design Ui For Dashboard For School Solutions System. Using NEXT.JS 15 with PostgreSQL, Docker.',
        image: '/images/ComingSoon.png',
        link: '#',
    }
];

const Features: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px',
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="features" className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center transition-all duration-800 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
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
                        {features.map((feature, index) => (
                            <div 
                                key={feature.name} 
                                className={`group relative transition-all duration-700 ${
                                    isVisible 
                                        ? 'animate-fade-in-up opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-8'
                                }`}
                                style={{ 
                                    animationDelay: isVisible ? `${index * 150}ms` : '0ms' 
                                }}
                            >
                                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white dark:bg-gray-800 group-hover:opacity-90 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                                    <Image
                                        src={feature.image}
                                        alt={feature.name}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="transition-transform duration-500 group-hover:scale-110"
                                    />
                                    
                                    {/* Overlay that appears on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                        <div className="text-white text-sm font-medium px-4 py-2 bg-indigo-600/90 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            View Project
                                        </div>
                                    </div>
                                </div>
                                
                                <h3 className="mt-6 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                                    <Link href={feature.link} target="_blank" rel="noopener noreferrer">
                                        <span className="absolute inset-0" />
                                        {feature.name}
                                    </Link>
                                </h3>
                                
                                <p className="text-base font-semibold text-gray-900 dark:text-white transition-colors duration-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

export default Features;