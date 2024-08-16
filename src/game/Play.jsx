import { useEffect, useState } from "react";
import "./style.css";
export default function Play() {
    const [number, setNumber] = useState('');
    const [numbers, setNumbers] = useState([]);
    const [counter, setCounter] = useState(0.0);
    const [increment, setIncrement] = useState(1)
    const [showsecond, setShowsecond] = useState(false);
    const [show1, setShow1] = useState(false);
    const [callhd, setCallhd] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [expectedNumber, setExpectedNumber] = useState(1);
    const containerWidth = 500;
    const containerHeight = 400;
    useEffect(() => {
        let interval;
        if (showsecond) {
            interval = setInterval(() => {
                setCounter((prevCounter) => parseFloat((prevCounter + 0.1).toFixed(1)));
            }, 100);
        }
        else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    },);
    useEffect(() => {
        if (show1 && increment <= number) {
            setNumbers((pre) => [...pre, increment]);
            setIncrement((prever) => (prever + 1));
        }
    }, [show1, increment])
    const handleStart = () => {
        setShow1(true);
        setShowsecond(true);
        setCallhd(true);

    }
    const handleRestar = () => {
        setCounter(0);
        setNumbers([]);
        setIncrement(1);
        setExpectedNumber(1);
    }
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
                setExpectedNumber((prev) => (prev !== null ? prev + 1 : null));
            }, 1000);
        } else {
            setShowsecond(false);
            setSuccessMessage('Game over');
        }
    };

    return (
        <div>
            <p>Play Gamer</p>
            <input
                value={number}
                onChange={e => setNumber(e.target.value)}
            />
            <p>Time: {counter} s</p>
            {callhd ? (
                <p onClick={handleRestar}
                style={{
                    border: '1px solid #000',
                    margin: '10px',
                    padding: '10px',
                    display: 'inline-block',
                    borderRadius:'8px',
                    background:'#2A0DBF',
                    color: '#FFFFFF',
                    fontWeight:'700',
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
                        borderRadius:'8px',
                        background:'gray',
                        color: '#FFFFFF',
                        fontWeight:'700',
                        fontSize: 18,
                    }}
                >Play</div>
            )}
            <div style={{color:'#000,',fontSize:15, fontWeight: '700'}}>
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
                {numbers.map((item, index) => {
                    const { top, left } = getRandomPosition(containerWidth, containerHeight);
                    return (
                        <p
                            key={index}
                            onClick={() => handleRemoveNumber(item)}
                            className="body"
                            style={{
                                top: `${top}%`,
                                left: `${left}%`,
                                fontSize: 10
                            }}
                        >
                            {item}
                        </p>
                    );
                })}
            </div>
        </div>
    )
}

const getRandomPosition = (containerWidth, containerHeight) => {
    const x = Math.random() * (containerWidth - 50); 
    const y = Math.random() * (containerHeight - 50);
    return { top: y * 100 / containerHeight, left: x * 100 / containerWidth };
};