import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import  Layout from '@components/layouts/BaseLayout/BaseLayout'
import AuthContext from '@contexts/AuthContext'
import styles from './styles.module.scss'



const ResetPassword = () => {
    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({
        mode: "onBlur"
    })
    const { token, uid } = useParams()

    const onSubmit = data => {
        axios.post('/api/auth/users/reset_password_confirm/', {
            new_password: data.new_password,
            re_new_password: data.re_new_password,
            token: token,
            uid, uid
        }).then(() => {
            location.href = '/'
        })
    }
    return (
        <Layout>
            <main className={styles['main']}>
                <section className={styles["reset-password"]}>
                    <div className={styles["wrapper"]}>
                        <div className={styles["reset-password__inner"]}>
                            <form   onSubmit={handleSubmit(onSubmit)} className={styles["reset-password__form"]}>
                                <label htmlFor='password' className={styles["reset-password__label"]}>Новий пароль</label>
                                <input id='password' type="password" className={styles["reset-password__field"]} { ...register('new_password', { required: true, maxLength: 16, minLength: 8 })} />
                                {errors.new_password?.type == 'required' && <div className={styles['reset-password__error']}>Це поле повинно бути заповнено</div>}
                                {(errors.new_password?.type == 'minLength' || errors.new_password?.type == 'maxLength') && <div className={styles['reset-password__error']}>Пароль повинен бути більше 8 символів та меньше 16</div>}
                                <label htmlFor='re-password' className={styles["reset-password__label"]} >Підтвердіть пароль</label>
                                <input id='re-password' type="password" className={styles["reset-password__field"]} { ...register('re_new_password', { required: true, validate: value => {
                                    if (watch('new_password') != value ){
                                        return "Ваші паролі не збігаються"
                                    }
                                } })}/>
                                {errors.re_new_password?.type == 'required' && <div className={styles['reset-password__error']}>Це поле повинно бути заповнено</div>}
                                {errors.re_new_password?.type == 'validate' && <div className={styles['reset-password__error']}>{errors.re_new_password.message}</div>}
                                <button disabled={!isValid} className={styles["reset-password__btn"]}>Змінити пароль</button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    )
}

export default ResetPassword

