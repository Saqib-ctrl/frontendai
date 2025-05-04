import React, { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage'; // adjust path if needed
import { login } from '../utils/auth'; // adjust path if needed
import { reportError } from '../utils/logger'; // adjust path if needed

function Login() {
    try {
        const [credentials, setCredentials] = useState({ 
            email: '', 
            password: '',
            role: 'candidate'
        });
        const [errors, setErrors] = useState({});
        const [loading, setLoading] = useState(false);
        const [showPassword, setShowPassword] = useState(false);

        const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const validatePassword = (password) => password.length >= 6;

        const validateForm = () => {
            const newErrors = {};
            if (!credentials.email) newErrors.email = 'Email is required';
            else if (!validateEmail(credentials.email)) newErrors.email = 'Invalid email';

            if (!credentials.password) newErrors.password = 'Password is required';
            else if (!validatePassword(credentials.password)) newErrors.password = 'Password must be at least 6 characters';

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!validateForm()) return;
            setLoading(true);
            try {
                const response = await login(credentials);
                if (response) window.location.reload();
            } catch (error) {
                if (error.message === 'User not found') {
                    setErrors({ email: 'No account found with this email' });
                } else if (error.message === 'Invalid password') {
                    setErrors({ password: 'Incorrect password' });
                } else {
                    setErrors({ general: 'Login error. Try again.' });
                }
            } finally {
                setLoading(false);
            }
        };

        const handleDemoLogin = async (role) => {
            setLoading(true);
            try {
                const demoCredentials = {
                    email: `demo${role}@example.com`,
                    password: 'demo123',
                    role
                };
                await login(demoCredentials);
                window.location.reload();
            } catch {
                setErrors({ general: 'Demo login failed. Please try again.' });
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="max-w-md w-full px-6">
                    <div className="card">
                        <h2 className="text-2xl font-bold text-center mb-8">Login to Your Account</h2>

                        {errors.general && <ErrorMessage message={errors.general} />}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                                    value={credentials.email}
                                    onChange={(e) =>
                                        setCredentials({ ...credentials, email: e.target.value })
                                    }
                                    required
                                />
                                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className={`input-field pr-10 ${errors.password ? 'border-red-500' : ''}`}
                                        value={credentials.password}
                                        onChange={(e) =>
                                            setCredentials({ ...credentials, password: e.target.value })
                                        }
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </button>
                                </div>
                                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Login As</label>
                                <select
                                    className="input-field"
                                    value={credentials.role}
                                    onChange={(e) =>
                                        setCredentials({ ...credentials, role: e.target.value })
                                    }
                                    required
                                >
                                    <option value="candidate">Candidate</option>
                                    <option value="employer">Employer</option>
                                    <option value="admin">Administrator</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>

                            <div className="text-center">
                                <a href="#forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                                    Forgot your password?
                                </a>
                            </div>
                        </form>

                        <div className="mt-8">
                            <h3 className="text-center text-gray-700 font-medium mb-4">Quick Demo Access</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {['candidate', 'employer', 'admin'].map((role) => (
                                    <button
                                        key={role}
                                        onClick={() => handleDemoLogin(role)}
                                        className={`btn flex items-center justify-center ${
                                            role === 'candidate'
                                                ? 'bg-green-600'
                                                : role === 'employer'
                                                ? 'bg-blue-600'
                                                : 'bg-purple-600'
                                        } text-white`}
                                        disabled={loading}
                                    >
                                        <i className={`fas ${
                                            role === 'candidate'
                                                ? 'fa-user-tie'
                                                : role === 'employer'
                                                ? 'fa-building'
                                                : 'fa-user-shield'
                                        } mr-2`}></i>
                                        {role.charAt(0).toUpperCase() + role.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Don&apos;t have an account?{' '}
                                <a href="#register" className="text-blue-600 hover:underline">
                                    Register
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Login render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load login page" />;
    }
}

export default Login;
