import { useEffect, useState } from "react"
export default function Play() {
    const [number, setNumber] = useState('');
    const [numbers, setNumbers] = useState([]);
    const [counter, setCounter] = useState(0.0);
    const [increment, setIncrement] = useState(1)
    const [showsecond, setShowsecond] = useState(false);
    const [show1, setShow1] = useState(false);
    const [callhd, setCallhd] = useState(false);
    // const [width,setWidth] = useState(window.innerWidth)
    // huhuhu
    const [expectedNumber, setExpectedNumber] = useState(1);
    useEffect(() => {
        let interval;
        if (show1) {
            interval = setInterval(() => {
                setCounter((prevCounter) => parseFloat((prevCounter + 0.1).toFixed(1)));
            }, 100);
        }
        else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    },);
    useEffect(()=> {
        if(showsecond && increment <= number){
            setNumbers((pre)=> [...pre,increment]);
            setIncrement((prever)=>(prever + 1));
        }
    },[showsecond,increment])
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
                setNumbers((prevNumbers) => prevNumbers.filter(num => num !== numToRemove));
                setExpectedNumber((prev) => (prev !== null ? prev + 1 : null));
            }, 1000);

        } else {
            setShow1(false);
            alert('game over')
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
                 <p onClick={handleRestar}>Restart</p>
            ):(
                <div
                onClick={handleStart}
            >LetStart</div>  
            )}
            <div style={{
                 width: '500px',
                 height: '400px',
                 borderWidth: '1px',
                 borderColor: '#000',
                 borderStyle: 'solid',
                 position: 'relative',
                 margin: '0 auto',
                 display: 'flex',
                 flexWrap: 'wrap',
                 justifyContent: 'center',
                 alignItems: 'center',
                 overflow: 'hidden'
            }}>
                {numbers.map((num, index) => {
                    const { top, left } = getRandomPosition(500, 330);
                    return (
                        <p
                            key={index}
                            onClick={() => handleRemoveNumber(num)}
                            style={{
                              
                                cursor: 'pointer',
                                top,
                                left,
                            }}
                        >
                            {num}
                        </p>
                    );
                })}
            </div>
        </div>
    )
}
const getRandomPosition = (containerWidth, containerHeight) => {
    const x = Math.random() * (containerWidth - 20);
    const y = Math.random() * (containerHeight - 20);
    return { top: `${y}px`, left: `${x}px` };
};