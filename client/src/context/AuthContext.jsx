import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// Demo users pre-loaded
const DEMO_USERS = [
    { id: '1', email: 'trader@bloomberg.com', password: 'demo123', name: 'Alex Trader', role: 'pro' },
    { id: '2', email: 'investor@bloomberg.com', password: 'demo123', name: 'Jordan Investor', role: 'basic' },
    { id: '3', email: 'analyst@bloomberg.com', password: 'demo123', name: 'Casey Analyst', role: 'pro' },
];

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user already logged in
        const stored = localStorage.getItem('bloomberg_user');
        if (stored) {
            setUser(JSON.parse(stored));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const foundUser = DEMO_USERS.find(u => u.email === email && u.password === password);
        if (foundUser) {
            const userData = { ...foundUser, token: 'demo_jwt_' + foundUser.id };
            setUser(userData);
            localStorage.setItem('bloomberg_user', JSON.stringify(userData));
            return { success: true, user: userData };
        }
        return { success: false, error: 'Invalid credentials' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('bloomberg_user');
    };

    const register = (email, password, name) => {
        if (DEMO_USERS.find(u => u.email === email)) {
            return { success: false, error: 'User already exists' };
        }
        const newUser = {
            id: Date.now().toString(),
            email,
            password,
            name,
            role: 'basic',
            token: 'demo_jwt_' + Date.now()
        };
        DEMO_USERS.push(newUser);
        setUser(newUser);
        localStorage.setItem('bloomberg_user', JSON.stringify(newUser));
        return { success: true, user: newUser };
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
