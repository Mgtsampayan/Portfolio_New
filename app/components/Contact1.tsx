'use client';

import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

import { z } from 'zod';

const ContactFormSchema = z.object({
    firstName: z
        .string()
        .min(1, 'First name is required')
        .max(50, 'First name must be less than 50 characters')
        .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),

    lastName: z
        .string()
        .min(1, 'Last name is required')
        .max(50, 'Last name must be less than 50 characters')
        .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),

    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address')
        .max(100, 'Email must be less than 100 characters')
        .toLowerCase()
        .trim(),

    message: z
        .string()
        .min(10, 'Message must be at least 10 characters long')
        .max(2000, 'Message must be less than 2000 characters')
        .trim()
});

// Infer types from schema
type ContactFormData = z.infer<typeof ContactFormSchema>;

// Response interface
interface ContactResponse {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
    id?: string;
}

// Contact details array
const contactDetails = [
    {
        icon: <Mail className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />,
        title: 'Email Us',
        subtitle: 'I\'ll respond within 24 hours',
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
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
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
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
        title: 'GitHub',
        subtitle: 'Check out my projects',
        link: 'https://github.com/Mgtsampayan',
        display: 'MGTSAMPAYAN',
    },
];

export default function ContactPage() {
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [formData, setFormData] = useState<Partial<ContactFormData>>({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const sectionRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    // Intersection Observer for animations
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

        return () => {
            observer.disconnect();
        };
    }, []);

    // Clear messages after success
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    // Clear error after some time
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 8000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            message: ''
        });
        setFieldErrors({});
        setError(null);
        if (formRef.current) {
            formRef.current.reset();
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Reset previous states
        setSubmitting(true);
        setError(null);
        setFieldErrors({});

        try {
            const formData = new FormData(e.currentTarget);
            const rawData = {
                firstName: formData.get('firstName')?.toString().trim() || '',
                lastName: formData.get('lastName')?.toString().trim() || '',
                email: formData.get('email')?.toString().trim() || '',
                message: formData.get('message')?.toString().trim() || '',
            };

            // Client-side validation using Zod v4
            const validationResult = ContactFormSchema.safeParse(rawData);

            if (!validationResult.success) {
                const errors = validationResult.error.flatten().fieldErrors;
                setFieldErrors(errors);
                setError('Please correct the errors below and try again.');
                return;
            }

            // API call
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(validationResult.data),
            });

            // Handle non-JSON responses
            const contentType = response.headers.get('content-type');
            if (!contentType?.includes('application/json')) {
                throw new Error('Invalid response format from server');
            }

            const result: ContactResponse = await response.json();

            if (!response.ok) {
                if (response.status === 429) {
                    setError('Too many requests. Please wait a moment before trying again.');
                    return;
                }

                if (result.errors) {
                    setFieldErrors(result.errors);
                    setError('Please correct the errors below and try again.');
                } else {
                    setError(result.message || 'An error occurred. Please try again.');
                }
                return;
            }

            if (result.success) {
                resetForm();
                setSuccess(true);

                // Scroll to success message
                setTimeout(() => {
                    const successElement = document.querySelector('[data-success-message]');
                    if (successElement) {
                        successElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                }, 100);
            } else {
                setError(result.message || 'Failed to send message. Please try again.');
            }

        } catch (error) {
            console.error('Contact form submission error:', error);

            if (error instanceof Error) {
                if (error.name === 'TypeError' && error.message.includes('fetch')) {
                    setError('Network error. Please check your internet connection and try again.');
                } else if (error.message.includes('JSON')) {
                    setError('Server error. Please try again later.');
                } else {
                    setError('An unexpected error occurred. Please try again.');
                }
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className={`text-center transition-all duration-800 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
                    }`}>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                        Get in Touch
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Have questions about my work? I&apos;m here to help. Reach out and I&apos;ll respond as soon as possible.
                    </p>
                </div>

                {/* Success Message */}
                {success && (
                    <div
                        data-success-message
                        className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-lg text-center animate-fade-in-up flex items-center justify-center space-x-3 shadow-sm"
                    >
                        <CheckCircle className="h-6 w-6 animate-bounce-subtle flex-shrink-0" />
                        <div className="text-left">
                            <p className="font-semibold">Message sent successfully! 🚀</p>
                            <p className="text-sm mt-1">I&apos;ll get back to you within 24-48 hours.</p>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg text-center animate-fade-in-up flex items-center justify-center space-x-2">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Contact Cards Grid */}
                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {contactDetails.map(({ icon, title, subtitle, link, display }, i) => (
                        <div
                            key={`contact-${i}-${title}`}
                            className={`group bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 p-6 hover-lift relative overflow-hidden ${isVisible
                                ? 'animate-fade-in-up opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}
                            style={{
                                animationDelay: isVisible ? `${(i + 1) * 150}ms` : '0ms'
                            }}
                        >
                            <div className="flex items-center mb-4 relative z-10">
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
                                className="text-indigo-600 dark:text-indigo-400 hover:underline text-base font-medium transition-all duration-200 hover:text-indigo-700 dark:hover:text-indigo-300 relative z-10 break-all"
                                target={link.startsWith('http') ? '_blank' : undefined}
                                rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                aria-label={`${title}: ${display}`}
                            >
                                {display}
                            </a>

                            {/* Subtle background highlight */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    ))}
                </div>

                {/* Contact Form */}
                <div className={`mt-16 bg-white dark:bg-gray-700 rounded-lg shadow-lg border dark:border-gray-600 overflow-hidden transition-all duration-700 ${isVisible
                    ? 'animate-fade-in-up opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                    }`}
                    style={{
                        animationDelay: isVisible ? '800ms' : '0ms'
                    }}>
                    <div className="px-6 py-10 sm:px-10">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center space-x-3">
                            <span>Send me a message</span>
                            <div className="h-px bg-gradient-to-r from-indigo-500 to-purple-600 flex-1 ml-4"></div>
                        </h3>

                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="space-y-6"
                            noValidate
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <Input
                                    name="firstName"
                                    label="First Name"
                                    delay={0}
                                    errors={fieldErrors.firstName}
                                    required
                                    autoComplete="given-name"
                                    placeholder="Enter your first name"
                                />
                                <Input
                                    name="lastName"
                                    label="Last Name"
                                    delay={100}
                                    errors={fieldErrors.lastName}
                                    required
                                    autoComplete="family-name"
                                    placeholder="Enter your last name"
                                />
                            </div>
                            <Input
                                name="email"
                                label="Email Address"
                                type="email"
                                delay={200}
                                errors={fieldErrors.email}
                                required
                                autoComplete="email"
                                placeholder="your.email@example.com"
                            />
                            <Textarea
                                name="message"
                                label="Your Message"
                                delay={300}
                                errors={fieldErrors.message}
                                required
                                placeholder="Tell me about your project, question, or just say hello! I'd love to hear from you."
                            />

                            <div className="animate-fade-in-up animation-delay-400">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="group relative inline-flex justify-center py-3 px-8 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all duration-200 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 btn-animated min-w-[140px]"
                                    aria-describedby={submitting ? "submitting-status" : undefined}
                                >
                                    {submitting ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                            <span id="submitting-status">Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <svg
                                                className="ml-2 -mr-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                />
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

// Input Component with full error handling and accessibility
function Input({
    name,
    label,
    type = 'text',
    delay = 0,
    errors,
    required = false,
    autoComplete,
    placeholder = "Enter your information"
}: {
    name: string;
    label: string;
    type?: string;
    delay?: number;
    errors?: string[];
    required?: boolean;
    autoComplete?: string;
    placeholder?: string;
}) {
    const hasErrors = errors && errors.length > 0;
    const inputId = `${name}-input`;
    const errorId = `${name}-error`;

    return (
        <div
            className="animate-fade-in-up"
            style={{ animationDelay: `${delay}ms` }}
        >
            <label
                htmlFor={inputId}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
                {label} {required && <span className="text-red-500" aria-label="required">*</span>}
            </label>
            <input
                id={inputId}
                name={name}
                type={type}
                required={required}
                autoComplete={autoComplete}
                placeholder={placeholder}
                aria-invalid={hasErrors}
                aria-describedby={hasErrors ? errorId : undefined}
                className={`group mt-1 py-3 px-4 block w-full rounded-md shadow-sm border transition-all duration-200 ${hasErrors
                    ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-200 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300 dark:hover:border-indigo-400'
                    } dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-offset-0 outline-none`}
            />
            {hasErrors && (
                <div
                    id={errorId}
                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                    role="alert"
                    aria-live="polite"
                >
                    {errors.map((error, i) => (
                        <p key={`${name}-error-${i}`} className="flex items-center space-x-1">
                            <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                            <span>{error}</span>
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}

// Textarea Component with full error handling and accessibility
function Textarea({
    name,
    label,
    delay = 0,
    errors,
    required = false,
    placeholder = "Tell me about your project or question..."
}: {
    name: string;
    label: string;
    delay?: number;
    errors?: string[];
    required?: boolean;
    placeholder?: string;
}) {
    const hasErrors = errors && errors.length > 0;
    const textareaId = `${name}-textarea`;
    const errorId = `${name}-error`;

    return (
        <div
            className="animate-fade-in-up"
            style={{ animationDelay: `${delay}ms` }}
        >
            <label
                htmlFor={textareaId}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
                {label} {required && <span className="text-red-500" aria-label="required">*</span>}
            </label>
            <textarea
                id={textareaId}
                name={name}
                rows={4}
                required={required}
                placeholder={placeholder}
                aria-invalid={hasErrors}
                aria-describedby={hasErrors ? errorId : undefined}
                className={`mt-1 py-3 px-4 block w-full rounded-md shadow-sm border transition-all duration-200 resize-vertical min-h-[120px] max-h-[300px] ${hasErrors
                    ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-200 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300 dark:hover:border-indigo-400'
                    } dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-offset-0 outline-none`}
            />
            {hasErrors && (
                <div
                    id={errorId}
                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                    role="alert"
                    aria-live="polite"
                >
                    {errors.map((error, i) => (
                        <p key={`${name}-error-${i}`} className="flex items-center space-x-1">
                            <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                            <span>{error}</span>
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}