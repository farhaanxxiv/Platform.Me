import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label";

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
        <>
            <div className="hover:cursor-pointer group" onClick={(e) => { deleteFormFieldById(fieldID) }}>
                <Trash color="white" className="rounded-full transition group-hover:bg-[#d70000] bg-[red] p-0.5" size={20} />
            </div>

            {/* <div className="flex ">
                <p className="select-none h-fit my-auto text-xxs font-semibold">Required:</p>
                <Switch
                    className='my-auto'
                    checked={required}
                    onCheckedChange={(bool) => handleRequiredSwitchChange(bool)}
                />
            </div> */}
        </>
    );

}
