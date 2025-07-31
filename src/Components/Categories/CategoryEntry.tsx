import TransparentLoader from '@/app/transparentLoader';
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import { AddNewCategory, CategoriesHeading, CategoryEntryHeading } from '@/Constant';
import useFetch from '@/network';
import api_urls from '@/network/apiUrls';
import { BrandValidationProp } from '@/Type/Forms/FormControls/FormsControls';
import { isNotNull } from '@/utils/Utilities';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';
import { Card, CardBody, Col, Container } from 'reactstrap';
import CategoryForm from './CategoryForm';

const CategoryEntry = () => {

    const { post, put, loading } = useFetch();

    const router = useRouter();

    const params = useParams();

    console.log("params", params)

    const handleSubmitBrand = async (values: BrandValidationProp, { resetForm }: { resetForm: () => void }) => {
        let body = { ...values }
        console.log("body", body);
        if (!isNotNull(params?.params?.[0])) {
            // Create new brand
            try {
                let response: any = await post(api_urls?.category, body);
                console.log("RESPONSE", response);
                if (response?.status === 201) {
                    toast.success(response?.message);
                    router.push('/categories');
                } else {
                    toast.error(response?.message);
                }
            } catch (error: any) {
                console.log("ERROR", error);
                toast.error(error?.message);
            }
        } else {
            // Update brand
            try {
                let response: any = await put(`${api_urls?.category}${params?.params?.[0]}/`, body);
                console.log("RESPONSE", response);
                if (response?.status === 200) {
                    toast.success(response?.message);
                    router.push('/categories');
                } else {
                    toast.error(response?.message);
                }
            } catch (error: any) {
                console.log("ERROR", error);
                toast.error(error?.message);
            }
        }
    }

    return (
        <div>
            {
                loading && <TransparentLoader />
            }
            <Breadcrumbs mainTitle={CategoryEntryHeading} parent={CategoriesHeading} />
            <Container fluid className="brand-entry">
                <Col md="6" lg="4">
                    <Card>
                        <CardHeaderCommon title={AddNewCategory} />
                        <CardBody>
                            <CategoryForm handleSubmitBrand={handleSubmitBrand} />
                        </CardBody>
                    </Card>
                </Col>
            </Container>
        </div >
    )
}

export default CategoryEntry;