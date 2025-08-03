import { BrandNamePlaceholder, BrandSlugPlaceholder, CategoryName, CategorySlug } from '@/Constant';
import { CategoryInitialValues, CategoryValidation } from '@/Data/Forms/FormsControl/Categories/Categories';
import useFetch from '@/network';
import api_urls from '@/network/apiUrls';
import { CategoryFormProps, CategoryValidationProp } from '@/Type/Forms/FormControls/FormsControls';
import { isNotNull } from '@/utils/Utilities';
import { Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { Form, FormGroup, Input, Label } from 'reactstrap';

const CategoryForm = ({
    handleSubmitBrand,
}: CategoryFormProps) => {

    const params = useParams();

    const route = useRouter();

    const { get } = useFetch();

    const handleAutoGenerateSlug = (setFieldValue: any, e: any) => {
        setFieldValue('name', e?.target?.value);
        const slug = e?.target?.value?.toLowerCase()?.replace(/\s+/g, '-')?.replace(/[^\w-]+/g, '');
        setFieldValue('slug', slug);
    }

    return (
        <div>
            <Formik<CategoryValidationProp>
                initialValues={CategoryInitialValues}
                onSubmit={handleSubmitBrand}
                validationSchema={CategoryValidation}
            >
                {({ values, handleChange, submitForm, resetForm, errors, setFieldValue, setFormikState }) => {
                    useEffect(() => {
                        const fetchBrandById = async () => {
                            try {
                                let result: any = await get(`${api_urls?.category}${params?.params?.[0]}/`);
                                console.log("result>>>", result);
                                if (result?.status === 200) {
                                    // Use setValues to update form fields
                                    setFormikState((prevState: any) => ({
                                        ...prevState,
                                        values: {
                                            ...prevState.values,
                                            name: result?.data?.name || '',
                                            slug: result?.data?.slug || '',
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
                            fetchBrandById();
                        }
                    }, [params?.params]);
                    return (
                        <Form className="theme-form">
                            <FormGroup>
                                <Label>{CategoryName}</Label>
                                <Input
                                    name=""
                                    value={values.name}
                                    onChange={(e: any) => handleAutoGenerateSlug(setFieldValue, e)}
                                    placeholder={BrandNamePlaceholder}
                                />
                                {errors.name && (
                                    <div className="text-danger">
                                        {errors.name}
                                    </div>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label>{CategorySlug}</Label>
                                <Input
                                    name="slug"
                                    value={values.slug}
                                    onChange={handleChange}
                                    placeholder={BrandSlugPlaceholder}
                                />
                                {errors.slug && (
                                    <div className="text-danger">
                                        {errors.slug}
                                    </div>
                                )}
                            </FormGroup>
                            {
                                isNotNull(params?.params) ?
                                    <FormGroup className="d-flex justify-content-end gap-2 mt-3">
                                        <button
                                            type="button"
                                            className="btn btn-warning"
                                            onClick={() => route?.push('/categories')}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={() => submitForm()} // Update
                                        >
                                            Update
                                        </button>
                                    </FormGroup>
                                    :
                                    <FormGroup className="d-flex justify-content-end gap-2 mt-3">
                                        <button
                                            type="button"
                                            className="btn btn-warning"
                                            onClick={() => resetForm()}
                                        >
                                            Reset
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-success"
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

export default CategoryForm;