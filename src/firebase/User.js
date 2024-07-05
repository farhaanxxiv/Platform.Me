import { db } from "@/app/layout";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";


const User = {
    isUser: async (uid) => {
        const docRef = doc(db, "Users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log('Found User')
            return docSnap.data()
        } else {
            console.log("No such document!");
            await User.createUser(uid)
            await User.addEmptyLayout(uid)
            return null
        }
    },
    addEmptyLayout: async (uid) => {

        const pageID = 'page-' + uid
        try {

            await setDoc(doc(db, "Pages", pageID), {
                layout: null,
                page_id: pageID,
                page: {
                    page_name: null,
                    page_tagline: null
                }
            },);

            return true

        } catch (e) {
            console.log(e)
            return false
        }
    },
    createUser: async (uid) => {

        try {

            await setDoc(doc(db, "Users", uid), {
                uid: uid,
                page_id: 'page-' + uid,
                last_update: null,
            });

            return true

        } catch (e) {
            console.log(e)
            return false
        }
    },

    updatePage: async (uid, page, layout) => {

        console.log('page, layout :', page, layout);

        const pageID = 'page-' + uid
        console.log('pageID :', pageID);
        console.log('uid :', uid);
        const docRef = doc(db, "Pages", pageID);

        try {
            const sanitizedPage = Object.fromEntries(
                Object.entries(page).map(([key, value]) => [key, value !== undefined ? value : null])
            );

            // Ensure `layout` array does not contain undefined values
            const sanitizedLayout = layout.map(item =>
                // Ensure each item in the array does not contain undefined values
                Object.fromEntries(
                    Object.entries(item).map(([key, value]) => [key, value !== undefined ? value : null])
                )
            );

            console.log('sanitizedLayout :', sanitizedLayout);

            await updateDoc(docRef, {
                page: sanitizedPage,
                layout: sanitizedLayout
            });

            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    },

    getLayout: async (uid) => {

        const pageID = 'page-' + uid
        const docRef = doc(db, "Pages", pageID);

        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const dbData = docSnap.data()
            const page_data = {
                page: dbData.page,
                layout: dbData.layout
            }
            return page_data

        } else {
            await User.createUser(uid)
            return null
        }
    },

    updateLayout: async (uid, layout) => {
        const pageID = 'page-' + uid

        const docRef = doc(db, "Pages", pageID);

        try {

            await updateDoc(docRef, {
                layout: layout,
            });

            return true

        } catch (e) {
            console.log(e)
            return false
        }
    },
    updateHash: async (uid, hash) => {

        const docRef = doc(db, "Users", uid);

        try {

            await updateDoc(docRef, {
                last_update: hash,
            });

            return true

        } catch (e) {
            console.log(e)
            return false
        }
    },
}

export default User