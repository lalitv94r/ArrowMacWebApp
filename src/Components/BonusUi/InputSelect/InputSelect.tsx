import React from 'react'
import { Input } from 'reactstrap';

interface SelectPropType {
    name: string;
    value: string;
    onChange: (args: any) => void;
    placeholder: string;
    options: any[]
}

interface InputPropsType {
    name: string;
    value: string;
    onChange: (args: any) => void;
    placeholder: string;
}

interface InputSelectPropType {
    selectProps: SelectPropType;
    inputProps: InputPropsType;
}

const InputSelect = ({
    selectProps = {
        name: "",
        value: "",
        onChange: (e: any) => { },
        placeholder: "",
        options: []
    },
    inputProps = {
        name: "",
        value: "",
        onChange: (e: any) => { },
        placeholder: ""
    }
}: InputSelectPropType) => {
    return (
        <div className="d-flex w-100">
            <Input
                type="select"
                className="rounded-0 border border-end rounded-start w-25"
                style={{ borderRight: 'none' }}
                onChange={(e: any) => selectProps.onChange(e?.target?.value)}
                name={selectProps?.name}
                value={selectProps?.value}
            >
                {selectProps?.options?.map((i: any, idx: any) => (
                    <option key={idx} value={i?.value}>{i?.key}</option>
                ))}
            </Input>
            <Input
                className="rounded-0 rounded-end w-75"
                name={inputProps?.name}
                value={inputProps?.value}
                onChange={inputProps?.onChange}
                placeholder={inputProps?.placeholder}
                style={{ borderLeft: 'none' }}
            />
        </div>
    )
}

export default InputSelect;