import React, { useState, useEffect } from "react";
import axios from 'axios'


const CSRFToken = () => {
    const [CSRFToken, setCSRFToken] = useState('')
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue
    }
    useEffect(() => {
        const scrf = async () => {
            try {
                await axios.get('/api/auth/csrftoken')
            } catch (error) {
                console.log(error)
            }
        }
        scrf()
        setCSRFToken(getCookie('csrftoken'))
    }, [])
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={CSRFToken}/>
    )
}

export default CSRFToken