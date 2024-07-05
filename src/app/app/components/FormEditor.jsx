import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormEditor } from "@/providers/FormEditorProvider"
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
import GridLayout from 'react-grid-layout';
import { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import FormInput from "@/components/app/navbars/FormElements/FormInput"
import BentoUtils from "@/utils/BentoUtils"
import { useAtom } from "jotai"
import { currentUserLayout } from "@/states/ui_state"
import { GripVertical } from "lucide-react"
import { useEffect, useState } from "react"
import FormUtils from "@/utils/FormUtils"
import { useSectionEditor } from "@/providers/SectionEditorProvider"
import { useLayoutManager } from "@/providers/LayoutManager"

const ResponsiveGridLayout = WidthProvider(GridLayout);

export default function FormEditor({ section }) {

    console.log('Section Received in FormEditor Component', section)
    const { } = useFormEditor()
    const { closeSectionEditor } = useSectionEditor()
    const { userLayout, updateUserLayout } = useLayoutManager()
    const [editingFormSection, setEditingFormSection] = useState([])

    const [formLayout, setFormLayout] = useState([]);
    const [reactLayout, setReactLayout] = useState([]);

    function updateForm() {

        const newLayout = userLayout

        for (let i = 0; i < newLayout.length; i++) {
            if (editingFormSection.id == newLayout[i].id) {
                console.log('yayyy')

                newLayout[i].form_fields = formLayout
            }
        }
        console.log('Update Form', formLayout, newLayout)

        updateUserLayout(newLayout)
        // localStorage.setItem('layout', JSON.stringify(newLayout))

    }

    useEffect(() => {
        console.log('Form Layout', formLayout)
    }, [formLayout])

    function createFinalForm(newFormLayout) {

        const toUpdateFormFields = editingFormSection.form_fields

        newFormLayout.forEach(layout => {
            for (let i = 0; i < toUpdateFormFields.length; i++) {

                if (layout.i == toUpdateFormFields[i].id) {
                    toUpdateFormFields[i].layout = layout
                    toUpdateFormFields[i].layout.minW = 12
                }
            }
        });
        setFormLayout(toUpdateFormFields)
    }

    useEffect(() => {
        setEditingFormSection(section)
    }, [section])


    function createName() {
        const uid = FormUtils.generateUniqueId()

        const updatedFormFields = [...editingFormSection.form_fields, { 'type': 'name', id: uid }]
        setEditingFormSection({
            ...editingFormSection,
            form_fields: updatedFormFields
        })

    }

    function createPhone() {
        const uid = FormUtils.generateUniqueId()

        const updatedFormFields = [...editingFormSection.form_fields, { 'type': 'phone', id: uid }]
        setEditingFormSection({
            ...editingFormSection,
            form_fields: updatedFormFields
        })

    }

    function createCustom() {
        const uid = FormUtils.generateUniqueId()

        const updatedFormFields = [...editingFormSection.form_fields, { 'type': 'custom', id: uid, inputName: '', inputType: '' }]
        setEditingFormSection({
            ...editingFormSection,
            form_fields: updatedFormFields
        })

    }

    const getCustomFieldData = (name, type, id) => {
        console.log(name, type, id)
        assignCustomData(name, type, id)
    }

    function assignCustomData(name, type, id) {
        const newLayout = editingFormSection
        const formFields = newLayout.form_fields

        for (let i = 0; i < formFields.length; i++) {
            if (formFields[i].id == id) {
                formFields[i].inputName = name
                formFields[i].inputType = type
            }
        }

        console.log(newLayout)
        setEditingFormSection(newLayout)

    }

    return (
        <>
            Form Editor
            <br />
            Create Your Form Here

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className='w-full'>New Field</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>

                        <DropdownMenuItem onClick={() => createName()}>
                            Name
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => createPhone()}>
                            Phone
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => createCustom()}>
                            Custom
                        </DropdownMenuItem>

                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <ResponsiveGridLayout
                className="layout"
                layout={formLayout}
                onLayoutChange={createFinalForm}
                cols={1}
                margin={[0, 20]}
                draggableHandle=".draggable"
                resizeHandle={false}
                isResizable={false}
                rowHeight={'auto'}

            >
                {
                    (editingFormSection.length !== 0 ||
                        (editingFormSection.form_fields && editingFormSection.form_fields.length !== 0))
                        ?
                        editingFormSection?.form_fields.map((field) => {
                            console.log(field);

                            return (
                                <div className="flex " key={field.id} data-grid={field.layout}>
                                    <GripVertical className="draggable h-fit my-auto block" color="#a0a0a0" />

                                    <FormInput type={field.type} getCustomFieldData={getCustomFieldData} field={field} />
                                </div>
                            );

                        })
                        :
                        <p>Add Form Fields To Get Started</p>
                }

            </ResponsiveGridLayout>

            <DialogFooter>
                <Button onClick={() => { updateForm(); closeSectionEditor(); }} type="submit">Save changes</Button>
            </DialogFooter >

        </>
    )

}