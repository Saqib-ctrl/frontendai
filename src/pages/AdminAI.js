function AdminAI() {
    try {
        const [activeTab, setActiveTab] = React.useState('analytics');
        
        const tabs = [
            { id: 'analytics', label: 'Analytics Generator', icon: 'fa-chart-line' },
            { id: 'policy', label: 'Policy Generator', icon: 'fa-book' },
            { id: 'report', label: 'Report Generator', icon: 'fa-file-lines' },
            { id: 'email', label: 'Email Templates', icon: 'fa-envelope' }
        ];
        
        const renderTabContent = () => {
            switch (activeTab) {
                case 'analytics':
                    return <AnalyticsGenerator />;
                case 'policy':
                    return <PolicyGenerator />;
                case 'report':
                    return <ReportGenerator />;
                case 'email':
                    return <EmailTemplateGenerator />;
                default:
                    return null;
            }
        };
        
        return (
            <div data-name="admin-ai-page">
                <div data-name="admin-ai-header" className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Admin AI Tools</h1>
                    <p className="text-gray-600 mt-1">Advanced AI tools for platform administration and management</p>
                </div>
                
                <div data-name="admin-ai-content" className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div data-name="admin-ai-tabs" className="border-b">
                        <div className="flex overflow-x-auto">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-3 flex items-center whitespace-nowrap ${
                                        activeTab === tab.id 
                                            ? 'border-b-2 border-purple-600 text-purple-600 font-medium' 
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    <i className={`fas ${tab.icon} mr-2`}></i>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div data-name="admin-ai-tab-content" className="p-6">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('AdminAI page render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load Admin AI tools" />;
    }
}

function AnalyticsGenerator() {
    const [formData, setFormData] = React.useState({
        department: '',
        timeframe: '',
        metrics: ''
    });
    const [loading, setLoading] = React.useState(false);
    const [result, setResult] = React.useState('');
    const [error, setError] = React.useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const generatedAnalytics = await generateAnalytics(formData);
            setResult(generatedAnalytics);
        } catch (error) {
            setError('Failed to generate analytics. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div data-name="analytics-generator">
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Recruitment Analytics Generator</h2>
                <p className="text-gray-600">Generate detailed analytics reports based on recruitment data</p>
            </div>
            
            {error && <ErrorMessage message={error} />}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">Department</label>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="e.g., Engineering, Sales, Marketing"
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700 mb-2">Timeframe</label>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="e.g., Last quarter, Past 6 months, 2023"
                        value={formData.timeframe}
                        onChange={(e) => setFormData({...formData, timeframe: e.target.value})}
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700 mb-2">Metrics to Focus On</label>
                    <textarea
                        className="input-field min-h-[100px]"
                        placeholder="e.g., time-to-hire, cost-per-hire, retention rate, diversity metrics"
                        value={formData.metrics}
                        onChange={(e) => setFormData({...formData, metrics: e.target.value})}
                        required
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full flex items-center justify-center"
                >
                    {loading ? (
                        <div className="flex items-center">
                            <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                            Generating...
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <i className="fas fa-chart-line mr-2"></i>
                            Generate Analytics
                        </div>
                    )}
                </button>
            </form>
            
            {result && (
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Generated Analytics Report:</h4>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(result);
                                alert('Content copied to clipboard!');
                            }}
                            className="text-purple-600 hover:text-purple-700 flex items-center"
                        >
                            <i className="fas fa-copy mr-1"></i>
                            Copy
                        </button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                        {result}
                    </div>
                </div>
            )}
        </div>
    );
}

function PolicyGenerator() {
    const [formData, setFormData] = React.useState({
        policyType: '',
        department: '',
        requirements: ''
    });
    const [loading, setLoading] = React.useState(false);
    const [result, setResult] = React.useState('');
    const [error, setError] = React.useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const generatedPolicy = await generatePolicy(formData);
            setResult(generatedPolicy);
        } catch (error) {
            setError('Failed to generate policy. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    const policyTypes = [
        'Remote Work',
        'Recruitment',
        'Onboarding',
        'Performance Review',
        'Code of Conduct',
        'Anti-Discrimination',
        'Data Privacy',
        'Health and Safety',
        'Leave Policy',
        'Compensation'
    ];
    
    return (
        <div data-name="policy-generator">
            <div className="mb-6">
                <h2 className="text-xl font-semibold">HR Policy Generator</h2>
                <p className="text-gray-600">Generate comprehensive HR policies for your organization</p>
            </div>
            
            {error && <ErrorMessage message={error} />}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">Policy Type</label>
                    <select
                        className="input-field"
                        value={formData.policyType}
                        onChange={(e) => setFormData({...formData, policyType: e.target.value})}
                        required
                    >
                        <option value="">Select a policy type</option>
                        {policyTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label className="block text-gray-700 mb-2">Department/Scope</label>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="e.g., Company-wide, Engineering, Sales"
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700 mb-2">Key Requirements</label>
                    <textarea
                        className="input-field min-h-[100px]"
                        placeholder="e.g., compliance with local regulations, specific considerations, company values to incorporate"
                        value={formData.requirements}
                        onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                        required
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full flex items-center justify-center"
                >
                    {loading ? (
                        <div className="flex items-center">
                            <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                            Generating...
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <i className="fas fa-book mr-2"></i>
                            Generate Policy
                        </div>
                    )}
                </button>
            </form>
            
            {result && (
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Generated Policy:</h4>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(result);
                                alert('Content copied to clipboard!');
                            }}
                            className="text-purple-600 hover:text-purple-700 flex items-center"
                        >
                            <i className="fas fa-copy mr-1"></i>
                            Copy
                        </button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                        {result}
                    </div>
                </div>
            )}
        </div>
    );
}

