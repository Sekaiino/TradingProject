import { useState, useEffect } from "react";

const getWindowDimesions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
}

const useWindowDimensions = () => {
    const[windowDimensions, setWindowDimensions] = useState(getWindowDimesions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimesions());
        }
        window.addEventListener('resize', handleResize());
        return _ => window.removeEventListener('resize', handleResize());
    }, [])
    return windowDimensions;
}

export default useWindowDimensions;