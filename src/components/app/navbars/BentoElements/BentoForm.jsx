import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import FormDBUtils from "@/firebase/Form";
import { useAuth } from "@/providers/AuthProvider";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import * as Yup from 'yup';

export default function BentoForm({ form, page_user_id }) {


    const formContainer = useRef(null);


    function autoSizeForm() {
        let formHeight = null
        let formContainerHeight = null

        if (formContainer.current) {
            formHeight = formContainer.current.scrollHeight;

            const parent = formContainer.current.parentElement;  // Access the parent element
            if (parent) {
                formContainerHeight = parent.clientHeight
            }

        }


        if (formHeight > formContainerHeight) {

            const difference = (formHeight - formContainerHeight) / 40 //each row is 40px
            console.log('difference :', difference);

            if(difference > 0.3){
                
            }

        }
    }

    useEffect(() => {
        autoSizeForm()
    }, []);

    console.log('form :', form);
    const formFields = form.form_fields;
    console.log('formFields :', formFields);
    const formHeading = form.heading;
    const initialValuesFormik = {};

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [formFailure, setFormFailure] = useState(false);

    // Initialize form values
    formFields.forEach(field => {
        const ID = field.id;
        if (ID) {
            initialValuesFormik[ID] = '';
        }
    });

    // Create validation schema

    // Formik configuration
    const formik = useFormik({
        initialValues: initialValuesFormik,
        onSubmit: async (values) => {
            console.log('values :', values);

            setFormSubmitting(true);
            const formSubmission = createFormResponseObject(values);
            const formHasSubmitted = await FormDBUtils.addFormSubmission(page_user_id, formSubmission, formHeading);

            if (formHasSubmitted) {
                setFormSubmitted(true);
            } else {
                setFormFailure(true);
            }
        }
    });

    // Map responses to form fields
    function mapResponses(responses) {
        let updatingForm = formFields;

        for (let i = 0; i < updatingForm.length; i++) {
            const key = updatingForm[i].id;
            if (responses.hasOwnProperty(key)) {
                updatingForm[i].response = responses[key];
            }
        }

        return updatingForm;
    }

    // Create form response object
    function createFormResponseObject(values) {
        let formResponse = {
            form_id: form.id,
            responses: []
        };

        const fields_ids = Object.keys(values);
        const finalResponses = [];

        for (let i = 0; i < fields_ids.length; i++) {
            const responseFromFields = {};
            const key = fields_ids[i];
            const response = values[key];

            responseFromFields.field_id = key;
            responseFromFields.response = response;

            const formField = formFields.find(form => form.id === key);
            responseFromFields.question = formField.type === 'custom' ? formField.inputName : formField.type;

            finalResponses.push(responseFromFields);
        }

        formResponse.responses = finalResponses;
        formResponse.submittedAt = new Date();
        console.log('formResponse :', formResponse);

        return formResponse;
    }

    return (
        <div ref={formContainer} className="bg-[#ffffff] border-2 border-black border-solid text-2xl rounded-3xl overflow-x-hidden">
            <div style={{ transform: `${formSubmitted && 'translateX(-50%)'}` }} className="relative transition w-[200%]">
                <div className="p-6 w-[50%]">
                    <h1 className="font-semibold mb-6">{form.heading === '' || !form.heading ? 'Click Edit Icon' : form.heading}</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col gap-4 ">
                            {formFields != null ? formFields.map((field) => {
                                console.log('field :', field);
                                const { id, type, inputName, layout } = field;
                                const fieldStyle = {
                                    order: layout.y,
                                };
                                const requiredField = field.required; // Fixed typo
                                console.log('requiredField :', requiredField);

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
                                                required={requiredField}
                                            />
                                        )}
                                        {type === 'phone' && (
                                            <>
                                                {/* <Input
                                                    name={id}
                                                    variant='outline'
                                                    type='number'
                                                    placeholder='Enter Your Number'
                                                    className='w-full border-[#202020]'
                                                    onChange={formik.handleChange}
                                                    value={formik.values[id]}
                                                /> */}
                                                <Label className='block text-xs font-medium'>
                                                    &nbsp;Enter Phone Number
                                                    <PhoneInput

                                                        name={id}
                                                        value={formik.values[id]}
                                                        onChange={(value) => formik.setFieldValue(id, value)}
                                                    />
                                                </Label>

                                            </>
                                        )}
                                        {type === 'custom' && (
                                            <Input
                                                name={id}
                                                variant='outline'
                                                type='text'
                                                placeholder={inputName ? inputName : 'Enter A Title'}
                                                className='w-full border-[#202020]'
                                                onChange={formik.handleChange}
                                                value={formik.values[id]}
                                                required={requiredField}
                                            />
                                        )}
                                        {type === 'email' && (
                                            <Input
                                                name={id}
                                                variant='outline'
                                                type='email'
                                                placeholder={'Enter Your E-Mail'}
                                                className='w-full border-[#202020]'
                                                onChange={formik.handleChange}
                                                value={formik.values[id]}
                                                required={requiredField}
                                            />
                                        )}
                                    </div>
                                );
                            }) : (
                                <p>Click Here, To Add Fields</p>
                            )}
                        </div>
                        <Button variant='default' disabled={formSubmitting || formSubmitted} type='submit' className='w-full mt-4'>
                            {formFailure ? 'Please Try Again'
                                :
                                formSubmitting ?
                                    <div className="loading-spinner-white">
                                        <div className="loading-spinner-white-inner">
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
    );
}
