import { currentSelectedSection } from '@/states/ui_state';
import { setCurrentScreen } from 'firebase/analytics';
import { useAtom } from 'jotai';
import React, { createContext, useState, useContext, useEffect } from 'react';
import useWindowSize from './useWindowSize';

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
    const [sideBarOpen, setSideBarOpen] = useState(false)
    const { width } = useWindowSize()

    useEffect(() => {
        if (width < 500) {
            setEditorDevice('mobile')
        }
    }, [width]);



    useEffect(() => {
        updateSelectedSection({})
    }, [editorMode])

    const toggleSideBar = () => {
        setSideBarOpen(!sideBarOpen);
    };
    return (
        <BentoEditorContext.Provider
            value={{
                setEditorMode,
                editorMode,
                editorDevice,
                setEditorDevice,
                selectedSection,
                toggleSideBar,
                sideBarOpen
            }}
        >
            {children}
        </BentoEditorContext.Provider>
    );
};
