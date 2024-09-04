import { db } from "@/app/layout";
import FormUtils from "@/utils/FormUtils";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";


const FormDBUtils = {

    'addFormSubmission': async (uid, formResponse, formHeading) => {

        try {

            const formID = formResponse.form_id

            const submissionID = FormUtils.generateSubmissionID()

            //to add submission
            const cityRef = doc(db, 'Forms', uid, 'AllForms', formID, 'Submissions', submissionID);
            await setDoc(cityRef, formResponse, { merge: true });

            //this is only required when creating the form, for now let it be 
            //cost : 1 additional write per submission
            //to add form id in the document
            const formDetailsRef = doc(db, 'Forms', uid, 'AllForms', formID);
            await setDoc(formDetailsRef, { form_id: formID, form_heading: formHeading }, { merge: true });
        } catch (e) {
            console.error(e)
            return false
        }

        return true

    },


    'getAllForms': async (uid) => {
        console.log('uid :', uid);

        try {

            const formsCollectionRef = collection(db, "Forms", uid, 'AllForms');

            const docSnap = await getDocs(formsCollectionRef);

            let forms = []
            docSnap.forEach(doc => {
                forms.push(doc.data())
            });
            console.log('forms :', forms);

            return forms

        } catch (error) {

            console.error("Error fetching documents: ", error);
            return null

        }
    },
    'getFormSubmissions': async (uid, formID) => {

        try {

            const formSubmissionsRef = collection(db, "Forms", uid, 'AllForms', formID, 'Submissions');

            const docSnap = await getDocs(formSubmissionsRef);

            let forms = []
            docSnap.forEach(doc => {
                forms.push(doc.data())
            });

            return forms

        } catch (error) {

            console.error("Error fetching documents: ", error);
            return null

        }

    }


}


export default FormDBUtils