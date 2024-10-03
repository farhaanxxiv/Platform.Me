'use client'


import { LuLayoutDashboard } from "react-icons/lu";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import useWindowSize from "@/providers/useWindowSize";
import { BentoEditorProvider, useBentoEditorMode } from "@/providers/BentoEditorMode";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AuthProvider } from "@/providers/AuthProvider";
import Image from "next/image";
import { useEffect } from "react";




export default function Sidebar() {


    const { width } = useWindowSize()
    const { sideBarOpen, toggleSideBar } = useBentoEditorMode()

    useEffect(() => {
        console.log('sideBarOpen :', sideBarOpen);
    }, [sideBarOpen])

    return (
        <>

            {width > 767 ?
                <div className="bg-black shadow-[0px_0px_15px_#909090] w-fit md:fixed top-0 left-0 h-[100vh]">
                    <SideBarInternal />
                </div>
                :
                <Sheet className='h-[100vh]' open={sideBarOpen} onOpenChange={toggleSideBar}>
                    <SheetContent className='bg-black shadow-[0px_0px_15px_#909090] w-fit ' side='left'>
                        <SideBarInternal />
                    </SheetContent>
                </Sheet>
            }


        </>
    )

}

function SideBarInternal() {

    const path = usePathname();
    console.log('path :', path);
    const { toggleSideBar } = useBentoEditorMode()

    return (
        <>

            <div className="space-y-6 p-2 py-4 mt-12 md:mt-16 ">
                <Link href='/'>
                    <div>
                        <Image
                            className="block mx-auto"
                            width={30}
                            height={30}
                            src='/assets/logos/logo-secondary.png'
                        />
                        <p className="text-white text-xxs text-center font-semibold mt-1">Home</p>

                    </div>
                </Link>
                <p className="underline text-xs text-white font-semibold">Pages</p>

                <Link onClick={toggleSideBar} className="block" href='/app'>
                    <LuLayoutDashboard className={`block mx-auto ${path == '/app' && 'bg-white p-1 rounded-sm'}`} color={`${path == '/app' ? 'black' : 'white'}`} size={30} />
                    <p className="text-white text-xxs text-center font-semibold mt-1">Layout</p>

                </Link>

                <Link onClick={toggleSideBar} className="block" href='/app/forms'>
                    <BsFileEarmarkSpreadsheet className={`block mx-auto ${path == '/app/forms' && 'bg-white p-1 rounded-sm'}`} color={`${path == '/app/forms' ? 'black' : 'white'}`} size={30} />
                    <p className="text-white text-xxs text-center font-semibold mt-1">Forms</p>

                </Link>

            </div>
        </>
    )

}