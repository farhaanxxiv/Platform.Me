import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { user_company, user_company_tagline } from "@/states/user_state"
import PageUtils from "@/utils/PageUtils"
import { useAtom } from "jotai"
import { Check, Divide, Pencil, X } from "lucide-react"
import { useState } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useAuth, useAuthContext } from "@/providers/AuthProvider"
import User from "@/firebase/User"
import { useLayoutManager } from "@/providers/LayoutManager"
import config from "../../../../config"

export default function Header() {

    const { userPage, updateUserPage, updateUserSlug, userSlug } = useLayoutManager()

    const { user, loading } = useAuth();

    const [pageName, setPageName] = useState(PageUtils.getPageName());
    const [pageTagline, setPageTagline] = useState(PageUtils.getPageTagline());
    const [pageSlug, setPageSlug] = useState(PageUtils.getPageSlug());


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
        const newPageName = document.getElementById('page_name_input').value

        setPageName(newPageName)
        setPageNameEdit(false)

        const user_page = userPage
        user_page.page_name = newPageName
        updateUserPage(user_page)
    }

    function setPageTaglineGlobal() {
        const newPageTagline = document.getElementById('page_tagline_input').value

        setPageTagline(newPageTagline)
        setPageTaglineEdit(false)

        const user_page = userPage
        user_page.page_tagline = newPageTagline
        updateUserPage(user_page)
    }

    function setPageSlugGlobal() {
        const newPageSlug = document.getElementById('page_slug_input').value

        setPageSlug(newPageSlug)
        setPageSlugEdit(false)

        updateUserSlug(newPageSlug)
    }

    return (
        <section className="py-6 border-b-2 border-black">

            <div className="flex justify-between">
                <div className=" flex flex-col gap-3">
                    <div>
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
                                <h3 className="text-xl font-bold">{pageName == null ? <Button onClick={() => setPageNameEdit(true)} className='text-xs leading-[0.1] h-6 py-0'>Set Page Name</Button> : pageName}</h3>
                                <Pencil onClick={() => setPageNameEdit(true)} className="hover:bg-black hover:text-white my-auto border border-black rounded-sm p-0.5" size={20} />
                            </div>
                        }
                    </div>

                    <div>
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
                    <div className="flex">
                        <p className="text-sm font-semibold">{config.DOMAIN_URL}/</p>
                        {
                            pageSlugEdit ?

                                <div className="flex gap-1">
                                    <Input
                                        placeholder='Enter Tagline'
                                        className='text-xs p-2 w-fit'
                                        id='page_slug_input'
                                        value={pageSlug}
                                        onChange={handlePageSlugChange}
                                    />
                                    <X onClick={() => setPageSlugEdit(false)} className="my-auto" />
                                    <Check onClick={() => setPageSlugGlobal()} className="my-auto" />
                                </div>
                                :
                                <div className="flex gap-2">
                                    <p className="text-sm">{pageSlug == null ? <Button onClick={() => setPageSlugEdit(true)} className='text-xs leading-[0.1] h-6 py-0'>Set Slug</Button> : pageSlug}</p>
                                    <Pencil onClick={() => setPageSlugEdit(true)} className="hover:bg-black hover:text-white my-auto border border-black rounded-sm p-0.5" size={20} />
                                </div>
                        }
                    </div>
                </div>
                <div>
                    {loading ?
                        <div className="flex items-center space-x-4">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[20vw]" />

                            </div>
                            <Skeleton className="h-12 w-12 rounded-full" />
                        </div>
                        :
                        <div className="flex items-center space-x-3">
                            <div className="space-y-1">
                                <p className="text-xs text-right font-bold">{user?.displayName}</p>
                                <p className="text-xs text-right ">{user?.email}</p>
                            </div>
                            <Image
                                width={60}
                                height={60}
                                className="rounded-[50%] border border-solid border-black"
                                loader={() => user?.photoURL}
                                src={user?.photoURL}
                            />
                        </div>
                    }
                </div>
            </div>
        </section>
    )

}