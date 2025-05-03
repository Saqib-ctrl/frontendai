function Resume() {
    try {
        const [extractedText, setExtractedText] = React.useState('');
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');

        const handleFileUpload = async (file) => {
            setLoading(true);
            try {
                const reader = new FileReader();
                
                reader.onload = async (event) => {
                    try {
                        let text = '';
                        
                        if (file.type === 'application/pdf') {
                            const pdfData = new Uint8Array(event.target.result);
                            const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
                            
                            for (let i = 1; i <= pdf.numPages; i++) {
                                const page = await pdf.getPage(i);
                                const content = await page.getTextContent();
                                text += content.items.map(item => item.str).join(' ') + '\n';
                            }
                        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                            const result = await mammoth.extractRawText({ arrayBuffer: event.target.result });
                            text = result.value;
                        }
                        
                        setExtractedText(text);
                    } catch (error) {
                        setError('Failed to extract text from file');
                    } finally {
                        setLoading(false);
                    }
                };

                reader.onerror = () => {
                    setError('Failed to read file');
                    setLoading(false);
                };

                reader.readAsArrayBuffer(file);
            } catch (error) {
                setError('Failed to process file');
                setLoading(false);
            }
        };

        return (
            <div data-name="resume-page" className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">Resume Parser</h1>

                        {error && <ErrorMessage message={error} />}

                        <div className="mb-6">
                            <ResumeUploader onUpload={handleFileUpload} />
                        </div>

                        {loading ? (
                            <Loading />
                        ) : extractedText ? (
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h2 className="text-xl font-semibold mb-4">Extracted Content:</h2>
                                <pre className="whitespace-pre-wrap font-mono text-sm">
                                    {extractedText}
                                </pre>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Resume page render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load resume page" />;
    }
}
export default Resume;
