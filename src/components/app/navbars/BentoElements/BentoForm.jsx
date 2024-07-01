import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useFormik } from "formik"

export default function BentoForm({ form }) {

    const formFields = form.form_fields
    console.log('Form Fields While Rendering', formFields)

    const initialValuesFormik = {}

    formFields.forEach(field => {
        const ID = field.id;
        if (ID) {  // Only add if nameValue is not an empty string
            initialValuesFormik[ID] = '';  // You can customize the value here
        }
    });

    console.log('initial values', initialValuesFormik)

    const formik = useFormik({
        initialValues: initialValuesFormik,
        onSubmit: (values) => {
            alert(JSON.stringify(values))
            console.log(mapResponses(values));
            console.log(createFormResponseObject(values))
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
            reponses: []
        }

        const fields_ids = Object.keys(values)

        const finalResponses = [];

        for (let i = 0; i < fields_ids.length; i++) {
            const reponseFromFields = {};
            const key = fields_ids[i];
            const response = values[key];

            reponseFromFields.field_id = key;
            reponseFromFields.response = response;

            finalResponses.push(reponseFromFields);
        }

        formResponse.reponses = finalResponses

        return formResponse
    }

    return (
        <div className="bg-[#ffffff] border-2 border-black border-solid  text-2xl  rounded-3xl">
            <div className="p-6">
                <h1 className="font-semibold mb-6">Contact Us For Instant Reservation</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col gap-4 ">
                        {formFields != null ? formFields.map((field) => {
                            console.log(field.type)
                            return (

                                field.type == 'name' ?
                                    <Input
                                        name={field.id}
                                        variant='outline'
                                        type='text'
                                        placeholder='Enter Your Name'
                                        className='w-full border-[#202020]'
                                        onChange={formik.handleChange}
                                        value={formik.values[field.id]}
                                    />
                                    :
                                    field.type == 'phone' ?
                                        <Input
                                            name={field.id}
                                            variant='outline'
                                            type={field.type}
                                            placeholder='Enter Your Number'
                                            className='w-full border-[#202020]'
                                            onChange={formik.handleChange}
                                            value={formik.values[field.id]}
                                        />
                                        :
                                        field.type == 'custom' ?
                                            <Input
                                                name={field.id}
                                                variant='outline'
                                                type={field.type}
                                                placeholder={field.inputName}
                                                className='w-full border-[#202020]'
                                                onChange={formik.handleChange}
                                                value={formik.values[field.id]}
                                            />
                                            :
                                            <Input
                                                type='number'
                                                placeholder='Enter Your Number'
                                                className='w-full border-[#202020]'
                                            />

                            )

                        }) :
                            <p>Click Here, To Add Fields</p>
                        }
                    </div>
                    <Button type='submit' className='w-full mt-4'>Submit</Button>
                </form>
            </div>
        </div>
    )
}