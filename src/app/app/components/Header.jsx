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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { IoEye } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import { BsGlobe } from "react-icons/bs";
import { BentoEditorProvider, useBentoEditorMode } from "@/providers/BentoEditorMode"
import { GiHamburgerMenu } from "react-icons/gi";


export default function Header() {

    const { user, loading } = useAuth();
    const { sideBarOpen, toggleSideBar } = useBentoEditorMode()
    const { userSlug } = useLayoutManager()

    return (
        <div className="bg-black fixed top-0 left-0 w-full z-[9999] flex justify-between px-2 md:px-6 py-0 border-b-2 border-black shadow-[0px_0px_15px_#c0c0c0]">

            <div onClick={() => toggleSideBar()} className="pl-0 md:pl-12 flex gap-x-1 w-fit h-fit my-auto ">
                <GiHamburgerMenu color="white" className="block md:hidden my-auto h-fit" size={25} />
                <p className="text-white font-semibold text-xl">Platform.Me</p>
            </div>

            <div>
                {loading ?
                    <div className="flex items-center space-x-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[20vw] hidden md:block" />
                        </div>
                        <Skeleton className="h-12 w-12 rounded-full" />
                    </div>
                    :
                    <div className="flex gap-x-3">
                        {userSlug != null && <a target="_blank" href={`${config.WEBSITE_URL}/${userSlug}`}> <Button className='text-xs mt-3 float-right px-3 py-0 '>View Page&nbsp;<IoEye size={18} /></Button></a>}

                        <Popover>
                            <PopoverTrigger className="" asChild>
                                <div className="flex gap-x-1  rounded-full p-1.5">
                                    <Image
                                        width={50}
                                        height={50}
                                        className="hover:cursor-pointer hover:shadow-[0px_0px_10px_black] transition aspect-square rounded-[50%] border-2 border-solid border-black"
                                        loader={() => user?.photoURL}
                                        src={user?.photoURL}
                                    />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-fit bg-black">
                                <div className="space-y-1">
                                    <p className="text-white hidden md:block text-xs font-bold">Hello 👋, {user?.displayName}</p>
                                    <p className="text-white hidden md:block text-xs ">{user?.email}</p>
                                    <Button onClick={() => auth.signOut()} className="block w-fit p-1 px-3 leading-tight h-fit text-xs text-right ">Logout</Button>
                                </div>
                            </PopoverContent>
                        </Popover>

                    </div>
                }
            </div>

        </div>
    )

}