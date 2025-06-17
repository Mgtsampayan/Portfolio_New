'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const contactDetails = [
    {
        icon: <Mail className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />,
        title: 'Email Us',
        subtitle: 'We’ll respond within 24 hours',
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
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14...z" />
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
                <path d="M12 0c-6.626 0-12 5.373-12 12...z" />
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
        <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Get in Touch</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Have questions about GesSain? We&apos;re here to help. Reach out to us and we&apos;ll respond as soon as possible.
                    </p>
                </div>

                {success && (
                    <div className="mt-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md text-center">
                        Thank you for your message! We&apos;ll get back to you soon.
                    </div>
                )}

                <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {contactDetails.map(({ icon, title, subtitle, link, display }, i) => (
                        <div
                            key={i}
                            className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg dark:hover:shadow-xl transition-shadow duration-200 p-6"
                        >
                            <div className="flex items-center mb-4">
                                {icon}
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
                                    <p className="text-gray-500 dark:text-gray-300">{subtitle}</p>
                                </div>
                            </div>
                            <a href={link} className="text-indigo-600 dark:text-indigo-400 hover:underline text-base">
                                {display}
                            </a>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-white dark:bg-gray-700 rounded-lg shadow-md border dark:border-gray-700">
                    <div className="px-6 py-10 sm:px-10">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">Send us a message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <Input name="first-name" label="First Name" />
                                <Input name="last-name" label="Last Name" />
                            </div>
                            <Input name="email" label="Email" type="email" />
                            <Textarea name="message" label="Message" />
                            <div>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="inline-flex justify-center py-3 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                >
                                    {submitting ? 'Submitting...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Input({ name, label, type = 'text' }: { name: string; label: string; type?: string }) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder="Coming Soon"
                className="mt-1 py-3 px-4 block w-full rounded-md shadow-sm border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
        </div>
    );
}

function Textarea({ name, label }: { name: string; label: string }) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>
            <textarea
                id={name}
                name={name}
                rows={4}
                placeholder="Coming Soon"
                className="mt-1 py-3 px-4 block w-full rounded-md shadow-sm border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
        </div>
    );
}
