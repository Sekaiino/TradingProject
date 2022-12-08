import { useState, useEffect } from 'react';
import axios from 'axios';

const useRequest = (method: string, url: string, params?: object) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortContent = new AbortController();

        axios({
            url: url,
            method: method.toUpperCase(),
            ...(params ? {data: params} : {}),
            signal: abortContent.signal
        })
        .then(res => {
            if(!(res.statusText === 'OK')) {
                throw Error('Could not fetch the data for that resource');
            }
            return res.data;
        })
        .then((data) => {
            setData(data);
            setIsPending(false);
        })
        .catch((err) => {
            if(err.name === 'AbortError') {
                console.log("Fetch aborted");
            } else {
                setIsPending(false);
                setError(err.message);
            }
        })

        return () => abortContent.abort();
    }, [method, url]);

    return { data, isPending, error };
}

export { useRequest }