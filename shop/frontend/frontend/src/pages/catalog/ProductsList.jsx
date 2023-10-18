import React, {useState, useEffect} from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styles from './styles.module.scss'
import Pagination from './Pagination'
import axios from 'axios'


const ProductList = () => {
    const { category } = useParams()
    const [ searchParams ] = useSearchParams()
    const [ products, setProducts ] = useState([])
    const params = {}
    searchParams.forEach((value, key) => {
        params[key] = value;
    });
    const productsPerPage = 8
    const  currentPage  = params.page ? params.page: 1
    
    useEffect(() => {
        axios.get(`/api/catalog/products/${category ? `${category}`: ''}${searchParams.length ? `?${searchParams}`: ''}`).then(res => setProducts(res.data))
    }, [])
    
    console.log(products)
    const lastIndex = currentPage * productsPerPage 
    const firstIndex = lastIndex - productsPerPage
    const currentProducts = products.slice(firstIndex, lastIndex)

    return (
        <section className={styles.products}>
            <div className={styles.products__inner}>
                <div className={[styles.products__list]}>
                    {currentProducts.map(item => <ProductItem key={item.id} product={item} />)}
                </div>
                <Pagination totalProducts={products.length} productsPerPage={productsPerPage} currentPage={currentPage} searchParams={searchParams}/>
            </div>
        </section>
    )
}

const ProductItem = ({product}) => {
    return (
        <div className={styles["products__item"]}>
            <a href={`/catalog/detail/${product.slug}`} className={styles['products__item-link']}>
                <img src={product.poster} alt="" className={styles['products__item-img']} />
                <div className={styles['products__item-title']}>{product.name}</div>
                <div className={styles['products__item-price']}>{product.price}&#8372;</div>
            </a>
            <button className={styles['products__item-btn']}>Купити</button>
        </div>
    )
}

export default ProductList

