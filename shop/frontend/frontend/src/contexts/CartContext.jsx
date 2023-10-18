
import React, { useState, createContext, useContext, useEffect } from 'react'
import useAxios from '@hooks/useAxios'
import AuthContext from './AuthContext'
import Cookie from 'js-cookie'

const CartContext = createContext()

export default  CartContext

export function CartProvider({children}) {
    const [ cart, setCart ] = useState([])
    const { user } = useContext(AuthContext)
    const api = useAxios()
    const handleAddCart = product => {
        let itemCart = {
            info: {
                'price': product.price,
                'name': product.name,
                'poster': product.poster,
                'slug': product.slug
            },
            'total_price': product.price,
            'quantity': 1
        }
        return setCart(items => {
            let isExsist = items.some( item => item.info.name == itemCart.info.name)
            if (isExsist) {
                return items
            }
            const new_items = [...items, itemCart]
            if (user.user_id) {
                api.post('/api/catalog/cart', itemCart).then(res => console.log(res.data))
                return new_items
            }
            
            localStorage.setItem('cart_items', JSON.stringify(new_items))
            return new_items
        })
        
    }

    const changeQuantityCart = (product, quantity) => {
        return setCart( items => {
            let new_items = items.map( item => {
                    console.log(item, product)
                    if (product == item) {
                        item.quantity = quantity
                        item.totalPrice = quantity * item.info.price
                        if (user.user_id) {
                            api.put('/api/catalog/cart', item).then(res => console.log(res.data))
                        } 
                        return item
                    }
                    return item
                }
            )
            if (!user.user_id) {
                localStorage.setItem('cart_items', JSON.stringify(new_items))
            }
            return new_items
        })
    }

    const handleDeleteCart = product => {
        return setCart(items => {
            let new_items = items.filter(item => {
                if (item !== product) {
                    return item
                }
            })
            if (user.user_id) {
                api.delete('/api/catalog/cart', { data: {product: product.info.name}})
            } 
            localStorage.setItem('cart_items', JSON.stringify(new_items))
            return new_items
        })
    }

    let contextData = {
        handleAddCart,
        handleDeleteCart,
        changeQuantityCart,
        cart
    }

    useEffect(() => {
        let local_data = JSON.parse(localStorage.getItem('cart_items'))
        if (user.user_id) {
            if (local_data) {
                local_data.map(item => {
                    api.post('/api/catalog/cart', item).then(res => console.log(res.data))
                })
                localStorage.removeItem('cart_items')
            }
            api.get('/api/catalog/cart').then(res => {
                setCart(res.data)
            })
            
        } else {
            setCart(local_data   ? local_data: [])
        }
        
    }, [])

    return (
        <CartContext.Provider value={contextData}>
            {children}
        </CartContext.Provider>
    )
}


