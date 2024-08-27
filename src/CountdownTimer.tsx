import { useState, useEffect, useRef } from "react";

function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState<number>(10);
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
            <h2>{timeLeft} sek kvar</h2>
            <button onClick={() => setIsActive(true)}>Starta</button>
            <button onClick={() => setIsActive(false)}>Pausa</button>
            <button onClick={() => setTimeLeft(10)}>Återställ</button>
        </div>
    );
}

export default CountdownTimer;
