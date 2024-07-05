// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/app/layout';
import { onAuthStateChanged } from 'firebase/auth';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter()


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setLoading(false);
                // router.push('/app')

            } else {
                setUser(null);
                setLoading(false);
                router.push('/')
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
