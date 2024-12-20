'use client'

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
import { useLayoutManager } from "@/providers/LayoutManager"
import { TbNewSection } from "react-icons/tb";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CiImageOn } from "react-icons/ci";
import { MdOutlineTextsms } from "react-icons/md";


export default function UserNavbar() {


  const { userLayout, updateUserLayout } = useLayoutManager()
  const [selectedSection, updateSelectedSection] = useAtom(currentSelectedSection)
  const { toggleSectionEditor } = useSectionEditor()
  const { openFormEditor } = useFormEditor()

  function scrollToBottom(element) {
    element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
  }

  function createImage() {
    const imgLayout = BentoUtils.createImageSection()
    updateUserLayout([...userLayout, imgLayout])
    scrollToBottom(document.getElementById('layout_editor_container'))
  }
  function createHeadingParagraphSection() {
    const headingParagraphLayout = BentoUtils.createHeadingParagraphSection()
    updateUserLayout([...userLayout, headingParagraphLayout])
  }


  function createForm() {
    const formLayout = BentoUtils.createFormSection()
    updateUserLayout([...userLayout, formLayout])
  }

  function createSocialMedia(social_media) {
    const formLayout = BentoUtils.createSocialMediaSection(social_media)
    updateUserLayout([...userLayout, formLayout])
  }

  function createText() {
    const textLayout = BentoUtils.createText()
    updateUserLayout([...userLayout, textLayout])
  }

  function createSection() {
    const sectionLayout = BentoUtils.createSection()
    updateUserLayout([...userLayout, sectionLayout])
  }

  function updateGlobalSectionAndOpenEditor(section) {
    updateSelectedSection(section)
    toggleSectionEditor()
  }

  return (

    <div className="">

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className='w-fit text-sm border border-[#808080] bg-white'> <TbNewSection size={20} /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[9999] w-56">
          <DropdownMenuLabel>Sections</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>

            <DropdownMenuItem onClick={() => createImage()}>
              Image
              <DropdownMenuShortcut><CiImageOn size={18} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>

            {/* <DropdownMenuItem onClick={() => createForm()}>
              Form
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem> */}
            <DropdownMenuItem onClick={() => createText()}>
              Text
              <DropdownMenuShortcut><MdOutlineTextsms size={18} /></DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => createSection()}>
              Section
              <DropdownMenuShortcut>---</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => createForm()}>
              Form
              <DropdownMenuShortcut>---</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => createHeadingParagraphSection()}>
              Heading & Paragraph
              <DropdownMenuShortcut>H</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Social Media</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => createSocialMedia('instagram')}>Instagram</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => createSocialMedia('facebook')}>Facebook</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => createSocialMedia('spotify')} >Spotify</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => createSocialMedia('github')} >Github</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => createSocialMedia('youtube')} >YouTube</DropdownMenuItem>

                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>

  )
}
