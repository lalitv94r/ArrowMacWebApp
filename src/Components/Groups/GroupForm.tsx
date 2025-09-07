import { GroupName, GroupNamePlaceholder } from '@/Constant'
import { GroupInitialValues, GroupValidation } from '@/Data/Forms/FormsControl/Groups/Groups'
import useFetch from '@/network'
import api_urls from '@/network/apiUrls'
import { GroupFormProps } from '@/Type/Forms/FormControls/FormsControls'
import { isNotNull } from '@/utils/Utilities'
import { Formik } from 'formik'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Form, FormGroup, Input, Label } from 'reactstrap'

const GroupForm = ({
    handleSubmitGroup,
}: GroupFormProps) => {

    const params = useParams();

    const route = useRouter();

    const { get } = useFetch();

    return (
        <div>
            <Formik
                initialValues={GroupInitialValues}
                onSubmit={handleSubmitGroup}
                validationSchema={GroupValidation}
            >
                {({ handleChange, resetForm, submitForm, values, setFormikState }) => {
                    useEffect(() => {
                        const fetchGroupById = async () => {
                            try {
                                let result: any = await get(`${api_urls?.group}${params?.params?.[0]}/`);
                                console.log("result>>>", result);
                                if (result?.status === 200) {
                                    // Use setValues to update form fields
                                    setFormikState((prevState: any) => ({
                                        ...prevState,
                                        values: {
                                            ...prevState.values,
                                            name: result?.data?.name || '',
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
                            fetchGroupById();
                        }
                    }, [params?.params]);
                    return (
                        <Form className="theme-form">
                            <Label>{GroupName}</Label>
                            <Input
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                placeholder={GroupNamePlaceholder}
                            />
                            {
                                isNotNull(params?.params) ?
                                    <FormGroup className="d-flex justify-content-end gap-2 mt-3">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => route?.push('/groups')}
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

export default GroupForm;