import React, { useState, useContext, useEffect } from 'react';
import CartContext from '@contexts/CartContext';
import { BsXLg } from "react-icons/bs"
import styles from './styles.module.scss'


const ModalCart = ({ setActive }) => {
    const { cart } = useContext(CartContext)
    return (
        <div className={styles['cart']}>
            <div className={styles["cart__bg"]}></div>
            <div className={styles["cart__inner"]}>
                <div className={styles["cart__header"]}>
                    <h1 className={styles["cart__title"]}>Корзина</h1>
                    <div className={styles["cart__exit"]} onClick={() => setActive(false)}><BsXLg /></div>
                </div>
                <div className={styles["cart__body"]}>
                    <div className={styles["cart__list"]}>
                        { 
                            cart.length > 0 ? 
                            cart.map( item => <CartItem key={item.info.name} product={item} /> ):
                            <div className={styles["cart__empty"]}>Корзина порожня</div>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}


const CartItem = ({product}) => {
    console.log(product)
    const { handleDeleteCart, changeQuantityCart } = useContext(CartContext)
    const [ quantity, setQuanity ] = useState(product.quantity)
    const [ totalPrice, setTotalPrice ] = useState(product.total_price)
    const handleChangeQuantity = e => {
        return setQuanity(value => {
            let new_value = e.target.value
            if (!isNaN(new_value)) {
                let number = Number(new_value)
                if (Number.isInteger(number) && number > 1) {
                    setTotalPrice( () => product.info.price * number )
                    return number
                }
            }
            return value
        })
    }

    const handlePlusButton = () => {
        return setQuanity( value => { 
            value += 1 
            setTotalPrice( () => product.info.price * value)
            return value
        })
    }

    const handleMinusButton = () => {
        return setQuanity( value => {
            if (value > 1) {
                value -= 1 
                setTotalPrice( () => product.info.price * value)
                
            }
            return value
        })
    }

    useEffect(() => {
        changeQuantityCart(product, quantity)
    }, [quantity])
    return (
        <div className={styles["cart__item"]}>
            <img src={product.info.poster} alt={product.info.name} className={styles["cart__item-img"]} />
            <div className={styles["cart__item-info"]}>
                <div className={styles["cart__item-title-wrapper"]}>
                    <a href={`/catalog/detail/${product.info.slug}`} className={styles["cart__item-title"]}>{product.info.name}</a>
                </div>
                <div className={styles["cart__price-wrapper"]}>
                    <div className={styles["cart__price"]}>{product.info.price}&#8372;</div>
                    <div className={styles["cart__quantity"]}> 
                        <button onClick={handleMinusButton} className={styles["cart__quantity-btn"]}>-</button>
                        <input type="text" value={quantity} onChange={handleChangeQuantity} className={styles["cart__quantity-field"]} />
                        <button onClick={handlePlusButton} className={styles["cart__quantity-btn"]}>+</button>
                    </div>
                    <div className={styles["cart__total-price"]}>{totalPrice}&#8372;</div>
                </div>
                <div className={styles["cart__box"]}>
                    <div className={styles["cart__buy-btn"]}>Купити</div>
                    <div onClick={() => handleDeleteCart(product)} className={styles["cart__delete-btn"]}>Видалити</div>
                </div>
            </div>
        </div>
    )
}

export default ModalCart