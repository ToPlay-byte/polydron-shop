import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Layout from '@components/layouts/BaseLayout/BaseLayout'
import styles from './styles.module.scss'


const Payment = () => {
    const { register } = useForm({
        mode: 'onBlur'
    })


    return (
        <Layout>
            <main className={styles["main"]}>
                <section className={styles["payment"]}>
                    <div className={styles["wrapper"]}>
                        <div className={styles["payment__inner"]}>
                            <form className={styles["payment__form"]}>
                                <div className={styles["payment__form-section"]}>
                                    <div className={styles["payment__form-header"]}>
                                        Контактні дані
                                    </div>
                                    <div className={styles["payment__form-field"]}>
                                        <div className={styles["payment__form-box"]}>
                                            <label htmlFor="last_name" className={styles["payment__form-label"]}>Ваше прізвище</label>
                                            <input id='last_name' type="text" className={styles["payment__form-input" ]}/>
                                        </div>
                                        <div className={styles["payment__form-box"]}>
                                            <label htmlFor="first_name" className={styles["payment__form-label"]}>Ваше ім'я</label>
                                            <input id='first_name' type="text" className={styles["payment__form-input"]} />
                                        </div>
                                    </div>
                                    <div className={styles["payment__form-field"]}>
                                        <div className={styles["payment__form-box"]}>
                                            <label htmlFor="email" className={styles["payment__form-label"]}>Ваша електрона адреса</label>
                                            <input id="email" type="text" className={styles["payment__form-input"]} />
                                        </div>
                                        <div className={styles["payment__form-box"]}>
                                            <label htmlFor="phone" className={styles["payment__form-label"]}>Ваш номер телефону</label>
                                            <input id='phone' type="text" className={styles["payment__form-input"]} />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles["payment__form-section"]}>
                                    <div className={styles["payment__form-header"]}>
                                        Доставка
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    )
}

export default Payment