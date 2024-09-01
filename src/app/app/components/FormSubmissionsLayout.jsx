import { Button } from "@/components/ui/button"
import FormDBUtils from "@/firebase/Form"
import { useAuth } from "@/providers/AuthProvider"
import { useEffect, useState } from "react"

export default function FormSubmissionsLayout() {

    const [formSubmissions, setFormSubmissions] = useState([])
    const [selectedFormID, setSelectedFormID] = useState(null)

    const [allForms, setAllForms] = useState([])


    const { user } = useAuth()


    async function getAllForms() {
        const forms = await FormDBUtils.getAllForms(user.uid)
        setAllForms(forms)
    }
    useEffect(() => {
        getAllForms()
    }, [])


    async function getFormSubmissions(formID) {
        setSelectedFormID(formID)
        const submissions = await FormDBUtils.getFormSubmissions(user.uid, formID)
        setFormSubmissions(submissions)
    }

    return (
        <>
            <div className="flex gap-x-4">
                <div>
                    <h1 className="font-semibold">All Forms</h1>

                    {
                        allForms.length != 0 ?
                            allForms.map((form) => {

                                const formID = form.form_id
                                const formHeading = form.form_heading

                                return (
                                    <div key={formID}>
                                        <Button onClick={() => getFormSubmissions(formID)}>{formHeading}</Button>
                                    </div>
                                )

                            }) :
                            <p>Make a submission To view here</p>
                    }
                </div>
                <div className="relative w-full">
                    <h1 className="font-semibold">Form Submissions</h1>
                    <div className="space-y-2">
                        {selectedFormID != null &&
                            <Button className='text-xs absolute top-4 right-4' onClick={() => getFormSubmissions(selectedFormID)}>Refresh</Button>
                        }
                        {
                            formSubmissions.length != 0 &&
                            formSubmissions.map((submission, count) => {

                                const formID = submission.form_id
                                const responses = submission?.responses
                                console.log('responses :', responses);
                                return (
                                    <>

                                        <div key={formID} className="w-fit p-4 bg-gray-200 flex flex-col gap-y-2 divide-y-2 divide-black">
                                            Submission #{count + 1}
                                            {responses.length != 0 &&
                                                responses.map((response) => {

                                                    return (
                                                        <div key={response.field_id}>
                                                            <p className="font-semibold text-xs">{response.question}</p>
                                                            <p className="text-sm">{response.response}</p>
                                                        </div>
                                                    )
                                                })}
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )

}