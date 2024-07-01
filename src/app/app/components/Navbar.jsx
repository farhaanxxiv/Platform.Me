import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import BentoUtils from "@/utils/BentoUtils"
import { currentSelectedSection, currentUserLayout } from "@/states/ui_state"
import { useAtom } from "jotai"
import { useEffect, useLayoutEffect } from "react"
import { Separator } from "@/components/ui/separator"
import { DeleteIcon, Trash2, Pencil } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useSectionEditor } from "@/providers/SectionEditorProvider"
import { useFormEditor } from "@/providers/FormEditorProvider"


export default function UserNavbar() {


  const [userLayout, updateUserLayout] = useAtom(currentUserLayout)
  const [selectedSection, updateSelectedSection] = useAtom(currentSelectedSection)
  const { toggleSectionEditor } = useSectionEditor()
  const { openFormEditor } = useFormEditor()



  function createImage() {
    const imgLayout = BentoUtils.createImageSection()
    updateUserLayout([...userLayout, imgLayout])
  }

  function createForm() {
    const formLayout = BentoUtils.createFormSection()
    updateUserLayout([...userLayout, formLayout])
  }

  function createSocialMedia(social_media) {
    const formLayout = BentoUtils.createSocialMediaSection(social_media)
    updateUserLayout([...userLayout, formLayout])
  }

  function updateGlobalSectionAndOpenEditor(section) {
    updateSelectedSection(section)
    toggleSectionEditor()
  }

  return (
    <div className="px-3">


      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className='w-full'>Add Card + </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Sections</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>

            <DropdownMenuItem onClick={() => createImage()}>
              Image
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => createForm()}>
              Form
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => createText()}>
              Text
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Social Media</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => createSocialMedia('instagram')}>Instagram</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => createSocialMedia('facebook')}>Facebook</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => createSocialMedia('spotify')} >Spotify</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  )
}
