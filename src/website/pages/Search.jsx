import React, { useEffect, useState } from 'react'
import Loading from '../../common/components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getProducts } from '../../api/ProductApi'
import { setProducts, setTotalRecords } from '../../features/productSlice';
import ProductCard from '../components/ProductCard';
import Pagination from '../../common/components/Pagination';

const Search = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.product)
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setLoading(true)

        getProducts(page, 20, searchParams.get("search") ? searchParams.get("search") : '')
            .then(res => {
                if (res.status === 200) {
                    dispatch(setProducts(res.data.products))
                    dispatch(setTotalRecords(res.data.totalRecords))
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }, [dispatch, page, searchParams.get("search")])

    const handleSetPage = (page) => {
        setPage(page);
    };

    if (loading)
        return <Loading />
    else
        return (
            <>
                <div className="row">
                    {selector.products.length > 0 ? selector.products.map((product, index) => (
                        <div className="col-md-3 col-sm-6" key={index}>
                            <ProductCard product={product} />
                        </div>
                    )) :
                        <h4>No data found</h4>
                    }
                    <div className="col-md-12">
                        <Pagination total={selector.totalRecords ? selector.totalRecords : 1} current={page} length={20} setPage={handleSetPage} />
                    </div>
                </div>
            </>
        )
}

export default Search