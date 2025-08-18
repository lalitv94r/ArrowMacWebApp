import { BasePrice, BasePricePlaceholder, Brand, Category, DescPlaceholder, Description, DiscountAmount, DiscountAmountPlaceholder, EnterProductSpecValue, ProductImages, ProductName, ProductSlug, ProductSlugPlaceholder, ProductSpec, ProductSpecValue, ProudctNamePlaceholder, SelectBrand, SelectCategory, SelectProductSpec, Specifications } from '@/Constant';
import { ProductInitialValues, ProductValidation } from '@/Data/Forms/FormsControl/Products/Products';
import useFetch from '@/network';
import api_urls from '@/network/apiUrls';
import { ProductFormProps, ProductValidationProp } from '@/Type/Forms/FormControls/FormsControls';
import { isErrorObject, isNotNull } from '@/utils/Utilities';
import { Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import AsyncDropDown from '../UiKits/AsyncDropDown/AsyncDropDown';
import CheckBox from '../UiKits/CheckBox/CheckBox';
import { PiMinusCircleBold, PiPlusCircleBold } from 'react-icons/pi';
import FileDropPicker from '../UiKits/FileDropPicker/FileDropPicker';
import { FileImage } from '@/Type/FileDropPicekrTypes';

const ProductForm = ({
    handleSubmitProduct
}: ProductFormProps) => {

    const params = useParams();

    const route = useRouter();

    const { get } = useFetch();

    const handleAutoGenerateSlug = (setFieldValue: any, e: any) => {
        setFieldValue('name', e?.target?.value);
        const slug = e?.target?.value?.toLowerCase()?.replace(/\s+/g, '-')?.replace(/[^\w-]+/g, '');
        setFieldValue('slug', slug);
    }

    const handleAddMoreItem = (values: any, setFieldValue: any) => {
        setFieldValue("specifications", [
            ...values.specifications,
            { type: { label: "", value: 0 }, value: "" }
        ]);
    };

    const handleMinusItem = (index: number, values: any, setFieldValue: any) => {
        const updatedSpecs = values.specifications.filter((_: any, i: React.Key) => i !== index);
        setFieldValue("specifications", updatedSpecs);
    };

    return (
        <div>
            <Formik<ProductValidationProp>
                initialValues={ProductInitialValues}
                validationSchema={ProductValidation}
                onSubmit={handleSubmitProduct}
            >
                {({ values, handleChange, submitForm, resetForm, errors, setFieldValue, setFormikState }) => {
                    useEffect(() => {
                        const fetchProductById = async () => {
                            try {
                                let result: any = await get(`${api_urls?.products}${params?.params?.[0]}/`);
                                if (result?.status === 200) {
                                    // Use setValues to update form fields
                                    setFormikState((prevState: any) => ({
                                        ...prevState,
                                        values: {
                                            ...prevState.values,
                                            name: result?.data?.name || '',
                                            slug: result?.data?.slug || '',
                                            brand: {
                                                value: result?.data?.brand?.id || 0,
                                                label: result?.data?.brand?.name || ""
                                            },
                                            category: {
                                                value: result?.data?.category?.id || 0,
                                                label: result?.data?.category?.name || ""
                                            },
                                            base_price: result?.data?.base_price || 0,
                                            discount_amount: result?.data?.discount_amount || 0,
                                            description: result?.data?.description || "",
                                            is_active: result?.data?.is_active,
                                            specifications: result?.data?.specifications?.length > 0 ? result?.data?.specifications?.map((i: any) => ({
                                                type: { label: i?.type?.name, value: i?.type?.id },
                                                value: i?.value
                                            })) : [{ type: { label: "", value: 0 }, value: "" }],
                                            images: result?.data?.images
                                        }
                                    }));
                                } else {
                                    toast.error(result?.message);
                                }
                            } catch (error: any) {
                                toast.error(error?.message);
                            }
                        }
                        if (isNotNull(params?.params?.[0])) {
                            fetchProductById();
                        }
                    }, [params?.params]);

                    // Handle primary image (usually 1)
                    const handleSetPrimaryImage = ({
                        newFiles,
                        remainingImages,
                    }: { newFiles: File[], remainingImages: FileImage[] }) => {
                        // --- Add new files ---
                        if (newFiles?.length > 0) {
                            newFiles.forEach((file, idx) => {
                                setFieldValue(`primary_images.${idx}.image`, file);
                                setFieldValue(`primary_images.${idx}.is_primary`, true);
                            });
                        }

                        // --- Keep existing (still selected) ---
                        if (remainingImages?.length > 0) {
                            remainingImages.forEach((img, idx) => {
                                setFieldValue(`primary_images.${newFiles.length + idx}.image`, img.id);
                                setFieldValue(`primary_images.${newFiles.length + idx}.is_primary`, img.is_primary ?? true);
                            });
                        }

                        // --- Track deleted ---
                        const originalIds = values?.images?.filter((i: any) => i?.is_primary)?.map((i: any) => i.id) || [];
                        const remainingIds = remainingImages?.map((img: any) => img.id) || [];
                        const deletedIds = originalIds.filter((id: any) => !remainingIds.includes(id));

                        if (deletedIds.length > 0) {
                            setFieldValue("delete_ids", [...(values.delete_ids || []), ...deletedIds]);
                        }
                    };


                    // Handle secondary images (multiple allowed)
                    const handleSetSecondaryImages = ({
                        newFiles,
                        remainingImages,
                    }: { newFiles: File[], remainingImages: FileImage[] }) => {
                        // --- Add new files ---
                        if (newFiles?.length > 0) {
                            newFiles.forEach((file, idx) => {
                                setFieldValue(`secondary_images.${idx}.image`, file);
                                setFieldValue(`secondary_images.${idx}.is_primary`, false);
                            });
                        }

                        // --- Keep existing (still selected) ---
                        if (remainingImages?.length > 0) {
                            remainingImages.forEach((img, idx) => {
                                setFieldValue(`secondary_images.${newFiles.length + idx}.image`, img.id);
                                setFieldValue(`secondary_images.${newFiles.length + idx}.is_primary`, false);
                            });
                        }

                        // --- Track deleted ---
                        const originalIds = values?.images?.filter((i: any) => !i?.is_primary)?.map((i: any) => i.id) || [];
                        const remainingIds = remainingImages?.map((img: any) => img.id) || [];
                        const deletedIds = originalIds.filter((id: any) => !remainingIds.includes(id));

                        if (deletedIds.length > 0) {
                            setFieldValue("delete_ids", [...(values.delete_ids || []), ...deletedIds]);
                        }
                    };

                    return (
                        <Form className="theme-form">
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>{ProductName}</Label>
                                        <Input
                                            name=""
                                            value={values.name}
                                            onChange={(e: any) => handleAutoGenerateSlug(setFieldValue, e)}
                                            placeholder={ProudctNamePlaceholder}
                                        />
                                        {errors.name && (
                                            <div className="text-danger">
                                                {errors.name}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>{ProductSlug}</Label>
                                        <Input
                                            name="slug"
                                            value={values.slug}
                                            onChange={handleChange}
                                            placeholder={ProductSlugPlaceholder}
                                        />
                                        {errors.slug && (
                                            <div className="text-danger">
                                                {errors.slug}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>{Brand}</Label>
                                        <AsyncDropDown
                                            onSelect={(value: any) => setFieldValue("brand", value)}
                                            value={values?.brand}
                                            apiEndPoint={api_urls?.brands}
                                            placeholder={SelectBrand}
                                        />
                                        {errors.brand?.value && (
                                            <div className="text-danger">
                                                {errors.brand?.value}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>{Category}</Label>
                                        <AsyncDropDown
                                            onSelect={(value: any) => setFieldValue("category", value)}
                                            value={values?.category}
                                            apiEndPoint={api_urls?.category}
                                            placeholder={SelectCategory}
                                        />
                                        {errors.category?.value && (
                                            <div className="text-danger">
                                                {errors.brand?.value}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>{BasePrice}</Label>
                                        <Input
                                            name="base_price"
                                            type={'number'}
                                            value={values.base_price}
                                            onChange={handleChange}
                                            placeholder={BasePricePlaceholder}
                                        />
                                        {errors.base_price && (
                                            <div className="text-danger">
                                                {errors.base_price}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>{DiscountAmount}</Label>
                                        <Input
                                            name="discount_amount"
                                            type={'number'}
                                            value={values.discount_amount}
                                            onChange={handleChange}
                                            placeholder={DiscountAmountPlaceholder}
                                        />
                                        {errors.discount_amount && (
                                            <div className="text-danger">
                                                {errors.discount_amount}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <FormGroup>
                                    <Label>{Description}</Label>
                                    <Input
                                        name={"description"}
                                        value={values?.description}
                                        type={'textarea'}
                                        onChange={handleChange}
                                        placeholder={DescPlaceholder}
                                    />
                                    {errors.description && (
                                        <div className="text-danger">
                                            {errors.description}
                                        </div>
                                    )}
                                </FormGroup>
                            </Row>
                            <Row>
                                <FormGroup>
                                    <CheckBox
                                        label='Status'
                                        check={values?.is_active}
                                        onCheck={(value: any) => setFieldValue("is_active", value)}
                                    />
                                </FormGroup>
                            </Row>
                            {/* Product Specifications */}
                            <hr />
                            <h4 className='mb-4 mt-1'>{Specifications}</h4>
                            {values?.specifications?.map((spec, index) => (
                                <Row key={index}>
                                    <Col>
                                        <FormGroup>
                                            <Label>{ProductSpec}</Label>
                                            <AsyncDropDown
                                                onSelect={(value: any) => setFieldValue(`specifications.${index}.type`, value)}
                                                value={spec.type}
                                                apiEndPoint={api_urls?.specsTypes}
                                                placeholder={SelectProductSpec}
                                            />
                                            {errors.specifications?.[index] && isErrorObject(errors.specifications[index]) && errors.specifications[index].type?.label && (
                                                <div className="text-danger">
                                                    {errors.specifications[index].type.label}
                                                </div>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label>{ProductSpecValue}</Label>
                                            <Input
                                                name={`specifications.${index}.value`}
                                                value={spec.value}
                                                onChange={handleChange}
                                                placeholder={EnterProductSpecValue}
                                            />
                                            {errors.specifications?.[index] && isErrorObject(errors.specifications[index]) && errors.specifications[index].value && (
                                                <div className="text-danger">
                                                    {errors.specifications[index].value}
                                                </div>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col sm="1">
                                        <div className='mt-3 pt-3 d-flex justify-content-start'>
                                            {
                                                values?.specifications?.length > 1 &&
                                                <PiMinusCircleBold
                                                    onClick={() => handleMinusItem(index, values, setFieldValue)}
                                                    color='white'
                                                    className='bg-danger rounded-5 me-2'
                                                    size={25}
                                                />
                                            }
                                            {
                                                values?.specifications?.length - 1 === index &&
                                                <PiPlusCircleBold
                                                    onClick={() => handleAddMoreItem(values, setFieldValue)}
                                                    color='white'
                                                    className='bg-success rounded-5'
                                                    size={25}
                                                />
                                            }
                                        </div>
                                    </Col>
                                </Row>
                            ))}
                            {/* Product Images */}
                            <hr />
                            <h4 className='mb-4 mt-1'>{ProductImages}</h4>
                            <Row>
                                <Col>
                                    <Label>Primary Image</Label>
                                    <FileDropPicker
                                        fileImage={values?.images?.filter((i: any) => i?.is_primary)}
                                        onChange={(file: any) => handleSetPrimaryImage(file)}
                                        onDelete={(deletedImage) => {
                                            setFormikState((prevState: any) => ({
                                                ...prevState,
                                                values: {
                                                    ...prevState.values,
                                                    images: values?.images?.filter((i: any) => i?.id !== deletedImage?.id)
                                                }
                                            }));
                                            setFieldValue("delete_ids", [...(values.delete_ids || []), deletedImage.id]);
                                        }}

                                    />
                                </Col>
                                <Col>
                                    <Label>Secondary Image</Label>
                                    <FileDropPicker
                                        multiple
                                        fileImage={values?.images?.filter((i: any) => !i?.is_primary)}
                                        onChange={(files) => handleSetSecondaryImages(files)}
                                        onDelete={(deletedImage) => {
                                            setFormikState((prevState: any) => ({
                                                ...prevState,
                                                values: {
                                                    ...prevState.values,
                                                    images: values?.images?.filter((i: any) => i?.id !== deletedImage?.id)
                                                }
                                            }));
                                            setFieldValue("delete_ids", [...(values.delete_ids || []), deletedImage.id]);
                                        }}
                                    />
                                </Col>
                            </Row>
                            {
                                isNotNull(params?.params) ?
                                    <FormGroup className="d-flex justify-content-end gap-2 mt-3">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => route?.push('/products')}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => submitForm()} // Update
                                        >
                                            Update
                                        </button>
                                    </FormGroup>
                                    :
                                    <FormGroup className="d-flex justify-content-end gap-2 mt-3">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => resetForm()}
                                        >
                                            Reset
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => submitForm()} // Create
                                        >
                                            Save
                                        </button>
                                    </FormGroup>

                            }
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default ProductForm;