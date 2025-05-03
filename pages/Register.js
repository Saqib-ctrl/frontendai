function Register() {
    try {
        const [formData, setFormData] = React.useState({
            email: '',
            password: '',
            confirmPassword: '',
            role: 'candidate',
            name: ''
        });
        const [error, setError] = React.useState('');
        const [loading, setLoading] = React.useState(false);
        const [showAdminOption, setShowAdminOption] = React.useState(false);

        const handleSubmit = async (e) => {
            e.preventDefault();
            
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            
            setLoading(true);
            setError('');
            
            try {
                await register(formData);
                // Automatically log in after registration
                await login({
                    email: formData.email,
                    password: formData.password,
                    role: formData.role
                });
                window.location.reload();
            } catch (error) {
                setError(error.message || 'Registration failed. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        const toggleAdminOption = () => {
            setShowAdminOption(!showAdminOption);
        };

        return (
            <div data-name="register-page" className="min-h-screen flex items-center justify-center">
                <div className="max-w-md w-full px-6">
                    <div className="card">
                        <h2 className="text-2xl font-bold text-center mb-8">Create an Account</h2>
                        
                        {error && <ErrorMessage message={error} />}
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    className="input-field"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Password</label>
                                <PasswordInput
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Confirm Password</label>
                                <PasswordInput
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                />
                                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-500">Passwords do not match</p>
                                )}
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Account Type</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div 
                                        onClick={() => setFormData({...formData, role: 'candidate'})}
                                        className={`p-3 border rounded-lg cursor-pointer flex flex-col items-center ${
                                            formData.role === 'candidate' 
                                                ? 'border-green-500 bg-green-50' 
                                                : 'border-gray-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        <i className="fas fa-user-tie text-xl mb-1 text-green-600"></i>
                                        <span className={formData.role === 'candidate' ? 'font-medium' : ''}>
                                            Candidate
                                        </span>
                                    </div>
                                    <div 
                                        onClick={() => setFormData({...formData, role: 'employer'})}
                                        className={`p-3 border rounded-lg cursor-pointer flex flex-col items-center ${
                                            formData.role === 'employer' 
                                                ? 'border-blue-500 bg-blue-50' 
                                                : 'border-gray-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        <i className="fas fa-building text-xl mb-1 text-blue-600"></i>
                                        <span className={formData.role === 'employer' ? 'font-medium' : ''}>
                                            Employer
                                        </span>
                                    </div>
                                    {showAdminOption && (
                                        <div 
                                            onClick={() => setFormData({...formData, role: 'admin'})}
                                            className={`p-3 border rounded-lg cursor-pointer flex flex-col items-center ${
                                                formData.role === 'admin' 
                                                    ? 'border-purple-500 bg-purple-50' 
                                                    : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                        >
                                            <i className="fas fa-user-shield text-xl mb-1 text-purple-600"></i>
                                            <span className={formData.role === 'admin' ? 'font-medium' : ''}>
                                                Admin
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="mb-6 text-right">
                                <button 
                                    type="button" 
                                    onClick={toggleAdminOption}
                                    className="text-sm text-gray-500 hover:text-gray-700"
                                >
                                    {showAdminOption ? 'Hide Admin Option' : 'Show Admin Option'}
                                </button>
                            </div>
                            
                            <button
                                type="submit"
                                disabled={loading || formData.password !== formData.confirmPassword}
                                className="btn btn-primary w-full"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                                        Creating Account...
                                    </div>
                                ) : (
                                    'Register'
                                )}
                            </button>
                        </form>
                        
                        <div className="mt-4 text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <a href="#login" className="text-blue-600 hover:underline">
                                    Login
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Register render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load registration page" />;
    }
}
