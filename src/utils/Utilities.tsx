import { NameTitle } from "./localData";

const isNotNull = (value: any): boolean => {
    return value !== null && value !== undefined;
}

function isErrorObject(error: any): error is Record<string, any> {
    return typeof error === 'object' && error !== null;
}

async function urlToFile(url: string, filename: string, mimeType: string) {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType });
}

const getTitleKey = (title: string) => NameTitle?.find((i: any) => i?.value === title ? i?.key : "")?.key ?? "";

export {
    isNotNull,
    isErrorObject,
    urlToFile,
    getTitleKey
}