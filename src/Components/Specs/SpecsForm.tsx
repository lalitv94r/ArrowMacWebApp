import { SpecsName, SpecsNameEntry, SpecsUnit, SpecsUnitEntry } from '@/Constant';
import { SpecificationInitialValue, SpecificationValidation } from '@/Data/Forms/FormsControl/Specs/Specs';
import useFetch from '@/network';
import api_urls from '@/network/apiUrls';
import { SpecificationsProps, SpecsFormProps } from '@/Type/Forms/FormControls/FormsControls'
import { isNotNull } from '@/utils/Utilities';
import { Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { Form, FormGroup, Input, Label } from 'reactstrap';

const SpecsForm = ({
    handleSubmitSpecs
}: SpecsFormProps) => {

    const params = useParams();

    const route = useRouter();

    const { get } = useFetch();

    return (
        <div>
            <Formik<SpecificationsProps>
                initialValues={SpecificationInitialValue}
                validationSchema={SpecificationValidation}
                onSubmit={handleSubmitSpecs}
            >
                {({ values, handleChange, submitForm, resetForm, errors, setFieldValue, setFormikState }) => {
                    useEffect(() => {
                        const fetchSpecById = async () => {
                            try {
                                let result: any = await get(`${api_urls?.specsTypes}${params?.params?.[0]}/`);
                                if (result?.status === 200) {
                                    // Use setValues to update form fields
                                    setFormikState((prevState: any) => ({
                                        ...prevState,
                                        values: {
                                            ...prevState.values,
                                            name: result?.data?.name || '',
                                            unit: result?.data?.unit || ''
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
                            fetchSpecById();
                        }
                    }, [params?.params]);
                    return (
                        <Form className="theme-form">
                            <FormGroup>
                                <Label>{SpecsName}</Label>
                                <Input
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    placeholder={SpecsNameEntry}
                                />
                                {errors.name && (
                                    <div className="text-danger">
                                        {errors.name}
                                    </div>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label>{SpecsUnit}</Label>
                                <Input
                                    name="unit"
                                    value={values.unit}
                                    onChange={handleChange}
                                    placeholder={SpecsUnitEntry}
                                />
                                {errors.unit && (
                                    <div className="text-danger">
                                        {errors.unit}
                                    </div>
                                )}
                            </FormGroup>
                            {
                                isNotNull(params?.params) ?
                                    <FormGroup className="d-flex justify-content-end gap-2 mt-3">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => route?.push('/brands')}
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

export default SpecsForm