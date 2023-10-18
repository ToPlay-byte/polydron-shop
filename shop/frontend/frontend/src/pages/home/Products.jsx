import React from "react";
import Slider from 'react-slick'
import styles from './styles.module.scss'



const Products = () => {
    const settings = {
        slidesToShow: 1,
        arrows: false,
        dots: true,
        dotsClass: styles['products__slider-dots']
    }
    return (
        <section className={styles.products}>
            <div className={styles.wrapper}>
                <div className={styles.products__inner}>
                    <h2 className={styles.products__title}>Наш ассортимент товару</h2>
                    <p className={styles.products__subtitle}>Ми пропонуємо понад 100 одиниць товару, який допомогає нашим Зборойним силам України знищувати противника на полі бою.</p>
                    <Slider {...settings} className={styles.products__slider}>
                        <div className={styles["products__slider-item"]}>
                            <div className={styles["products__slider-content"]}>
                                <h3 className={styles["products__slider-title"]}>Система скиду Подвійна D30 для DJI MAVIC 3</h3>
                                <p className={styles["products__slider-text"]}> Автономна система для транспортування та скидання циліндричних тіл діаметром 30мм для коптера DJI MAVIC 3 . Система сама по собі є автономним навісним обладнанням на дрон, має автономне живлення та працює шляхом зчитування світлових сигналів дрона за допомогою фото елемента. Завдяки такій конструкції, система для своєї роботи не потребує втручання в архітектуру дрона. Застосування системи потребує при експлуатації дрона вимикання нижніх датчиків положення.</p>
                            </div>
                            <img src="static/images/home/d30.webp" alt="" className={styles["products__slider-img"]} />
                        </div>
                        <div className={styles["products__slider-item"]}>
                            <div className={styles["products__slider-content"]}>
                                <h3 className={styles["products__slider-title"]}>Система скиду Подвійна D40 для DJI MAVIC 3</h3>
                                <p className={styles["products__slider-text"]}>Автономна система для транспортування та скидання циліндричних тіл діаметром 40мм для коптера DJI MAVIC 3 . Система сама по собі є автономним навісним обладнанням на дрон, має автономне живлення та працює шляхом зчитування світлових сигналів дрона за допомогою фото елемента. Завдяки такій конструкції, система для своєї роботи не потребує втручання в архітектуру дрона. Застосування системи не потребує! при експлуатації дрона вимикання нижніх датчиків положення.</p>
                            </div>
                            <img src="static/images/home/d40.webp" alt="" className={styles["products__slider-img"]} />
                        </div>
                        <div className={styles["products__slider-item"]}>
                            <div className={styles["products__slider-content"]}>
                                <h3 className={styles["products__slider-title"]}>Система скидання F1 для коптера DJI Mavic 3</h3>
                                <p className={styles["products__slider-text"]}> Автономна система для транспортування та скидання тіл типу Ф1 для DJI Mavic 3. Система сама по собі є автономним навісним обладнанням на дрон, має автономне живлення та працює шляхом зчитування світлових сигналів дрона за допомогою фотоелемента. Завдяки такій конструкції, система для своєї роботи не потребує втручання в архітектуру дрона.</p>
                            </div>
                            <img src="static/images/home/f1.webp" alt="" className={styles["products__slider-img"]} />
                        </div>
                        <div className={styles["products__slider-item"]}>
                            <div className={styles["products__slider-content"]}>
                                <h3 className={styles["products__slider-title"]}>Система скидання RGD-5 для коптера DJI Mavic 3</h3>
                                <p className={styles["products__slider-text"]}>Автономна система для транспортування та скидання тіл типу РГД-5 для DJI Mavic 3. Система сама по собі є автономним навісним обладнанням на дрон, має автономне живлення та працює шляхом зчитування світлових сигналів дрона за допомогою фотоелемента. Завдяки такій конструкції, система для своєї роботи не потребує втручання в архітектуру дрона.</p>
                            </div>
                            <img src="static/images/home/rgd5.webp" alt="" className={styles["products__slider-img"]} />
                        </div>
                    </Slider>
                    <a href="catalog" className={styles.products__btn}>Перейти до нашого каталогу</a>
                </div>
            </div>
        </section>
    )
}

export default Products

