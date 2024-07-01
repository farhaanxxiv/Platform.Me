import React, { createContext, useState, useContext } from 'react';

// Create a context object
const SectionEditorContext = createContext();

// Create a custom hook to use the SectionEditorContext
export const useSectionEditor = () => useContext(SectionEditorContext);

// Create a context provider component
export const SectionEditorProvider = ({ children }) => {
    // State to store the state of the section editor
    const [sectionEditorOpen, setSectionEditorOpen] = useState(false);

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
        <SectionEditorContext.Provider
            value={{
                sectionEditorOpen,
                setSectionEditorOpen,
                toggleSectionEditor,
                openSectionEditor,
                closeSectionEditor
            }}
        >
            {children}
        </SectionEditorContext.Provider>
    );
};
