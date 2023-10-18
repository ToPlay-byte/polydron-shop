import React from "react";
import styles from './styles.module.scss'


const Documentation = () => {
    return (
        <section className={styles.info}>
            <div className={styles.wrapper}>
                <div className={styles.info__inner}>
                    <h1 className={styles.info__title}>Ми  турбуємося про те, щоб ви могли використати наш товар на всі 100%.</h1>
                    <div className={styles.info__box}>
                        <img src="/static/images/home/info-img.webp" alt="" className={styles.info__img} />
                        <div className={styles.info__content}>
                            <p className={styles.info__text}>В розділі документація ви завжди зможете знайти інформація про наш товар: </p>
                            <ul className={styles.info__list}>
                                <li className={styles['info__list-item']}>Встановлення системи скидання на ваш коптер;</li>
                                <li className={styles['info__list-item']}>Налогодження системи скидання;</li>
                                <li className={styles['info__list-item']}>Як керувати системою скидання;</li>
                                <li className={styles['info__list-item']}>Особливості системи скидання;</li>
                            </ul>
                        </div>
                    </div>  
                </div>
            </div>
        </section>
    )
}

export default Documentation