import React, { useState, useEffect } from 'react'
import useAxios from '@hooks/useAxios'
import styles from './styles.modules.scss'


const FavoriteList = () => {
    const api = useAxios()
    const [ products, setProducts ] = useState([])

    useEffect(() => {
        api.get('/api/auth/fovorite-products').then( res => setProducts(res.data))
    }, [])

    return (
        <section className={styles['favorite']}>
            <div className={styles["favorite__inner"]}>
                <div className={styles["favorite__list"]}>
                    {   products.length > 0 ?
                        products.map(item => <ProductItem item={item} setProducts={setProducts}/>):
                        <div className={styles["favorite__empty"]}>У вас нічого немає в списку бажаного</div> 
                    }
                </div>
            </div>
        </section>
    )
    
}


const ProductItem = ({ item: { url, name }, setProducts}) => {
    const api = useAxios()
    
    const deleteProduct = () => {
        api.delete('/api/auth/fovorite-products').then(() => {
            setProducts(items => items.filter(item => {
                if (item.name !== name) {
                    return true
                }
            }))
        })
    }

    return (
        <a href="" className="favorite__item-link">
            <div className={styles["favorite__item"]}>
                <div className={styles["favorite__wrapper"]}>
                    <img src={url} alt="" className={styles["favorite__item-img" ]}/>
                    <div className={styles["favorite__item-info"]}>
                        <h3 className={styles["favorite__item-title"]}>{name}</h3>
                        <div className={styles["favorite__item-box"]}>
                            <button className={styles["favorite__item-delete"]}>Видалити</button>
                        </div>
                    </div>
                </div>
            </div>
        </a>
        
    )
}

export default FavoriteList