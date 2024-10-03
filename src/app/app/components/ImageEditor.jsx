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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import GlobalUtils from "@/utils/GlobalUtils";


export default function ImageEditor({ section }) {
    const { userLayout, updateUserLayout } = useLayoutManager()
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [downloadURL, setDownloadURL] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const { toggleSectionEditor } = useSectionEditor()

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
        setDownloadURL(null)
    };
    //for updating img url

    //for assigining img src in the image editor 

    const formik = useFormik({
        initialValues: {
            imgSrc: section.src,
        },
        onSubmit: values => {
            updateImageURL(values)
            toggleSectionEditor()
        },
    });

    function getFileExtensionFromName(fileName) {
        return fileName.split('.').pop();

    }

    function updateImageURL(values) {

        const finalLayout = userLayout

        for (let i = 0; i < finalLayout.length; i++) {
            if (finalLayout[i].id == section.id) {
                finalLayout[i].src = downloadURL != null ? downloadURL : values.imgSrc
            }
        }
        console.log('Layout After Sving Image src', finalLayout)
        updateUserLayout(finalLayout)

    }

    const handleUpload = async () => {
        if (selectedImage) {
            setUploading(true);
            //for image name selectedImage.name
            const imageRef = ref(storage, `BentoImages/${GlobalUtils.uuid()}.${getFileExtensionFromName(selectedImage.name)}`);
            const uploadTask = uploadBytesResumable(imageRef, selectedImage);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    // You can also update a state variable to reflect the progress
                    setUploadProgress(progress);
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.error('Error uploading image: ', error);
                    setUploading(false);
                },
                async () => {
                    // Handle successful uploads on complete
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    setDownloadURL(url);
                    formik.initialValues.imgSrc = url; // Make sure to set the URL here, not the downloadURL variable
                    setUploading(false);
                }
            );
        }
    };
    return (
        <>
            {/* <RichTextEditor /> */}
            <form onSubmit={formik.handleSubmit}>
                <div className='h-full flex flex-col gap-y-4 mt-4'>
                    <div>
                        <Label>
                            Image URL
                            <Input
                                id='imgSrc'
                                name='imgSrc'
                                onChange={formik.handleChange}
                                value={formik.values.imgSrc}
                                placeholder='Enter Image URL' type='text' />
                        </Label>
                    </div>
                    <div className="text-center font-bold">
                        OR
                    </div>
                    <div>
                        <Label >
                            Choose An Image
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Label>
                        {preview && (
                            <div>
                                <Image
                                    src={preview}
                                    alt="Selected"
                                    width={200}
                                    height={200}
                                    className="block mx-auto my-2 rounded-2xl object-contain"
                                />
                                <Button className='mx-auto w-fit block' onClick={removeImage}>Remove Image</Button>
                            </div>
                        )}
                        {selectedImage && !uploading && (
                            <Button className='block mx-auto mt-2' onClick={handleUpload}>Upload Image</Button>
                        )}

                        {uploading && <Progress className='mt-2' value={uploadProgress} />}

                        {downloadURL && (
                            <div>
                                <p className="font-semibold mt-2 text-center text-lg">Image Uploaded ✅</p>
                            </div>
                        )}
                    </div>
                    <Button type='submit' className='w-full'>Save</Button>

                </div>
            </form>
        </>
    )
}