function ReportGenerator() {
    const [formData, setFormData] = React.useState({
        reportType: '',
        period: '',
        metrics: ''
    });
    const [loading, setLoading] = React.useState(false);
    const [result, setResult] = React.useState('');
    const [error, setError] = React.useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const generatedReport = await generateReport(formData);
            setResult(generatedReport);
        } catch (error) {
            setError('Failed to generate report. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    const reportTypes = [
        'Recruitment Performance',
        'Diversity and Inclusion',
        'Employee Turnover',
        'Hiring Cost Analysis',
        'Time-to-Hire Analysis',
        'Candidate Source Effectiveness',
        'Onboarding Effectiveness',
        'Salary Competitiveness',
        'Employee Satisfaction',
        'Training and Development'
    ];
    
    return (
        <div data-name="report-generator">
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Performance Report Generator</h2>
                <p className="text-gray-600">Generate detailed HR performance reports</p>
            </div>
            
            {error && <ErrorMessage message={error} />}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">Report Type</label>
                    <select
                        className="input-field"
                        value={formData.reportType}
                        onChange={(e) => setFormData({...formData, reportType: e.target.value})}
                        required
                    >
                        <option value="">Select a report type</option>
                        {reportTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label className="block text-gray-700 mb-2">Time Period</label>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="e.g., Q1 2023, January-June 2023, Last 12 months"
                        value={formData.period}
                        onChange={(e) => setFormData({...formData, period: e.target.value})}
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700 mb-2">Key Metrics to Include</label>
                    <textarea
                        className="input-field min-h-[100px]"
                        placeholder="e.g., time-to-hire, cost-per-hire, offer acceptance rate, quality of hire"
                        value={formData.metrics}
                        onChange={(e) => setFormData({...formData, metrics: e.target.value})}
                        required
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full flex items-center justify-center"
                >
                    {loading ? (
                        <div className="flex items-center">
                            <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                            Generating...
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <i className="fas fa-file-lines mr-2"></i>
                            Generate Report
                        </div>
                    )}
                </button>
            </form>
            
            {result && (
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Generated Report:</h4>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(result);
                                alert('Content copied to clipboard!');
                            }}
                            className="text-purple-600 hover:text-purple-700 flex items-center"
                        >
                            <i className="fas fa-copy mr-1"></i>
                            Copy
                        </button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                        {result}
                    </div>
                </div>
            )}
        </div>
    );
}

function EmailTemplateGenerator() {
    const [formData, setFormData] = React.useState({
        templateType: '',
        audience: '',
        purpose: ''
    });
    const [loading, setLoading] = React.useState(false);
    const [result, setResult] = React.useState('');
    const [error, setError] = React.useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const generatedEmail = await generateEmailTemplate(formData);
            setResult(generatedEmail);
        } catch (error) {
            setError('Failed to generate email template. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    const templateTypes = [
        'Job Offer',
        'Interview Invitation',
        'Rejection',
        'Welcome Onboard',
        'Performance Review',
        'Company Announcement',
        'Event Invitation',
        'Survey Request',
        'Training Invitation',
        'Offboarding'
    ];
    
    return (
        <div data-name="email-template-generator">
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Email Template Generator</h2>
                <p className="text-gray-600">Generate professional HR email templates</p>
            </div>
            
            {error && <ErrorMessage message={error} />}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">Template Type</label>
                    <select
                        className="input-field"
                        value={formData.templateType}
                        onChange={(e) => setFormData({...formData, templateType: e.target.value})}
                        required
                    >
                        <option value="">Select a template type</option>
                        {templateTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label className="block text-gray-700 mb-2">Target Audience</label>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="e.g., Candidates, New Hires, All Employees, Managers"
                        value={formData.audience}
                        onChange={(e) => setFormData({...formData, audience: e.target.value})}
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700 mb-2">Purpose/Details</label>
                    <textarea
                        className="input-field min-h-[100px]"
                        placeholder="e.g., specific information to include, tone, key points to emphasize"
                        value={formData.purpose}
                        onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                        required
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full flex items-center justify-center"
                >
                    {loading ? (
                        <div className="flex items-center">
                            <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                            Generating...
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <i className="fas fa-envelope mr-2"></i>
                            Generate Email Template
                        </div>
                    )}
                </button>
            </form>
            
            {result && (
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Generated Email Template:</h4>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(result);
                                alert('Content copied to clipboard!');
                            }}
                            className="text-purple-600 hover:text-purple-700 flex items-center"
                        >
                            <i className="fas fa-copy mr-1"></i>
                            Copy
                        </button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                        {result}
                    </div>
                </div>
            )}
        </div>
    );
}
export default AdminAI;
