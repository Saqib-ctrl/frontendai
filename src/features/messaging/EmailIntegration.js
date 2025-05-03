function EmailIntegration() {
    try {
        const [connected, setConnected] = React.useState(false);
        const [emailSettings, setEmailSettings] = React.useState({
            enabled: false,
            sendCopy: false,
            followUpDays: 3,
            signature: ''
        });
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');
        
        const handleConnect = async () => {
            setLoading(true);
            setError('');
            
            try {
                // Mock API call to connect email
                await new Promise(resolve => setTimeout(resolve, 1500));
                setConnected(true);
                
                // Default settings after connection
                setEmailSettings({
                    ...emailSettings,
                    enabled: true
                });
            } catch (error) {
                setError('Failed to connect email account. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        
        const handleDisconnect = async () => {
            setLoading(true);
            setError('');
            
            try {
                // Mock API call to disconnect email
                await new Promise(resolve => setTimeout(resolve, 1000));
                setConnected(false);
                setEmailSettings({
                    ...emailSettings,
                    enabled: false
                });
            } catch (error) {
                setError('Failed to disconnect email account. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        
        const handleSettingsChange = (setting, value) => {
            setEmailSettings({
                ...emailSettings,
                [setting]: value
            });
        };
        
        const handleSaveSettings = async () => {
            setLoading(true);
            setError('');
            
            try {
                // Mock API call to save settings
                await new Promise(resolve => setTimeout(resolve, 1000));
                // Success notification would go here
            } catch (error) {
                setError('Failed to save email settings. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        
        return (
            <div data-name="email-integration" className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Email Integration</h3>
                    {connected ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                            Connected
                        </span>
                    ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            <span className="w-2 h-2 bg-gray-500 rounded-full mr-1.5"></span>
                            Not Connected
                        </span>
                    )}
                </div>
                
                {error && <ErrorMessage message={error} />}
                
                {!connected ? (
                    <div className="text-center py-6">
                        <div className="mb-4">
                            <i className="fas fa-envelope text-4xl text-gray-400"></i>
                            <h4 className="mt-2 font-medium">Connect your email account</h4>
                            <p className="text-sm text-gray-500 mt-1">
                                Connect your email to send automated follow-ups and notifications
                            </p>
                        </div>
                        
                        <button
                            onClick={handleConnect}
                            disabled={loading}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {loading ? (
                                <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            ) : (
                                <i className="fas fa-plug mr-2"></i>
                            )}
                            Connect Email
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="border-b border-gray-200 pb-4 mb-4">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h4 className="font-medium">Connected Account</h4>
                                    <p className="text-sm text-gray-500">user@example.com</p>
                                </div>
                                <button
                                    onClick={handleDisconnect}
                                    disabled={loading}
                                    className="text-sm text-red-600 hover:text-red-800"
                                >
                                    {loading ? 'Disconnecting...' : 'Disconnect'}
                                </button>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium">Email Notifications</h4>
                                    <p className="text-sm text-gray-500">Send message notifications via email</p>
                                </div>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={emailSettings.enabled}
                                        onChange={(e) => handleSettingsChange('enabled', e.target.checked)}
                                    />
                                    <span className="relative inline-block w-10 h-5 bg-gray-200 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        <span 
                                            className={`absolute inset-0 flex items-center justify-center transition-opacity ${emailSettings.enabled ? 'opacity-0' : 'opacity-100'}`}
                                        >
                                            <span className="absolute inset-y-0 left-0 w-5 h-5 bg-white rounded-full shadow transform translate-x-0 transition ease-in-out duration-200"></span>
                                        </span>
                                        <span 
                                            className={`absolute inset-0 flex items-center justify-center transition-opacity ${emailSettings.enabled ? 'opacity-100' : 'opacity-0'}`}
                                        >
                                            <span className="absolute inset-y-0 left-0 w-5 h-5 bg-blue-600 rounded-full shadow transform translate-x-5 transition ease-in-out duration-200"></span>
                                        </span>
                                    </span>
                                </label>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium">Send Copy to Email</h4>
                                    <p className="text-sm text-gray-500">Send a copy of sent messages to your email</p>
                                </div>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={emailSettings.sendCopy}
                                        onChange={(e) => handleSettingsChange('sendCopy', e.target.checked)}
                                    />
                                    <span className="relative inline-block w-10 h-5 bg-gray-200 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        <span 
                                            className={`absolute inset-0 flex items-center justify-center transition-opacity ${emailSettings.sendCopy ? 'opacity-0' : 'opacity-100'}`}
                                        >
                                            <span className="absolute inset-y-0 left-0 w-5 h-5 bg-white rounded-full shadow transform translate-x-0 transition ease-in-out duration-200"></span>
                                        </span>
                                        <span 
                                            className={`absolute inset-0 flex items-center justify-center transition-opacity ${emailSettings.sendCopy ? 'opacity-100' : 'opacity-0'}`}
                                        >
                                            <span className="absolute inset-y-0 left-0 w-5 h-5 bg-blue-600 rounded-full shadow transform translate-x-5 transition ease-in-out duration-200"></span>
                                        </span>
                                    </span>
                                </label>
                            </div>
                            
                            <div>
                                <h4 className="font-medium mb-2">Automatic Follow-up</h4>
                                <p className="text-sm text-gray-500 mb-2">Send follow-up emails after</p>
                                <select
                                    value={emailSettings.followUpDays}
                                    onChange={(e) => handleSettingsChange('followUpDays', parseInt(e.target.value))}
                                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                >
                                    <option value={1}>1 day</option>
                                    <option value={2}>2 days</option>
                                    <option value={3}>3 days</option>
                                    <option value={5}>5 days</option>
                                    <option value={7}>1 week</option>
                                    <option value={14}>2 weeks</option>
                                </select>
                            </div>
                            
                            <div>
                                <h4 className="font-medium mb-2">Email Signature</h4>
                                <textarea
                                    value={emailSettings.signature}
                                    onChange={(e) => handleSettingsChange('signature', e.target.value)}
                                    placeholder="Enter your email signature..."
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    rows="3"
                                ></textarea>
                            </div>
                            
                            <div className="pt-4">
                                <button
                                    onClick={handleSaveSettings}
                                    disabled={loading}
                                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {loading ? (
                                        <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    ) : (
                                        <i className="fas fa-save mr-2"></i>
                                    )}
                                    Save Settings
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('EmailIntegration render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load email integration settings" />;
    }
}
