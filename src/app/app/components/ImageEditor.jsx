import RichTextEditor from "@/components/app/RichTextEditor"
import { useFormik } from "formik";
import { currentSelectedSection, currentUserLayout } from "@/states/ui_state"
import { useAtom } from "jotai"
import { useEffect, useState } from "react";
import { useSectionEditor } from "@/providers/SectionEditorProvider";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useLayoutManager } from "@/providers/LayoutManager";
import { storage } from "@/app/layout";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


export default function ImageEditor({ section }) {
    const { userLayout, updateUserLayout } = useLayoutManager()
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [downloadURL, setDownloadURL] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        setPreview(null);
    };
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
                finalLayout[i].src = downloadURL != null ? downloadURL : values.imgSrc
            }
        }
        console.log('Layout After Sving Image src', finalLayout)
        updateUserLayout(finalLayout)
        // localStorage.setItem('layout', JSON.stringify(finalLayout))
        toast({
            title: `Updated Image To : ${values.imgSrc}`
        })
    }

    const handleUpload = async () => {
        if (selectedImage) {
            setUploading(true);
            const imageRef = ref(storage, `BentoImages/${selectedImage.name}`);
            try {
                await uploadBytes(imageRef, selectedImage);
                const url = await getDownloadURL(imageRef);
                setDownloadURL(url);
                formik.initialValues.imgSrc = downloadURL
                alert('Image uploaded successfully!');
            } catch (error) {
                console.error('Error uploading image: ', error);
                alert('Failed to upload image.');
            }
            setUploading(false);
        }
    };

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
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {preview && (
                            <div>
                                <img
                                    src={preview}
                                    alt="Selected"
                                    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                                />
                                <button onClick={removeImage}>Remove Image</button>
                            </div>
                        )}
                        {selectedImage && !uploading && (
                            <button onClick={handleUpload}>Upload Image</button>
                        )}
                        {uploading && <p>Uploading...</p>}
                        {downloadURL && (
                            <div>
                                <p>Image uploaded successfully!</p>
                                <a href={downloadURL} target="_blank" rel="noopener noreferrer">View Image</a>
                            </div>
                        )}
                    </div>
                    <Button type='submit' className='w-fit ml-auto'>Save</Button>
                </div>
            </form>
        </>
    )
}