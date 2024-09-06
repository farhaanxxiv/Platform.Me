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
import { DeleteIcon, GripVertical, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import FormUtils from "@/utils/FormUtils"
import { useSectionEditor } from "@/providers/SectionEditorProvider"
import { useLayoutManager } from "@/providers/LayoutManager"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import FormSettings from "@/components/app/navbars/FormElements/FormSettings"

const ResponsiveGridLayout = WidthProvider(GridLayout);

export default function FormEditor({ section }) {

    console.log('Section Received in FormEditor Component', section)
    const { } = useFormEditor()
    const { closeSectionEditor } = useSectionEditor()
    const { userLayout, updateUserLayout } = useLayoutManager()
    const [editingFormSection, setEditingFormSection] = useState([])

    const [formLayout, setFormLayout] = useState([]);
    const [reactLayout, setReactLayout] = useState([]);

    const [formHeading, setFormHeading] = useState(section.heading)

    function updateForm() {

        const newLayout = userLayout

        for (let i = 0; i < newLayout.length; i++) {
            if (editingFormSection.id == newLayout[i].id) {
                console.log('yayyy')

                newLayout[i].form_fields = formLayout
                newLayout[i].heading = formHeading

            }
        }
        console.log('Update Form', formLayout, newLayout)

        updateUserLayout(newLayout)
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
        console.log('toUpdateFormFields :', toUpdateFormFields);

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

    function handleChange(e) {
        setFormHeading(e.target.value)
    }


    function deleteFormFieldById(idToDelete) {
        console.log('editingFormSection before:', editingFormSection);

        // Create a new copy of form_fields array with the item removed
        const updatedFormFields = editingFormSection.form_fields.filter(field => field.id !== idToDelete);

        // Create a new copy of the editingFormSection object with the updated form_fields
        const updatedEditingFormSection = {
            ...editingFormSection,
            form_fields: updatedFormFields
        };

        console.log('updatedFormFields:', updatedFormFields);
        console.log('updatedEditingFormSection:', updatedEditingFormSection);

        // Update state with the new object
        setEditingFormSection(updatedEditingFormSection);
    }


    function updateFormFieldRequired(idToUpdate, isRequired) {
        // Log input values
        console.log('idToUpdate:', idToUpdate);
        console.log('isRequired:', isRequired);

        // Log current state
        console.log('Current editingFormSection:', editingFormSection);

        // Map through form_fields to update the specific field
        const updatedFormFields = editingFormSection.form_fields.map(field => {
            if (field.id === idToUpdate) {
                return { ...field, required: isRequired };
            }
            return field;
        });
        console.log('Updated form_fields:', updatedFormFields);

        // Create a new copy of the editingFormSection object with the updated form_fields
        const updatedEditingFormSection = {
            ...editingFormSection,
            form_fields: updatedFormFields
        };
        console.log('Updated editingFormSection:', updatedEditingFormSection);

        // Update state
        setEditingFormSection(updatedEditingFormSection);
    }


    return (
        <>


            <Label>
                Form Heading
                <Input
                    type='text'
                    onChange={handleChange}
                    value={formHeading}
                />
            </Label>
            <br />
            <div className="shadow-[0px_0px_5px_#d0d0d0] p-3 rounded-lg">
                <DropdownMenu>

                    <DropdownMenuTrigger asChild>
                        <Button variant="default" className='w-full'>New Field</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="z-[9999] w-56">
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
                >
                    {
                        (editingFormSection.length !== 0 ||
                            (editingFormSection.form_fields && editingFormSection.form_fields.length !== 0))
                            ?
                            editingFormSection?.form_fields.map((field) => {
                                console.log(field);

                                const fieldID = field.id

                                return (
                                    <div className="flex border align-middle border-black rounded-lg p-3" key={fieldID} data-grid={field.layout}>
                                        <div className="flex flex-col align-middle">
                                            <GripVertical className="hover:cursor-grab draggable h-fit my-auto block" color="#a0a0a0" />

                                            <div className="z-[9999]">
                                                <FormSettings updateFormFieldRequired={updateFormFieldRequired} deleteFormFieldById={deleteFormFieldById} formFieldRequired={field.required ? true : false} fieldID={fieldID} />
                                            </div>
                                        </div>

                                        <FormInput type={field.type} getCustomFieldData={getCustomFieldData} field={field} />
                                    </div>
                                );

                            })
                            :
                            <p>Add Form Fields To Get Started</p>
                    }

                </ResponsiveGridLayout>
            </div>
            <DialogFooter>
                <Button className='z-[9999]' onClick={() => { updateForm(); closeSectionEditor(); }} type="submit">Save changes</Button>
            </DialogFooter >

        </>
    )

}