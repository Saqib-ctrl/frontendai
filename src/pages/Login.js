function Login() {
    try {
        const [credentials, setCredentials] = React.useState({ 
            email: '', 
            password: '',
            role: 'candidate' // Default role
        });
        const [errors, setErrors] = React.useState({});
        const [loading, setLoading] = React.useState(false);
        const [showPassword, setShowPassword] = React.useState(false);

        const validateEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        const validatePassword = (password) => {
            return password.length >= 6;
        };

        const validateForm = () => {
            const newErrors = {};

            // Email validation
            if (!credentials.email) {
                newErrors.email = 'Email is required';
            } else if (!validateEmail(credentials.email)) {
                newErrors.email = 'Please enter a valid email address';
            }

            // Password validation
            if (!credentials.password) {
                newErrors.password = 'Password is required';
            } else if (!validatePassword(credentials.password)) {
                newErrors.password = 'Password must be at least 6 characters long';
            }

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }

            setLoading(true);
            try {
                const response = await login(credentials);
                if (response) {
                    window.location.reload();
                }
            } catch (error) {
                if (error.message === 'User not found') {
                    setErrors({ email: 'No account found with this email' });
                } else if (error.message === 'Invalid password') {
                    setErrors({ password: 'Incorrect password' });
                } else {
                    setErrors({ general: 'An error occurred during login. Please try again.' });
                }
            } finally {
                setLoading(false);
            }
        };

        const handleDemoLogin = async (role) => {
            setLoading(true);
            try {
                // Create demo credentials based on role
                const demoCredentials = {
                    email: `demo${role}@example.com`,
                    password: 'demo123',
                    role: role
                };
                await login(demoCredentials);
                window.location.reload();
            } catch (error) {
                setErrors({ general: 'Demo login failed. Please try again.' });
            } finally {
                setLoading(false);
            }
        };

        return (
            <div data-name="login-page" className="min-h-screen flex items-center justify-center">
                <div className="max-w-md w-full px-6">
                    <div className="card">
                        <h2 className="text-2xl font-bold text-center mb-8">Login to Your Account</h2>
                        
                        {errors.general && <ErrorMessage message={errors.general} />}
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                                        value={credentials.email}
                                        onChange={(e) => {
                                            setCredentials({
                                                ...credentials,
                                                email: e.target.value
                                            });
                                            if (errors.email) {
                                                setErrors({ ...errors, email: null });
                                            }
                                        }}
                                        required
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                    )}
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className={`input-field pr-10 ${errors.password ? 'border-red-500' : ''}`}
                                        value={credentials.password}
                                        onChange={(e) => {
                                            setCredentials({
                                                ...credentials,
                                                password: e.target.value
                                            });
                                            if (errors.password) {
                                                setErrors({ ...errors, password: null });
                                            }
                                        }}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </button>
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Login As</label>
                                <select
                                    className="input-field"
                                    value={credentials.role}
                                    onChange={(e) => setCredentials({
                                        ...credentials,
                                        role: e.target.value
                                    })}
                                    required
                                >
                                    <option value="candidate">Candidate</option>
                                    <option value="employer">Employer</option>
                                    <option value="admin">Administrator</option>
                                </select>
                            </div>
                            
                            <button 
                                type="submit" 
                                className="btn btn-primary w-full flex items-center justify-center"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                        Logging in...
                                    </div>
                                ) : 'Login'}
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
                                <button 
                                    onClick={() => handleDemoLogin('candidate')}
                                    className="btn flex items-center justify-center bg-green-600 hover:bg-green-700 text-white"
                                    disabled={loading}
                                >
                                    <i className="fas fa-user-tie mr-2"></i>
                                    Candidate
                                </button>
                                <button 
                                    onClick={() => handleDemoLogin('employer')}
                                    className="btn flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
                                    disabled={loading}
                                >
                                    <i className="fas fa-building mr-2"></i>
                                    Employer
                                </button>
                                <button 
                                    onClick={() => handleDemoLogin('admin')}
                                    className="btn flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white"
                                    disabled={loading}
                                >
                                    <i className="fas fa-user-shield mr-2"></i>
                                    Admin
                                </button>
                            </div>
                        </div>
                        
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
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
