import React from "react";

export default interface OptionDropDownProps {
    title?: string;
    options?: {
        name: string | React.ReactNode;
        icon?: React.ReactNode | string;
        action?: (args: any) => void
    }[];
}