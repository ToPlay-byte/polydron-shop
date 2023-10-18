import React, {useContext} from 'react'
import AuthContext from '@contexts/AuthContext'
import styles from './style.module.scss'


const Sidbar = () => {
    const {logout} = useContext(AuthContext)
    return(
        <section className={styles.sidbar}>
            <div className={styles.sidbar__inner}>
                <ul className={styles.sidbar__list}>
                    <li className={styles['sidbar__list-item']}>
                        <a href="settings" className={styles['sidbar__list-link']}>Персональні дані</a>
                    </li>
                    
                    <li className={styles['sidbar__list-item']}>
                        <a href="" className={styles['sidbar__list-link']}>Закази</a>
                    </li>
                    <li className={styles['sidbar__list-item']}>
                        <a href="products" className={styles['sidbar__list-link']}>Бажане</a>
                    </li>
                    <li className={styles['sidbar__list-item']}>
                        <a href="" className={styles['sidbar__list-link']}>Історія заказів</a>
                    </li>
                    <li className={styles['sidbar__list-item']}>
                        <a onClick={() => logout()} href="/" className={styles['sidbar__list-link']}>Вийти</a>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Sidbar