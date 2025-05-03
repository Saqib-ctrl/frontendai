function Home() {
    try {
        return (
            <div data-name="home-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div data-name="hero-section" className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        AI-Powered HR Recruitment Platform
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Transform your recruitment process with artificial intelligence
                    </p>
                    <div data-name="cta-buttons" className="flex justify-center space-x-4">
                        <a href="#register" className="btn btn-primary">
                            Get Started
                        </a>
                        <a href="#about" className="btn btn-secondary">
                            Learn More
                        </a>
                    </div>
                </div>

                <div data-name="features-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div data-name="feature-card" className="card">
                        <div className="text-blue-600 mb-4">
                            <i className="fas fa-robot text-3xl"></i>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">AI-Powered Matching</h3>
                        <p className="text-gray-600">
                            Match the right candidates with the right jobs using advanced AI algorithms
                        </p>
                    </div>

                    <div data-name="feature-card" className="card">
                        <div className="text-blue-600 mb-4">
                            <i className="fas fa-file-contract text-3xl"></i>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Smart Documents</h3>
                        <p className="text-gray-600">
                            Automatically generate professional bios, job posts, and contracts
                        </p>
                    </div>

                    <div data-name="feature-card" className="card">
                        <div className="text-blue-600 mb-4">
                            <i className="fas fa-chart-line text-3xl"></i>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Analytics</h3>
                        <p className="text-gray-600">
                            Get insights into your recruitment process with detailed analytics
                        </p>
                    </div>
                </div>

                <div data-name="about-section" id="about" className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div data-name="about-content">
                            <h3 className="text-xl font-semibold mb-4">
                                Next-Generation Recruitment
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                                    <span>AI-powered candidate recommendations</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                                    <span>Automated document generation</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                                    <span>Smart filtering and matching</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                                    <span>Comprehensive analytics</span>
                                </li>
                            </ul>
                        </div>
                        <div data-name="about-image" className="flex items-center justify-center">
                            <img 
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                                alt="Team collaboration" 
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>

                <div data-name="cta-section" className="text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Transform Your Recruitment?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Join thousands of companies already using our platform
                    </p>
                    <a href="#register" className="btn btn-primary">
                        Start Free Trial
                    </a>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Home render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load home page" />;
    }
}
export default Home;
