'use client'
import { user_company, user_company_tagline } from "@/states/user_state"
import { useAtom } from "jotai"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useFormik } from "formik";
import * as Yup from 'yup';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { tagline_open } from "@/states/ui_state"



export default function EnterTagline() {
    const [pageName, setPageName] = useAtom(user_company)
    const [pageTagline, setPageTagline] = useAtom(user_company_tagline)
    const [taglinePopup, setTaglinePopup] = useAtom(tagline_open)


    // const [taglineOpened, setTaglineOpened] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setTaglinePopup(true)

        }
            , 1000)
    }, [])


    const TagLineSchema = Yup.object().shape({
        tagline: Yup.string()
            .min(2, 'Too Short!')
            .max(200, 'Too Long!')
    });

    const formik = useFormik({
        initialValues: {
            tagline: ''
        },
        validationSchema: TagLineSchema,
        onSubmit: values => {
            setPageTagline(values.tagline)
            console.log(values)
        },
    });

    return (

        <AlertDialog open={taglinePopup} onOpenChange={setTaglinePopup}>

            <AlertDialogContent>
                <form onSubmit={formik.handleSubmit}>

                    <AlertDialogHeader>
                        <AlertDialogTitle>{pageName} 🎉</AlertDialogTitle>
                        <AlertDialogDescription>
                            A simple tagline will make user's know more about your page
                            <br />
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <Input
                        className='my-4'
                        id="tagline"
                        name="tagline"
                        onChange={formik.handleChange}
                        value={formik.values.tagline}
                        type="text"
                        placeholder='Enter A Tagline For Your Page' />
                    {formik.errors.tagline && formik.touched.tagline ? <div className="text-[red] text-xs mt-2">{formik.errors.tagline}</div> : null}

                    <AlertDialogFooter>
                        <AlertDialogCancel type='button' variant="outline" onClick={() => { setPageTagline('skip') }} className=''>Skip</AlertDialogCancel>
                        <AlertDialogAction type='submit' className=''>Submit</AlertDialogAction>
                    </AlertDialogFooter>
                </form>

            </AlertDialogContent>

        </AlertDialog>

    )

}