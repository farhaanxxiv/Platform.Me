import { toast } from '@/components/ui/use-toast';
import Layout from '@/firebase/Layout';
import User from '@/firebase/User';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthProvider';

// Create a context object
const LayoutManagerContext = createContext();

// Create a custom hook to use the LayoutManagerContext
export const useLayoutManager = () => useContext(LayoutManagerContext);

// Create a context provider component
export const LayoutManagerProvider = ({ children }) => {
    // State to store user's website name and tagline
    const { user } = useAuth()

    const [userData, setUserData] = useState(null)
    const [userLayout, updateUserLayout] = useState([]);
    const [userPage, updateUserPage] = useState({
        page_name: null,
        page_tagline: null
    });
    const [hash, setHash] = useState(null)
    const [enableSave, setEnableSave] = useState(false)

    useEffect(() => {
        if (user != null) {

            localStorage.setItem('layout', JSON.stringify(userLayout))
            localStorage.setItem('page', JSON.stringify(userPage))

            const newHash = Layout.getLocalHash();

            if (newHash != hash) {
                setEnableSave(true)
            }
        }


    }, [userLayout, userPage])


    useEffect(() => {
        console.log('Layout updated')
    }, [userLayout])

    async function updateLayoutInDB(uid) {

        //generate Hash for page and layout
        const pageData = { page: userPage, layout: userLayout }
        const newHash = Layout.generateHash(pageData);


        const result = await User.updatePage(uid, userPage, userLayout)
        await User.updateHash(uid, newHash)

        if (result) {
            toast({
                title: `Saved Layout`
            })
            setEnableSave(false)
        }
    }


    async function validateLocalAndDBLayouts() {

        console.log('checking local & db')

        const uid = user.uid
        const localHash = await Layout.getLocalHash()
        const dbHash = await Layout.getDBHash(undefined, uid)

        console.log('local & db hash', localHash, dbHash)
        if (localHash == dbHash) {
            console.log('same, proceed')
        } else {
            if (dbHash == null) return

            console.log('set db layout')
            const dbPageData = await User.getLayout(uid)
            const dbLayout = dbPageData.layout
            console.log('dbLayout :', typeof dbLayout);
            const dbPage = dbPageData.page
            console.log('dbPage :', dbPage);

            setHash(dbHash)
            updateUserLayout(dbLayout)
            updateUserPage(dbPage)

        }
    }
    return (
        <LayoutManagerContext.Provider
            value={{
                userLayout, updateUserLayout, userData, setUserData, userPage, updateUserPage, enableSave, setEnableSave, updateLayoutInDB, validateLocalAndDBLayouts
            }}
        >
            {children}
        </LayoutManagerContext.Provider>
    );
};
