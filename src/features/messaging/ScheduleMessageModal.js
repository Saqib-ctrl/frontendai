function ScheduleMessageModal({ message, onClose, onSchedule }) {
    try {
        const [scheduleMessage, setScheduleMessage] = React.useState(message || '');
        const [scheduleDate, setScheduleDate] = React.useState('');
        const [scheduleTime, setScheduleTime] = React.useState('');
        const [error, setError] = React.useState('');
        
        // Get tomorrow's date in YYYY-MM-DD format for min date
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
        
        const handleSubmit = (e) => {
            e.preventDefault();
            
            if (!scheduleMessage.trim()) {
                setError('Please enter a message');
                return;
            }
            
            if (!scheduleDate) {
                setError('Please select a date');
                return;
            }
            
            if (!scheduleTime) {
                setError('Please select a time');
                return;
            }
            
            const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
            if (scheduledDateTime <= new Date()) {
                setError('Scheduled time must be in the future');
                return;
            }
            
            onSchedule(scheduleMessage, scheduledDateTime);
        };
        
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
                    <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center">
                        <h3 className="font-medium">Schedule Message</h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-4">
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                                {error}
                            </div>
                        )}
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Message</label>
                            <textarea
                                value={scheduleMessage}
                                onChange={(e) => setScheduleMessage(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                                rows="3"
                                placeholder="Type your message here..."
                                required
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Date</label>
                            <input
                                type="date"
                                value={scheduleDate}
                                onChange={(e) => setScheduleDate(e.target.value)}
                                min={tomorrowFormatted}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>
                        
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Time</label>
                            <input
                                type="time"
                                value={scheduleTime}
                                onChange={(e) => setScheduleTime(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>
                        
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Schedule
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ScheduleMessageModal render error:', error);
        reportError(error);
        return null;
    }
}
