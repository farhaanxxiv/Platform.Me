'use client'

import { Button } from "@/components/ui/button"
import FormDBUtils from "@/firebase/Form"
import { AuthProvider, useAuth } from "@/providers/AuthProvider"
import { useEffect, useState } from "react"
import { SiMicrosoftexcel } from "react-icons/si";
import { IoIosRefresh } from "react-icons/io";
import * as XLSX from 'xlsx'

export default function Forms() {

    return (
        <FormPage />
    )
    
}



function FormPage() {

    const [formSubmissions, setFormSubmissions] = useState([])
    const [selectedFormID, setSelectedFormID] = useState(null)

    const [allForms, setAllForms] = useState([])

    const { user } = useAuth()

    async function getAllForms() {
        const forms = await FormDBUtils.getAllForms(user.uid)
        setAllForms(forms)
    }
    useEffect(() => {
        if (user != null)
            getAllForms()
    }, [user])


    async function getFormSubmissions(formID) {
        setSelectedFormID(formID)
        const submissions = await FormDBUtils.getFormSubmissions(user.uid, formID)
        setFormSubmissions(submissions)
    }

    function exportToExcel() {

        //sheet heading for each question
        const uniqueQuestions = Array.from(
            new Set(
                formSubmissions.flatMap(form => form.responses.map(response => response.question))
            )
        );

        //make excel JSON
        const excelRows = formSubmissions.map(form => {
            const row = { submittedAt: new Date(form.submittedAt.seconds * 1000).toISOString() };

            form.responses.forEach(response => {
                row[response.question] = response.response;
            });

            uniqueQuestions.forEach(question => {
                if (!row[question]) {
                    row[question] = '';
                }
            });

            return row;
        });

        //add unique questions to excel header
        const headers = ['submittedAt', ...uniqueQuestions];

        const worksheet = XLSX.utils.json_to_sheet(excelRows, { header: headers });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Forms"); //sheet name
        XLSX.writeFile(workbook, 'platform.me_form_responses.xlsx');
    };

    return (
        <>
            <section className="flex flex-col md:flex-row gap-y-12 gap-x-4 py-8 md:py-24 mt-16">
                <div>
                    <div className="mb-2">
                        <h1 className="font-semibold text-2xl">Your Forms</h1>
                        <p className="text-xs font-semibold">*Click to view/download form submissions</p>
                    </div>
                    {
                        allForms.length != 0 ?
                            <div className="bg-gray-100 border border-[#e0e0e0] rounded space-y-3 w-full p-2">
                                {allForms.map((form) => {

                                    const formID = form.form_id
                                    const formHeading = form.form_heading

                                    return (
                                        <div key={formID}>
                                            <div className="shadow-[2px_2px_black] hover:bg-gray-300 hover:cursor-pointer transition-all bg-gray-200 p-1 border border-[#707070] rounded" onClick={() => getFormSubmissions(formID)}><p className="text-lg md:text-md font-semibold">{formHeading}</p></div>
                                        </div>
                                    )

                                })}
                            </div>
                            :
                            <p className="font-semibold text-xl">Your forms should have a submission </p>
                    }
                </div>
                {
                    formSubmissions.length != 0 &&

                    <div className="relative w-full">
                        <h1 className="font-semibold text-2xl">Submissions</h1>
                        <div className="space-y-2 mt-4">
                            {selectedFormID != null &&
                                <div className="flex gap-x-2 absolute top-0 right-4">
                                    <Button onClick={() => exportToExcel()} className='flex bg-[#0dbf4a]'>Export&nbsp;&nbsp;<SiMicrosoftexcel color="" size={20} /></Button>
                                    <Button className='text-xs px-2 ' onClick={() => getFormSubmissions(selectedFormID)}><IoIosRefresh size={20} /></Button>
                                </div>
                            }
                            {
                                formSubmissions.map((submission, count) => {

                                    const formID = submission.form_id
                                    const responses = submission?.responses
                                    console.log('responses :', responses);
                                    return (
                                        <>

                                            <div key={formID} className="w-full rounded-lg border border-[#c0c0c0] shadow-[2px_2px_black]  p-4 bg-gray-200 flex flex-col gap-y-2  ">

                                                <p className="text-md font-semibold">Submission #{count + 1}</p>
                                                <div className="divide-y divide-black ">
                                                    {responses.length != 0 &&
                                                        responses.map((response) => {

                                                            return (
                                                                <div className="py-2" key={response.field_id}>
                                                                    <p className="font-semibold text-xs">{response.question}</p>
                                                                    <p className="text-sm">{response.response}</p>
                                                                </div>
                                                            )
                                                        })}
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                }

            </section>
        </>
    )

}