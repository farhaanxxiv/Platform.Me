import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InstagramLogoIcon } from "@radix-ui/react-icons"
import { useFormik } from "formik"
import { usePathname } from "next/navigation";
import { FaFacebookF, FaSpotify } from "react-icons/fa";

export default function BentoText({ text }) {

    const displayText = text.text

    return (
        <div className="p-6 flex bg-[#f7f684] rounded-3xl border-2 border-solid border-black shadow-[3px_3px_black] h-full w-full">
            <p className="my-auto h-fit font-medium text-lg">{displayText}</p>
        </div>
    )
}