import React from 'react'
import ReactDOM  from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@contexts/AuthContext'
import { CartProvider } from '@contexts/CartContext'
import Catalog from './pages/catalog/Catalog'
import Product from './pages/product/Product'
import Home from './pages/home/Home'
import Galley from './pages/gallery/Gallery'
import User from './pages/user/User'
import Profile from './pages/user/settings/Profile'
import ResetPassword from './pages/reset_password/ResetPassword'
import Payment from './pages/payment/Payment'
import './assets/global.scss'





const root = ReactDOM.createRoot(document.querySelector(".root"));
root.render(
    <Router>
        <AuthProvider>
            <CartProvider>
                <Routes >
                    <Route path='/' element={<Home />}/>
                    <Route path='/gallery' element={<Galley />}/>
                    <Route path='/catalog' element={<Catalog />}/> 
                    <Route exact path='/catalog/:category' element={<Catalog />}/> 
                    <Route exact path='/catalog/search' element={<Catalog />}/>   
                    <Route exact path='/catalog/detail/:name' element={<Product />}/>   
                    <Route path='/account/' element={<User/>}>
                        <Route path='settings' element={<Profile/>}></Route>
                    </Route>  
                    <Route exact path='/catalog/detail/:name' element={<Product />}/>   
                    <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPassword/>} />
                    <Route exact path='/checkout' element={<Payment />}/> 
                </Routes>
            </CartProvider>
        </AuthProvider>
    </Router>
)


