import React from 'react'
import styles from './styles.module.scss'


const Gallery = () => {
    return (
        <section className={styles.gallery}>
            <div className={styles.wrapper}>
                <div className={styles.gallery__inner}>
                    <h1 className={styles.gallery__title}>Ви можете переглянути усі забраження нашого товару</h1>
                    <div className={styles.gallery__content}>
                        <div className={styles.gallery__text}>Ми робимо все, щоб ви могли побачити наш товар з різних сторін та обрати те, що ваи потрібно </div>
                        <div className={styles.gallery__images}>
                            <img src="/static/images/home/gallery-img1.webp" className={[styles['gallery__images-item'], styles['gallery__images-item--top']].join(' ')} />
                            <img src="/static/images/home/gallery-img2.webp" className={styles['gallery__images-item']} />
                            <img src="/static/images/home/gallery-img3.webp" className={[styles['gallery__images-item'], styles['gallery__images-item--bottom']].join(' ')} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Gallery