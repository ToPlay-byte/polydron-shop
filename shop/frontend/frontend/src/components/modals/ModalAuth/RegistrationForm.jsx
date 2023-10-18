import React, { useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "@contexts/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios"
import Cookie from 'js-cookie'
import CSRFToken from '@components/CSRFToken/CSRFToken'
import styles from './styles.module.scss'
import { PhoneInput, usePhoneValidation } from 'react-international-phone';
import 'react-international-phone/style.css';


const RegistrationForm = () => {
    const {login} = useContext(AuthContext)
    let { register, setError, handleSubmit, watch, formState: { errors, isValid, }, getValues} = useForm({
        mode: 'onBlur'
    })
    const [phoneError, setPhoneErorr] = useState(false)
    const [phone, setPhone] = useState('+380 ')
    let navigate = useNavigate()
    const signUp = (e) => {
        e.preventDefault()
        let data = {
            ...getValues()
        }
        let isPhoneValid = usePhoneValidation(phone).isValid
        if (isPhoneValid) {
            data['phone'] = phone
        }
        axios.post('/api/auth/profile', data, {
            headers: {
                "X-CSRFToken": Cookie.get('csrftoken')
            }
        }).then(res => {
            login(e).then(
                () => {
                    location.reload()
                }
            )
        })
    }

    const isEmailExists = (value) => {
        axios.post('/api/auth/user/is-exists', {email: value}, { headers:{"X-CSRFToken": Cookie.get('csrftoken')}}).catch(
            err => {
                console.log(err.response)
                setError('email', {type: 'invalid', message: 'Користувач з такою електроною адресою вже існує'})
            }
        )
        return
    }
    const validatePhone = (e) => {
        setPhone(e)
        let validate = usePhoneValidation(e)
        if(!validate.isValid ){
            setPhoneErorr(true)
        } else{
            setPhoneErorr(false)
        }
        
    }
    return ( 
        <form  className={styles['modal-auth__form']} onSubmit={e => handleSubmit(signUp(e))}>
            <CSRFToken />
            <label htmlFor="first_name" className={styles['modal-auth__form-label']}>Ім'я:</label>
            <input id='first_name' type="text" className={styles['modal-auth__form-field']} {...register('first_name')}/>
            <label htmlFor="last_name" className={styles['modal-auth__form-label']}>Прізвище:</label>
            <input id='last_name' type="text" className={styles['modal-auth__form-field']} {...register('last_name')}/>
            <label htmlFor="email" className={styles['modal-auth__form-label']}>Електрона пошта:<span className={styles['modal-auth__form-label-star']}>*</span></label>
            <input id='email' type="text" className={styles['modal-auth__form-field']}  {...register("email", {required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, validate: value => isEmailExists(value)})}/>
            {errors.email?.type == 'required' && <div className={styles['modal-auth__form-error']}>Це поле повинно бути заповнено</div>}
            {errors.email?.type == 'pattern' && <div className={styles['modal-auth__form-error']}>Некоректний адрес електрної пошти</div>}
            {errors.email?.type == 'invalid' && <div className={styles['modal-auth__form-error']}>{errors['email'].message}</div>}
            <label htmlFor="phone" className={styles['modal-auth__form-label']}>Номер телефону:</label>
            <PhoneInput  value={phone} inputClassName={styles['modal-auth__form-phone']} onChange={phone => validatePhone(phone)}  defaultCountry="ua"/>
            {phoneError && <div className={styles['modal-auth__form-error']}>Некоректний номер телефону</div>}
            <label htmlFor="password" className={styles['modal-auth__form-label']}>Пароль:<span className={styles['modal-auth__form-label-star']}>*</span></label>
            <input id='password' type="password" className={styles['modal-auth__form-field']} {...register("password", {required: true, minLength: 8, maxLength: 16})}/>
            {errors.password?.type == 'required' && <div className={styles['modal-auth__form-error']}>Це поле повинно бути заповнено</div>}
            {(errors.password?.type == 'minLength' || errors.password?.type == 'maxLength') && <div className={styles['modal-auth__form-error']}>Пароль повинен бути більше 8 символів та меньше 16</div>}
            <label htmlFor="confirm-password" className={styles['modal-auth__form-label']}>Підтвердіть пароль:<span className={styles['modal-auth__form-label-star']}>*</span></label>
            <input id='confirm-password' type="password" className={styles['modal-auth__form-field']} {...register("re-password", {required: true, validate: val => {
                if (watch('password') != val) {
                    return "Ваші паролі не збігаються";
                }
            }})}/>
            {errors['re-password']?.type == 'required' && <div className={styles['modal-auth__form-error']}>Це поле повинно бути заповнено</div>}
            {errors['re-password']?.type == 'validate' && <div className={styles['modal-auth__form-error']}>{errors['re-password'].message}</div>}
            <button className={styles['modal-auth__form-btn']} type="submit" disabled={!isValid}>Зараєструватися</button>
        </form>
    )
}

export default RegistrationForm