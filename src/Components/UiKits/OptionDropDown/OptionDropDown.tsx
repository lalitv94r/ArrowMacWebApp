import React from 'react'
import { ButtonGroup, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import OptionDropDownProps from './types';

const OptionDropDown = ({
    title = "",
    options = [],
}: OptionDropDownProps) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const toggle = () => setOpen(!open);

    return (
        <div className="common-flex">
            <ButtonGroup>
                <Dropdown isOpen={open} toggle={toggle}>
                    <DropdownToggle caret color="primary">{title}</DropdownToggle>
                    <DropdownMenu className="dropdown-block">
                        {
                            options?.map((item, index) => (
                                <DropdownItem key={index} onClick={() => item?.action?.(item)} className="d-flex align-items-center gap-2">
                                    {typeof item?.icon === 'string' ? <i className={`iconly-${item?.icon} icli`}></i> : item?.icon}
                                    {item?.name}
                                </DropdownItem>
                            ))
                        }
                    </DropdownMenu>
                </Dropdown>
            </ButtonGroup>
        </div>
    )
}

export default OptionDropDown;