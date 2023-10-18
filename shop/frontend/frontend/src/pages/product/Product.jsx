import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '@components/layouts/BaseLayout/BaseLayout'
import ProductImagesSlider from './ProductImagesSlider'
import ProductInfo from './ProductInfo'
import axios from 'axios'
import CartContext from '@contexts/CartContext'
import styles from './styles.module.scss'



const Product = () => {
    const routeParams = useParams()
    const { cart, handleAddCart } = useContext(CartContext)
    const [product, setProduct] = useState({
        photos: []
    })


    useEffect(() => {
        axios.get(`/api/catalog/products/detail/${routeParams.name}`).then(res => setProduct(res.data))
        
    }, [])
    let isExist = cart.some( item => item.info.name == product.name)
    document.title = product.name
    return (
        <Layout>
            <div className={styles['big-wrapper']}>
                <main className={styles.main}>
                    <section className={styles.product}>
                        <div className={styles.product__inner}>
                            <h3 className={styles.product__title}>{product.name}</h3>
                            <div className={styles.product__box}>
                                <ProductImagesSlider poster={product.poster} photos={product.photos}/>
                                <div className={styles['product__buy-wrapper']}>
                                    <span className={styles['product__buy-available']}>В наявності</span>
                                    <div className={styles['product__buy-price']}>
                                        {product.price}&#8372;
                                    </div>
                                    <div className={styles["product__box"]}>
                                        {
                                            isExist ? 
                                            <div className={[styles["product__buy-btn"], styles['disabled']].join(' ')}>В коризині</div> :
                                            <div className={styles["product__buy-btn"]} onClick={() => handleAddCart(product)}>Купити</div>
                                        }
                                        
                                        <div className={styles["product__favorite-btn"]}>Додати в бажане</div>
                                    </div>
                                    <div className={styles['product__buy-contacts']}>
                                            <a href="" className={styles["product__buy-phone"]}>+380 (50) 312-92-31</a>
                                            <a href="" className={styles["product__buy-phone"]}>+380 (95) 518-32-30</a>
                                    </div>
                                </div>
                            </div>
                            <ProductInfo product={product}/>
                        </div>
                    </section>
                </main>
            </div>
        </Layout>
    )
}


export default Product