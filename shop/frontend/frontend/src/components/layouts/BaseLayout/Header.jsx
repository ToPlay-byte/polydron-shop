import React, { useContext, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { BsCart2, BsFillPersonFill, BsFillBox2HeartFill }from 'react-icons/bs'
import AuthContext from '@contexts/AuthContext'
import CartContext from '@contexts/CartContext'
import SearchInput from '@components/UI/SearchInput/SearchInput'
import ModalCart from '@components/modals/ModalCart/ModalCart'
import ModalAuth from '@components/modals/ModalAuth/ModalAuth'
import styles from './styles.module.scss'

const Header = () => {
    const [ modalAuthActive, setModalAuthActive ] = useState(false)
    const { user } = useContext(AuthContext)
    const { cart } = useContext(CartContext)
    const [ modalCartActive, setModalCartActive] = useState(false)
    const navigate = useNavigate()
    return (
        <>
            <header className={styles.header}>
                <div className={styles['header__top']}>
                    <div className={styles["header__logo"]}>
                        <a href="" className={styles["header__logo-link"]}>
                            <img src="/static/images/layout/logo.png" alt="" className={styles["header__logo-img"]} />
                        </a>
                    </div>
                </div>
                <div className={styles['header__bottom']}>
                    <div className={styles['header__bottom-inner']}>
                        <nav className={styles["header__menu"]}>
                            <ul className={styles["header__menu-list"]}>
                                <li className={styles["header__menu-item"]}>
                                    <NavLink
                                    to='/'
                                    className={({ isActive }) =>
                                        [
                                            styles["header__menu-link"],
                                            isActive ? styles['active']: '' 
                                        ].join(' ') 
                                    }
                                    >
                                    Головна
                                    </NavLink>
                                </li>
                                <li className={styles["header__menu-item"]}>
                                    <NavLink
                                    to='/catalog'
                                    className={({ isActive }) =>
                                        [
                                            styles["header__menu-link"],
                                            isActive ? styles['active']: '' 
                                        ].join(' ')                                    }
                                    >
                                    Каталог  
                                    </NavLink>
                                </li>
                                <li className={styles["header__menu-item"]}>
                                    <NavLink
                                    to='/gallery'
                                    className={({ isActive }) =>
                                        [
                                            styles["header__menu-link"],
                                            isActive ? styles['active']: '' 
                                        ].join(' ') 
                                    }
                                    >
                                    Галерея  
                                    </NavLink>
                                </li>
                                <li className={styles["header__menu-item"]}>
                                    <NavLink
                                    to='/documantation'
                                    className={({ isActive }) =>
                                        [
                                            styles["header__menu-link"],
                                            isActive ? styles['active']: '' 
                                        ].join(' ') 
                                    }
                                    >
                                    Документація  
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                        <SearchInput />
                        <a className={[styles.header__box , styles.header__favorite].join(' ')}>
                            <BsFillBox2HeartFill  size={30}/>
                            <span className={styles['header__favorite-text']}>Бажане</span> 
                        </a>
                        <a className={[styles.header__box, styles.header__cart].join(' ')} onClick={() => setModalCartActive(true)}>
                            { cart.length > 0 && <span className={styles["header__cart-quantity"]}>{cart.length}</span> }
                            <BsCart2 size={30}/>
                            <div className={styles['header__cart-text']}>Корзина</div>
                        </a>    
                        <div onClick={user?.email ? () => navigate('/account/settings'): () => setModalAuthActive(true)}  className={styles.header__box}>
                            <BsFillPersonFill size={30}/>
                            <span className={styles['header__login-text']}>{user?.email ? 'Кабінет': 'Увійти'}</span> 
                        </div>
                    </div>
                </div>
            </header>
            { modalAuthActive && <ModalAuth setActive={setModalAuthActive} /> }
            { modalCartActive && <ModalCart setActive={setModalCartActive} /> }
        </>
    )
}

export default Header