
import React from 'react';

function ResumeUploader({ onUpload }) {
    const [file, setFile] = React.useState(null);
    const [dragActive, setDragActive] = React.useState(false);
    const [error, setError] = React.useState('');
    const [analysis, setAnalysis] = React.useState('');
    const fileInputRef = React.useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = async (file) => {
        setFile(file);
        const text = await file.text();
        const response = await fetch('http://127.0.0.1:8000/resumes/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: text })
        });
        const result = await response.json();
        setAnalysis(result.content);
        if (onUpload) onUpload(result.content);
    };

    return (
        <div className="p-4 border rounded bg-white shadow max-w-xl mx-auto mt-6">
            <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                ref={fileInputRef}
                onChange={handleChange}
                className="mb-4"
            />
            {analysis && (
                <div className="mt-4 whitespace-pre-wrap text-sm bg-gray-100 p-3 rounded">
                    {analysis}
                </div>
            )}
        </div>
    );
}

export default ResumeUploader;
