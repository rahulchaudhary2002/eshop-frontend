import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { findProductByCategory } from '../../api/ProductApi'
import { setProducts, setTotalRecords } from '../../features/productSlice';
import { setCategory } from '../../features/categorySlice';
import { toast } from 'react-toastify';
import Loading from '../../common/components/Loading';
import ProductCard from '../components/ProductCard';
import Pagination from '../../common/components/Pagination';

const CategoryProduct = () => {
    const dispatch = useDispatch()
    const productSelector = useSelector(state => state.product)
    const categorySelector = useSelector(state => state.category)
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setLoading(true)

        findProductByCategory(id, page, productSelector.perPage)
            .then(res => {
                if (res.status === 200) {
                    dispatch(setProducts(res.data.products))
                    dispatch(setTotalRecords(res.data.totalRecords));
                    dispatch(setCategory(res.data.category))
                }
                else {
                    toast.error(res.error)
                    return navigate('/')
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }, [dispatch, page])

    const handleSetPage = (page) => {
        setPage(page);
    };

    if (loading)
        return <Loading />
    else
        return (
            <>
                <h4 className="text-primary">{categorySelector.category?.name}</h4>
                <div className="row">
                    {productSelector.products.map((product, index) => (
                        <div className="col-md-3 col-sm-6" key={index}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                    <div className="col-md-12">
                        <Pagination total={productSelector.totalRecords ? productSelector.totalRecords : 1} current={page} length={productSelector.perPage} setPage={handleSetPage} />
                    </div>
                </div>
            </>
        )
}

export default CategoryProduct