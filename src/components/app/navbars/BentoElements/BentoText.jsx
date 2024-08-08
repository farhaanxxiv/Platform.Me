import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InstagramLogoIcon } from "@radix-ui/react-icons"
import { useFormik } from "formik"
import { usePathname } from "next/navigation";
import { FaFacebookF, FaSpotify } from "react-icons/fa";

export default function BentoText({ text }) {

    const displayText = text.text
    const bgColor = text.bgColor
    console.log('bgColor :', bgColor);
    const textColor = text.textColor


    return (
        <div style={{ backgroundColor: bgColor != undefined ? bgColor : '#f7f684' }} className={`p-6 flex rounded-3xl border-2 border-solid border-black shadow-[3px_3px_black] h-full w-full`}>
            <p style={{ color: textColor != undefined ? textColor : '#000000' }} className="my-auto h-fit font-medium text-lg">{displayText}</p>
        </div>
    )
}