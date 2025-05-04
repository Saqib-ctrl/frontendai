import React, { useState } from 'react';

export default function PasswordInput({ value, onChange }) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative">
            <input
                type={visible ? 'text' : 'password'}
                className="input-field pr-10"
                value={value}
                onChange={onChange}
                required
            />
            <button
                type="button"
                onClick={() => setVisible(!visible)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            >
                <i className={`fas ${visible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
        </div>
    );
}
