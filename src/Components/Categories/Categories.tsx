import TransparentLoader from '@/app/transparentLoader';
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import { BrandsHeading, CategoriesHeading, CategoryListHeading } from '@/Constant';
import useFetch from '@/network'
import api_urls from '@/network/apiUrls';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, Form, FormGroup, Input, Table } from 'reactstrap';
import ModalAlert from '../UiKits/Modal/ModalAlert';
import PaginationComponent from '../BonusUi/Pagination/Pagination';
import NoDataFound from '../UiKits/NoDataFound/NoDataFound';

const Categories: React.FC = () => {

    const { get, del, loading } = useFetch();

    const [search, setSearch] = useState<string>("");

    const [refresh, setRefresh] = useState(false);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [categories, setCategories] = useState<any>({});

    const router = useRouter();

    useEffect(() => {
        const fetchBrandsList = async () => {
            try {
                const result = await get(`${api_urls?.category}?page=${currentPage}&search=${search}`);
                if (result?.status === 200) {
                    setCategories(result?.data);
                } else {
                    toast.error(result?.message);
                }
            } catch (error: any) {
                toast.error(error?.message);
            } finally {
                setRefresh(false);
            }
        }
        fetchBrandsList();
    }, [search, currentPage, refresh]);

    const deleteItem = async (item: any) => {
        try {
            let result: any = await del(`${api_urls?.category}${item?.id}/`);
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
            <Breadcrumbs mainTitle={CategoryListHeading} parent={CategoriesHeading} />
            <Card className="hoverable-table">
                <CardHeader>
                    <div className="d-flex justify-content-between">
                        <Form className="theme-form w-25">
                            <FormGroup>
                                <Input
                                    type="text"
                                    placeholder="Search category..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </FormGroup>
                        </Form>
                        <div>
                            <button
                                type="button"
                                className="btn btn-info"
                                onClick={() => router?.push('/categories/entry')}
                            >
                                Add New Category
                            </button>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    {
                        categories?.results?.length > 0 ?
                            <Fragment>
                                <Table hover size={"md"} responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Slug</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            categories?.results?.map((i: any, idx: React.Key) => (
                                                <tr key={i?.id}>
                                                    <td>{(Number(idx) + 1).toString()}</td>
                                                    <td>{i?.name}</td>
                                                    <td>{i?.slug}</td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <Link href={`/categories/entry/${i?.id}`}>
                                                                <FaRegEdit
                                                                    size={20}
                                                                    className={'bg-warning text-white me-2'}
                                                                />
                                                            </Link>
                                                            <ModalAlert
                                                                type={"delete"}
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
                                    pages={categories?.count}
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

export default Categories;