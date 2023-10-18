import React from 'react'
import Layout from '@components/layouts/BaseLayout/BaseLayout'
import styles from './styles.module.scss'


const Gallery = () => {
    document.title = 'Галерея'
    return (
        <Layout>
            <main className={styles.main}>
                <section className={styles.gallery}>
                    <div className={styles.wrapper}>
                        <div className={styles.gallery__inner}>
                            <ul className={styles.gallery__list}>
                                <li className={styles['gallery__list-item']}>
                                    <div className={styles['gallery__list-title']}>FIMI X8</div>
                                    <ul className={styles.gallery__sublist}>
                                        <li className={styles['gallery__sublist-item']}>Одинарні системи скидання</li>
                                        <li className={styles['gallery__sublist-item']}>Двійкові системи скидання</li>
                                    </ul>
                                </li>
                                <li className={styles['gallery__list-item']}>
                                    <div className={styles['gallery__list-title']}>DJI Matrice 3000RTK</div>
                                    <ul className={styles.gallery__sublist}>
                                        <li className={styles['gallery__sublist-item']}>Одинарні системи скидання</li>
                                        <li className={styles['gallery__sublist-item']}>Двійкові системи скидання</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    )
}

export default Gallery