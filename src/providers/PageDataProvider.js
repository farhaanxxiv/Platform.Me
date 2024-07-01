import React, { createContext, useState, useContext } from 'react';

// Create a context object
const PageDataContext = createContext();

// Create a custom hook to use the PageDataContext
export const useSectionEditor = () => useContext(PageDataContext);

// Create a context provider component
export const PageDataProvider = ({ children }) => {
    // State to store the state of the section editor

    const toggleSectionEditor = () => {
        setSectionEditorOpen(!sectionEditorOpen);
    };

    const closeSectionEditor = () => {
        setSectionEditorOpen(false);
    };

    const openSectionEditor = () => {
        setSectionEditorOpen(true);
    };

    return (
        <PageDataContext.Provider
            value={{
                sectionEditorOpen,
                setSectionEditorOpen,
                toggleSectionEditor,
                openSectionEditor,
                closeSectionEditor
            }}
        >
            {children}
        </PageDataContext.Provider>
    );
};
