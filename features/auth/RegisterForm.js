function RegisterForm({ onSuccess }) {
    try {
        const [formData, setFormData] = React.useState({
            email: '',
            password: '',
            confirmPassword: '',
            role: 'candidate',
            name: ''
        });
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');
        const [showAdminOption, setShowAdminOption] = React.useState(false);
        const [registrationStatus, setRegistrationStatus] = React.useState('');
        const [showResendButton, setShowResendButton] = React.useState(false);
        const [isPasswordValid, setIsPasswordValid] = React.useState(false);

        const handleSubmit = async (e) => {
            e.preventDefault();
            
            if (!isPasswordValid) {
                setError('Please ensure your password meets all requirements');
                return;
            }
            
            setLoading(true);
            setError('');
            setRegistrationStatus('');
            
            try {
                if (formData.password !== formData.confirmPassword) {
                    throw new Error('Passwords do not match');
                }
                
                await register(formData);
                setRegistrationStatus('Registration successful! Please check your email to verify your account.');
                setShowResendButton(true);
            } catch (error) {
                setError(error.message || 'Registration failed. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        const handleResendVerification = async () => {
            setLoading(true);
            setError('');
            try {
                await resendVerificationEmail(formData.email);
                setRegistrationStatus('Verification email resent! Please check your inbox.');
            } catch (error) {
                setError(error.message || 'Failed to resend verification email.');
            } finally {
                setLoading(false);
            }
        };

        const toggleAdminOption = () => {
            setShowAdminOption(!showAdminOption);
        };

        return (
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <ErrorMessage message={error} />}
                
                {registrationStatus && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 px-4 py-2 rounded">
                        <p>{registrationStatus}</p>
                        {showResendButton && (
                            <button
                                onClick={handleResendVerification}
                                disabled={loading}
                                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                            >
                                Resend verification email
                            </button>
                        )}
                    </div>
                )}

                <div>
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <input
                        type="text"
                        className="input-field"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Email Address</label>
                    <input
                        type="email"
                        className="input-field"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700 mb-2">Password</label>
                    <PasswordInput
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        onValidation={setIsPasswordValid}
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700 mb-2">Confirm Password</label>
                    <div className="relative">
                        <input
                            type="password"
                            className={`input-field ${
                                formData.confirmPassword && formData.password !== formData.confirmPassword
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                    : ''
                            }`}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            required
                        />
                        {formData.confirmPassword && (
                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                {formData.password === formData.confirmPassword ? (
                                    <i className="fas fa-check-circle text-green-500"></i>
                                ) : (
                                    <i className="fas fa-times-circle text-red-500"></i>
                                )}
                            </div>
                        )}
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <p className="mt-1 text-sm text-red-500">Passwords do not match</p>
                    )}
                </div>
                
                <div>
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
                
                <div className="text-right">
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
                    disabled={loading || !isPasswordValid || formData.password !== formData.confirmPassword}
                    className="btn btn-primary w-full"
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                            Creating Account...
                        </div>
                    ) : (
                        'Register'
                    )}
                </button>
            </form>
        );
    } catch (error) {
        console.error('RegisterForm render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load registration form" />;
    }
}
