import React, { useEffect, useLayoutEffect, useState, useMemo, memo } from "react";
import "./style.css";
import { getRandomPosition } from "./utils";

const NumberComponent = memo(({ item, position, onRemove }) => (
    <p
        onClick={() => onRemove(item)}
        className="body"
        style={{
            top: `${position.top}%`,
            left: `${position.left}%`,
            fontSize: 10,
            position: 'absolute'
        }}
    >
        {item}
    </p>
));

export default function Play() {
    const [number, setNumber] = useState('');
    const [numbers, setNumbers] = useState([]);
    const [positions, setPositions] = useState({});
    const [counter, setCounter] = useState(0.0);
    const [increment, setIncrement] = useState(1);
    const [showsecond, setShowsecond] = useState(false);
    const [show1, setShow1] = useState(false);
    const [callhd, setCallhd] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [expectedNumber, setExpectedNumber] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');
    const containerWidth = 500;
    const containerHeight = 400;

    useLayoutEffect(() => {
        let interval;
        if (showsecond) {
            interval = setInterval(() => {
                setCounter((prevCounter) => parseFloat((prevCounter + 0.1).toFixed(1)));
            }, 100);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [showsecond]);

    useEffect(() => {
        if (show1 && increment <= number) {
            const newNumber = increment;
            setNumbers((prev) => [...prev, newNumber]);
            const { top, left } = getRandomPosition(containerWidth, containerHeight);
            setPositions((prevPositions) => ({
                ...prevPositions,
                [newNumber]: { top, left }
            }));

            setIncrement((prevIncrement) => prevIncrement + 1);
        }
    }, [show1, increment]);

    const handleStart = () => {
        if (!number) {
            setErrorMessage('Please enter a number before starting!');
            return;
        }
        setErrorMessage('');
        setShow1(true);
        setShowsecond(true);
        setCallhd(true);
    };

    const handleRestar = () => {
        setCounter(0);
        setNumbers([]);
        setPositions({});
        setIncrement(1);
        setExpectedNumber(1);
        setSuccessMessage('');
    };

    const handleRemoveNumber = (numToRemove) => {
        if (numToRemove === expectedNumber) {
            setTimeout(() => {
                setNumbers((prevNumbers) => {
                    const newNumbers = prevNumbers.filter(num => num !== numToRemove);
                    if (newNumbers.length === 0) {
                        setSuccessMessage('ALL CLEARED');
                        setShowsecond(false);
                    }
                    return newNumbers;
                });
                setExpectedNumber(prev => prev + 1);
            }, 1000);
        } else {
            setShowsecond(false);
            setSuccessMessage('GAME OVER');
        }
    };

    const memoizedNumbers = useMemo(() => {
        return numbers.map((item) => (
            <NumberComponent
                key={item}
                item={item}
                position={positions[item]}
                onRemove={handleRemoveNumber}
            />
        ));
    }, [numbers, positions]);

    return (
        <div>
            <p>Play Gamer</p>
            <input
                className="input"
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <p>Time:</p>
                <p >{counter} s</p>
            {callhd ? (
                <p onClick={handleRestar}
                    style={{
                        border: '1px solid #000',
                        margin: '10px',
                        padding: '10px',
                        display: 'inline-block',
                        borderRadius: '8px',
                        background: '#2A0DBF',
                        color: '#FFFFFF',
                        fontWeight: '700',
                        fontSize: 18,
                    }}
                >Restart</p>
            ) : (
                <div
                    onClick={handleStart}
                    style={{
                        border: '1px solid #000',
                        margin: '10px',
                        padding: '10px',
                        display: 'inline-block',
                        borderRadius: '8px',
                        background: 'gray',
                        color: '#FFFFFF',
                        fontWeight: '700',
                        fontSize: 18,
                    }}
                >Play</div>
            )}
            <div style={{ color: '#000', fontSize: 15, fontWeight: '700' }}>
                {successMessage && <p>{successMessage}</p>}
            </div>
            <div style={{
                width: `${containerWidth}px`,
                height: `${containerHeight}px`,
                borderWidth: '1px',
                borderColor: '#000',
                borderStyle: 'solid',
                position: 'relative',
                margin: '0 auto',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: '5px',
            }}>
                {memoizedNumbers}
            </div>
        </div>
    );
}
