'use client'

import React, { createContext, useContext, useState } from 'react'

type User = {
    id: string
    email: string
    name: string
}

type AuthContextType = {
    user: User | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user] = useState<User | null>({
        id: '1',
        email: 'user@example.com',
        name: 'John Doe'
    })

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

