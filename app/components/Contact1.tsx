"use client";

import React, { useEffect, useRef, useState, JSX } from "react";
import { Mail, Phone, CheckCircle } from "lucide-react";

type FormState = {
    name: string;
    email: string;
    message: string;
};

type ApiSuccess = { ok: true; message: string };
type ApiError = { ok?: false; message: string; errors?: unknown };
type ApiResponse = ApiSuccess | ApiError;

const contactDetails = [
    {
        icon: <Mail className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />,
        title: "Email Us",
        subtitle: "We'll respond within 24 hours",
        link: "mailto:gemuel20sampayan@gmail.com",
        display: "gemuel20sampayan@gmail.com",
    },
    {
        icon: <Phone className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />,
        title: "Call Us",
        subtitle: "Mon - Fri, 9am - 4pm",
        link: "tel:+639171234567",
        display: "+63 905 157 8028",
    },
];

export default function Contact(): JSX.Element {
    const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
    const [clientErrors, setClientErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    function validate(payload: FormState) {
        const errors: Partial<Record<keyof FormState, string>> = {};
        if (!payload.name.trim()) errors.name = "Name is required";
        if (!payload.email.trim()) errors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) errors.email = "Invalid email";
        if (!payload.message.trim()) errors.message = "Message is required";
        return errors;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
        setClientErrors((prev) => ({ ...prev, [name]: undefined }));
        setStatus(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus(null);

        const errors = validate(form);
        setClientErrors(errors);
        if (Object.keys(errors).length > 0) return;

        setLoading(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data: ApiResponse = await res.json();

            if (!res.ok || !("ok" in data && data.ok === true)) {
                const message = data?.message ?? "Failed to send message";
                setStatus({ ok: false, message });
                return;
            }

            setStatus({ ok: true, message: data.message });
            setForm({ name: "", email: "", message: "" });
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Network error";
            setStatus({ ok: false, message: msg });
        } finally {
            if (mountedRef.current) setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* left: contact details */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Get in touch
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Fill out the form and we&apos;ll get back to you shortly.
                    </p>

                    <div className="grid grid-cols-1 gap-4">
                        {contactDetails.map((c, idx) => (
                            <a
                                key={idx}
                                href={c.link}
                                className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 dark:border-neutral-700 hover:shadow-sm transition"
                                aria-label={`Contact method: ${c.title}`}
                            >
                                <div>{c.icon}</div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{c.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">{c.subtitle}</p>
                                    <p className="mt-1 text-sm text-indigo-600 dark:text-indigo-400">{c.display}</p>
                                </div>
                            </a>
                        ))}
                    </div>

                    {status && (
                        <div
                            className={`mt-4 p-3 rounded-md text-sm ${status.ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                                }`}
                            role="status"
                        >
                            {status.message}
                        </div>
                    )}
                </div>

                {/* right: form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-neutral-900 p-6 rounded-lg border border-gray-100 dark:border-neutral-800 shadow-sm"
                >
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-neutral-700 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                aria-invalid={Boolean(clientErrors.name)}
                                aria-describedby={clientErrors.name ? "name-error" : undefined}
                                required
                            />
                            {clientErrors.name && (
                                <p id="name-error" className="mt-1 text-xs text-red-600">
                                    {clientErrors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="you@example.com"
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-neutral-700 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                aria-invalid={Boolean(clientErrors.email)}
                                aria-describedby={clientErrors.email ? "email-error" : undefined}
                                required
                            />
                            {clientErrors.email && (
                                <p id="email-error" className="mt-1 text-xs text-red-600">
                                    {clientErrors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows={6}
                                placeholder="Tell us about your project or question..."
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-neutral-700 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-vertical"
                                aria-invalid={Boolean(clientErrors.message)}
                                aria-describedby={clientErrors.message ? "message-error" : undefined}
                                required
                            />
                            {clientErrors.message && (
                                <p id="message-error" className="mt-1 text-xs text-red-600">
                                    {clientErrors.message}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60"
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </button>

                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                <span className="inline-flex items-center gap-1">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>Secure & Private</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
