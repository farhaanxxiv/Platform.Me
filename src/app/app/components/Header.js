import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { tagline_open } from "@/states/ui_state"
import { user_company, user_company_tagline } from "@/states/user_state"
import PageUtils from "@/utils/PageUtils"
import { useAtom } from "jotai"
import { Check, Divide, Pencil, X } from "lucide-react"
import { useState } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"

export default function Header() {

    const { data: session, status } = useSession();

    const [pageName, setPageName] = useState(PageUtils.getPageName());

    const [pageTagline, setPageTagline] = useState(PageUtils.getPageTagline());

    const handleTaglineChange = (event) => {
        setPageTagline(event.target.value);
    };

    const handlePageNameChange = (event) => {
        setPageName(event.target.value);
    };


    const [pageNameEdit, setPageNameEdit] = useState(false)
    const [pageTaglineEdit, setPageTaglineEdit] = useState(false)

    function setPageTaglineGlobal() {
        const newPageTagline = document.getElementById('page_tagline_input').value
        PageUtils.setPageTitle(newPageTagline)
        setPageTagline(PageUtils.getPageTagline())
        setPageTaglineEdit(false)
    }

    function setPageNameGlobal() {
        const newPageTagline = document.getElementById('page_name_input').value
        PageUtils.setPageName(newPageTagline)
        setPageName(PageUtils.getPageName())
        setPageNameEdit(false)
    }

    return (
        <section className="py-6 border-b-2  border-black ">

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
                            </div>}
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
                </div>
                <div>
                    {status == 'loading' ?
                        <div className="flex items-center space-x-4">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[20vw]" />

                            </div>
                            <Skeleton className="h-12 w-12 rounded-full" />
                        </div>
                        :
                        <div className="flex items-center space-x-3">
                            <div className="space-y-1">
                                <p className="text-xs text-right font-bold">{session?.user?.name}</p>
                                <p className="text-xs text-right ">{session?.user?.email}</p>
                            </div>
                            <Image
                                width={60}
                                height={60}
                                className="rounded-[50%] border border-solid border-black"
                                loader={() => session?.user?.image}
                                src={session?.user?.image}
                            />
                        </div>
                    }
                </div>
            </div>
        </section>
    )

}