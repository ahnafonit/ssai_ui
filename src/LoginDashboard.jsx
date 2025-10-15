import React, { useState } from 'react';
import { LogIn, UserPlus, Lock, Mail, User, Building, Phone, Sparkles, AlertCircle } from 'lucide-react';

const LoginDashboard = ({ onLoginSuccess }) => {
    const [showRegister, setShowRegister] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        organization: ''
    });
    const [loginError, setLoginError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setLoginError('');

        // Demo login - accept any email/password
        if (loginData.email && loginData.password) {
            if (loginData.password.length < 6) {
                setLoginError('Password must be at least 6 characters');
                return;
            }
            onLoginSuccess();
            setLoginData({ email: '', password: '' });
        } else {
            setLoginError('Please fill in all fields');
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setLoginError('');

        if (registerData.password !== registerData.confirmPassword) {
            setLoginError('Passwords do not match');
            return;
        }

        if (registerData.password.length < 6) {
            setLoginError('Password must be at least 6 characters');
            return;
        }

        if (registerData.fullName && registerData.email && registerData.password && registerData.organization) {
            onLoginSuccess();
            setRegisterData({ fullName: '', email: '', password: '', confirmPassword: '', organization: '' });
            setShowRegister(false);
        } else {
            setLoginError('Please fill in all fields');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAxMmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIGZpbGw9IiMxZTQwYWYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

            <div className="relative w-full max-w-md">
                <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center">
                        <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 relative">
                            <Phone className="text-blue-600" size={24} />
                            <Sparkles className="text-blue-500 absolute -top-1 -right-1" size={16} />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">ONIT SMART HUB</h1>
                        <p className="text-blue-100">AI-Powered Call Center Agents</p>
                    </div>

                    {/* Form Container */}
                    <div className="p-8">
                        {!showRegister ? (
                            // Login Form
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-100 mb-2">Welcome Back</h2>
                                    <p className="text-gray-400 text-sm">Sign in to continue to your dashboard</p>
                                </div>

                                {loginError && (
                                    <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 flex items-center space-x-2">
                                        <AlertCircle className="text-red-400" size={18} />
                                        <p className="text-sm text-red-200">{loginError}</p>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="email"
                                            value={loginData.email}
                                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="password"
                                            value={loginData.password}
                                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500" />
                                        <span className="ml-2 text-sm text-gray-300">Remember me</span>
                                    </label>
                                    <button type="button" className="text-sm text-blue-400 hover:text-blue-300">
                                        Forgot password?
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                                >
                                    <LogIn size={18} />
                                    <span>Sign In</span>
                                </button>

                                <div className="text-center">
                                    <p className="text-gray-400 text-sm">
                                        Don't have an account?{' '}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowRegister(true);
                                                setLoginError('');
                                            }}
                                            className="text-blue-400 hover:text-blue-300 font-medium"
                                        >
                                            Create one now
                                        </button>
                                    </p>
                                </div>
                            </form>
                        ) : (
                            // Register Form
                            <form onSubmit={handleRegister} className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-100 mb-2">Create Account</h2>
                                    <p className="text-gray-400 text-sm">Join us to start training your AI models</p>
                                </div>

                                {loginError && (
                                    <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 flex items-center space-x-2">
                                        <AlertCircle className="text-red-400" size={18} />
                                        <p className="text-sm text-red-200">{loginError}</p>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            value={registerData.fullName}
                                            onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Organization
                                    </label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            value={registerData.organization}
                                            onChange={(e) => setRegisterData({ ...registerData, organization: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Your Company"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="email"
                                            value={registerData.email}
                                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="password"
                                            value={registerData.password}
                                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Create a password (min. 6 characters)"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="password"
                                            value={registerData.confirmPassword}
                                            onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Confirm your password"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                                >
                                    <UserPlus size={18} />
                                    <span>Create Account</span>
                                </button>

                                <div className="text-center">
                                    <p className="text-gray-400 text-sm">
                                        Already have an account?{' '}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowRegister(false);
                                                setLoginError('');
                                            }}
                                            className="text-blue-400 hover:text-blue-300 font-medium"
                                        >
                                            Sign in
                                        </button>
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-750 px-8 py-4 border-t border-gray-700">
                        <p className="text-center text-gray-400 text-xs">
                            © 2024 ONIT SMART HUB. Secure AI Training Platform.
                        </p>
                    </div>
                </div>

                {/* Demo Credentials Info */}
                <div className="mt-6 bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                        <AlertCircle className="text-blue-400 mt-0.5" size={16} />
                        <div className="text-sm text-blue-200">
                            <p className="font-medium mb-1">Demo Mode:</p>
                            <p>Use any email and password (min. 6 characters) to access the dashboard.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginDashboard;
