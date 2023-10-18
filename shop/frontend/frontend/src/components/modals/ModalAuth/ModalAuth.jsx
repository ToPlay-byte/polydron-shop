import React, { useContext, useState} from 'react'
import axios from 'axios'
import AuthContext from '../../../contexts/AuthContext'
import LogInForm from './LogInForm'
import ResetPasswordForm from './ResetPasswordForm'
import RegistrationForm from './RegistrationForm'
import { BsXLg } from "react-icons/bs"
import styles from './styles.module.scss'



const ModalAuth = ({setActive}) => {
    const [ activeResetPasswordFrom, setResetPasswordForm ] = useState(false)
    const [ changeForm, setChangeForm ] = useState(true)
    console.log(activeResetPasswordFrom)
    return (
        <div className={styles['modal-auth']}>
            <div className={styles['modal-auth__bg']} onClick={() => setActive(false)}></div>
            <div className={styles["modal-auth__inner"]}>
                <div className={styles["modal-auth__exit"]} onClick={() => setActive(false)}><BsXLg /></div>
                { activeResetPasswordFrom ? <ResetPasswordForm setResetPasswordForm={setResetPasswordForm} />: <>
                <div className={styles["modal-auth__top"]}>
                    <div onClick={() => setChangeForm(true)} className={[styles["modal-auth__title"], changeForm ? styles["modal-auth__title--active"]: ''].join(' ')}>Вхід</div>
                    <div onClick={() => setChangeForm(false)} className={[styles["modal-auth__title"], changeForm ? '': styles["modal-auth__title--active"]].join(' ')}>Зареєструватися</div>
                </div>
                {changeForm ? <LogInForm setResetPasswordForm={setResetPasswordForm}/>: <RegistrationForm/>}
                </>}
                
            </div>
        </div>
    )
}






export default ModalAuth