// import { useState } from "react";
// import { ContactFormData, ContactResponse } from "../../app/types/contact";

// interface ContactFormProps {
//     onSuccess?: () => void;
// }

// export function ContactForm({ onSuccess }: ContactFormProps) {
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         setError(null);
//         setFieldErrors({});

//         const form = e.currentTarget;
//         const formData = new FormData(form);

//         const data: ContactFormData = {
//             firstName: formData.get("first-name") as string,
//             lastName: formData.get("last-name") as string,
//             email: formData.get("email") as string,
//             message: formData.get("message") as string,
//         };

//         try {
//             const response = await fetch("/api/contact", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(data),
//             });

//             const result: ContactResponse = await response.json();

//             if (!response.ok) {
//                 if (result.errors) {
//                     setFieldErrors(result.errors);
//                 } else {
//                     setError(result.message);
//                 }
//                 return;
//             }

//             form.reset();
//             onSuccess?.();
//         } catch (err) {
//             console.log(err) // Anti Errors
//             setError("An unexpected error occurred. Please try again later.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="mt-16 bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
//             <div className="px-6 py-10 sm:px-10">
//                 <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
//                     Send us a message
//                 </h3>

//                 {error && (
//                     <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
//                         {error}
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
//                         <div>
//                             <label
//                                 htmlFor="first-name"
//                                 className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//                             >
//                                 First name
//                             </label>
//                             <div className="mt-1">
//                                 <input
//                                     type="text"
//                                     name="first-name"
//                                     id="first-name"
//                                     autoComplete="given-name"
//                                     className={`py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border ${fieldErrors.firstName ? "border-red-300" : "border-gray-200"
//                                         } dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white`}
//                                 />
//                                 {fieldErrors.firstName?.map((error) => (
//                                     <p key={error} className="mt-1 text-sm text-red-600">
//                                         {error}
//                                     </p>
//                                 ))}
//                             </div>
//                         </div>

//                         <div>
//                             <label
//                                 htmlFor="last-name"
//                                 className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//                             >
//                                 Last name
//                             </label>
//                             <div className="mt-1">
//                                 <input
//                                     type="text"
//                                     name="last-name"
//                                     id="last-name"
//                                     autoComplete="family-name"
//                                     className={`py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border ${fieldErrors.lastName ? "border-red-300" : "border-gray-200"
//                                         } dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white`}
//                                 />
//                                 {fieldErrors.lastName?.map((error) => (
//                                     <p key={error} className="mt-1 text-sm text-red-600">
//                                         {error}
//                                     </p>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="email"
//                             className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//                         >
//                             Email
//                         </label>
//                         <div className="mt-1">
//                             <input
//                                 id="email"
//                                 name="email"
//                                 type="email"
//                                 autoComplete="email"
//                                 className={`py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border ${fieldErrors.email ? "border-red-300" : "border-gray-200"
//                                     } dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white`}
//                             />
//                             {fieldErrors.email?.map((error) => (
//                                 <p key={error} className="mt-1 text-sm text-red-600">
//                                     {error}
//                                 </p>
//                             ))}
//                         </div>
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="message"
//                             className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//                         >
//                             Message
//                         </label>
//                         <div className="mt-1">
//                             <textarea
//                                 id="message"
//                                 name="message"
//                                 rows={4}
//                                 className={`py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border ${fieldErrors.message ? "border-red-300" : "border-gray-200"
//                                     } dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white`}
//                             />
//                             {fieldErrors.message?.map((error) => (
//                                 <p key={error} className="mt-1 text-sm text-red-600">
//                                     {error}
//                                 </p>
//                             ))}
//                         </div>
//                     </div>

//                     <div>
//                         <button
//                             type="submit"
//                             disabled={isSubmitting}
//                             className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-800 transition-colors duration-200 disabled:opacity-50"
//                         >
//                             {isSubmitting ? "Sending..." : "Send message"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }