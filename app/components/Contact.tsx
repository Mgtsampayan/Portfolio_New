'use client'

import { useState } from 'react';
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

    const handleSuccess = () => {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 5000);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setFieldErrors({});

        const form = e.currentTarget;

        // Simulate form submission delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        form.reset();
        handleSuccess();
        setIsSubmitting(false);
    };

    return (
        <section id="contact" className="bg-white dark:bg-gray-800 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                        Get in Touch
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Have questions about GesSain? We&apos;re here to help. Reach out to us and we&apos;ll respond as soon as possible.
                    </p>
                </div>

                {/* Success Message */}
                {showSuccessMessage && (
                    <div className="mt-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md text-center">
                        Thank you for your message! We&apos;ll get back to you soon.
                    </div>
                )}

                {/* Contact Info Cards */}
                <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Email Contact Card */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg dark:hover:shadow-xl transition-shadow duration-200">
                        <div className="px-6 py-8">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Mail className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                        Email Us
                                    </h3>
                                    <p className="mt-1 text-gray-500 dark:text-gray-300">
                                        We&apos;ll respond within 24 hours
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 text-base text-gray-700 dark:text-gray-300">
                                <a
                                    href="mailto:gemuel20sampayan@gmail.com"
                                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                >
                                    gemuel20sampayan@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Phone Contact Card */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg dark:hover:shadow-xl transition-shadow duration-200">
                        <div className="px-6 py-8">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Phone className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                        Call Us
                                    </h3>
                                    <p className="mt-1 text-gray-500 dark:text-gray-300">
                                        Mon-Fri from 8am to 5pm
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 text-base text-gray-700 dark:text-gray-300">
                                <a
                                    href="tel:+639150578028"
                                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                >
                                    +63(915-057-8028)
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Location Card */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg dark:hover:shadow-xl transition-shadow duration-200">
                        <div className="px-6 py-8">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <MapPin className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                        Visit On
                                    </h3>
                                    <p className="mt-1 text-gray-500 dark:text-gray-300">
                                        My Official Websites
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 text-base text-gray-700 dark:text-gray-300">
                                portfolio-using-next15.vercel.ap
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg dark:hover:shadow-xl transition-shadow duration-200">
                        <div className="px-6 py-8">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg
                                        className="h-8 w-8 text-indigo-500 dark:text-indigo-400"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                        LinkedIn
                                    </h3>
                                    <p className="mt-1 text-gray-500 dark:text-gray-300">
                                        Connect with me professionally
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 text-base text-gray-700 dark:text-gray-300">
                                <a
                                    href="https://www.linkedin.com/in/gemuel-sampayan-096711288/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                >
                                    Gemuel Sampayan
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* GitHub Card */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg dark:hover:shadow-xl transition-shadow duration-200">
                        <div className="px-6 py-8">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg
                                        className="h-8 w-8 text-indigo-500 dark:text-indigo-400"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                        GitHub
                                    </h3>
                                    <p className="mt-1 text-gray-500 dark:text-gray-300">
                                        Check out my projects
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 text-base text-gray-700 dark:text-gray-300">
                                <a
                                    href="https://github.com/Mgtsampayan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                >
                                    MGTSAMPAYAN
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="mt-16 bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="px-6 py-10 sm:px-10">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
                            Send us a message
                        </h3>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
                                <div>
                                    <label
                                        htmlFor="first-name"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        First name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            placeholder='Coming Soon'
                                            autoComplete="given-name"
                                            className={`py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border ${fieldErrors.firstName ? "border-red-300" : "border-gray-200"
                                                } dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white`}
                                        />
                                        {fieldErrors.firstName?.map((error) => (
                                            <p key={error} className="mt-1 text-sm text-red-600">
                                                {error}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="last-name"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Last name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            placeholder='Coming Soon'
                                            autoComplete="family-name"
                                            className={`py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border ${fieldErrors.lastName ? "border-red-300" : "border-gray-200"
                                                } dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white`}
                                        />
                                        {fieldErrors.lastName?.map((error) => (
                                            <p key={error} className="mt-1 text-sm text-red-600">
                                                {error}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder='Coming Soon'
                                        autoComplete="email"
                                        className={`py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border ${fieldErrors.email ? "border-red-300" : "border-gray-200"
                                            } dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white`}
                                    />
                                    {fieldErrors.email?.map((error) => (
                                        <p key={error} className="mt-1 text-sm text-red-600">
                                            {error}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Message
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder='Coming Soon'
                                        rows={4}
                                        className={`py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border ${fieldErrors.message ? "border-red-300" : "border-gray-200"
                                            } dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white`}
                                    />
                                    {fieldErrors.message?.map((error) => (
                                        <p key={error} className="mt-1 text-sm text-red-600">
                                            {error}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Submitting..." : "Send Message"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;