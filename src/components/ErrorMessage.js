function ErrorMessage({ message }) {
    try {
        return (
            <div data-name="error-message" className="error-message">
                <div className="flex items-center">
                    <i className="fas fa-exclamation-circle mr-2"></i>
                    <span>{message}</span>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ErrorMessage render error:', error);
        reportError(error);
        return null;
    }
}
export default ErrorMessage;
