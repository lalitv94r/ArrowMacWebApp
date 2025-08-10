import { CheckBoxProps } from '@/Type/Forms/FormControls/FormsControls'
import React from 'react'
import { Input, Label } from 'reactstrap'

const CheckBox = ({
    label = "",
    onCheck,
    check = false
}: CheckBoxProps) => {
    return (
        <Label for='checkbox-primary-1' className="d-block" check={check}>
            <Input id="checkbox-primary-1"
                color='primary'
                className='checkbox-primary checkbox-border-primary'
                type="checkbox"
                defaultChecked
                checked={check}
                onChange={() => onCheck(!check)}
            />
            {label}
        </Label>
    )
}

export default CheckBox