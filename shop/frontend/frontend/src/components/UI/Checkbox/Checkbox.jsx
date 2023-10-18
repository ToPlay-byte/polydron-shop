import React from 'react'
import styles from './styles.module.scss'

const Checkbox = ({inputProps, text='', inputClassName='', labelClassName='', containerClassName='', onChange}) => {
    return ( 
        <div className={[styles['checkbox'], containerClassName].join(' ')}>
            <input {...inputProps} onChange={onChange} type="checkbox" className={[styles['checkbox__input'], inputClassName].join(' ')}/>
            <label htmlFor="empty-products" className={[styles['checkbox__label'], labelClassName].join(' ')}>{text}</label>
        </div>
    );
}
 
export default Checkbox;