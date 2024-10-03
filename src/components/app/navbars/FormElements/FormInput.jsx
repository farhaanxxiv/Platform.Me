import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";

export default function FormInput({ type, getCustomFieldData, field }) {

    const id = field.id

    const [inputName, setName] = useState(field.inputName ? field.inputName : '');
    const [inputType, setType] = useState(field.inputType ? field.inputType : '');

    useEffect(() => {
        if (type === 'custom') {
            getCustomFieldData(inputName, inputType, id);
        }
    }, [inputName, inputType]);

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeType = (value) => {
        setType(value);
    };


    return (
        <>

            {
                type == 'name' ?
                    <Input
                        placeholder='Enter Your Name'
                        type='text'
                    />
                    :
                    type == 'custom' ?
                        <div className="w-full h-full block">
                            <Label className='text-xs'>
                                Title
                                <Input
                                    placeholder=''
                                    type='text'
                                    onChange={handleChangeName}
                                    value={inputName}
                                    
                                />
                            </Label>
                            <br />
                            <Label className='text-xs'>
                                Input Type
                                <Select
                                    onValueChange={handleChangeType}
                                    value={inputType}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Field Type" />
                                    </SelectTrigger>
                                    <SelectContent className='z-[9999]'>
                                        <SelectItem value="text">Text</SelectItem>
                                        <SelectItem value="number">Number</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Label>
                        </div>
                        : type == 'phone' ?
                            < Input
                                placeholder='Enter Your Number'
                                type='number'
                            />
                            : type == 'email' ?
                                < Input
                                    placeholder='Enter Your E-Mail'
                                    type='email'
                                />
                                :
                                <p>Invalid Input Type,Please Delete And Create New One</p>
            }

        </>
    )

}