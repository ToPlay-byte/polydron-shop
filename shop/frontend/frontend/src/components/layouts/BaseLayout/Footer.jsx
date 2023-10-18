import React from 'react'
import styles from './styles.module.scss'


const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.wrapper}>
                <div className={styles.footer__inner}>
                    <div className={styles.footer__box}>
                        <ul className={styles.footer__list}>
                            <li className={styles['footer__list-title']}>Контакти</li>
                            <li className={styles['footer__list-item']}><a href="tel:+380503129231" className="footer__list-link">+380503129231</a></li>
                            <li className={styles['footer__list-item']}><a href="mailto:khokhhome@gmail.com" className="footer__list-link">khokhhome@gmail.com</a></li>
                        </ul>
                        <ul className={styles.footer__list}>
                            <li className={styles['footer__list-title']}>Графік роботи</li>
                            <li className={styles['footer__list-item']}>Понеділок 09:00 - 21:00 </li>
                            <li className={styles['footer__list-item']}>Вівторок 09:00 - 21:00 </li>
                            <li className={styles['footer__list-item']}>Середа 09:00 - 21:00</li>
                            <li className={styles['footer__list-item']}>Четвер 09:00 - 21:00</li>
                            <li className={styles['footer__list-item']}>Пʼятниця 09:00 - 21:00</li>
                            <li className={styles['footer__list-item']}>Субота 	09:00 - 21:00</li>
                            <li className={styles['footer__list-item']}>Неділя 	Вихідний </li>
                        </ul>
                    </div>
                    <div className={styles.footer__logo}>
                        <div className={styles['footer__logo-link']}>
                            <img src="/static/images/layout/logo.png" alt="" className={styles['footer__logo-img']} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer






