// hooks/useAsync.js
import { useState, useEffect, useCallback } from 'react';

const useAsync = (asyncFunction, immediate = true) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const execute = useCallback(() => {
        setLoading(true);
        setResult(null);
        setError(null);

        return asyncFunction()
            .then(response => {
                setResult(response);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [asyncFunction]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return { execute, loading, result, error };
};

export default useAsync;
