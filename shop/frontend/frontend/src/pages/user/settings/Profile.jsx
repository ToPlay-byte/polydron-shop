import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '@contexts/AuthContext'
import CSRFToken from '@components/CSRFToken/CSRFToken'
import Cookie from 'js-cookie'
import { useForm } from 'react-hook-form'
import { PhoneInput } from 'react-international-phone';
import usePhoneValidator from '@hooks/usePhoneValidator';
import useAxios from '@hooks/useAxios'
import axios from 'axios'
import styles from './style.module.scss'


const Profile = () => {
    document.title = 'Профіль'
    const { user, updateTokens } = useContext(AuthContext)
    let { register, setError, handleSubmit, watch, setValue, formState: { errors, isValid, }, getValues} = useForm({
        mode: 'onBlur'
    })
    const api =  useAxios()
    const [ editForm, setEditForm ] = useState(false)
    const [ changePasswordForm, setChangePasswordForm ] = useState(false)
    const [phone, setPhone, phoneError] = usePhoneValidator()
    
    const updateProfile = data => { 
        if(errors) {
            data['phone'] = phone
        }
        console.log(data)
        api.put('/api/auth/profile', data,  {headers: {"X-CSRFToken": Cookie.get('csrftoken')}}).then(res => {
            if (res.status) {
                let data = res.data
                localStorage.setItem('la', JSON.stringify(data.access))
                localStorage.setItem('lf', JSON.stringify(data.refresh))
                location.reload()
            }
        }).catch(errors => {
            console.log(errors)
        })
        
    }

    useEffect(() => {
        setValue('first_name', user.first_name)
        setValue('last_name', user.last_name)
        setValue('email', user.email, {
            shouldValidate: true,
            shouldDirty: true
        })
        setPhone(user.phone)
    }, [user])

    const changePassword = data => {
        api.post('/api/auth/users/set_password/', data, {headers: {"X-CSRFToken": Cookie.get('csrftoken')}}).then(() => setChangePasswordForm(false)).catch(
            error => {
                console.log(error)
                setError('match', {type: 'match', message: 'Паролі не збігаються'})
            }
        )
    }
    return (
        <section className={styles.profile}>
            {changePasswordForm && 
            <div className={styles["change-password"]}>
                <div className={styles["change-password__wrapper"]}>
                {errors.match && <div className={styles['change-password__error-header']}>{errors.match.message}</div>}
                    <form className={styles["change-password__form"]} onSubmit={handleSubmit(changePassword)}>
                        <CSRFToken />
                        <label htmlFor="current-password" className={styles["change-password__label"]}>Введіть ваш старий пароль</label>
                        <input id='current-password' type="password" className={styles["change-password__field"]} {...register('current_password', { required: true })}/>
                        {errors.current_password?.type == 'required' && <div className={styles['change-password__error']}>Це поле повинно бути заповнено</div>}
                        <label htmlFor="new-password" className={styles["change-password__label"]}>Новий пароль</label>
                        <input id='new-password' type="password" className={styles["change-password__field"]}  { ...register('new_password', { required: true, maxLength: 16, minLength: 8 })} />
                        {errors.new_password?.type == 'required' && <div className={styles['change-password__error']}>Це поле повинно бути заповнено</div>}
                        {(errors.new_password?.type == 'minLength' || errors.new_password?.type == 'maxLength') && <div className={styles['reset-password__error']}>Пароль повинен бути більше 8 символів та меньше 16</div>}
                        <label htmlFor="re-password" className={styles["change-password__label"]}>Підтвердіть пароль</label>
                        <input id='re-password' type="password" className={styles["change-password__field"]}  { ...register('re_new_password', { required: true, validate: value => {
                            if (watch('new_password') != value ){
                                return "Ваші паролі не збігаються"
                            }
                        } })}/>
                        {errors.re_new_password?.type == 'required' && <div className={styles['change-password__error']}>Це поле повинно бути заповнено</div>}
                        {errors.re_new_password?.type == 'validate' && <div className={styles['change-password__error']}>{errors.re_new_password.message}</div>}
                        <div className={styles["change-password__box"]}>
                            <button disabled={!isValid} className={styles['change-password__submit']} type='submit'>Підтвердити</button>
                            <button onClick={() => setChangePasswordForm(false)} type='button'  className={styles['change-password__cancel']}>Відмінити</button>
                        </div>
                    </form>
                </div>
            </div>
            
            }
            
            <div className={styles.profile__inner}>
                <h2 className={styles.profile__title}>Профіль</h2>
                <div className={[styles.profile__info, editForm ? styles.hidden: ''].join(' ')}>
                    <div className={styles['profile__info-field']}>
                        <div className={styles['profile__info-field-name']}>Ім'я</div>
                        <div className={styles['profile__info-field-value']}>{user.first_name ? user.first_name: 'Не вказано'}</div>
                    </div>
                    <div className={styles['profile__info-field']}>
                        <div className={styles['profile__info-field-name']}>Прізвище</div>
                        <div className={styles['profile__info-field-value']}>{user.last_name ? user.last_name: 'Не вказано'}</div>
                    </div>
                    <div className={styles['profile__info-field']}>
                        <div className={styles['profile__info-field-name']}>Електронна пошта</div>
                        <div className={styles['profile__info-field-value']}>{user.email}</div>
                    </div>
                    <div className={styles['profile__info-field']}>
                        <div className={styles['profile__info-field-name']}>Teлефон</div>
                        <div className={styles['profile__info-field-value']}>{user.phone ? user.phone: 'Не вказано'}</div>
                    </div>
                    <button className={styles['profile__info-btn']} onClick={e => setEditForm(true)} >Редагувати</button>
                </div>
                <form method='POST' onSubmit={handleSubmit(updateProfile)} className={[styles['form-edit'], editForm ? styles.active: ''].join(' ')}>
                    <CSRFToken />
                    <div className={styles['form-edit__section']}>
                        <label className={styles['form-edit__label']}>Ім'я</label>
                        <input className={styles['form-edit__input']} placeholder="Ваше ім'я" {...register('first_name')}/>
                    </div>
                    <div className={styles['form-edit__section']}>
                        <label className={styles['form-edit__label']}>Прізвище</label>
                        <input className={styles['form-edit__input']} placeholder="Ваше прізвище" {...register('last_name')}/>
                    </div>
                    <div className={styles['form-edit__section']}>
                        <label className={styles['form-edit__label']}>Електрона пошта</label>
                        <input className={styles['form-edit__input']} placeholder="Ваша електрона пошта" {...register('email', {required: "Це поле повинно обовязково заповнене",  })}/>
                        {errors.email?.type == 'required' && <div className={styles['form-edit__label']}>{errors.email.message}</div>}
                    </div>
                    <div className={styles['form-edit__section']}>
                        <label className={styles['form-edit__label']}>Номер телефону</label>
                        <PhoneInput hideDropdown={true} inputProps={{name: 'phone', onBlur: e => setPhone(e.target.value)}}  value={user.phone ? user.phone: ' '} className={styles['form-edit__phone']} inputStyle={{width: '100%', border: 'none'}} countrySelectorStyleProps={{buttonStyle: {border: 'none'}}}/>
                        {phoneError  && <div className={styles['form-edit__label']}>{phoneError}</div>}
                    </div>
                    <div className={styles["form-edit__box"]}>
                        <button type="submit" className={[styles['form-edit__btn'], styles['form-edit__btn--change']].join(' ')} disabled={!isValid}>Зберегти зміни</button>
                        <button type='button' className={[styles['form-edit__btn'], styles['form-edit__btn--cancel']].join(' ')} onClick={() => setEditForm(false)}>Відмінити</button>
                    </div>
                </form>
                <div onClick={() => setChangePasswordForm(true)} className={styles.profile__btn}>Змінити пароль</div>
            </div>
        </section>
    )
}

export default Profile