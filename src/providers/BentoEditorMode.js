import { currentSelectedSection } from '@/states/ui_state';
import { setCurrentScreen } from 'firebase/analytics';
import { useAtom } from 'jotai';
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context object
const BentoEditorContext = createContext();

// Create a custom hook to use the BentoEditorContext
export const useBentoEditorMode = () => useContext(BentoEditorContext);

// Create a context provider component
export const BentoEditorProvider = ({ children }) => {
    // State to store the state of the section editor

    const [selectedSection, updateSelectedSection] = useAtom(currentSelectedSection)
    const [editorMode, setEditorMode] = useState('bento');
    const [editorDevice, setEditorDevice] = useState('desktop');

  

    useEffect(() => {
        updateSelectedSection({})
    }, [editorMode])

    return (
        <BentoEditorContext.Provider
            value={{
                setEditorMode,
                editorMode,
                editorDevice,
                setEditorDevice
            }}
        >
            {children}
        </BentoEditorContext.Provider>
    );
};
