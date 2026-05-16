import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('trader@bloomberg.com');
    const [password, setPassword] = useState('demo123');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = login(email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.error || 'Login failed');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-bg-primary flex items-center justify-center">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-10 h-10 bg-accent-orange rounded flex items-center justify-center">
                            <LogIn className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-text-primary">Bloomberg Clone</h1>
                    </div>
                    <p className="text-text-secondary">Professional Trading Platform</p>
                </div>

                {/* Card */}
                <div className="bg-bg-secondary border border-border rounded-lg p-8 shadow-lg">
                    <h2 className="text-xl font-semibold text-text-primary mb-6">Sign In</h2>

                    {error && (
                        <div className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-2 rounded mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="text-text-secondary text-sm block mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-bg-primary border border-border rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent-orange transition"
                                placeholder="trader@bloomberg.com"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-text-secondary text-sm block mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-bg-primary border border-border rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent-orange transition"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-accent-orange text-white py-2 rounded font-semibold hover:bg-orange-500 transition disabled:opacity-50"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 pt-6 border-t border-border">
                        <p className="text-text-secondary text-xs mb-3 font-semibold">DEMO CREDENTIALS:</p>
                        <div className="space-y-2 text-xs text-text-secondary/80">
                            <p>👤 <span className="text-text-primary">trader@bloomberg.com</span> (Pro)</p>
                            <p>👤 <span className="text-text-primary">investor@bloomberg.com</span> (Basic)</p>
                            <p>👤 <span className="text-text-primary">analyst@bloomberg.com</span> (Pro)</p>
                            <p>🔑 Password: <span className="text-text-primary">demo123</span></p>
                        </div>
                    </div>

                    {/* Auto-login hint */}
                    <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700 rounded text-xs text-blue-300">
                        💡 Pre-filled with demo credentials. Click "Sign In" to test.
                    </div>
                </div>
            </div>
        </div>
    );
}
