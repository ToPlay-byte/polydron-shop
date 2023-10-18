import React, { useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Cookie from "js-cookie"
import axios from "axios"
import jwt_decode from 'jwt-decode'
import CSRFToken from '@components/CSRFToken/CSRFToken'
import AuthContext from '@contexts/AuthContext'
import styles from './styles.module.scss'


const LogInForm = ({ setResetPasswordForm }) => {
    let {login} = useContext(AuthContext)
    const { setError, handleSubmit, formState: {errors} } = useForm()
    const navigate = useNavigate()
    let onSubmit = async (e) => {
        e.preventDefault()
        const response = login(e)
        response.then(res => {
            if (res.status === 200) {
                location.reload()
            } 
        }).catch(
            error => {
                console.log(error)
                setError('login', {type: 'login', message: 'Неправильний пароль або електрона пошта'})
            }
        )
        
        
    }
    return (
        <>
            {errors.login && <div className={styles['modal-auth__form-error-header']}>{errors.login.message}</div>}
            <form  className={styles['modal-auth__form']} onSubmit={ e => handleSubmit(onSubmit(e))}>
                <CSRFToken />
                <label htmlFor="email" className={styles['modal-auth__form-label']}>Електрона пошта:</label>
                <input id='email' type="text" className={styles['modal-auth__form-field']} />
                <label htmlFor="email" className={styles['modal-auth__form-label']}>Пароль:</label>
                <input id='password' type="password" className={styles['modal-auth__form-field']} name='password'/>
                <button className={styles['modal-auth__form-btn']}>Увійти</button>
            </form>
            <div onClick={() => setResetPasswordForm(true)} className={styles['modal-auth__link']}>Забули пароль?</div>
        </>
    )
}

export default LogInForm