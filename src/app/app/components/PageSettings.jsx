'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { user_company, user_company_tagline } from "@/states/user_state"
import PageUtils from "@/utils/PageUtils"
import { useAtom } from "jotai"
import { Check, Divide, Pencil, X } from "lucide-react"
import { useEffect, useLayoutEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { AuthProvider, useAuth, useAuthContext } from "@/providers/AuthProvider"
import User from "@/firebase/User"
import { LayoutManagerProvider, useLayoutManager } from "@/providers/LayoutManager"
import config from "../../../../config"
import { auth } from "@/app/layout"
import { Label } from "@/components/ui/label"


import { BsGlobe } from "react-icons/bs";
import { BentoEditorProvider, useBentoEditorMode } from "@/providers/BentoEditorMode"
import { GiHamburgerMenu } from "react-icons/gi";


export default function PageSettings() {

    const { userPage, updateUserPage, updateUserSlug, userSlug } = useLayoutManager()

    const { user, loading } = useAuth();

    const [pageName, setPageName] = useState('');
    const [pageTagline, setPageTagline] = useState('');
    const [pageSlug, setPageSlug] = useState('');

    useEffect(() => {
        console.log('pageName useEffect :', pageName);

    }, [pageName])

    useLayoutEffect(() => {
        setPageName(PageUtils.getPageName())
        console.log('PageUtils.getPageName() :', PageUtils.getPageName());
        setPageTagline(PageUtils.getPageTagline())
        setPageSlug(PageUtils.getPageSlug())
    }, [])

    useEffect(() => {
        if (userPage) {
            setPageName(userPage.page_name);
            console.log('userPage.page_name :', userPage.page_name);
            setPageTagline(userPage.page_tagline);
        }
    }, [userPage]);

    useEffect(() => {
        if (userSlug) {
            setPageSlug(userSlug);
        }
    }, [userSlug]);


    const handleTaglineChange = (event) => {
        setPageTagline(event.target.value);
    };

    const handlePageNameChange = (event) => {
        setPageName(event.target.value);
    };
    const handlePageSlugChange = (event) => {
        setPageSlug(event.target.value);
    };


    const [pageNameEdit, setPageNameEdit] = useState(false)
    const [pageTaglineEdit, setPageTaglineEdit] = useState(false)
    const [pageSlugEdit, setPageSlugEdit] = useState(false)

    function setPageNameGlobal() {
        const newPageName = document.getElementById('page_name_input').value;

        // Update local states
        setPageName(newPageName);
        setPageNameEdit(false);

        // Create a new object by spreading the current userPage and updating the page_name
        const updatedUserPage = {
            ...userPage, // Copy the existing properties
            page_name: newPageName // Update only the page_name
        };

        // Call updateUserPage with the new updated object
        updateUserPage(updatedUserPage);

        // Log the updated user_page
        console.log('updatedUserPage:', updatedUserPage);
    }


    function setPageTaglineGlobal() {
        const newPageTagline = document.getElementById('page_tagline_input').value;

        // Update local states
        setPageTagline(newPageTagline);
        setPageTaglineEdit(false);

        // Create a new object by spreading the current userPage and updating the page_tagline
        const updatedUserPage = {
            ...userPage, // Copy the existing properties
            page_tagline: newPageTagline // Update only the page_tagline
        };

        // Call updateUserPage with the updated object
        updateUserPage(updatedUserPage);
    }

    function setPageSlugGlobal() {
        const newPageSlug = document.getElementById('page_slug_input').value;

        // Update local states
        setPageSlug(newPageSlug);
        setPageSlugEdit(false);

        // Call updateUserSlug to update the slug
        updateUserSlug(newPageSlug);
    }


    return (
        <section className="pt-6 px-5 md:px-24 py-4  border-black">

            <h2 className=' text-2xl mb-2 font-semibold'>Page Info :</h2>

            <div className="flex flex-col md:flow-row justify-between">

                <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex flex-col gap-y-2">
                        <div className="border border-black shadow-[2px_2px_black] rounded-lg p-2 w-fit">
                            {pageNameEdit ?
                                <div className="flex gap-1">
                                    <Input
                                        placeholder='Enter Name Of Page'
                                        className='text-xs p-2 w-fit'
                                        id='page_name_input'
                                        value={pageName}
                                        onChange={handlePageNameChange}
                                    />
                                    <X onClick={() => setPageNameEdit(false)} className="my-auto" />
                                    <Check onClick={() => setPageNameGlobal()} className="my-auto" />
                                </div>
                                :
                                <div className="flex gap-2">
                                    {pageName != null ? <h3 className="text-xl font-bold">{pageName}</h3> : <Button onClick={() => setPageNameEdit(true)} className='text-xs leading-[0.1] h-6 py-0'>Set Page Name</Button>}
                                    <Pencil onClick={() => setPageNameEdit(true)} className="hover:bg-black hover:text-white my-auto border border-black rounded-sm p-0.5" size={20} />
                                </div>
                            }
                        </div>

                        <div className="border border-black shadow-[2px_2px_black] rounded-lg p-2 w-fit">
                            {
                                pageTaglineEdit ?

                                    <div className="flex gap-1">
                                        <Input
                                            placeholder='Enter Tagline'
                                            className='text-xs p-2 w-fit'
                                            id='page_tagline_input'
                                            value={pageTagline}
                                            onChange={handleTaglineChange}
                                        />
                                        <X onClick={() => setPageTaglineEdit(false)} className="my-auto" />
                                        <Check onClick={() => setPageTaglineGlobal()} className="my-auto" />
                                    </div>
                                    :
                                    <div className="flex gap-2">
                                        <p className="text-sm">{pageTagline == null ? <Button onClick={() => setPageTaglineEdit(true)} className='text-xs leading-[0.1] h-6 py-0'>Set Tagline</Button> : pageTagline}</p>
                                        <Pencil onClick={() => setPageTaglineEdit(true)} className="hover:bg-black hover:text-white my-auto border border-black rounded-sm p-0.5" size={20} />
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="flex border bg-black border-white h-fit w-fit  p-2 rounded-lg shadow-[2px_2px_black]">
                        <BsGlobe color="white" className="mr-1 my-auto" size={20} />

                        <p className="text-sm text-white font-semibold my-auto">{config.DOMAIN_URL}/</p>
                        {
                            pageSlugEdit ?

                                <div className="flex gap-1">
                                    <Input
                                        placeholder='Enter Tagline'
                                        className='text-white text-xs px-1 w-fit'
                                        id='page_slug_input'
                                        value={pageSlug}
                                        onChange={handlePageSlugChange}
                                    />
                                    <X color="white" onClick={() => setPageSlugEdit(false)} className="my-auto" />
                                    <Check color="white" onClick={() => setPageSlugGlobal()} className="my-auto" />
                                </div>
                                :
                                <div className="flex gap-2">
                                    <p className="text-white text-sm my-auto">{pageSlug == null ? <Button onClick={() => setPageSlugEdit(true)} className='text-xs leading-[0.1] h-6 py-0'>Set Slug</Button> : pageSlug}</p>
                                    <Pencil color="white" onClick={() => setPageSlugEdit(true)} className="hover:bg-black hover:text-white my-auto border border-black rounded-sm p-0.5" size={20} />
                                </div>
                        }
                    </div>

                </div>



            </div>
        </section>
    )

}