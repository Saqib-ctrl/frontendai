function CandidateRankingTable({ candidates, onViewCandidate }) {
    try {
        return (
            <div data-name="candidate-ranking-table" className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rank
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Candidate
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Match Score
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Skills
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Experience
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Education
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {candidates.map((candidate, index) => (
                            <tr key={candidate.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-medium">
                                        {index + 1}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img 
                                                className="h-10 w-10 rounded-full" 
                                                src={candidate.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}`} 
                                                alt={candidate.name} 
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                                            <div className="text-sm text-gray-500">{candidate.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                                            <div 
                                                className={`h-2.5 rounded-full ${
                                                    candidate.score >= 80 ? 'bg-green-500' : 
                                                    candidate.score >= 60 ? 'bg-yellow-500' : 
                                                    'bg-red-500'
                                                }`}
                                                style={{ width: `${candidate.score}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-medium">{candidate.score}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                                            <div 
                                                className="h-2.5 rounded-full bg-blue-500"
                                                style={{ width: `${candidate.skillsMatch}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm">{candidate.skillsMatch}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                                            <div 
                                                className="h-2.5 rounded-full bg-purple-500"
                                                style={{ width: `${candidate.experienceMatch}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm">{candidate.experienceMatch}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                                            <div 
                                                className="h-2.5 rounded-full bg-indigo-500"
                                                style={{ width: `${candidate.educationMatch}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm">{candidate.educationMatch}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                        onClick={() => onViewCandidate(candidate)}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } catch (error) {
        console.error('CandidateRankingTable render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load candidate ranking table" />;
    }
}
