import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InstagramLogoIcon } from "@radix-ui/react-icons"
import { isAtEndOfNode } from "@tiptap/react";
import { useFormik } from "formik"
import { Facebook, FacebookIcon } from 'lucide-react';
import { usePathname } from "next/navigation";
import { FaFacebookF, FaGithub, FaSpotify, FaYoutube } from "react-icons/fa";

export default function BentoSocial({ social }) {


    const pathName = usePathname()


    const ifEditPage = () => {
        console.log('pathName :', pathName);
        if (pathName == '/app') return true
        else return false
    }


    const instagramColor = { backgroundImage: 'linear-gradient(115deg, rgb(249, 206, 52), rgb(238, 42, 123), rgb(98, 40, 215))' }
    const facebookColor = { backgroundColor: '#0866ff' }
    const spotifyColor = { backgroundColor: '#1ed760' }
    const githubColor = { backgroundColor: '#000000' }
    const youtubeColor = { backgroundColor: '#ff0000' }


    let bg = ''
    const social_media = social.social_media

    if (social_media == 'instagram') bg = instagramColor
    else if (social_media == 'facebook') bg = facebookColor
    else if (social_media == 'spotify') bg = spotifyColor
    else if (social_media == 'github') bg = githubColor
    else if (social_media == 'youtube') bg = youtubeColor




    return (
        <a
            className=""
            target="_blank"
            href={ifEditPage() ? undefined : social.link}
            onClick={ifEditPage() ? (e) => e.preventDefault() : undefined}
            style={ifEditPage() ? { pointerEvents: "none", cursor: "default" } : {}}
        >
            <div style={bg} className={`h-full w-full rounded-3xl border-2 border-solid ${social_media == 'github' && 'border-white'} border-black shadow-[3px_3px_black]`}>
                {social_media === 'instagram' ? (
                    <div className="w-full h-full  m-auto invert">
                        <InstagramLogoIcon className="p-3  w-full h-full aspect-square " />
                    </div>
                ) : social_media === 'facebook' ? (
                    <div className="w-full h-full  m-auto invert">

                        <FaFacebookF className="p-5 w-full h-full aspect-square " />
                    </div>

                ) : social_media === 'spotify' ? (
                    <div className="w-full h-full  m-auto invert">

                        <FaSpotify className="p-4  w-full h-full aspect-square " />
                    </div>

                ) : social_media === 'github' ? (
                    <div className="w-full h-full  m-auto invert">

                        <FaGithub className="p-3  w-full h-full aspect-square " />
                    </div>

                ) : social_media === 'youtube' ? (
                    <div className="w-full h-full  m-auto invert">

                        <FaYoutube className="p-3  w-full h-full aspect-square " />
                    </div>

                ) : (
                    <></>
                )}
            </div>
        </a>

    )
}