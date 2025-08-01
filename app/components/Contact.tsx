'use client';

import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

const contactDetails = [
    {
        icon: <Mail className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />,
        title: 'Email Us',
        subtitle: 'Well respond within 24 hours',
        link: 'mailto:gemuel20sampayan@gmail.com',
        display: 'gemuel20sampayan@gmail.com',
    },
    {
        icon: <Phone className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />,
        title: 'Call Us',
        subtitle: 'Mon-Fri from 8am to 5pm',
        link: 'tel:+639150578028',
        display: '+63(915-057-8028)',
    },
    {
        icon: <MapPin className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />,
        title: 'Visit On',
        subtitle: 'My Official Website',
        link: 'https://portfolio-using-nextjs15.vercel.app/',
        display: 'portfolio-using-nextjs15.vercel.app',
    },
    {
        icon: (
            <svg className="h-8 w-8 text-indigo-500 dark:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
        ),
        title: 'LinkedIn',
        subtitle: 'Connect with me professionally',
        link: 'https://www.linkedin.com/in/gemuel-sampayan-096711288/',
        display: 'Gemuel Sampayan',
    },
    {
        icon: (
            <svg className="h-8 w-8 text-indigo-500 dark:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
        ),
        title: 'GitHub',
        subtitle: 'Check out my projects',
        link: 'https://github.com/Mgtsampayan',
        display: 'MGTSAMPAYAN',
    },
];

export default function ContactPage() {
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        await new Promise((res) => setTimeout(res, 1000));
        e.currentTarget.reset();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
        setSubmitting(false);
    };

    return (
        <section ref={sectionRef} id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto">
                <div className={`text-center transition-all duration-800 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Get in Touch</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Have questions about GesSain? We&apos;re here to help. Reach out to us and we&apos;ll respond as soon as possible.
                    </p>
                </div>

                {/* Success Message with Animation */}
                {success && (
                    <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-md text-center animate-fade-in-up flex items-center justify-center space-x-2">
                        <CheckCircle className="h-5 w-5 animate-bounce-subtle" />
                        <span>Thank you for your message! We&apos;ll get back to you soon.</span>
                    </div>
                )}

                {/* Contact Cards Grid */}
                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {contactDetails.map(({ icon, title, subtitle, link, display }, i) => (
                        <div
                            key={i}
                            className={`group bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 p-6 hover-lift ${
                                isVisible 
                                    ? 'animate-fade-in-up opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-8'
                            }`}
                            style={{ 
                                animationDelay: isVisible ? `${(i + 1) * 150}ms` : '0ms' 
                            }}
                        >
                            <div className="flex items-center mb-4">
                                <div className="transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    {icon}
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                                        {title}
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-300 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors duration-200">
                                        {subtitle}
                                    </p>
                                </div>
                            </div>
                            <a 
                                href={link} 
                                className="text-indigo-600 dark:text-indigo-400 hover:underline text-base font-medium transition-all duration-200 hover:text-indigo-700 dark:hover:text-indigo-300"
                                target={link.startsWith('http') ? '_blank' : undefined}
                                rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            >
                                {display}
                            </a>
                            
                            {/* Subtle background highlight */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                        </div>
                    ))}
                </div>

                {/* Contact Form */}
                <div className={`mt-16 bg-white dark:bg-gray-700 rounded-lg shadow-lg border dark:border-gray-600 overflow-hidden transition-all duration-700 ${
                    isVisible 
                        ? 'animate-fade-in-up opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                    animationDelay: isVisible ? '800ms' : '0ms' 
                }}>
                    <div className="px-6 py-10 sm:px-10">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center space-x-3">
                            <span>Send us a message</span>
                            <div className="h-px bg-gradient-to-r from-indigo-500 to-purple-600 flex-1 ml-4"></div>
                        </h3>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <Input name="first-name" label="First Name" delay={0} />
                                <Input name="last-name" label="Last Name" delay={100} />
                            </div>
                            <Input name="email" label="Email" type="email" delay={200} />
                            <Textarea name="message" label="Message" delay={300} />
                            
                            <div className="animate-fade-in-up animation-delay-400">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="group relative inline-flex justify-center py-3 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all duration-200 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none btn-animated"
                                >
                                    {submitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <svg className="ml-2 -mr-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
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
                
                @keyframes bounce-subtle {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                
                .animate-bounce-subtle {
                    animation: bounce-subtle 2s ease-in-out infinite;
                }
                
                .hover-lift:hover {
                    transform: translateY(-4px);
                }
                
                .btn-animated::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.5s;
                }
                
                .btn-animated:hover::before {
                    left: 100%;
                }
            `}</style>
        </section>
    );
}

function Input({ name, label, type = 'text', delay = 0 }: { 
    name: string; 
    label: string; 
    type?: string; 
    delay?: number;
}) {
    return (
        <div 
            className="animate-fade-in-up"
            style={{ animationDelay: `${delay}ms` }}
        >
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder="Enter your information"
                className="group mt-1 py-3 px-4 block w-full rounded-md shadow-sm border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-300 dark:hover:border-indigo-400"
            />
        </div>
    );
}

function Textarea({ name, label, delay = 0 }: { 
    name: string; 
    label: string; 
    delay?: number;
}) {
    return (
        <div 
            className="animate-fade-in-up"
            style={{ animationDelay: `${delay}ms` }}
        >
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label}
            </label>
            <textarea
                id={name}
                name={name}
                rows={4}
                placeholder="Tell us about your project or question..."
                className="mt-1 py-3 px-4 block w-full rounded-md shadow-sm border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-300 dark:hover:border-indigo-400 resize-vertical"
            />
        </div>
    );
}