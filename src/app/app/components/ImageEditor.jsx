import RichTextEditor from "@/components/app/RichTextEditor"
import { useFormik } from "formik";
import { currentSelectedSection, currentUserLayout } from "@/states/ui_state"
import { useAtom } from "jotai"
import { useEffect } from "react";
import { useSectionEditor } from "@/providers/SectionEditorProvider";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useLayoutManager } from "@/providers/LayoutManager";


export default function ImageEditor({ section }) {
    const { userLayout, updateUserLayout } = useLayoutManager()

    //for updating img url

    //for assigining img src in the image editor 
    const { sectionEditorOpen } = useSectionEditor()

    const formik = useFormik({
        initialValues: {
            imgSrc: section.src,
        },
        onSubmit: values => {
            updateImageURL(values)
        },
    });

    function updateImageURL(values) {

        const finalLayout = userLayout

        for (let i = 0; i < finalLayout.length; i++) {
            if (finalLayout[i].id == section.id) {
                finalLayout[i].src = values.imgSrc
            }
        }
        console.log('Layout After Sving Image src', finalLayout)
        updateUserLayout(finalLayout)
        // localStorage.setItem('layout', JSON.stringify(finalLayout))
        toast({ 
            title: `Updated Image To : ${values.imgSrc}`
        })
    }

    return (
        <>
            <RichTextEditor />
            <form onSubmit={formik.handleSubmit}>
                <div className='h-full flex flex-col gap-y-4 mt-4'>
                    <div>
                        <Input
                            id='imgSrc'
                            name='imgSrc'
                            onChange={formik.handleChange}
                            value={formik.values.imgSrc}
                            placeholder='Enter Image URL' type='text' />
                    </div>
                    <Button type='submit' className='w-fit ml-auto'>Save</Button>
                </div>
            </form>
        </>
    )
}