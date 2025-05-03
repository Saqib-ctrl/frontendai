function LoginForm({ onSuccess }) {
    try {
        const [credentials, setCredentials] = React.useState({ email: '', password: '' });
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError('');
            
            try {
                const user = await login(credentials);
                onSuccess(user);
            } catch (error) {
                setError('Invalid email or password');
            } finally {
                setLoading(false);
            }
        };

        return (
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <ErrorMessage message={error} />}
                
                <div>
                    <label className="block text-gray-700 mb-2">Email Address</label>
                    <input
                        type="email"
                        className="input-field"
                        value={credentials.email}
                        onChange={(e) => setCredentials({
                            ...credentials,
                            email: e.target.value
                        })}
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        className="input-field"
                        value={credentials.password}
                        onChange={(e) => setCredentials({
                            ...credentials,
                            password: e.target.value
                        })}
                        required
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        );
    } catch (error) {
        console.error('LoginForm render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load login form" />;
    }
}
