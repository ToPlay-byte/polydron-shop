import React, { useEffect, useState } from 'react';
import { usePhoneValidation } from 'react-international-phone';


const usePhoneValidator = (number='') => {
    const [phone, setPhone] = useState(number)
    const [error, setError] = useState('')
    useEffect(() => {
        let isValid = usePhoneValidation(phone).isValid
        if(!isValid && phone) {
           setError('Некоректно набраний номер')
        } else {
            setError('')
        }
    }, [phone])
    return [phone, setPhone, error]
}
 
export default usePhoneValidator;