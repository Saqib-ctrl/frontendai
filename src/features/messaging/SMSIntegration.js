function SMSIntegration() {
    try {
        const [connected, setConnected] = React.useState(false);
        const [smsSettings, setSmsSettings] = React.useState({
            enabled: false,
            phoneNumber: '',
            sendConfirmation: false,
            sendReminders: true,
            reminderHours: 24
        });
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');
        
        const handleConnect = async () => {
            setLoading(true);
            setError('');
            
            try {
                // Mock API call to connect SMS
                await new Promise(resolve => setTimeout(resolve, 1500));
                setConnected(true);
                
                // Default settings after connection
                setSmsSettings({
                    ...smsSettings,
                    enabled: true,
                    phoneNumber: '+1 (555) 123-4567' // Mock phone number
                });
            } catch (error) {
                setError('Failed to connect SMS service. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        
        const handleDisconnect = async () => {
            setLoading(true);
            setError('');
            
            try {
                // Mock API call to disconnect SMS
                await new Promise(resolve => setTimeout(resolve, 1000));
                setConnected(false);
                setSmsSettings({
                    ...smsSettings,
                    enabled: false,
                    phoneNumber: ''
                });
            } catch (error) {
                setError('Failed to disconnect SMS service. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        
        const handleSettingsChange = (setting, value) => {
            setSmsSettings({
                ...smsSettings,
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
                setError('Failed to save SMS settings. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        
        const handleVerifyNumber = async () => {
            setLoading(true);
            setError('');
            
            try {
                // Mock API call to verify phone number
                await new Promise(resolve => setTimeout(resolve, 2000));
                alert('Verification code sent to your phone. Please check your messages.');
            } catch (error) {
                setError('Failed to send verification code. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        
        return (
            <div data-name="sms-integration" className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">SMS Integration</h3>
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
                            <i className="fas fa-mobile-alt text-4xl text-gray-400"></i>
                            <h4 className="mt-2 font-medium">Connect SMS service</h4>
                            <p className="text-sm text-gray-500 mt-1">
                                Connect SMS to send automated notifications and reminders
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
                            Connect SMS
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="border-b border-gray-200 pb-4 mb-4">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h4 className="font-medium">Connected Phone</h4>
                                    <div className="flex items-center">
                                        <p className="text-sm text-gray-700">{smsSettings.phoneNumber}</p>
                                        <span className="ml-2 px-1.5 py-0.5 bg-green-100 text-green-800 text-xs rounded">Verified</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleVerifyNumber}
                                    disabled={loading}
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    {loading ? 'Verifying...' : 'Re-verify'}
                                </button>
                            </div>
                            
                            <button
                                onClick={handleDisconnect}
                                disabled={loading}
                                className="text-sm text-red-600 hover:text-red-800"
                            >
                                {loading ? 'Disconnecting...' : 'Disconnect SMS'}
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium">SMS Notifications</h4>
                                    <p className="text-sm text-gray-500">Send message notifications via SMS</p>
                                </div>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={smsSettings.enabled}
                                        onChange={(e) => handleSettingsChange('enabled', e.target.checked)}
                                    />
                                    <span className="relative inline-block w-10 h-5 bg-gray-200 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        <span 
                                            className={`absolute inset-0 flex items-center justify-center transition-opacity ${smsSettings.enabled ? 'opacity-0' : 'opacity-100'}`}
                                        >
                                            <span className="absolute inset-y-0 left-0 w-5 h-5 bg-white rounded-full shadow transform translate-x-0 transition ease-in-out duration-200"></span>
                                        </span>
                                        <span 
                                            className={`absolute inset-0 flex items-center justify-center transition-opacity ${smsSettings.enabled ? 'opacity-100' : 'opacity-0'}`}
                                        >
                                            <span className="absolute inset-y-0 left-0 w-5 h-5 bg-blue-600 rounded-full shadow transform translate-x-5 transition ease-in-out duration-200"></span>
                                        </span>
                                    </span>
                                </label>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium">Send Interview Confirmations</h4>
                                    <p className="text-sm text-gray-500">Send confirmation text before scheduled interviews</p>
                                </div>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={smsSettings.sendConfirmation}
                                        onChange={(e) => handleSettingsChange('sendConfirmation', e.target.checked)}
                                    />
                                    <span className="relative inline-block w-10 h-5 bg-gray-200 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        <span 
                                            className={`absolute inset-0 flex items-center justify-center transition-opacity ${smsSettings.sendConfirmation ? 'opacity-0' : 'opacity-100'}`}
                                        >
                                            <span className="absolute inset-y-0 left-0 w-5 h-5 bg-white rounded-full shadow transform translate-x-0 transition ease-in-out duration-200"></span>
                                        </span>
                                        <span 
                                            className={`absolute inset-0 flex items-center justify-center transition-opacity ${smsSettings.sendConfirmation ? 'opacity-100' : 'opacity-0'}`}
                                        >
                                            <span className="absolute inset-y-0 left-0 w-5 h-5 bg-blue-600 rounded-full shadow transform translate-x-5 transition ease-in-out duration-200"></span>
                                        </span>
                                    </span>
                                </label>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium">Send Reminders</h4>
                                    <p className="text-sm text-gray-500">Send SMS reminders for scheduled interviews</p>
                                </div>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={smsSettings.sendReminders}
                                        onChange={(e) => handleSettingsChange('sendReminders', e.target.checked)}
                                    />
                                    <span className="relative inline-block w-10 h-5 bg-gray-200 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        <span 
                                            className={`absolute inset-0 flex items-center justify-center transition-opacity ${smsSettings.sendReminders ? 'opacity-0' : 'opacity-100'}`}
                                        >
                                            <span className="absolute inset-y-0 left-0 w-5 h-5 bg-white rounded-full shadow transform translate-x-0 transition ease-in-out duration-200"></span>
                                        </span>
                                        <span 
                                            className={`absolute inset-0 flex items-center justify-center transition-opacity ${smsSettings.sendReminders ? 'opacity-100' : 'opacity-0'}`}
                                        >
                                            <span className="absolute inset-y-0 left-0 w-5 h-5 bg-blue-600 rounded-full shadow transform translate-x-5 transition ease-in-out duration-200"></span>
                                        </span>
                                    </span>
                                </label>
                            </div>
                            
                            {smsSettings.sendReminders && (
                                <div>
                                    <h4 className="font-medium mb-2">Reminder Time</h4>
                                    <p className="text-sm text-gray-500 mb-2">Send reminders before scheduled time</p>
                                    <select
                                        value={smsSettings.reminderHours}
                                        onChange={(e) => handleSettingsChange('reminderHours', parseInt(e.target.value))}
                                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    >
                                        <option value={1}>1 hour before</option>
                                        <option value={2}>2 hours before</option>
                                        <option value={4}>4 hours before</option>
                                        <option value={12}>12 hours before</option>
                                        <option value={24}>24 hours before</option>
                                        <option value={48}>2 days before</option>
                                    </select>
                                </div>
                            )}
                            
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
        console.error('SMSIntegration render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load SMS integration settings" />;
    }
}
