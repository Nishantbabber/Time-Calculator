import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const options = [
        '5 hours and 54 minutes ago',
        '2 hours ago from now',
        '14 days and 3 hours ago',
        '28 weeks and 2 days ago',
        '10 months and 6 days ago',
        '21 years and 1 months from today'
    ];

        // Reusable function to handle redirect and calculation
        const handleRedirect = (number, period) => {
            const formattedPeriod = period.replace(/\s+/g, '-').toLowerCase();
            const url = `/${number}-${formattedPeriod}`;
            navigate(url);
        };
    
        // Click handler for search results, recent calculations, and examples
        const handleClick = (result) => {
            const [number, ...rest] = result.split(' '); // Get number and time period
            const period = rest.join(' ');
            handleRedirect(number, period);
            setSearchResults([]);
        };    

        const handleSearch = (e) => {
            const query = e.target.value;
            setSearchQuery(query);
            if (query.length > 0) {
                const results = options.filter(option => option.toLowerCase().includes(query.toLowerCase()));
                setSearchResults(results);
            } else {
                setSearchResults([]);
            }
        };
    

    return (
        <header className="header">
                <div className="site-name">
                <a href="/">
                    Time Calculator
                </a>
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    {searchResults.length > 0 && (
                        <ul className="search-results">
                            {searchResults.map((result, index) => (
                                <li key={index} onClick={() => handleClick(result)}>{result}</li>
                            ))}
                        </ul>
                    )}
                </div>

            </header>
    );
};

export default Header;
