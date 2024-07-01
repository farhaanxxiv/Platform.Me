import FormUtils from '@/utils/FormUtils';
import React, { createContext, useState, useContext, useLayoutEffect } from 'react';

// Create a context object
const FormEditorContext = createContext();

// Create a custom hook to use the FormEditorContext
export const useFormEditor = () => useContext(FormEditorContext);

// Create a context provider component
export const FormEditorProvider = ({ children }) => {
    // State to store the state of the section editor
    const [formEditorOpen, setFormEditorOpen] = useState(false);
    const [formFields, setFormFields] = useState([]);


    const toggleFormEditor = () => {
        setFormEditorOpen(!formEditorOpen);
    };

    const closeFormEditor = () => {
        setFormEditorOpen(false);
    };

    const openFormEditor = () => {
        setFormEditorOpen(true);
    };


    useLayoutEffect(() => {
        console.log('Form Fields', formFields)
    }, [formFields])


    return (
        <FormEditorContext.Provider
            value={{
                formEditorOpen,
                setFormEditorOpen,
                toggleFormEditor,
                setFormFields,
            }}
        >
            {children}
        </FormEditorContext.Provider>
    );
};
 