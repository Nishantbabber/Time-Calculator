import React, { useState, useEffect } from 'react';
import '../style/homepage.css';
import { useNavigate } from 'react-router-dom';
import Header from './header';



const HomePage = () => {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [inputNumber, setInputNumber] = useState('');
    const [timePeriod, setTimePeriod] = useState('hours-ago-from-now');
    const [recentSearches, setRecentSearches] = useState([]);


    const sectionsWithExamples = [
        // {
        //     section: 'Date and time calculators',
        //     examples: [
        //         'Seconds ago from now calculator',
        //         'Minutes ago from now calculator',
        //         'Hours ago from now calculator',
        //         'Days ago from today calculator',
        //         'Weeks ago from today calculator',
        //         'Months ago from today calculator',
        //         'Years ago from today calculator',
        //     ]
        // },
        {
            section: 'Hours and minutes ago/from now',
            examples: [
                '5 hours and 54 minutes ago',
                '11 hours and 57 minutes from now',
                '6 hours and 14 minutes from now',
                '12 hours and 5 minutes ago',
                '10 hours and 12 minutes ago',
            ]
        },
        {
            section: 'Days and hours ago/from now',
            examples: [
                '14 days and 3 hours ago',
                '3 days and 13 hours ago',
                '19 days and 9 hours from now',
                '16 days and 7 hours ago',
                '3 days and 22 hours ago',
            ]
        },
        // {
        //     section: 'Days hours and minutes ago/from now',
        //     examples: [
        //         '21 days 1 hour and 45 minutes from now',
        //         '26 days 14 hours and 10 minutes from now',
        //         '18 days 22 hours and 34 minutes ago',
        //         '14 days 16 hours and 52 minutes from now',
        //         '7 days 14 hours and 15 minutes ago',
        //     ]
        // },
        {
            section: 'Weeks and days ago/from now',
            examples: [
                '28 weeks and 2 days ago',
                '13 weeks and 29 days from today',
                '28 weeks and 21 days from today',
                '10 weeks and 22 days from today',
                '15 weeks and 6 days ago',
            ]
        },
        {
            section: 'Months and days ago/from now',
            examples: [
                '10 months and 6 days ago',
                '6 months and 9 days from today',
                '4 months and 29 days ago',
                '3 months and 12 days ago',
                '7 months and 8 days ago',
            ]
        },
        {
            section: 'Months and weeks ago/from now',
            examples: [
                '2 months and 3 weeks ago',
                '11 months and 3 weeks from today',
                '3 months and 3 weeks ago',
                '3 months and 2 weeks from today',
                '9 months and 1 weeks ago',
            ]
        },
        {
            section: 'Years and months ago/from now',
            examples: [
                '21 years and 1 months from today',
                '33 years and 2 months ago',
                '15 years and 8 months from today',
                '30 years and 8 months from today',
                '1 years and 6 months ago',
            ]
        },
        // {
        //     section: 'Decimal hours ago/from now',
        //     examples: [
        //         '72.3 hours from now',
        //         '11.9 hours from now',
        //         '2.61 hours from now',
        //         '9.42 hours from now',
        //         '26.7 hours from now',
        //     ]
        // },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => date.toLocaleTimeString('en-US', { hour12: true });
    const formatDate = (date) => date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputNumber) return;

        const search = `${inputNumber} ${timePeriod}`;
        setRecentSearches([search, ...recentSearches]);
        handleRedirect(inputNumber, timePeriod);
    };

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
    };


    return (
        <div className="App">
            <Header/>
            <div className="clock-container">
                <h1>Current Time</h1>
                <div className="current-time">
                    <h2>{formatTime(currentTime)}</h2>
                    <p>{formatDate(currentTime)}</p>
                </div>
            </div>

            <div className="calculator-container">
                <h2>Date and Time Calculator</h2>
                <form onSubmit={handleSubmit} className="calculator-form">
                    <div className="input-section">
                        <input
                            type="number"
                            placeholder="Enter number"
                            value={inputNumber}
                            onChange={(e) => setInputNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="dropdown-section">
                        <select
                            value={timePeriod}
                            onChange={(e) => setTimePeriod(e.target.value)}
                        >
                            <option value="seconds-ago-from-now">seconds ago from now</option>
                            <option value="minutes-ago-from-now">minutes ago from now</option>
                            <option value="hours-ago-from-now">hours ago from now</option>
                            <option value="days-ago-from-today">days ago from today</option>
                            <option value="weeks-ago-from-today">weeks ago from today</option>
                            <option value="months-ago-from-today">months ago from today</option>
                            <option value="years-ago-from-today">years ago from today</option>
                            <option value="seconds-from-now">seconds from now</option>
                            <option value="minutes-from-now">minutes from now</option>
                            <option value="hours-from-now">hours from now</option>
                            <option value="days-from-today">days from today</option>
                            <option value="weeks-from-today">weeks from today</option>
                            <option value="months-from-today">months from today</option>
                            <option value="years-from-today">years from today</option>
                        </select>
                    </div>
                    <div className="button-section">
                        <button type="submit">Calculate</button>
                    </div>
                </form>
            </div>

            

            {/* Recent Calculations Section */}
            <div className="recent-calculations">
                <h2>Recent Calculations</h2>
                {recentSearches.length > 0 ? (
                    <ul>
                        {recentSearches.map((search, index) => (
                            <li key={index} onClick={() => handleClick(search)}>{search}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No recent searches yet.</p>
                )}
            </div>

            <div className="additional-sections">
                <h2>Explore Time Calculations</h2>
                {sectionsWithExamples.map((sectionItem, index) => (
                    <div key={index} className="section">
                        <h3>{sectionItem.section}</h3>
                        <ul>
                            {sectionItem.examples.map((example, i) => (
                                <li key={i} onClick={() => handleClick(example)}>{example}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className="footer">
                <p>© {new Date().getFullYear()} Time Calculator. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default HomePage;
