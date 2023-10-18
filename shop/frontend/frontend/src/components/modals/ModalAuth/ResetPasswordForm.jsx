import React, { useState } from "react";
import { useForm } from 'react-hook-form'
import axios from "axios"
import styles from './styles.module.scss'


const ResetPasswordForm = ({setResetPasswordForm}) => {
    let { register, handleSubmit, formState: { errors, isValid, } } = useForm({
        mode: 'onBlur'
    })
    const [ success, setSuccess ] = useState(false)
    const onSubmit = (data) => {
        console.log(data)
        axios.post('/api/auth/users/reset_password/', {
            email: data.email
        }).then()
        setSuccess(true)
    }
    if (!success) {
        return (
            <>
                <form className={styles['modal-auth__form']} action="" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email" className={styles['modal-auth__form-label']}>Електрона пошта:</label>
                    <input id="email" className={styles['modal-auth__form-field']} type="email"  {...register("email", {required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/})}/>
                    {errors.email?.type == 'required' && <div className={styles['modal-auth__form-error']}>Це поле повинно бути заповнено</div>}
                    {errors.email?.type == 'pattern' && <div className={styles['modal-auth__form-error']}>Некоректний адрес електрної пошти</div>}
                    <button disabled={!isValid} className={styles['modal-auth__form-btn']} type="submit">Відправити листа на електрону пошту</button>
                </form>
                <div onClick={() => setResetPasswordForm(false)} className={styles['modal-auth__link']}>Згадали пароль? Повернутись</div>
            </>
        )
 
    } else {
        return (
            <div className={styles["modal-auth__success"]}>Повідомлення про сброс пароля було відправлено вам на електрону пошту</div>
        )
    }

   
}

export default ResetPasswordForm