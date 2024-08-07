import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GlobalUtils from "@/utils/GlobalUtils";
import { useAtom } from "jotai";
import { useState } from "react";
import { currentSelectedSection, currentUserLayout } from "@/states/ui_state"
import { toast } from "@/components/ui/use-toast";
import { useLayoutManager } from "@/providers/LayoutManager";

export default function SocialEditor({ section }) {
    const { userLayout, updateUserLayout } = useLayoutManager()

    const [socialLink, setSocialLink] = useState(section.link)

    function handleChange(e) {
        const newLink = e.currentTarget.value
        console.log(newLink)
        setSocialLink(newLink)
    }

    function updateSocial() {

        const finalLayout = userLayout

        for (let i = 0; i < finalLayout.length; i++) {
            if (finalLayout[i].id == section.id) {
                finalLayout[i].link = socialLink
            }
        }
        console.log('Layout After Updating Social Links', finalLayout)
        updateUserLayout(finalLayout)
        // localStorage.setItem('layout', JSON.stringify(finalLayout))
        toast({
            title: `Updated To : ${socialLink}`
        })
    }
    return (

        <div className="">

            <Label>
                {GlobalUtils.capitaliseFirstLetters(section.social_media)} Link
                <Input
                    onChange={handleChange}
                    value={socialLink}
                />
            </Label>

            <Button onClick={() => updateSocial()} className='mt-2 ml-auto w-full block' variant=''>Save</Button>
        </div>
    )
}