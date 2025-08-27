import TransparentLoader from '@/app/transparentLoader';
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import useFetch from '@/network';
import api_urls from '@/network/apiUrls';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, Form, FormGroup, Input, Table } from 'reactstrap';
import ModalAlert from '../UiKits/Modal/ModalAlert';
import PaginationComponent from '../BonusUi/Pagination/Pagination';
import { ProductHeading, ProductsListHeading } from '@/Constant';
import NoDataFound from '../UiKits/NoDataFound/NoDataFound';
import Link from 'next/link';

const Products = () => {

    const { get, del, loading } = useFetch();

    const [search, setSearch] = useState<string>("");

    const [refresh, setRefresh] = useState(false);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [products, setProducts] = useState<any>({});

    const router = useRouter();

    useEffect(() => {
        const fetchProductsList = async () => {
            try {
                const result = await get(`${api_urls?.products}?page=${currentPage}&search=${search}`);
                console.log("RESULTS", result);
                if (result?.status === 200) {
                    setProducts(result?.data);
                } else {
                    toast.error(result?.message);
                }
            } catch (error: any) {
                toast.error(error?.message);
            } finally {
                setRefresh(false);
            }
        }
        fetchProductsList();
    }, [search, currentPage, refresh]);

    const deleteItem = async (item: any) => {
        try {
            let result: any = await del(`${api_urls?.products}${item?.id}/`);
            if (result?.status === 200) {
                toast.success(result?.message);
            } else {
                toast.error(result?.message);
            }
            setRefresh(true);
        } catch (error: any) {
            toast.error(error?.message);
        }
    }

    return (
        <div>
            {
                loading && <TransparentLoader />
            }
            <Breadcrumbs mainTitle={ProductsListHeading} parent={ProductHeading} />
            <Card className="hoverable-table">
                <CardHeader>
                    <div className="d-flex justify-content-between">
                        <Form className="theme-form w-25">
                            <FormGroup>
                                <Input
                                    type="text"
                                    placeholder="Search product..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </FormGroup>
                        </Form>
                        <div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => router?.push('/products/entry')}
                            >
                                Add New Product
                            </button>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    {
                        products?.results?.length > 0 ?
                            <Fragment>
                                <Table hover size={"md"} responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Slug</th>
                                            <th>Category</th>
                                            <th>Brand</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products?.results?.map((i: any, idx: React.Key) => (
                                                <tr key={i?.id}>
                                                    <td>{(Number(idx) + 1).toString()}</td>
                                                    <td>{i?.name}</td>
                                                    <td>{i?.slug}</td>
                                                    <td>{i?.category?.name}</td>
                                                    <td>{i?.brand?.name}</td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <Link href={`/products/entry/${i?.id}`}>
                                                                <FaRegEdit
                                                                    size={20}
                                                                    className={'text-secondary me-2'}
                                                                />
                                                            </Link>
                                                            <ModalAlert
                                                                onActionClick={() => deleteItem(i)}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                                <PaginationComponent
                                    activePage={currentPage}
                                    pages={products?.count}
                                    onActivePageChange={(num: any) => setCurrentPage(num)}
                                />
                            </Fragment>
                            :
                            <NoDataFound />
                    }
                </CardBody>
            </Card>
        </div>
    )
}

export default Products;