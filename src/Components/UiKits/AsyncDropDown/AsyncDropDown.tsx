import useFetch from "@/network";
import { AsyncDropDownProp, ddOption } from "@/Type/Forms/FormControls/FormsControls";
import React, { Fragment } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import AsyncSelect from "react-select/async"

export default function AsyncDropDown({
    onSelect,
    isCreatable = false,
    value,
    searchKey = "search",
    apiEndPoint = "",
    placeholder = "Select an option"
}: AsyncDropDownProp) {

    console.log("value>>>", value)

    const { get, loading } = useFetch();

    // Fetch options from API
    const loadOptions = async (inputValue: any) => {
        try {
            const res: any = await get(`${apiEndPoint}?${searchKey}=${inputValue}`);
            console.log("DD_RES", res)
            const options: Array<ddOption> = res?.data?.results?.map((i: any) => ({
                value: i.id,
                label: i.name,
            }));
            console.log("options", options)
            return options;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    // Handle creation of a new option
    const handleCreate = async (inputValue: any) => {
        try {
            const res = await fetch(`/api/brands`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: inputValue }),
            });
            const newBrand = await res.json();

            const option: any = { value: newBrand.id, label: newBrand.name };
        } catch (error) {
            console.error("Error creating brand:", error);
        }
    };

    const handleSelectOption = async (option: any) => {
        console.log("option", option)
        onSelect(option);
    }

    const customStyle: any = {
        control: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: "#F4F5F8",
            outline: "#3E64FF",
            "&:hover": {
                borderColor: "#CCCCCC",
            },
            minHeight: "45px",
        }),

    }

    return (
        <Fragment>
            {
                isCreatable ?
                    <AsyncCreatableSelect
                        cacheOptions
                        defaultOptions
                        loadOptions={loadOptions}
                        onCreateOption={handleCreate}
                        value={(value === undefined || value === null ||
                            Object.values(value)?.includes(undefined) ||
                            Object.values(value)?.includes(0) ||
                            Object.values(value)?.includes("")) ?
                            {
                                value: 0,
                                label: `${placeholder}`
                            } : value}
                        onChange={handleSelectOption}
                        placeholder="Select an option"
                        styles={customStyle}
                    />
                    :
                    <AsyncSelect
                        defaultOptions
                        loadOptions={loadOptions}
                        value={(value === undefined || value === null ||
                            Object.values(value)?.includes(undefined) ||
                            Object.values(value)?.includes(0) ||
                            Object.values(value)?.includes("")) ?
                            {
                                value: 0,
                                label: `${placeholder}`
                            } : value}
                        onChange={handleSelectOption}
                        placeholder="Select an option"
                        styles={customStyle}
                    />
            }
        </Fragment>
    );
}
