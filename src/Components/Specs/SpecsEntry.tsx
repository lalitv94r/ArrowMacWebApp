import TransparentLoader from '@/app/transparentLoader';
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import useFetch from '@/network';
import api_urls from '@/network/apiUrls';
import { SpecificationsProps } from '@/Type/Forms/FormControls/FormsControls';
import { isNotNull } from '@/utils/Utilities';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';
import { Card, CardBody, Col, Container } from 'reactstrap';
import SpecsForm from './SpecsForm';
import { AddNewSpecs, Specifications, SpecsEntryHeading, UpdateSpecs } from '@/Constant';

const SpecsEntry = () => {

    const { post, put, loading } = useFetch();

    const router = useRouter();

    const params = useParams();

    const handleSubmitSpecs = async (values: SpecificationsProps, { resetForm }: { resetForm: () => void }) => {
        let body: any = { ...values };
        console.log("body", body);
        if (!isNotNull(params?.params?.[0])) {
            // Create new product
            try {
                let response: any = await post(api_urls?.specsTypes, body);
                console.log("RESPONSE", response);
                if (response?.status === 201) {
                    toast.success(response?.message);
                    router.push(`/specs`);
                } else {
                    toast.error(response?.message);
                }
            } catch (error: any) {
                console.log("ERROR", error);
                toast.error(error?.message);
            }
        } else {
            // Update product
            try {
                let response: any = await put(`${api_urls?.specsTypes}${params?.params?.[0]}/`, body);
                console.log("RESPONSE", response);
                if (response?.status === 200) {
                    toast.success(response?.message);
                    router.push(`/specs`);
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
            <Breadcrumbs mainTitle={SpecsEntryHeading} parent={Specifications} />
            <Container fluid className="product-entry">
                <Col md="6" lg="6">
                    <Card>
                        <CardHeaderCommon title={!isNotNull(params?.params?.[0]) ? AddNewSpecs : UpdateSpecs} />
                        <CardBody>
                            <SpecsForm handleSubmitSpecs={handleSubmitSpecs} />
                        </CardBody>
                    </Card>
                </Col>
            </Container>
        </div>
    )
}

export default SpecsEntry;