export interface FileDropPickerProps {
    multiple?: boolean;
    fileImage?: FileImage[]; // from API when editing
    onChange?: (data: {
        newFiles: File[];
        remainingImages: FileImage[];
    }) => void;
};

export interface FileImage {
    id: number;
    image: string;
    is_primary: boolean;
}

export interface UploadedFile {
    file?: File;       // for newly added files
    url?: string;      // for existing server images
    name: string;
    size?: number;
    isExisting: boolean;
};