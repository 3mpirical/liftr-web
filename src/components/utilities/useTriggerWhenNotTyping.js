import { useState, useEffect, useRef } from "react";


const useTriggerWhenNotTyping = (value, delay, callback) => {
    if(!delay || typeof delay !== "Number") delay = 500;
    
    const [timer, setTimer] = useState(null);
    let firstRender = useRef(true);
    
    useEffect(() => {
        if(firstRender.current) firstRender.current = false;
        else {
            clearTimeout(timer);
            
            setTimer(setTimeout(() => {
                callback();
            }, delay));
        }
    }, [value]);
};


export { useTriggerWhenNotTyping };