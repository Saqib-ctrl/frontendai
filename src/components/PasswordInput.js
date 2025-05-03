function PasswordInput({ value, onChange }) {
    try {
        const [showPassword, setShowPassword] = React.useState(false);

        return (
            <div data-name="password-input" className="relative">
                <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                    type={showPassword ? 'text' : 'password'}
                    className="input-field pr-10"
                    value={value}
                    onChange={onChange}
                    placeholder="Enter password"
                />
                <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
            </div>
        );
    } catch (error) {
        console.error('PasswordInput render error:', error);
        reportError(error);
        return null;
    }
}
