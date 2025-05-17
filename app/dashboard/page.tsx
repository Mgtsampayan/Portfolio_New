'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Project = {
    id: string
    name: string
    status: 'In Progress' | 'Completed' | 'On Hold'
}

// Mock data to avoid unnecessary re-fetching
const MOCK_PROJECTS: Project[] = [
    { id: '1', name: 'Project A', status: 'In Progress' },
    { id: '2', name: 'Project B', status: 'Completed' },
    { id: '3', name: 'Project C', status: 'On Hold' },
];

const Dashboard: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        // Using the constant instead of recreating the array on each render
        setProjects(MOCK_PROJECTS)
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Welcome to your project dashboard!</p>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Projects</h2>
                        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                {projects.map((project) => (
                                    <li key={project.id}>
                                        <Link href={`/projects/${project.id}`} className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <div className="px-4 py-4 sm:px-6">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 truncate">
                                                        {project.name}
                                                    </p>
                                                    <div className="ml-2 flex-shrink-0 flex">
                                                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                                                            {project.status}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

