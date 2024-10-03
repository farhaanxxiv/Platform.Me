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
    const [userLayout, updateUserLayout] = useState(Layout.defaultLayout());
    const [userPage, updateUserPage] = useState(Layout.defaultPage());
    const [userSlug, updateUserSlug] = useState(null);
    const [hash, setHash] = useState(null)
    const [enableSave, setEnableSave] = useState(false)

    useEffect(() => {
        setEnableSave(true)

        if (user != null) {

            const sanitizedPage = Object.fromEntries(
                Object.entries(userPage).map(([key, value]) => [key, value !== undefined ? value : null])
            );

            // Ensure `layout` array does not contain undefined values
            const sanitizedLayout = Layout.replaceUndefinedWithNull(userLayout)

            localStorage.setItem('layout', JSON.stringify(sanitizedLayout))
            localStorage.setItem('page', JSON.stringify(sanitizedPage))
            localStorage.setItem('slug', userSlug)

            const newHash = Layout.getLocalHash();

            // if (newHash != hash) {
            setEnableSave(true)
            // }
        }


    }, [userLayout, userPage, userSlug, userData])


    async function updateLayoutInDB(uid) {


        const sanitizedPage = Object.fromEntries(
            Object.entries(userPage).map(([key, value]) => [key, value !== undefined ? value : null])
        );

        // Ensure `layout` array does not contain undefined values
        const sanitizedLayout = Layout.replaceUndefinedWithNull(userLayout)

        const newHash = Layout.generateHashPageAndLayout(sanitizedPage, sanitizedLayout, userSlug);

        const result = await User.updatePage(uid, userPage, userLayout, userSlug)
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
            const localPageData = Layout.getLocalPage()
            const localHash = Layout.getLocalHash()
            if (localPageData) {

                const localLayout = localPageData.layout
                const localPage = localPageData.page
                const localSlug = localPageData.slug

                setHash(localHash)
                updateUserLayout(localLayout)
                updateUserPage(localPage)
                updateUserSlug(localSlug)

            } else {

                console.log('set db layout after local check')
                const dbPageData = await User.getLayout(uid)
                const dbLayout = dbPageData.layout
                console.log('dbLayout after local check :', dbLayout);
                const dbPage = dbPageData.page
                console.log('dbPage after local check :', dbPage);
                const dbSlug = dbPageData.slug
                console.log('dbSlug after local check :', dbSlug);

                setHash(dbHash)
                updateUserLayout(dbLayout)
                updateUserPage(dbPage)
                updateUserSlug(dbSlug)

            }
        } else {
            //if no hash stored in db, it is a new user
            if (dbHash == null) return

            console.log('set db layout')
            const dbPageData = await User.getLayout(uid)

            const dbLayout = dbPageData.layout
            console.log('dbLayout :', dbLayout);
            const dbPage = dbPageData.page
            console.log('dbPage :', dbPage);
            const dbSlug = dbPageData.slug
            console.log('dbSlug :', dbSlug);

            let hashChanged = false

            if (dbPage == undefined) {
                updateUserPage(Layout.defaultPage())
                hashChanged = true
            } else updateUserPage(dbPage)

            if (dbLayout == undefined) {
                updateUserLayout(Layout.defaultLayout())
                hashChanged = true
            } else updateUserLayout(dbLayout)

            if (dbSlug == undefined) {
                updateUserSlug(null)
                hashChanged = true
            } else updateUserSlug(dbSlug)

            if (hashChanged) {
                setHash(Layout.generateHashPageAndLayout(dbPage, dbLayout, dbSlug))
            } else {
                setHash(dbHash)
            }

        }
    }


    return (
        <LayoutManagerContext.Provider
            value={{
                userLayout, updateUserLayout, userData, setUserData, userPage, updateUserPage, enableSave, setEnableSave, updateLayoutInDB, validateLocalAndDBLayouts, updateUserSlug, userSlug
            }}
        >
            {children}
        </LayoutManagerContext.Provider>
    );
};
