import React, { useState, useEffect } from 'react';
import '../style/homepage.css';
import { useNavigate, useLocation } from 'react-router-dom';

const DateTimeCalculator = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [inputNumber, setInputNumber] = useState('');
    const [timePeriod, setTimePeriod] = useState('hours-ago-from-now');
    const [recentSearches, setRecentSearches] = useState([]);

    // Extract number and period from the URL on component mount
    useEffect(() => {
        const path = location.pathname.slice(1); // Remove the leading '/'
        const [number, ...periodParts] = path.split('-');
        const period = periodParts.join('-'); // Recombine the remaining parts for the time period

        if (number && period) {
            setInputNumber(number);
            setTimePeriod(period);
        }
    }, [location.pathname]);

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

    return (
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
    );
}

export default DateTimeCalculator;
