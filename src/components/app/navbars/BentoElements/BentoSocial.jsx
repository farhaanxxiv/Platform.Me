import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InstagramLogoIcon } from "@radix-ui/react-icons"
import { isAtEndOfNode } from "@tiptap/react";
import { useFormik } from "formik"
import { Facebook, FacebookIcon } from 'lucide-react';
import { usePathname } from "next/navigation";
import { FaFacebookF, FaSpotify } from "react-icons/fa";

export default function BentoSocial({ social }) {




    const ifEditPage = () => {
        const pathName = usePathname()
        console.log('pathName :', pathName);
        if (pathName == '/app') return true
        else return false
    }


    const instagramColor = { backgroundImage: 'linear-gradient(115deg, rgb(249, 206, 52), rgb(238, 42, 123), rgb(98, 40, 215))' }
    const facebookColor = { backgroundColor: '#0866ff' }
    const spotifyColor = { backgroundColor: '#1ed760' }

    let bg = ''
    const social_media = social.social_media

    if (social_media == 'instagram') bg = instagramColor
    else if (social_media == 'facebook') bg = facebookColor
    else if (social_media == 'spotify') bg = spotifyColor


    return (
        <a
            target="_blank"
            href={ifEditPage() ? undefined : social.link}
            onClick={ifEditPage() ? (e) => e.preventDefault() : undefined}
            style={ifEditPage() ? { pointerEvents: "none", cursor: "default" } : {}}
        >
            <div style={bg} className="h-full w-full rounded-3xl">
                {social_media === 'instagram' ? (
                    <InstagramLogoIcon className="p-3 invert w-full h-full" />
                ) : social_media === 'facebook' ? (
                    <FaFacebookF className="p-5 invert w-full h-full" />
                ) : social_media === 'spotify' ? (
                    <FaSpotify className="p-5 invert w-full h-full" />
                ) : (
                    <></>
                )}
            </div>
        </a>

    )
}