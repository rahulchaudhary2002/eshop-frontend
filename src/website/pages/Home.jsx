import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Loading from '../../common/components/Loading';
import { getCategories } from '../../api/CategoryApi';
import { setCategories, setTotalRecords } from '../../features/categorySlice';
import { setProducts, setTotalRecords as setTotalProductRecords } from '../../features/productSlice';
import { getProducts } from '../../api/ProductApi';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';

const Home = () => {
    const dispatch = useDispatch()
    const categorySelector = useSelector(state => state.category)
    const productSelector = useSelector(state => state.product)
    const [loading, setLoading] = useState(true)
    const [disable, setDisable] = useState(false)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setLoading(true);

        Promise.all([
            getCategories(categorySelector.page, categorySelector.perPage),
            getProducts(page, productSelector.perPage)
        ]).then(([categoriesRes, productsRes]) => {
            if (categoriesRes.status === 200) {
                dispatch(setCategories(categoriesRes.data.categories));
                dispatch(setTotalRecords(categoriesRes.data.totalRecords));
            }

            if (productsRes.status === 200) {
                dispatch(setProducts(productsRes.data.products));
                dispatch(setTotalProductRecords(productsRes.data.totalRecords));
            }
        }).catch(error => {
            console.error('Error fetching data:', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [dispatch]);

    const loadMore = () => {
        setDisable(true)
        getProducts(page + 1, productSelector.perPage)
            .then(res => {
                if (res.status === 200) {
                    dispatch(setProducts([...productSelector.products, ...res.data.products]));
                    setPage(res.data.page)
                }
            }).catch(error => {
                console.error('Error fetching data:', error);
            }).finally(() => {
                setDisable(false);
            });

    }

    if (loading)
        return <Loading />
    else
        return (
            <>
                <h4 className="text-primary">Categories</h4>
                <div className="row">
                    {categorySelector.categories.map((category, index) => (
                        <div className="col-md-2 col-sm-6" key={index}>
                            <CategoryCard category={category} />
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="text-primary mt-3">Just For You</h4>
                    <Link to={'/product'} className='btn btn-primary'>View More</Link>
                </div>
                <div className="row">
                    {productSelector.products.map((product, index) => (
                        <div className="col-md-3 col-sm-6" key={index}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                    <div className="col-md-12 text-center"><button className='btn btn-primary mb-3' onClick={loadMore} disabled={disable} hidden={productSelector.products.length >= productSelector.totalRecords ? true : false}>Load More</button></div>
                </div>
            </>
        )
}

export default Home