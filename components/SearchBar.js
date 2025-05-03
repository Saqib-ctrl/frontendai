function SearchBar() {
    try {
        const [query, setQuery] = React.useState('');
        const [category, setCategory] = React.useState('all');
        const [results, setResults] = React.useState([]);
        const [isSearching, setIsSearching] = React.useState(false);
        const [showResults, setShowResults] = React.useState(false);
        const [error, setError] = React.useState('');
        
        const searchRef = React.useRef(null);
        
        // Close search results when clicking outside
        React.useEffect(() => {
            function handleClickOutside(event) {
                if (searchRef.current && !searchRef.current.contains(event.target)) {
                    setShowResults(false);
                }
            }
            
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [searchRef]);

        const handleSearch = async (e) => {
            e.preventDefault();
            
            if (!query.trim()) return;
            
            setIsSearching(true);
            setError('');
            setShowResults(true);
            
            try {
                // Simulate API call with mock data
                await new Promise(resolve => setTimeout(resolve, 800));
                
                // Generate mock results based on query and category
                const mockResults = {
                    all: [
                        { id: 1, type: 'job', title: `Senior ${query} Developer`, company: 'Tech Corp' },
                        { id: 2, type: 'candidate', name: `John ${query}`, title: 'Software Engineer' },
                        { id: 3, type: 'company', name: `${query} Industries`, location: 'New York, NY' }
                    ],
                    jobs: [
                        { id: 1, type: 'job', title: `Senior ${query} Developer`, company: 'Tech Corp' },
                        { id: 4, type: 'job', title: `${query} Designer`, company: 'Creative Agency' },
                        { id: 5, type: 'job', title: `${query} Manager`, company: 'Enterprise Inc' }
                    ],
                    candidates: [
                        { id: 2, type: 'candidate', name: `John ${query}`, title: 'Software Engineer' },
                        { id: 6, type: 'candidate', name: `Jane ${query}`, title: 'UX Designer' },
                        { id: 7, type: 'candidate', name: `Mike ${query}`, title: 'Project Manager' }
                    ],
                    companies: [
                        { id: 3, type: 'company', name: `${query} Industries`, location: 'New York, NY' },
                        { id: 8, type: 'company', name: `${query} Tech`, location: 'San Francisco, CA' },
                        { id: 9, type: 'company', name: `${query} Solutions`, location: 'Austin, TX' }
                    ]
                };
                
                setResults(mockResults[category] || []);
            } catch (error) {
                setError('Search failed. Please try again.');
            } finally {
                setIsSearching(false);
            }
        };
        
        const handleResultClick = (result) => {
            // Handle navigation based on result type
            if (result.type === 'job') {
                window.location.hash = `jobs?id=${result.id}`;
            } else if (result.type === 'candidate') {
                window.location.hash = `candidates?id=${result.id}`;
            } else if (result.type === 'company') {
                window.location.hash = `companies?id=${result.id}`;
            }
            
            setShowResults(false);
        };

        return (
            <div data-name="search-container" className="relative" ref={searchRef}>
                <form onSubmit={handleSearch} className="flex">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-search text-gray-400"></i>
                        </div>
                        <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border-t border-b border-gray-300 bg-white text-gray-700 py-2 px-3 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">All</option>
                        <option value="jobs">Jobs</option>
                        <option value="candidates">Candidates</option>
                        <option value="companies">Companies</option>
                    </select>
                    
                    <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 border-l-0 rounded-r-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                        disabled={isSearching}
                    >
                        {isSearching ? (
                            <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                        ) : (
                            <i className="fas fa-search mr-2"></i>
                        )}
                        Search
                    </button>
                </form>
                
                {/* Search results dropdown */}
                {showResults && (
                    <div className="absolute mt-1 w-full bg-white shadow-lg rounded-md overflow-hidden z-10 border border-gray-200">
                        {error ? (
                            <div className="p-4 text-red-500">{error}</div>
                        ) : results.length > 0 ? (
                            <ul>
                                {results.map((result) => (
                                    <li 
                                        key={`${result.type}-${result.id}`}
                                        className="cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                                        onClick={() => handleResultClick(result)}
                                    >
                                        <div className="p-3 flex items-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 
                                                ${result.type === 'job' ? 'bg-blue-100 text-blue-600' : 
                                                 result.type === 'candidate' ? 'bg-green-100 text-green-600' : 
                                                 'bg-purple-100 text-purple-600'}`}
                                            >
                                                <i className={`fas ${
                                                    result.type === 'job' ? 'fa-briefcase' : 
                                                    result.type === 'candidate' ? 'fa-user' : 
                                                    'fa-building'
                                                }`}></i>
                                            </div>
                                            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                                <div className="font-medium">
                                                    {result.type === 'job' ? result.title : 
                                                     result.type === 'candidate' ? result.name : 
                                                     result.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {result.type === 'job' ? result.company : 
                                                     result.type === 'candidate' ? result.title : 
                                                     result.location}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : query && !isSearching ? (
                            <div className="p-4 text-gray-500">No results found</div>
                        ) : null}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('SearchBar render error:', error);
        reportError(error);
        return null;
    }
}
