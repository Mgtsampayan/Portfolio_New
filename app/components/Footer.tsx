import { FaFacebookF, FaTwitter, FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                <div className="flex space-x-6 mb-4 md:mb-0">
                    <a href="https://www.facebook.com/Mgtsampayan"
                        className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring focus:ring-gray-400 dark:focus:ring-gray-600"
                        aria-label="Facebook">
                        <FaFacebookF size={24} />
                    </a>
                    <a href="https://twitter.com"
                        className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring focus:ring-gray-400 dark:focus:ring-gray-600"
                        aria-label="Twitter">
                        <FaTwitter size={24} />
                    </a>
                    <a href="https://github.com/Mgtsampayan"
                        className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring focus:ring-gray-400 dark:focus:ring-gray-600"
                        aria-label="GitHub">
                        <FaGithub size={24} />
                    </a>
                </div>
                <div>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        © {currentYear} GesSain, Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;