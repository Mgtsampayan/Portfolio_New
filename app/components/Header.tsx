'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const NAV_ITEMS = ['Features', 'About', 'Pricing', 'Contact'];

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { theme, toggleTheme, mounted } = useTheme()

    // Don't show theme toggle until mounted to prevent hydration mismatch
    const renderThemeToggle = () => {
        if (!mounted) return null;
        
        return (
            <button
                onClick={toggleTheme}
                className="mr-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        );
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition duration-150 ease-in-out">
                            GesSain
                        </Link>
                    </div>
                    <div className="-mr-2 -my-2 md:hidden">
                        <button
                            type="button"
                            className="bg-white dark:bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="sr-only">Open menu</span>
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <nav className="hidden md:flex space-x-10">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>
                    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                        {renderThemeToggle()}
                        <Link
                            href="#contact"
                            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition duration-150 ease-in-out"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-800 divide-y-2 divide-gray-50 dark:divide-gray-700">
                        <div className="pt-5 pb-6 px-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                        GesSain
                                    </Link>
                                </div>
                                <div className="-mr-2">
                                    <button
                                        type="button"
                                        className="bg-white dark:bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <X className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <nav className="grid gap-y-8">
                                    {NAV_ITEMS.map((item) => (
                                        <Link
                                            key={item}
                                            href={`#${item.toLowerCase()}`}
                                            className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-150 ease-in-out"
                                        >
                                            {item}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                        <div className="py-6 px-5 space-y-6">
                            {mounted && (
                                <button
                                    onClick={toggleTheme}
                                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-gray-600 transition-colors duration-200"
                                >
                                    {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                                </button>
                            )}
                            <Link
                                href="#contact"
                                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header