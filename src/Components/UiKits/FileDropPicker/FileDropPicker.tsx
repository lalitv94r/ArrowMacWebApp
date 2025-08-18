import RatioImage from '@/CommonComponent/RatioImage';
import { FileDropPickerProps, FileImage } from '@/Type/FileDropPicekrTypes';
import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';

interface Props extends FileDropPickerProps {
    onDelete?: (deletedImage: FileImage) => void; // new prop
}

const FileDropPicker: React.FC<Props> = ({ multiple, onChange, fileImage = [], onDelete }) => {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [savedImages, setSavedImages] = useState<FileImage[]>(
        Array.isArray(fileImage) ? fileImage : []
    );

    useEffect(() => {
        if (Array.isArray(fileImage)) {
            setSavedImages((prev) => {
                const same =
                    prev.length === fileImage.length &&
                    prev.every((p, i) => p.id === fileImage[i].id);
                return same ? prev : fileImage;
            });
        } else {
            setSavedImages([]);
        }
    }, [fileImage]);

    const updateChanges = (files: File[], images: FileImage[]) => {
        setUploadedFiles(files);
        setSavedImages(images);

        onChange?.({
            newFiles: files,
            remainingImages: images
        });
    };

    const onDrop = (acceptedFiles: File[]) => {
        updateChanges([...uploadedFiles, ...acceptedFiles], savedImages);
    };

    const removeFile = (index: number) => {
        const updated = uploadedFiles.filter((_, i) => i !== index);
        updateChanges(updated, savedImages);
    };

    const removeExistingImage = (id: number) => {
        const imgToDelete = savedImages.find(img => img.id === id);
        const updated = savedImages.filter(img => img.id !== id);
        updateChanges(uploadedFiles, updated);

        if (imgToDelete && onDelete) {
            onDelete(imgToDelete); // notify parent about deletion
        }
    };

    return (
        <>
            {uploadedFiles.length === 0 && savedImages.length === 0 ? (
                <Dropzone onDrop={onDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className="dropzone-container">
                            <input {...getInputProps()} />
                            <p>Drag & drop your file here, or click to select</p>
                        </div>
                    )}
                </Dropzone>
            ) : (
                <>
                    {multiple && (
                        <Dropzone onDrop={onDrop}>
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()} className="add-more-files-zone">
                                    <input {...getInputProps()} />
                                    <p>Click or drag more files to add</p>
                                </div>
                            )}
                        </Dropzone>
                    )}

                    <div className="uploaded-files">
                        {/* Show existing backend images */}
                        {savedImages.map((img) => (
                            <div key={`img-${img.id}`} className="file-card">
                                <RatioImage src={img.image} alt="Existing" className="file-thumbnail" />
                                <p className="file-name">Saved image</p>
                                <button
                                    onClick={() => removeExistingImage(img.id)}
                                    className="remove-button"
                                >
                                    x
                                </button>
                            </div>
                        ))}

                        {/* Show newly uploaded files */}
                        {uploadedFiles.map((file, index) => (
                            <div key={`file-${index}`} className="file-card">
                                {file.type.startsWith("image/")
                                    ? <RatioImage src={URL.createObjectURL(file)} alt={file.name} className="file-thumbnail" />
                                    : <div className="file-placeholder">{file.name.split(".").pop()?.toUpperCase()} File</div>
                                }
                                <p className="file-name">{file.name}</p>
                                <p className="file-size">{(file.size / 1024).toFixed(2)} KB</p>
                                <button onClick={() => removeFile(index)} className="remove-button">x</button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default FileDropPicker;
