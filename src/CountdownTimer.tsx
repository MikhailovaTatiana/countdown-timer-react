import { useState, useEffect, useRef } from "react";

function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const [isActive, setIsActive] = useState<boolean>(false);
    const timerRef = useRef<number>(0);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((sec) => sec - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isActive, timeLeft]);

    return (
        <div>
            <h1>Nedräkningstimer</h1>
            {timeLeft === 0 ? (
                <h2>Tidens slut!</h2>
            ) : (
                <h2>{timeLeft} sek kvar</h2>
            )}
            <section className="btns-container">
                <button disabled={timeLeft === 0 || isActive} onClick={() => setIsActive(true)}>Starta</button>
                <button disabled={timeLeft === 0 || !isActive} onClick={() => setIsActive(false)}>Pausa</button>
                <button disabled={timeLeft === 60} onClick={() => setTimeLeft(60)}>Återställ</button>
            </section>
        </div>
    );
} 

export default CountdownTimer;
