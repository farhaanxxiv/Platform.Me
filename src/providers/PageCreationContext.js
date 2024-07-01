import React, { createContext, useState, useContext } from 'react';

// Create a context object
const PageCreationContext = createContext();

// Create a custom hook to use the PageCreationContext
export const useUser = () => useContext(PageCreationContext);

// Create a context provider component
export const PageCreationProvider = ({ children }) => {
    // State to store user's website name and tagline
    const [websiteName, setWebsiteName] = useState('');
    const [tagline, setTagline] = useState('');

    // Function to update user's website name
    const updateWebsiteName = (name) => {
        setWebsiteName(name);
    };

    // Function to update user's tagline
    const updateTagline = (tagline) => {
        setTagline(tagline);
    };

    return (
        <PageCreationContext.Provider
            value={{
                websiteName,
                tagline,
                updateWebsiteName,
                updateTagline,
            }}
        >
            {children}
        </PageCreationContext.Provider>
    );
};
