import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch"

export default function FormSettings(
    {
        deleteFormFieldById,
        updateFormFieldRequired,
        formFieldRequired,
        fieldID
    }) {


    const [required, setRequired] = useState(formFieldRequired)


    function handleRequiredSwitchChange(bool) {
        setRequired(bool)
        updateFormFieldRequired(fieldID, bool)
    }


    return (
        <div>
            <div onClick={(e) => { deleteFormFieldById(fieldID) }}>
                <Trash color="red" />
            </div>

            <Switch
                checked={required}
                onCheckedChange={(bool) => handleRequiredSwitchChange(bool)}
            />
        </div>
    );
}
