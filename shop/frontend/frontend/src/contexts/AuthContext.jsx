import React, { createContext, useState, useEffect } from 'react'
import Cookie from 'js-cookie'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
const AuthContext = createContext()

export default AuthContext


export function AuthProvider({children}) {
    const [ user, setUser ] = useState(localStorage.getItem('la')? jwt_decode(localStorage.getItem('la')) : {})
    const [ accessToken, setAccessToken ] = useState(localStorage.getItem('la')? JSON.parse(localStorage.getItem('la')): null)
    const [ refreshToken, setRefreshToken ] = useState(localStorage.getItem('lf')? JSON.parse(localStorage.getItem('lf')): null)
    const [ loading, setLoading ] = useState(true)
    let login = async (e) => {
         
        let res = await axios.post('/api/auth/token', {
            email: e.target.email.value,
            password: e.target.password.value
        },
        {
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": Cookie.get('csrftoken')
            }
        }) 
        if (res.status) {
            setAccessToken(res.data.access)
            setRefreshToken(res.data.refresh)
            setUser(jwt_decode(res.data.access))
            localStorage.setItem('la', JSON.stringify(res.data.access))
            localStorage.setItem('lf', JSON.stringify(res.data.refresh))
        }
        
        return res
    }

    const updateTokens = () => {
        axios.post('/api/auth/token/refresh', JSON.stringify({
            refresh: refreshToken
        }),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status) {
                setAccessToken(res.data.access)
                setUser(jwt_decode(res.data.access))
                localStorage.setItem('la', JSON.stringify(res.data.access))
            }
            else {
                logout()
            }
            if (loading) {
                setLoading(false)
            }
        }).catch(err => console.log('hello'))
    }

    const logout = () => {
        setAccessToken(null)
        setRefreshToken(null)
        setUser(null)
        localStorage.removeItem('la')
        localStorage.removeItem('lf')
    }
    
    useEffect(() => {
        if (loading) {
            if (refreshToken) {
                updateTokens()
            }
        }
        const time = 1000 * 60 * 4
        const timer = setInterval(() => {
            if (refreshToken) {
                updateTokens()
            }
        }, time)
        timer
        return () => clearInterval(timer)
       
    }, [accessToken, loading])

    let contextData = {
        user: user,
        tokens: {
            access: accessToken,
            refresh: refreshToken
        },
        login,
        updateTokens,
        setUser,
        setRefreshToken,
        setAccessToken,
        logout: logout
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

