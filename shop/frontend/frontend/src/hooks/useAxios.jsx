import { useState, useContext, useEffect } from "react";
import AuthContext from '@contexts/AuthContext'
import CSRFToken from '@components/CSRFToken/CSRFToken'
import Cookie from "js-cookie";
import dayjs from 'dayjs'
import jwt_decode from 'jwt-decode'
import axios from "axios";

let baseURL = 'http://127.0.0.1:8000'

const useAxios = () => {
    const {tokens, setUser, setAccessToken} = useContext(AuthContext)
    const axiosInstatnce = axios.create({
        baseURL,
        headers: {Authorization: `auth ${tokens?.access}`}
    })

    axiosInstatnce.interceptors.request.use(async req => {
        const user = jwt_decode(tokens.access)
        let isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
        if (!isExpired) {
            return req
        } else {
            const response = await axios.post(`${baseURL}/api/auth/token/refresh`, {
                refresh: tokens?.refresh
            },
            {
                headers: {"X-CSRFToken": Cookie.get('csrftoken')}
            }
            ).then (
                res => { 
                    setUser(jwt_decode(res.data.access))
                    setAccessToken(res.data.access)
                    localStorage.setItem('la', JSON.stringify(res.data.access))
                }
            )
            req.headers.Authorization = `auth ${tokens.access}`
            return req
        }
    })
    
    return axiosInstatnce
}

export  default useAxios