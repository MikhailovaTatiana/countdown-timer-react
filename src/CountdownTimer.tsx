import { useState, useEffect, useRef } from "react";

function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [customTime, setCustomTime] = useState<string>('60');
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft(sec => sec - 1);
            }, 1000);
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [isActive, timeLeft]);

    const handleReset = () => {
        setIsActive(false);
        setTimeLeft(parseInt(customTime));
    }

    const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseInt(e.target.value);
        if (!isNaN(time) && time > 0) {
            setCustomTime(e.target.value);
            setTimeLeft(time);
            setIsActive(false);
        }
    };

    return (
        <div>
            <h1>Nedräkningstimer</h1>
            {timeLeft === 0 ? (
                <h2>Tidens slut!</h2>
            ) : (
                <h2>{timeLeft} sek kvar</h2>
            )}
            <section className='btns-container'>
                <button
                    disabled={timeLeft === 0 || isActive}
                    onClick={() => setIsActive(true)}
                >
                    Starta
                </button>
                <button
                    disabled={timeLeft === 0 || !isActive}
                    onClick={() => setIsActive(false)}
                >
                    Pausa
                </button>
                <button
                    disabled={timeLeft === 60 || timeLeft === parseInt(customTime)}
                    onClick={handleReset}
                >
                    Återställ
                </button>
            </section>
            <div className="input-container">
                <span>Starttid: </span>
                <input
                    type="number"
                    id="customTime"
                    value={customTime}
                    onChange={handleCustomTimeChange}
                    disabled={isActive}
                />
                <span> sek</span>
            </div>
        </div>
    );
}

export default CountdownTimer;
