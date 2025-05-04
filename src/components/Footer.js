function Footer({ className = '' }) {
    try {
        return (
            <footer data-name="footer" className={`footer ${className}`}>
                <div data-name="footer-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div data-name="footer-content" className="py-8">
                        <div data-name="footer-grid" className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div data-name="company-info">
                                <h3 className="text-lg font-semibold mb-4">AI HR Platform</h3>
                                <p className="text-gray-600">
                                    Revolutionizing recruitment with AI-powered solutions
                                </p>
                            </div>
                            
                            <div data-name="quick-links">
                                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-gray-600 hover:text-blue-600">Home</a></li>
                                    <li><a href="#" className="text-gray-600 hover:text-blue-600">About</a></li>
                                    <li><a href="#" className="text-gray-600 hover:text-blue-600">Contact</a></li>
                                </ul>
                            </div>
                            
                            <div data-name="services">
                                <h3 className="text-lg font-semibold mb-4">Services</h3>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-gray-600 hover:text-blue-600">Job Posting</a></li>
                                    <li><a href="#" className="text-gray-600 hover:text-blue-600">Candidate Search</a></li>
                                    <li><a href="#" className="text-gray-600 hover:text-blue-600">AI Features</a></li>
                                </ul>
                            </div>
                            
                            <div data-name="contact">
                                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                                <ul className="space-y-2">
                                    <li className="text-gray-600">
                                        <i className="fas fa-envelope mr-2"></i>
                                        support@aihrplatform.com
                                    </li>
                                    <li className="text-gray-600">
                                        <i className="fas fa-phone mr-2"></i>
                                        +1 (555) 123-4567
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div data-name="footer-bottom" className="mt-8 pt-8 border-t text-center text-gray-600">
                            <p>&copy; {new Date().getFullYear()} AI HR Platform. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    } catch (error) {
        console.error('Footer render error:', error);
        reportError(error);
        return null;
    }
}
export default Footer;
