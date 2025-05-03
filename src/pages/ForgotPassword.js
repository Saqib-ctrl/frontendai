function ForgotPassword() {
    try {
        const [email, setEmail] = React.useState('');
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');
        const [success, setSuccess] = React.useState(false);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError('');
            setSuccess(false);

            try {
                // Find user with this email
                const { items: users } = await trickleListObjects('user', 100, true);
                const user = users.find(u => u.objectData.email === email);

                if (!user) {
                    throw new Error('No account found with this email');
                }

                // Reset password to '123456'
                await trickleUpdateObject('user', user.objectId, {
                    ...user.objectData,
                    password: '123456'
                });

                setSuccess(true);
            } catch (error) {
                setError(error.message || 'Failed to reset password');
            } finally {
                setLoading(false);
            }
        };

        return (
            <div data-name="forgot-password-page" className="min-h-screen flex items-center justify-center">
                <div className="max-w-md w-full px-6">
                    <div className="card">
                        <h2 className="text-2xl font-bold text-center mb-8">Reset Password</h2>

                        {error && <ErrorMessage message={error} />}

                        {success ? (
                            <div className="text-center">
                                <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
                                    <i className="fas fa-check-circle text-2xl mb-2"></i>
                                    <p>Your password has been reset to: <strong>123456</strong></p>
                                    <p className="mt-2">Please login with this password and change it immediately.</p>
                                </div>
                                <a href="#login" className="btn btn-primary">
                                    Go to Login
                                </a>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        className="input-field"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-full"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                                            Resetting Password...
                                        </div>
                                    ) : (
                                        'Reset Password'
                                    )}
                                </button>

                                <div className="text-center">
                                    <a href="#login" className="text-sm text-blue-600 hover:text-blue-800">
                                        Back to Login
                                    </a>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ForgotPassword render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load forgot password page" />;
    }
}
