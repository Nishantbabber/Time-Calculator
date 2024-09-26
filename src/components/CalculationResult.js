import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import '../style/CalculationResult.css';
import Header from './header';
import DateTimeCalculator from './dateTimeCalculator';


const CalculationResult = () => {
    const { calculationPath } = useParams();
    const [calculatedTime, setCalculatedTime] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update the current time every second

        return () => clearInterval(interval); // Clean up on unmount
    }, []);

    useEffect(() => {
        const updateCalculatedTime = () => {
            try {
                // Updated regex to capture multiple components
                const regex = /(\d+)-?([a-zA-Z]+)(?:-and-(\d+)-?([a-zA-Z]+))?(?:-and-(\d+)-?([a-zA-Z]+))?/;
                const match = calculationPath.match(regex);

                if (!match) {
                    setErrorMessage("Invalid path format");
                    return;
                }

                const now = new Date();
                let totalMilliseconds = 0;

                // Check for the first time component (days, hours, minutes)
                if (match[1] && match[2]) {
                    const inputNumber1 = parseInt(match[1], 10);
                    const timePeriod1 = match[2];

                    switch (timePeriod1) {
                        case 'seconds':
                            totalMilliseconds += inputNumber1 * 1000;
                            break;
                        case 'minutes':
                            totalMilliseconds += inputNumber1 * 60 * 1000;
                            break;
                        case 'hours':
                            totalMilliseconds += inputNumber1 * 60 * 60 * 1000;
                            break;
                        case 'days':
                            totalMilliseconds += inputNumber1 * 24 * 60 * 60 * 1000;
                            break;
                        case 'weeks':
                            totalMilliseconds += inputNumber1 * 7 * 24 * 60 * 60 * 1000;
                            break;
                        case 'months':
                            now.setMonth(now.getMonth() - inputNumber1);
                            if (now.getDate() > new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()) {
                                now.setDate(new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate());
                            }
                            break;
                        case 'years':
                            const originalDate = now.getDate();
                            now.setFullYear(now.getFullYear() - inputNumber1);
                            if (originalDate > new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()) {
                                now.setDate(new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate());
                            }
                            break;
                        default:
                            setErrorMessage("Unsupported time period");
                            return;
                    }
                }

                // Check for the second time component (optional)
                if (match[3] && match[4]) {
                    const inputNumber2 = parseInt(match[3], 10);
                    const timePeriod2 = match[4];

                    switch (timePeriod2) {
                        case 'seconds':
                            totalMilliseconds += inputNumber2 * 1000;
                            break;
                        case 'minutes':
                            totalMilliseconds += inputNumber2 * 60 * 1000;
                            break;
                        case 'hours':
                            totalMilliseconds += inputNumber2 * 60 * 60 * 1000;
                            break;
                        case 'days':
                            totalMilliseconds += inputNumber2 * 24 * 60 * 60 * 1000;
                            break;
                        case 'weeks':
                            totalMilliseconds += inputNumber2 * 7 * 24 * 60 * 60 * 1000;
                            break;
                        case 'months':
                            now.setMonth(now.getMonth() - inputNumber2);
                            if (now.getDate() > new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()) {
                                now.setDate(new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate());
                            }
                            break;
                        case 'years':
                            const originalDate = now.getDate();
                            now.setFullYear(now.getFullYear() - inputNumber2);
                            if (originalDate > new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()) {
                                now.setDate(new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate());
                            }
                            break;

                        default:
                            setErrorMessage("Unsupported time period");
                            return;
                    }
                }

                // Check for the third time component (optional)
                if (match[5] && match[6]) {
                    const inputNumber3 = parseInt(match[5], 10);
                    const timePeriod3 = match[6];

                    switch (timePeriod3) {
                        case 'seconds':
                            totalMilliseconds += inputNumber3 * 1000;
                            break;
                        case 'minutes':
                            totalMilliseconds += inputNumber3 * 60 * 1000;
                            break;
                        case 'hours':
                            totalMilliseconds += inputNumber3 * 60 * 60 * 1000;
                            break;
                        case 'days':
                            totalMilliseconds += inputNumber3 * 24 * 60 * 60 * 1000;
                            break;
                        case 'weeks':
                            totalMilliseconds += inputNumber3 * 7 * 24 * 60 * 60 * 1000;
                            break;
                        case 'months':
                            now.setMonth(now.getMonth() - inputNumber3);
                            if (now.getDate() > new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()) {
                                now.setDate(new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate());
                            }
                            break;
                        case 'years':
                            const originalDate = now.getDate();
                            now.setFullYear(now.getFullYear() - inputNumber3);
                            if (originalDate > new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()) {
                                now.setDate(new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate());
                            }
                            break;

                        default:
                            setErrorMessage("Unsupported time period");
                            return;
                    }
                }

                // Update the calculated time based on the totalMilliseconds
                const finalTime = new Date(now.getTime() - totalMilliseconds);
                setCalculatedTime(finalTime);
            } catch (error) {
                console.error("Error in calculation:", error);
                setErrorMessage("An error occurred during calculation");
                setCalculatedTime(null);
            }
        };

        // Update calculated time every second to keep it real-time
        const interval = setInterval(updateCalculatedTime, 1000);
        return () => clearInterval(interval); // Clean up on unmount
    }, [calculationPath]);


    const formatTime = (date) => date.toLocaleTimeString('en-US', { hour12: true });
    const formatDate = (date) => date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="calculation-result">
            <Header />
            <h1>Calculation Result</h1>
            {errorMessage && <p>{errorMessage}</p>}
            {calculatedTime ? (
                <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px', width: '100%' }}>
                    <div>
                        <h1>What time was {calculationPath.replace(/-/g, ' ')}?</h1>
                        <h2>{formatTime(calculatedTime)}</h2>
                        <p style={{ color: '#003366', fontWeight: 'bold' }}>{formatDate(calculatedTime)}</p>
                        <p>
                            Current Time: {formatTime(currentTime)} {formatDate(currentTime)}
                        </p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <DateTimeCalculator />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', border: '1px solid #ddd', backgroundColor: '#fff' }}>
                        <div>
                            <h4>Time {calculationPath.replace(/-/g, ' ')}:</h4>
                            <p>{formatTime(calculatedTime)}</p>
                            <p>{formatDate(calculatedTime)}</p>
                            <p>{Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
                        </div>
                        <div>
                            <h4>Current Time:</h4>
                            <p>{formatTime(currentTime)}</p>
                            <p>{formatDate(currentTime)}</p>
                            <p>{Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                        <div className="clock-container">
                            <h3>Current Time</h3>
                            <Clock value={currentTime} renderNumbers={true} hourHandLength={70} minuteHandLength={90} secondHandLength={95} />
                        </div>
                        <div className="clock-container">
                            <h3>Time {calculationPath.replace(/-/g, ' ')}:</h3>
                            <Clock value={calculatedTime} renderNumbers={true} hourHandLength={70} minuteHandLength={90} secondHandLength={95} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                        <div className="current-clock">
                            <h3>Current Time:</h3>
                            <div className="dig">
                                <div className="overflow">
                                    <div className="dig-day">{currentTime.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}</div>
                                    <div className="dig-date">{currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}</div>
                                    <div className="dig-year">{currentTime.getFullYear()}</div>
                                </div>
                                <div className="overflow">
                                    <div className="dig-time">{formatTime(currentTime)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="calculated-clock">
                            <h3>Time {calculationPath.replace(/-/g, ' ')}:</h3>
                            <div className="dig">
                                <div className="overflow">
                                    <div className="dig-day">{calculatedTime.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}</div>
                                    <div className="dig-date">{calculatedTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}</div>
                                    <div className="dig-year">{calculatedTime.getFullYear()}</div>
                                </div>
                                <div className="overflow">
                                    <div className="dig-time">{formatTime(calculatedTime)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ) : (
                <p>Loading result...</p>
            )}
        </div>
    );
};

export default CalculationResult;