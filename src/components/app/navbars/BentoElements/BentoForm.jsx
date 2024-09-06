import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FormDBUtils from "@/firebase/Form";
import { useAuth } from "@/providers/AuthProvider"
import FormUtils from "@/utils/FormUtils";
import { useFormik } from "formik"
import { useState } from "react";
import { MdOutlineDone } from "react-icons/md";


export default function BentoForm({ form, page_user_id }) {
    console.log('form :', form);
    const formFields = form.form_fields
    const formHeading = form.heading
    const initialValuesFormik = {}

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [formFailure, setFormFailure] = useState(false);


    formFields.forEach(field => {
        const ID = field.id;
        if (ID) {  // Only add if nameValue is not an empty string
            initialValuesFormik[ID] = '';  // You can customize the value here
        }
    });


    const formik = useFormik({
        initialValues: initialValuesFormik,
        onSubmit: async (values) => {
            setFormSubmitting(true)
            // console.log(mapResponses(values));
            const formSubmission = createFormResponseObject(values)
            const formHasSubmitted = await FormDBUtils.addFormSubmission(page_user_id, formSubmission, formHeading)

            if (formHasSubmitted) {
                setFormSubmitted(true)
            } else {
                setFormFailure(true)
            }


        }
    })

    function mapResponses(responses) {

        let updatingForm = formFields;

        for (let i = 0; i < updatingForm.length; i++) {
            const key = updatingForm[i].id; // Assuming each form field has a 'name' property
            if (responses.hasOwnProperty(key)) {
                updatingForm[i].response = responses[key]; // Update the form field value with the response
            }
        }

        return updatingForm;
    }

    function createFormResponseObject(values) {
        let formResponse = {
            form_id: form.id,
            responses: []
        }

        const fields_ids = Object.keys(values)

        const finalResponses = [];

        for (let i = 0; i < fields_ids.length; i++) {
            const reponseFromFields = {};
            const key = fields_ids[i];
            const response = values[key];

            reponseFromFields.field_id = key;
            reponseFromFields.response = response;

            const formField = formFields.find(form => form.id === key);
            reponseFromFields.question = formField.type == 'custom' ? formField.inputName : formField.type;

            finalResponses.push(reponseFromFields);
        }

        formResponse.responses = finalResponses
        formResponse.submittedAt = new Date()
        console.log('formResponse :', formResponse);

        return formResponse
    }

    return (
        <div className="bg-[#ffffff] border-2 border-black border-solid text-2xl rounded-3xl overflow-x-hidden">
            <div style={{ transform: `${formSubmitted && 'translateX(-50%)'}` }} className="relative transition w-[200%]">

                <div className="p-6 w-[50%]">
                    <h1 className="font-semibold mb-6">{form.heading == '' || !form.heading ? 'Click Edit Icon' : form.heading}</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col gap-4 ">
                            {formFields != null ? formFields.map((field) => {
                                const { id, type, inputName, layout } = field;
                                const fieldStyle = {
                                    order: layout.y, // Use the y coordinate to set the order in the flex container
                                };

                                return (
                                    <div key={id} className="form-field" style={fieldStyle}>
                                        {type === 'name' && (
                                            <Input
                                                name={id}
                                                variant='outline'
                                                type='text'
                                                placeholder='Enter Your Name'
                                                className='w-full border-[#202020]'
                                                onChange={formik.handleChange}
                                                value={formik.values[id]}
                                            />
                                        )}
                                        {type === 'phone' && (
                                            <Input
                                                name={id}
                                                variant='outline'
                                                type='text' // Assuming phone input is text, adjust if needed
                                                placeholder='Enter Your Number'
                                                className='w-full border-[#202020]'
                                                onChange={formik.handleChange}
                                                value={formik.values[id]}
                                            />
                                        )}
                                        {type === 'custom' && (
                                            <Input
                                                name={id}
                                                variant='outline'
                                                type='text'
                                                placeholder={inputName}
                                                className='w-full border-[#202020]'
                                                onChange={formik.handleChange}
                                                value={formik.values[id]}
                                            />
                                        )}
                                    </div>
                                );
                            }) : (
                                <p>Click Here, To Add Fields</p>
                            )}

                        </div>
                        <Button disabled={formSubmitting || formSubmitted} type='submit' className='w-full mt-4'>
                            {formFailure ? 'Please Try Again'
                                :
                                formSubmitting ?
                                    <div class="loading-spinner-white">
                                        <div class="loading-spinner-white-inner">
                                            <div></div>
                                        </div>
                                    </div>
                                    : 'Submit'}

                        </Button>
                    </form>
                </div>

                <div className="rounded-lg bg-[#bbdabb] absolute w-[50%] top-0 right-0 h-full flex items-center justify-center">
                    <div className="w-fit h-fit text-center">
                        <p className="font-semibold text-4xl mb-4">
                            Form Has Been Submitted
                        </p>
                        <MdOutlineDone className="bg-[#9fe09f] block mx-auto rounded-full border-black border-2 p-1" strikethroughThickness={20} size={50} color="black" />
                    </div>
                </div>


            </div>
        </div>
    )
}